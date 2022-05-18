import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface HomeProps {
  vh: number
  isMobile: boolean
  data: any
}

const Home: NextPage<HomeProps> = ({ vh, isMobile, data }) => {
  const [display, setDisplay] = useState<string>('block')

  useEffect(() => {
    setTimeout(() => {
      setDisplay('none')
    }, 2000)
  }, [])

  return (
    <div
      className={`w-full flex justify-center items-center `}
      style={{
        height: vh + 'px',
      }}
    >
      <div style={{ display: display }}>
        <Image src={'/eating_v3.gif'} width={100} height={180} />
      </div>
      <div
        className={`w-full h-full ${isMobile ? 'p-3' : 'p-10'} pt-2`}
        style={{ display: display === 'none' ? 'block' : 'none' }}
      >
        <header
          className={`relative max-w-[640px] w-[70vw] max-h-[154px] h-[18vw] m-auto ${
            isMobile ? 'mb-6' : ''
          }`}
        >
          <Image src={'/logo.png'} layout="fill" objectFit="fill" />
        </header>

        <main className={`flex flex-wrap w-full`}>
          {/* SADNWICH */}
          <div className={`${isMobile ? 'w-[100%]' : 'w-[50%] p-10'}`}>
            <div
              className={`${
                isMobile ? 'text-3xl' : 'text-7xl'
              } mb-7 border-b border-solid border-black`}
            >
              SANDWICH
            </div>
            {data?.sandwich.map((obj, index) => {
              return (
                <div className="menu mb-12" key={index}>
                  <div className="flex flex-wrap justify-between items-center mb-3">
                    <div className="text-3xl">{obj.title}</div>
                    <div className="text-xl">{obj.price}</div>
                  </div>

                  <li>{obj.bread}</li>
                  <li>{obj.sauce}</li>
                  <li>{obj.ingredients}</li>
                  {obj.etc && <li>{obj.etc}</li>}
                </div>
              )
            })}
          </div>

          {/* NON - SADNWICH */}
          <div className={`${isMobile ? 'w-[100%] mb-10' : 'w-[50%] p-10'}`}>
            <div
              className={`${
                isMobile ? 'text-3xl mt-5' : 'text-7xl'
              } mb-7 border-b border-solid border-black`}
            >
              NON-SANDWICH
            </div>

            {data?.['non-sandwich'].map((obj, index) => {
              return (
                <div className="menu mb-6" key={index}>
                  <div className="flex flex-wrap justify-between items-center mb-1">
                    <div className="text-3xl">{obj.title}</div>
                    <div className="text-xl">{obj.price}</div>
                  </div>

                  {obj.bread && <li>{obj.bread}</li>}
                  {obj.sauce && <li>{obj.sauce}</li>}
                  {obj.ingredients && <li>{obj.ingredients}</li>}
                  {obj.etc && <li>{obj.etc}</li>}
                </div>
              )
            })}

            {/* DRINK */}
            <div
              className={`${
                isMobile ? 'text-3xl mt-16' : 'text-7xl mt-8'
              } mb-7 border-b border-solid border-black`}
            >
              DRINK
            </div>
            {data?.['drink'].map((obj, index) => {
              return (
                <div className="menu mb-6" key={index}>
                  <div className="flex flex-wrap justify-between items-center mb-1">
                    <div className="text-3xl">{obj.title}</div>
                    <div className="text-xl">{obj.price}</div>
                  </div>

                  {obj.bread && <li>{obj.bread}</li>}
                  {obj.sauce && <li>{obj.sauce}</li>}
                  {obj.ingredients && <li>{obj.ingredients}</li>}
                  {obj.etc && <li>{obj.etc}</li>}
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const res = await (
    await fetch(`https://api.408.co.kr/cheesylazy/menu`)
  ).json()

  return {
    props: { data: res },
  }
}
