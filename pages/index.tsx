import type { NextPage } from 'next'
import Image from 'next/image'
//import eating from '../resources/img/eating_v2.gif'
import eating from '../resources/img/eating_v3.gif'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface HomeProps {
  vh: number
  isMobile: boolean
}

const Home: NextPage<HomeProps> = ({ vh, isMobile }) => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/menu')
    }, 2000)
  }, [])

  return (
    <div
      className={`w-full flex justify-center items-center `}
      style={{
        height: vh + 'px',
      }}
    >
      <Image src={'/eating_v3.gif'} width={100} height={180} />
    </div>
  )
}

export default Home
