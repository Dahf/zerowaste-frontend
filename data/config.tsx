import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'
import React from 'react'

const siteConfig = {
  logo: Logo,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Features',
      },
      {
        id: 'pricing',
        label: 'Pricing',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Login',
        href: '/login',
      },
      {
        label: 'Sign Up',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link href="https://twitter.com/Pagebakers">Eelco Wiersma</Link>
      </>
    ),
    links: [
      {
        href: 'mailto:hello@meals-api.dev',
        label: 'Contact',
      },
      {
        href: 'https://twitter.com/meals_api',
        label: <FaTwitter size="14" />,
      },
      {
        href: 'https://github.com/meals-api/meals-api',
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: 'Start building with Meals API',
    features: [
      {
        icon: FiCheck,
        title: 'Extensive Recipe Collection',
        description: 'Access over 10,000 recipes from various cuisines.',
      },
      {
        icon: FiCheck,
        title: 'Nutritional Information',
        description: 'Detailed nutritional information for each recipe.',
      },
      {
        icon: FiCheck,
        title: 'Easy Integration',
        description: 'Seamlessly integrate our API into your applications.',
      },
      {
        icon: FiCheck,
        title: 'Regular Updates',
        description: 'Our database is regularly updated with new recipes.',
      },
    ],
  },
}

export default siteConfig