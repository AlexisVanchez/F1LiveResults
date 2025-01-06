import { Link } from "react-router";

export default function Main(){
    return(
        <div>
            <Link className="p-2" to='/cardata'>CarData</Link>
            <Link className="p-2" to='/intervals'>Intervals</Link>
            <Link className="p-2" to='/racecontrol'>RaceControl</Link>
            <Link className="p-2" to='/teamradio'>TeamRadio</Link>
            <Link className="p-2" to='/weather'>Weather</Link>
        </div>
        
    )
}