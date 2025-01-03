import { useEffect, useState } from "react"
import { getData } from "../../API/api"


const url = 'https://api.openf1.org/v1/race_control?session_key=latest'

interface RaceControlData{
    category: string | null
    date: string | null
    driver_number: string | null
    flag: string | null
    lap_number: number | null
    message: string | null
    scope: string | null
    sector: number | null
}

export default function RaceControl(){

    const [event, setEvent] = useState<RaceControlData[] | null >(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchEvent = async() => {
            try{
                const data = await getData(url)
                setEvent(data)
            }catch(error){
                console.error(error)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
        fetchEvent()
    }, [])

    if(loading){
        return <div>Loading...</div>
    }
    if(!event){
        return <div>No data available.</div>
    }

    const date = event.map(event => event.date);
    const category = event.map(event => event.category);
    const flag = event.map(event => event.flag);
    const lap_number = event.map(event => event.lap_number);
    const sector = event.map(event => event.sector);
    const scope = event.map(event => event.scope);
    const driver_number = event.map(event => event.driver_number);
    const message = event.map(event => event.message);
    
    function getMessageByLap(lap_number: number){
        for(let i = 0; i < 30; i++){
            return <div>{`Lap: ${lap_number}, Category: ${category[i]}, Flag: ${flag[i]}, Message: ${message[i]}, Driver: ${driver_number[i]}`};</div>
        }
    }
    
    

    return(
        <div>
            {event.map((event, key) => {
                return <div key={key}>{event.message}</div>
            })}
        </div>
    )
}