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
    team_color: string
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
                setRadio(data)
            }catch(error){
                console.error(error)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }

        // const fetchDriver = async() => {
        //     try{
        //         const data = await getData(urlDriver)
        //         setDriver(data)
        //     }catch(error){
        //         console.error(error)
        //     }
        // }
        fetchRadio()
        // fetchDriver()
    }, [])

    if(loading){
        return <div>Loading...</div>
    }

    if(!radio){
        return <div>Failed to fetch data</div>
    }

    const lastDate = radio[radio.length-1]
    const dateFormat:string = new Date(lastDate.date).toLocaleDateString()
    const timeFormat:string = new Date(lastDate.date).toLocaleTimeString()
    const dateConcat:string = dateFormat + " " + timeFormat

    console.log(typeof(radio));


    return(
        <div>
            <h1>{dateConcat}</h1>
            {radio.map((radioItem) => {
                return(
                    <div>Driver number: {radioItem.driver_number} : <a href={radioItem.recording_url}>{radioItem.recording_url}</a></div>
                )
            })}
        </div>
    )
}