import { useEffect, useState } from "react"
import { getData } from "../../API/api"

const url:string = 'https://api.openf1.org/v1/team_radio?session_key=latest'
const urlDriver: string = 'https://api.openf1.org/v1/drivers?session_key=latest'

interface RadioData{
    date: string
    driver_number: number
    meeting_key: number
    recording_url: string
    session_key: number
}

interface DriverData{
    driver_number: number
    first_name: string
    last_name: string
    full_name: string
    team_name: string
    team_colour: string
    name_acronym: string
}

export default function TeamRadio(){

    const [radio, setRadio] = useState<RadioData[] | null>(null)
    const [driver, setDriver] = useState<DriverData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchRadio = async() => {
            try{
                const data = await getData(url)
                const driverData = await getData(urlDriver)
                setRadio(data)
                setDriver(driverData)                
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        fetchRadio()
    }, [radio])

    if(loading){
        return <div>Loading...</div>
    }

    if(!radio?.length || !driver?.length){
        return <div>Failed to fetch data</div>
    }

    const lastDate = radio[radio.length-1]
    const dateFormat:string = new Date(lastDate.date).toLocaleDateString()
    const timeFormat:string = new Date(lastDate.date).toLocaleTimeString()
    const dateConcat:string = dateFormat + " " + timeFormat

    return(
        <div className="w-full">
            <h1 className="w-full flex justify-center p-4 text-2xl">{dateConcat}</h1>
            {radio.map((radioItem, index) => {
                const driverColor = driver?.find((item) => item.driver_number === Number(radioItem.driver_number))?.team_colour           
                
                return(
                    <div key={index} className="w-full flex justify-center">
                        <div className="w-1/4 border-4 rounded" style={{backgroundColor: `#${driverColor}`}}>
                            <a href={radioItem.recording_url}>Driver number {radioItem.driver_number}: Voice message</a>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}