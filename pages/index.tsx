import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HomeProps {
  vh: number
  isMobile: boolean
}

const Home: NextPage<HomeProps> = ({ vh, isMobile }) => {
  const [display, setDisplay] = useState<string>('block')
  const [data, setData] = useState({})
  const [language, setLanguage] = useState<string>('KO')

  useEffect(() => {
    const init = async () => {
      const res = await (
        await fetch(`https://api.408.co.kr/cheesylazy/menu/`)
      ).json()
      setData(res)
    }
    init()

    setTimeout(() => {
      setDisplay('none')
    }, 2100)
  }, [])

  return (
    <div
      className={`w-full flex justify-center items-center h-10`}
      style={{
        height: vh + 'px',
      }}
    >
      <div style={{ display: display === 'none' ? 'none' : 'block' }}>
        <Image src={'/eating_v3.gif'} width={324} height={576} />
      </div>

      <div
        className={`absolute ${
          isMobile ? 'top-[40px] right-2' : 'top-[60px] right-12'
        } `}
      >
        <div
          className="switch"
          style={{ display: display === 'none' ? 'block' : 'none' }}
        >
          <input
            id="language-toggle"
            className="check-toggle check-toggle-round-flat"
            type="checkbox"
            onClick={() => {
              if (language === 'KO') {
                setLanguage('EN')
              } else {
                setLanguage('KO')
              }
            }}
          />
          <label htmlFor="language-toggle" />
          <span className="on leading-[9px]">KO</span>
          <span className="off leading-[9px]">EN</span>
        </div>
      </div>

      <div
        className={`w-full h-full ${isMobile ? 'p-4 pt-10' : 'p-10 pt-14'}`}
        style={{ display: display === 'none' ? 'block' : 'none' }}
      >
        <main className={`flex flex-wrap w-full`}>
          {Object.keys(data).map((type, index) => {
            return (
              <div
                className={`${isMobile ? 'w-[100%] mb-10' : 'w-[50%]'}`}
                key={index}
              >
                <div
                  className={`${
                    isMobile ? 'text-4xl mb-4' : 'text-5xl mb-7'
                  } font-[Montserrat]`}
                >
                  {type.toUpperCase()}
                </div>

                {data?.[type].map((obj, index) => {
                  let title = language === 'KO' ? obj.title : obj.title_en
                  return (
                    <div
                      className={`${
                        isMobile ? 'pl-5 mb-8' : 'pl-8 mb-10'
                      } font-[NanumSquareB]`}
                      key={index}
                    >
                      <div className="mb-1">
                        <span
                          className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}
                        >
                          {title}
                        </span>
                        <span
                          className={`${
                            isMobile ? 'text-2xl' : 'text-3xl pl-10'
                          } `}
                        >
                          {isMobile && <br></br>}
                          {title.length > 30 && !isMobile && <br></br>}
                          {language === 'KO' ? '' : '₩'}{' '}
                          {numberWithCommas(obj.price)}{' '}
                          {language === 'KO' ? '원' : ''}
                        </span>
                      </div>

                      {obj.description && (
                        <div
                          className={` ${
                            isMobile ? 'text-xl' : 'text-2xl'
                          } whitespace-pre-line font-[NanumSquareR] text-gray-600`}
                          style={{ marginTop: '5px' }}
                        >
                          {language === 'KO' ? (
                            <>{convert(obj.description)}</>
                          ) : (
                            obj.description_en
                          )}
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

// export async function getServerSideProps(context) {
//   const res = await (
//     await fetch(`https://api.408.co.kr/cheesylazy/menu`)
//   ).json()

//   return {
//     props: { data: res, content: 'cheesylazy' },
//   }
// }

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const convert = (str: string) => {
  const converts = str.match(/\(.*?\)/g)

  if (!converts) {
    return str
  }

  for (let text of converts) {
    let [content, link] = text.replace('(', '').replace(')', '').split('#')
    let link_text = `<a href=${link} target='_blank' class='underline'>${content}</a>`
    str = str.replace(text, link_text)
  }

  return <div dangerouslySetInnerHTML={{ __html: str }} />
}
