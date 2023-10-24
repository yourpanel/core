import type { GetStaticProps } from 'next'
import Menu from './components/Menu/Menu'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
      <Menu></Menu>
    </main>
  )
}
