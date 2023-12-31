import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import type { AppProps } from 'next/app'
import { I18nProvider } from '../locales'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window === 'undefined')
    return null
  return (
    <I18nProvider locale={pageProps.locale}>
      <Theme accentColor="indigo">
        <Component {...pageProps} />
      </Theme>
    </I18nProvider>
  )
}
