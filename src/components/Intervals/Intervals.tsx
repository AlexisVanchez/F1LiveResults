import { useEffect, useState } from "react"
import { getData } from "../../API/api"

const url: string = 'https://api.openf1.org/v1/intervals?session_key=latest'
const urlPosition = 'https://api.openf1.org/v1/position?session_key=latest'

interface IntervalsData{
    date: string
    driver_number: number
    gap_to_leader: number
    interval: number
}

interface PositionData extends IntervalsData{
    // date: string
    // driver_number: number
    position: number
}
export default function Intervals(){

    const [interval, setInterval] = useState<IntervalsData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [position, setPosition] = useState<PositionData[] | null>(null)

    useEffect(() => {
        const fetchIntervals = async() => {
            try{
                const intervalData = await getData(url)
                const positionData = await getData(urlPosition)
                setInterval(intervalData)
                setPosition(positionData)
  
            } catch(error){
                console.error(error)
                setLoading(false)
            } finally{
                setLoading(false)
            }
        }
        fetchIntervals()
    }, [])
    

    if(loading){
        return <div>Loading...</div>
    }

    if(!interval){
        return <div>Failed to fetch data</div>
    }  

    function getUniqueDriver(position: PositionData[]) {
        const driversMap = new Map<number, PositionData>()    
        for(const event of position){
            const existingEvent = driversMap.get(event.driver_number)  
            if(!existingEvent || new Date(event.date).getTime() > new Date(existingEvent.date).getTime()){
                driversMap.set(event.driver_number, event)
            }
        }
        return driversMap
    }   

    function displayDrivers(position: PositionData[]) {
        const uniqueDrivers = getUniqueDriver(position)
        console.log(uniqueDrivers);
        
        const sortedDrivers = Array.from(uniqueDrivers.values()).sort((a, b) => a.position - b.position) //need to figure out how to put dsq and dnf drivers to appear in the bottom of intervals. Solution 'Position'
        // console.log(sortedDrivers);
        
        return (
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-5/12 flex bg-slate-500 font-bold">
                    <p className="w-2/12 full flex justify-center border-2 border-black p-2">Position</p>
                    <p className="w-full flex justify-center border-2 border-black p-2">Driver number</p>
                    <p className="w-full flex justify-center border-2 border-black p-2">Gap to leader</p>
                </div>
                {sortedDrivers.map((driver, index) => (
                    <div key={index} className="w-5/12 flex">
                        <p className="w-2/12 full flex justify-center border-2 border-black p-2">{index+1}</p>
                        <p className="w-full flex justify-center border-2 border-black p-2">{driver.driver_number}</p>
                        <p className="w-full flex justify-center border-2 border-black p-2">+{driver.gap_to_leader}</p>
                        {/* <p>Last update: {new Date(driver[1].date).toLocaleTimeString()}</p>
                        <p>Last Interval: {driver[1].interval}</p> */}
                    </div>
                ))}
            </div>
        )
    }  

    return (
        <div>
            {position ? displayDrivers(position) : <div>Failed to fetch data</div>}
        </div>
    )

}