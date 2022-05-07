import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import type { AppProps } from 'next/app'
import { isMobile as isMobileDetect } from 'react-device-detect'

function MyApp({ Component, pageProps }: AppProps) {
  const [vh, setVh] = useState<number>(0)
  const [vw, setVw] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(true)

  useEffect(() => {
    setIsMobile(isMobileDetect)
  }, [])

  useEffect(() => {
    setVh(window.innerHeight)
    setVw(window.innerWidth)
  }, [])

  return (
    <>
      <Head>
        <title>CHEESYLAZY</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <Component {...pageProps} vh={vh} vw={vw} isMobile={isMobile} />
    </>
  )
}

export default MyApp
