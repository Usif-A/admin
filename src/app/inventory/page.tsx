'use client'
import { useState, useEffect } from "react";
import MyNavbar from "../components/navbar";
import {Button, Divider} from "@nextui-org/react";
import { getValueFromUrl } from "../ytils/urler";
export default function Stores(){

    

return (<MyNavbar children={page()}>
</MyNavbar>)
}

function page(){
    console.log(getValueFromUrl("acc_id"))
    const getStores = async () =>{
        return fetch(`http://127.0.0.1:8000/inv?acc_id=${getValueFromUrl("acc_id")}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
        setInv(json["data"])
    });
    }

    const [inv,setInv] = useState()

    useEffect(()=>{
        getStores()
    },[])

    return(<div className="flex-col items-center justify-center mx-10 mt-7">
        <div className="flex felx-row justify-between">
        <h1 className="text-5xl">Inventory </h1>
        <Button className="mr-5 " size="lg" variant="ghost" > Add Item</Button>
        </div>
        
        {inv?  inv.map((it) => {return(<><InvItem inv={it} /></>)}) : <></>}
        </div>)
}

function InvItem ({inv}){
    return(<div className="bg-neutral-300 dark:bg-neutral-700 rounded-md my-5 ">
        inventory
    </div>)
}