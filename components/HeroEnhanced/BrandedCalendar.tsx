'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

interface BrandedCalendarProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
}

export function BrandedCalendar({
  value,
  onChange,
  minDate,
  isOpen,
  onClose,
  position = 'left'
}: BrandedCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value);

  useEffect(() => {
    if (value) {
      const date = new Date(value + 'T00:00:00');
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      setSelectedDate(value);
    }
  }, [value]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateDisabled = (dateStr: string) => {
    if (!minDate) return false;
    return new Date(dateStr) < new Date(minDate);
  };

  const handleDateClick = (day: number) => {
    const newDate = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(newDate)) {
      setSelectedDate(newDate);
      onChange(newDate);
      onClose();
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 bg-white shadow-xl border border-gray-200 p-4 ${
              position === 'right' ? 'right-0' : 'left-0'
            }`}
            style={{
              minWidth: '320px',
              fontFamily: KINSHIP_FONTS.body,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigateMonth(-1);
                }}
                className="p-2 hover:bg-gray-100 transition-colors"
                style={{ color: KINSHIP_COLORS.greenDark }}
                aria-label="Previous month"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <h3
                className="text-lg font-semibold"
                style={{ color: KINSHIP_COLORS.greenDark }}
              >
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigateMonth(1);
                }}
                className="p-2 hover:bg-gray-100 transition-colors"
                style={{ color: KINSHIP_COLORS.greenDark }}
                aria-label="Next month"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold py-2"
                  style={{ color: KINSHIP_COLORS.greenDark, opacity: 0.7 }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="p-2" />;
                }

                const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const isSelected = dateStr === selectedDate;
                const isDisabled = isDateDisabled(dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDateClick(day);
                    }}
                    disabled={isDisabled}
                    className={`
                      p-2 text-center transition-all relative
                      ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                      ${isSelected ? 'font-bold' : ''}
                      ${isToday && !isSelected ? 'font-semibold' : ''}
                    `}
                    style={{
                      backgroundColor: isSelected ? KINSHIP_COLORS.green : 'transparent',
                      color: isSelected ? 'white' : KINSHIP_COLORS.greenDark,
                      borderRadius: '0',
                    }}
                  >
                    {day}
                    {isToday && !isSelected && (
                      <div
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ backgroundColor: KINSHIP_COLORS.green }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}