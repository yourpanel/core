import { useEffect } from 'react'
import { getVersion } from '../api/app'
import Menu from './components/Menu/Menu'
import { initClient } from '@/api'

export default function Home() {
  const init = async () => {
    initClient()
    const version = await getVersion()
    console.log('app version', version)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <main className="min-h-screen flex flex-row items-center justify-between">
      <Menu></Menu>
    </main>
  )
}
