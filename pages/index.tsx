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
  const [display, setDisplay] = useState<string>('none')

  useEffect(() => {
    // setTimeout(() => {
    //   setDisplay('none')
    // }, 2000)
  }, [])

  return (
    <div
      className={`w-full flex justify-center items-center`}
      style={{
        height: vh + 'px',
      }}
    >
      <div style={{ display: display }}>
        <Image src={'/eating_v3.gif'} width={100} height={180} />
      </div>

      <div
        className={`w-full h-full ${isMobile ? 'p-4 pt-10' : 'p-10 pt-14'}`}
        style={{ display: display === 'none' ? 'block' : 'none' }}
      >
        <main className={`flex flex-wrap w-full`}>
          {Object.keys(data).map((type, index) => {
            return (
              <div
                className={`${isMobile ? 'w-[100%]' : 'w-[50%]'}`}
                key={index}
              >
                <div
                  className={`${
                    isMobile ? 'text-3xl' : 'text-6xl'
                  } mb-7 font-[Montserrat] font-bold`}
                >
                  {type.toUpperCase()}
                </div>
                {data?.[type].map((obj, index) => {
                  return (
                    <div
                      className="pl-8 menu mb-12 font-[NanumSquareB]"
                      key={index}
                    >
                      <div className="mb-3">
                        <span className="text-4xl font-semibold">
                          {obj.title}
                        </span>
                        <span className="pl-10 text-4xl font-semibold">
                          {numberWithCommas(obj.price)}원
                        </span>
                      </div>

                      {obj.description && (
                        <div className="whitespace-pre-line text-2xl font-[NanumSquareR] text-gray-600">
                          {obj.description}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
