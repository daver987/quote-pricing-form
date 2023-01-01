export interface NavigationItem {
  name: string
  href: string
  id: number
}

export const navigation = <NavigationItem[]>[
  {
    name: 'Home',
    href: '/',
    id: 1,
  },
  {
    name: 'Fleet',
    href: '/fleet',
    id: 2,
  },
  {
    name: 'services',
    href: '/services',
    id: 3,
  },
  {
    name: 'About',
    href: '/about',
    id: 4,
  },
  {
    name: 'Contact',
    href: '/contact',
    id: 5,
  },
]
