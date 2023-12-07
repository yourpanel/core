import { useState } from 'react'
import Image from 'next/image'
import { useI18n } from '@/locales'
import Logo from '@/pages/assets/menu/logo.webp'

interface MENU_ITEM {
  label: string
  icon: string
}

export default function Menu() {
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useI18n()

  const MENU_ITEMS: MENU_ITEM[] = [
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

  const handleClickMenuItem = (item: MENU_ITEM, index: number) => {
    setActiveIndex(index)
  }

  return (
    <menu className="menu min-h-screen w-113px bg-indigo-8">
      <div className="mt-53px flex justify-center">
        <Image src={Logo} width={69} height={90} alt="YourPanel" />
      </div>
      <nav className="mt-91px gap-48px" flex="~ col">
        {MENU_ITEMS.map((menu, index) => (
          <div className="cursor-pointer items-center gap-10px" flex="~ col" key={index} onClick={() => handleClickMenuItem(menu, index)}>
            <div className="h-38px w-38px rounded-9px" flex="center" bg={activeIndex === index ? 'white' : ''}>
              <div className={`${menu.icon} transition-all`} text={`${activeIndex === index ? '2xl black' : '3xl #7067C6'}`} hover={activeIndex === index ? 'text-3xl' : 'text-white/50'}></div>
            </div>
            {index === activeIndex && <span className="text-center color-white">{menu.label}</span>}
          </div>
        ),
        )}
      </nav>
    </menu>
  )
}
