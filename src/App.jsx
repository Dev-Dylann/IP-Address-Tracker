import { useEffect, useState, useRef } from "react"
import arrowIcon from "./assets/icon-arrow.svg"
import MapSection from "./components/MapSection"

function App() {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const mapRef = useRef()

  useEffect(() => {
    if (mapRef.current) mapRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    setData(null)
    setIsLoading(true)
    setIsError(null)

    const fetchIp = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?apiKey=${import.meta.env.VITE_API_KEY}`
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
  }, [])

  return (
    <>
      <header className="font-rubik h-[35vh] bg-[url('/backgrounds/bg-mobile.png')] bg-cover bg-center flex flex-col gap-4 items-center p-7">
        <h1 className="text-white font-semibold text-2xl pb-2">IP Address Tracker</h1>

        <form className='w-full flex'>
          <input type="text" className="outline-none border-darkerGray focus:border-2 px-6 py-4 rounded-s-2xl text-lg grow" />
          <button type="submit" className="rounded-e-2xl bg-darkerGray px-6">
            <img src={arrowIcon} alt="Search" />
          </button>
        </form>

        <div className="bg-white rounded-2xl flex flex-col items-center gap-4 p-4 w-full text-center font-bold text-lg shadow-lg z-10">
          <p className="flex flex-col gap-1">
            <span className="text-darkGray text-xs">IP ADDRESS</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>{data ? data.ip : '---.---.---.---'}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-darkGray text-xs">LOCATION</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>{data ? `${data.location.city}, ${data.location.region} ${data.location.postalcode ? data.location.postalcode : ''}` : '---------, ------ -----'}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-darkGray text-xs">TIMEZONE</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>UTC {data ? data.location.timezone : "--:--"}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-darkGray text-xs">ISP</span>
            <span className={isLoading && !isError ? "animate-pulse" : ''}>{data ? data.isp : '------- ------'}</span>
          </p>
        </div>
      </header>

      <main ref={mapRef} className="h-screen flex">
        {data && <MapSection data={data} />}
      </main>
    </>
  )
}

export default App
