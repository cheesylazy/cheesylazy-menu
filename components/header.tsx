import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  title: string
}

const Header: NextPage<HeaderProps> = ({ title }) => {
  return (
    <>
      <div className="event bg-key">
        <p className="text-center text-16 font-bold">
          FREE SHIPPING ON ORDERS OVER $50!
        </p>
      </div>
      <header className="h-20 relative">
        <div className="px-10 py-6 flex justify-between items-center text-lg">
          <div>SHOP</div>

          <Link href="/login">
            <a>LOGIN</a>
          </Link>
        </div>
        <Link href="/">
          <a>
            <div className="absolute top-2/4 right-2/4 translate-x-2/4"></div>
          </a>
        </Link>
      </header>
    </>
  )
}

export default Header
