/**
 * Site-wide settings. IDs left empty switch the feature off (no script is loaded),
 * so the site works before the AdSense ad units exist.
 */
export const SITE = {
  name: 'Spread Engine',
  url: 'https://engine.spreadapps.in',
  /** AdSense publisher ID (same account as tools.spreadapps.in). */
  adsenseClient: 'ca-pub-1803903263399664',
  /**
   * Ad unit slot IDs from AdSense → Ads → By ad unit. Empty = no ad and no AdSense script.
   * Before filling these, publish the Google CMP message (Privacy & messaging) for this site.
   */
  adSlots: { afterFeatures: '', afterCode: '' } as Record<string, string>,
} as const;
