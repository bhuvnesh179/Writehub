import { SignupInput } from "@100xbansal/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { Spinner } from "./Spinner"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs ]= useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    })
    function callForSpinner(){

        return (
            <div>
                <Spinner/>
            </div>
        )
    }

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            console.log(jwt);
            
            localStorage.setItem("token", jwt);
            callForSpinner();
            navigate("/blogs")
        }catch(e){
            alert("Error while signing up")
        }
    }

    return <div className="h-screen flex justify-center flex-col ">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    {type === "signin"? "Don't have an account":"Already have an account?"}   
                    <Link className="pl-2 underline" to={type ==="signin"? "/signup":  "/signin"}>
                        {type === "signin"? "Signup": "Signin"}
                    </Link>
                </div>
            </div>
                <div className="mt-4">
               {type === "signup"? <LabelledInput label="Username" placeholder="Enter your username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />: null}

                <LabelledInput label="Email" placeholder="m@example.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />

                  <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />

                <button onClick={sendRequest} type="button" className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>


                </div>
                   
               
            </div>
            </div>
            

        
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e : ChangeEvent<HTMLInputElement>) => void;
    type?: string;

}


function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return  <div>
    <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}   