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
      icon: RocketSVG,
    },
    {
      label: t('nav.plugin'),
      icon: PluginSVG,
    },
    {
      label: t('nav.setting'),
      icon: SettingSVG,
    },
  ]

  return (
    <menu className="menu min-h-screen w-113px bg-indigo-8">
      <div className='mt-53px flex justify-center'>
        <Image src={Logo} width={69} height={90} alt='YourPanel' />
      </div>
      <nav className='mt-91px'>
        {MENU_ITEMS.map((menu, index) => (
          <div key={index}>
            <Image src={menu.icon} alt={menu.label} />
            {index === activeIndex && <span className='text-center color-white'>{menu.label}</span>}
          </div>),
        )}
      </nav>
    </menu>
  )
}
