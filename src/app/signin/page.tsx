'use client'

import React,{useState} from "react"


export default function Signin(){

    const callSignup = () =>{
        fetch('http://127.0.0.1:8000/users', {
  method: 'POST',
  body: JSON.stringify({
    email: document.getElementById("email").value.substring(0, 100),
    password: document.getElementById("password").value.substring(0, 500),
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response) => response.json())
.then((json) => {
        localStorage.setItem("token",json["token"]); 
        console.log(json)} );
    }
   

    const callLogin = () =>{
        fetch('http://127.0.0.1:8000/users/login', {
  method: 'POST',
  body: JSON.stringify({
    email: document.getElementById("email").value.substring(0, 100),
    password: document.getElementById("password").value.substring(0, 500),
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response) => response.json())
.then((json) => {
    localStorage.setItem("token",json["token"]);
    window.location.href = location.origin+"/home"
    console.log(json)});
       
    }

    const [login,setlog] = useState(true)

    return (<div className="flex flex-row  ">
        <div className="content-center justify-center mx-auto my-36 drop-shadow-md bg-neutral-200 dark:bg-neutral-800 flex flex-col justify-items-center rounded-md">
            <h3 className="mx-auto mt-6 mb-7 text-4xl ">{login ? "Please log in": "Please sign in" }</h3>
          <input type="text" placeholder="EMAIL" id="email"
          className="mx-10 my-5 bg-neutral-200 dark:bg-neutral-800 border-neutral-800 dark:border-neutral-200  ring-offset-2 ring-2 h-12 p-6" />
          <input type = "password" id="password" placeholder="PASSWORD" 
          className="mx-auto my-5 bg-neutral-200 dark:bg-neutral-800 border-neutral-800 dark:border-neutral-200  ring-offset-2 ring-2 h-12 p-6" />
          {login ? <p className="mx-auto text-xs text-gray-400 mb-5 cursor-pointer" cursor-pointer>forgot your password ?</p>: <></> } 
          <input className="mx-auto bg-sky-500 w-4/5 h-12 cursor-pointer hover:bg-sky-600 active:bg-sky-700"  onClick={
            ()=>{ if(login){callLogin()}else{callSignup()}}
          } type="submit" value={login ? "Log in":"Sign up"}/>
          <p className="mx-auto my-5 text-gray-400 cursor-pointer" >{login ? <>don't have an account <span className="text-sky-500" onClick={()=>{setlog(!login)}}>Sign up</span></>: <>Already have an account <span className="text-sky-500" onClick={()=>{setlog(!login)}}>Log in</span></> }</p>

        </div>
    </div>
    )
}