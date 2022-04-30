import type { NextPage } from 'next'
import Image from 'next/image'
import eating from '../resources/img/eating_v2.gif'

const Home: NextPage = () => {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{
        height: `calc(var(--vh, 1vh) * 100)`,
      }}
    >
      <Image src={eating} width={100} height={150} />
    </div>
  )
}

export default Home
