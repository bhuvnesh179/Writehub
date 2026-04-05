import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-6 py-4" >
        <Link to={'/blogs'} className="flex justify-center flex-col text-xl font-bold">
           <div className="flex items-center gap-2">
            <img src="/src/assets/logo.svg" className="w-8 h-8"/> Writehub
           </div>
        </Link>
        <div>
        <Link to={`/publish`}>
           <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            Write   
           </button>    
        </Link>
            <Avatar  size={"big"} name="bhuvnesh"/>
        </div>

    </div>  
}