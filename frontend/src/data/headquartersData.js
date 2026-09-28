/**
 * MarketLink - Global & Regional Headquarters Locations
 * Dynamic country-linked headquarters for international operations
 */

export const HEADQUARTERS_DATA = {
  PK: {
    countryCode: 'PK',
    countryName: 'Pakistan',
    flag: '🇵🇰',
    title: 'MarketLink National HQ',
    city: 'Islamabad',
    badge: 'Federal Capital Headquarters',
    address: 'Blue Area & F-6 Organic Commerce Center, Islamabad, Pakistan',
    liaisonDesk: 'National Farmers & Capital Market Coordination Desk',
    email: 'marketlink118@gmail.com',
    hours: 'Mon – Sun: 08:00 AM – 06:00 PM PKT',
    mapQuery: 'Blue Area, F-6, Islamabad, Pakistan'
  },
  AE: {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    title: 'MarketLink Emirates Regional Hub',
    city: 'Abu Dhabi',
    badge: 'GCC Regional Operations',
    address: 'Corniche Sector & Al Bateen Agri-Tech Plaza, Abu Dhabi, UAE',
    liaisonDesk: 'Emirates Farmers & Urban Organic Co-op Desk',
    email: 'marketlink118@gmail.com',
    hours: 'Mon – Sat: 08:00 AM – 06:00 PM GST',
    mapQuery: 'Al Bateen, Abu Dhabi, United Arab Emirates'
  },
  SA: {
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    flag: '🇸🇦',
    title: 'MarketLink Arabian Peninsula Hub',
    city: 'Riyadh',
    badge: 'Kingdom Capital Operations',
    address: 'King Fahd Road, Digital City Organic Zone, Riyadh, Saudi Arabia',
    liaisonDesk: 'Direct Farm Pre-Order & Market Liaison Desk',
    email: 'marketlink118@gmail.com',
    hours: 'Sun – Thu: 08:00 AM – 06:00 PM AST',
    mapQuery: 'Digital City, Riyadh, Saudi Arabia'
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    title: 'MarketLink European Hub',
    city: 'London',
    badge: 'UK & Europe Operations',
    address: 'Sustainable Food Exchange, Westminster, London SW1P, United Kingdom',
    liaisonDesk: 'Community Farm & Farmers Market Network',
    email: 'marketlink118@gmail.com',
    hours: 'Mon – Fri: 08:30 AM – 05:30 PM GMT',
    mapQuery: 'Westminster, London, United Kingdom'
  },
  US: {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    title: 'MarketLink Americas HQ',
    city: 'Washington, D.C.',
    badge: 'Global Governance Center',
    address: 'Constitution Avenue NW, Capitol Agri-Commerce Plaza, Washington, D.C., USA',
    liaisonDesk: 'Direct Organic Grower & Community Market Desk',
    email: 'marketlink118@gmail.com',
    hours: 'Mon – Fri: 09:00 AM – 05:00 PM EST',
    mapQuery: 'Constitution Ave NW, Washington, DC, USA'
  }
};

export function getHeadquarters(countryCode) {
  return HEADQUARTERS_DATA[countryCode] || HEADQUARTERS_DATA.PK;
}
