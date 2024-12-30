import { useEffect, useState } from "react"
import { getData } from "../../API/api"

const url = 'https://api.openf1.org/v1/weather?session_key=latest'

interface WeatherData {
    meeting_key: number;
    session_key: number;
    date: string;
    air_temperature: number;
    humidity: number;
    pressure: number;
    rainfall: number;
    track_temperature: number;
    wind_direction: number;
    wind_speed: number;
}

export default function Weather(){

    const [weather, setWeather] = useState<WeatherData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchWeather = async() => {
            try{
                const data = await getData(url)
                setWeather(data)                
            } catch(error){
                console.error(error)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        fetchWeather()
    }, [])

    if(loading){
        return <div>Loading...</div>
    }

    if(!weather){
        return <div>Failed to fetch data</div>
    }
    
    const lastWeather = weather[weather.length-1]
    const dateFormat: string = new Date(lastWeather.date).toLocaleDateString()
    const timeFormat: string = new Date(lastWeather.date).toLocaleTimeString()
    const dateConcat: string = dateFormat + " " + timeFormat

    return(
        <div>
            <h1>Last Update: {lastWeather.date ? dateConcat : 'No Data received'}</h1>
            <h1>Rain: {lastWeather.rainfall ? 'Rain' : 'No Rain'}</h1>
            <h1>Air Temperature: {lastWeather.air_temperature + '°C' || 'No Data received'}</h1>
            <h1>Track Temperature: {lastWeather.track_temperature + '°C' || 'No Data received'}</h1>
            <h1>Wind Speed: {lastWeather.wind_speed + ' km/h' || 'No Data received'}</h1>
        </div>
    )
}