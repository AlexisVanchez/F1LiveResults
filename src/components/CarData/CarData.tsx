import { useEffect, useState } from "react"
import { getData } from "../../API/api"

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
    const [driver, setDriver] = useState<number | null>(null)
    const url:string = `https://api.openf1.org/v1/car_data?driver_number=${driver}&session_key=latest` // need to implement a function that changes needed driver in ulr string


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
    }, [driver, url])

    if(loading){
        return <div>Loading...</div>
    }

    if(!data){
        <div>Failed to fetch data</div>
    }
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDriver(e.target.value ? parseInt(e.target.value, 10) : null)
    }

    function handleStart(){
        if(driver != null){
            console.log(driver)
        }
        else{
            console.log('Nothing')
            
        }
    }
    
    function getLastData(data: CarDataInterface[]){ // undefined in divs. Probably limits in queries
        console.log(data[data?.length - 1].brake);
        return (
            <div>
                {/* <div>Brake { data[data?.length -1].brake}</div>
                <div>Throttle{data[data?.length -1].throttle}</div>
                <div>DRS {data[data?.length -1].drs}</div>
                <div>Gear {data[data?.length -1].n_gear}</div>
                <div>Speed {data[data?.length -1].speed}</div> */}
            </div>
        )
    }

    return(
        <div>
            <input 
            type="number"
            value={driver ?? ''}
            onChange={handleChange}
            className="border-4"/>
            <button className="border-4 px-4" onClick={handleStart}>SetDriver</button>
            <button onClick={() => {
                if(data){
                    getLastData(data)
                }
            }}>getLastData</button>
            {/* {data && getLastData(data)} */}
        </div>
        
    )
}