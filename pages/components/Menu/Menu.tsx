import {  useState } from 'react'
import Image from 'next/image'
import { useI18n } from '@/locales'
import Logo from '@/pages/assets/menu/logo.webp'
import RocketSVG from '@/pages/assets/menu/rocket.svg'
import PluginSVG from '@/pages/assets/menu/plugin.svg'
import SettingSVG from '@/pages/assets/menu/setting.svg'


export default function Menu() {
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useI18n()

  const MENU_ITEMS = [
    {
      label: t('nav.project'),
      icon: 'i-ic-round-energy-savings-leaf',
    },
    {
      label: t('nav.plugin'),
      icon: 'i-ic-round-folder-copy',
    },
    {
      label: t('nav.setting'),
      icon: 'i-ic-baseline-grid-3x3',
    },
  ]

  return (
    <menu className="menu min-h-screen w-113px bg-indigo-8">
      <div className='mt-53px flex justify-center'>
        <Image src={Logo} width={69} height={90} alt='YourPanel' />
      </div>
      <nav flex="~ col" className='mt-91px gap-48px'>
        {MENU_ITEMS.map((menu, index) => (
          <div flex="~ col" className='items-center gap-10px cursor-pointer' key={index}>
            <div flex="center" className='w-38px h-38px rounded-9px transition-all' bg={activeIndex === index ? 'white' : ''}>
              <div className={`${menu.icon}`} text={`${activeIndex === index ? '2xl black' : '3xl #7067C6'}`}></div>
            </div>
            {index === activeIndex && <span className='text-center color-white'>{menu.label}</span>}
          </div>),
        )}
      </nav>
    </menu>
  )
}
