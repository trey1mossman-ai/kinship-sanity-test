import { getSiteSettings, SiteSettings } from '@/lib/sanity/getSiteData'
import { FooterClient } from './FooterClient'

interface FooterWrapperProps {
  variant?: 'default' | 'homa'
}

export async function FooterWrapper({ variant = 'default' }: FooterWrapperProps) {
  const siteSettings = await getSiteSettings()

  return <FooterClient variant={variant} siteSettings={siteSettings} />
}
