import { useEffect, useState } from "react"
import { getData } from "../../API/api"


const url:string = 'https://api.openf1.org/v1/car_data?driver_number=55&session_key=latest' // need to implement a function that changes needed driver in ulr string

interface CarDataInterface{
    date: string
    driver_number: number
    throttle: number 
    brake: number 
    drs: number 
    rpm: number 
    n_gear: number 
    speed: number
}

export default function CarData(){

    const [data, setData] = useState<CarDataInterface[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCarData = async() => {
            try{
                const data = await getData(url)
                setData(data)
            } catch(error){
                console.error(error)
                setLoading(false)
            } finally{
                setLoading(false)
            }
        }
        fetchCarData()
    }, [])

    if(loading){
        return <div>Loading...</div>
    }

    if(!data){
        <div>Failed to fetch data</div>
    }
    
    
    
    
    

    return(
        <div></div>
    )
}