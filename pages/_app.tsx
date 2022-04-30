import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  useEffect(() => {
    setScreenSize()
  })

  return <Component {...pageProps} />
}

export default MyApp
