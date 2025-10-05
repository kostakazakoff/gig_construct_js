'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx'
import { navTranslations } from '@/app/_lib/translate.js'
import useTheme from '@/app/_hooks/useTheme.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname();
  const servicesRef = useRef(null);
  const newsRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const { language, setLanguage } = useLanguageContext();
  const [translation, setTranslation] = useState(navTranslations.BG);

  const changeLanguage = (lang) => {
    setLanguage(lang === 'BG' ? 'EN' : 'BG');
  }

  useEffect(() => {
    setTranslation(language === 'BG' ? navTranslations.BG : navTranslations.EN);
  }, [language]);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const navigation = [
    { name: translation.about, href: '/about', current: pathname === '/about', ref: aboutRef },
    { name: translation.services, href: '/', current: pathname === '/services', ref: servicesRef },
    { name: translation.projects, href: '/projects', current: pathname === '/projects', ref: projectsRef },
    { name: translation.news, href: '/news', current: pathname === '/news', ref: newsRef },
    { name: translation.contact, href: '/contact', current: pathname === '/contact', ref: contactRef },
  ]

  const classActive = 'bg-slate-950/50 text-blue-400 rounded-md px-3 py-2';
  const classInactive = 'text-slate-300 hover:bg-white/5 hover:text-blue-400 rounded-md px-3 py-2';

  // Update active state based on current pathname
  useEffect(() => {
    navigation.forEach(item => {
      if (item.ref.current) {
        item.ref.current.className = item.current ? classActive : classInactive;
      }
    });
  }, [pathname, language]);

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 right-0 left-0 bg-gig-blue dark:bg-slate-900/90 text-white text-xs md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl uppercase font-semibold after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 z-50 dark:backdrop-blur-md lg:text-base border-b-1 border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-blue-400 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                width={32}
                height={32}
                alt="GIG Construct Logo"
                src="/gig_logo.png"
                className="h-auto w-auto rounded-full"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 max-md:space-x-2 text-slate-300 uppercase">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-slate-950/50' : 'hover:text-blue-400',
                      'rounded-md px-3 py-2',
                    )}
                    ref={item.ref}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
            <button
              type="button"
              className="relative rounded-full p-1 text-slate-400 hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Change theme</span>
              {theme === 'dark' ? <SunIcon aria-hidden="true" className="size-6" /> :
                <MoonIcon aria-hidden="true" className="size-6" />}
            </button>
            <button
              className="relative rounded-full p-1 text-slate-400 hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              onClick={() => changeLanguage(language)}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Change language</span>
              {language === 'BG' ? 'EN' : 'BG'}
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-slate-900/90' : 'text-slate-300 hover:bg-white/5 hover:text-blue-400',
                'block rounded-md px-3 py-2 font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
