import { useEffect, useState } from "react"
import { getData } from "../../API/api"
import {ReactComponent as Rain} from '../../SVG/rain.svg'
import {ReactComponent as Sunny} from '../../SVG/sunny.svg'
import {ReactComponent as Wind} from '../../SVG/wind.svg'
import {ReactComponent as Temp_high} from '../../SVG/temp_high.svg'
import {ReactComponent as Temp_low} from '../../SVG/temp_low.svg'
import {ReactComponent as Pressure} from '../../SVG/pressure.svg'
import {ReactComponent as Humidity} from '../../SVG/humidity.svg'

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

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col w-3/4 bg-red-400 border rounded-lg">
                {/* <div>
                <h1>Last Update: {lastWeather.date ? dateConcat : 'No Data received'}</h1>
                <h1>Rain: {lastWeather.rainfall ? 'Rain' : 'No Rain'}</h1>
                <h1>Air Temperature: {lastWeather.air_temperature + '°C' || 'No Data received'}</h1>
                <h1>Track Temperature: {lastWeather.track_temperature + '°C' || 'No Data received'}</h1>
                <h1>Wind Speed: {lastWeather.wind_speed + ' km/h' || 'No Data received'}</h1>
            </div> */}

                <div className="flex py-4">
                    <div className="h-full flex w-2/5 justify-center items-center">
                        <div className="h-2/4">
                            {lastWeather.rainfall ? <Rain className="h-40"/> : <Sunny className="h-40"/>}
                        </div>
                    </div>
                    <span className="h-32 w-[1px] rounded-full bg-black self-center"></span>
                    <div className="flex flex-col w-3/5 items-center justify-center">
                        <b className="p-2 text-xl underline">Barcelona, Spain</b>
                        <p className="p-2">Air Temperature {lastWeather.air_temperature + '°C' || 'No data'}</p>
                        <p className="p-2">Last Update {dateConcat}</p>
                    </div>
                </div>
                <div className="h-[0.5px] w-5/6 rounded-full bg-black self-center"></div>
                <div className="flex flex-col justify-center items-center h-full py-4">
                    <div className="flex w-2/4 py-2">
                        <Wind className="h-7"/>
                        <p>Wind speed {lastWeather.wind_speed + ' m/s' || 'No data'}</p>
                    </div>
                    <div className="flex w-2/4 py-2">
                        <Humidity className="h-7"/>
                        <p>Humidity {lastWeather.humidity + ' %' || 'No data'}</p>
                    </div>
                    <div className="flex w-2/4 py-2">
                        <Pressure className="h-7"/>
                        <p>Pressure {lastWeather.pressure + ' m/bar' || 'No data'}</p>
                    </div>
                    <div className="flex w-2/4 py-2">
                        <Temp_high className="h-7"/>
                        <p>Track temperature {lastWeather.track_temperature + '°C' || 'No data'}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
//key = 5, j = 0