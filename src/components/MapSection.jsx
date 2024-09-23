import { useEffect } from "react"

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import locationIcon from '../assets/icon-location.svg'

function MapSection({ data }) {
    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {

        const map = L.map('map', {
            zoomControl: false,
        }).setView([data.location.lat, data.location.lng], 13)

        const icon = L.icon({
            iconUrl: locationIcon,
        })

        L.marker([data.location.lat, data.location.lng], {
            icon: icon
        }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        return () => {
            map.remove()
        }
    }, [data])

    return (
        <div id='map' className="min-h-[500px] grow z-[2]"></div>
    )
}

export default MapSection