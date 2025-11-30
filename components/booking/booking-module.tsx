'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, Tag } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { useBookingStore } from '@/lib/store/booking-store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function BookingModule() {
  const router = useRouter();
  const { bookingData, setBookingData, addRecentSearch } = useBookingStore();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: bookingData.checkIn || undefined,
    to: bookingData.checkOut || undefined,
  });

  const handleSearch = () => {
    if (dateRange?.from && dateRange?.to) {
      const searchData = {
        ...bookingData,
        checkIn: dateRange.from,
        checkOut: dateRange.to,
      };
      
      setBookingData(searchData);
      addRecentSearch(searchData);
      
      const params = new URLSearchParams({
        checkIn: dateRange.from.toISOString(),
        checkOut: dateRange.to.toISOString(),
        adults: bookingData.adults.toString(),
        children: bookingData.children.toString(),
        ...(bookingData.promoCode && { promo: bookingData.promoCode }),
      });
      
      router.push(`/rooms?${params.toString()}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Picker */}
        <div className="lg:col-span-1">
          <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            CHECK-IN / CHECK-OUT
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal mt-1',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'MMM d')} -{' '}
                      {format(dateRange.to, 'MMM d')}
                    </>
                  ) : (
                    format(dateRange.from, 'PPP')
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="lg:col-span-1">
          <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            GUESTS
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal mt-1"
              >
                <Users className="mr-2 h-4 w-4" />
                {bookingData.adults} Adults
                {bookingData.children > 0 && `, ${bookingData.children} Children`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Adults</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setBookingData({
                          adults: Math.max(1, bookingData.adults - 1),
                        })
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{bookingData.adults}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setBookingData({ adults: bookingData.adults + 1 })
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Children</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setBookingData({
                          children: Math.max(0, bookingData.children - 1),
                        })
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{bookingData.children}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setBookingData({ children: bookingData.children + 1 })
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Promo Code */}
        <div className="lg:col-span-1">
          <Label
            htmlFor="promo"
            className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
          >
            PROMO CODE
          </Label>
          <div className="relative mt-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              id="promo"
              placeholder="Enter code"
              className="pl-9"
              value={bookingData.promoCode || ''}
              onChange={(e) => setBookingData({ promoCode: e.target.value })}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1 flex items-end">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSearch}
            disabled={!dateRange?.from || !dateRange?.to}
          >
            Check Availability
          </Button>
        </div>
      </div>
    </motion.div>
  );
}