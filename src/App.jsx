import { useEffect, useState } from "react"
import arrowIcon from "./assets/icon-arrow.svg"
import MapSection from "./components/MapSection"

function App() {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const [input, setInput] = useState('')
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    setData(null)
    setIsLoading(true)
    setIsError(null)

    const fetchIp = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?apiKey=${import.meta.env.VITE_API_KEY}${input.trim() !== '' ? "&ipAddress=" + input.trim() : ''}`
        );

        const data = await response.json()
        console.log(data)
        setData(data)
      } catch (err) {
        console.log(err)
        setIsError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIp()
  }, [trigger])

  return (
    <>
      <header className="font-rubik h-[35vh] bg-[url('/backgrounds/bg-mobile.png')] bg-cover bg-center flex flex-col gap-4 items-center p-7 md:py-10 md:px-16 lg:bg-[url('/backgrounds/bg-desktop.png')] lg:h-[25vh]">
        <h1 className="text-white font-semibold text-2xl pb-2">IP Address Tracker</h1>

        <form className='w-full flex lg:max-w-xl' onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search for any IP address or domain" className="outline-none border-darkerGray focus:border-2 px-6 py-4 rounded-s-2xl text-lg grow" />
          <button type="submit" disabled={input.trim() === ''} onClick={() => setTrigger(prev => !prev)} className="rounded-e-2xl bg-darkerGray px-6">
            <img src={arrowIcon} alt="Search" />
          </button>
        </form>

        <div className="bg-white rounded-2xl flex flex-col items-center gap-4 p-4 w-full text-center font-bold text-lg shadow-lg z-10 lg:flex-row lg:items-start lg:justify-between lg:text-left lg:gap-8 lg:p-10 lg:text-xl lg:max-w-6xl xl:px-0 xl:gap-0 xl:grid xl:grid-cols-4 xl:text-2xl">
          <p className="flex flex-col gap-1 xl:px-10 xl:h-full">
            <span className="text-darkGray text-xs lg:text-sm">IP ADDRESS</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>{data ? data.ip : '---.---.---.---'}</span>
          </p>
          <p className="flex flex-col gap-1 xl:px-10 xl:h-full xl:border-darkGray xl:border-l">
            <span className="text-darkGray text-xs lg:text-sm">LOCATION</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>{data ? `${data.location.city}, ${data.location.region} ${data.location.postalcode ? data.location.postalcode : ''}` : '---------, ------ -----'}</span>
          </p>
          <p className="flex flex-col gap-1 xl:px-10 xl:h-full xl:border-darkGray xl:border-l">
            <span className="text-darkGray text-xs lg:text-sm">TIMEZONE</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>UTC {data ? data.location.timezone : "--:--"}</span>
          </p>
          <p className="flex flex-col gap-1 xl:px-10 xl:h-full xl:border-darkGray xl:border-l">
            <span className="text-darkGray text-xs lg:text-sm">ISP</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>{data ? data.isp : '------- ------'}</span>
          </p>
        </div>
      </header>

      <main className="h-[65vh] flex lg:h-[75vh]">
        {data && <MapSection data={data} />}
      </main>
    </>
  )
}

export default App
