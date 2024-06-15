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
        return fetch(`http://127.0.0.1:8000/stores?acc_id=${getValueFromUrl("acc_id")}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
        setStores(json["data"])
    });
    }

    const [stores,setStores] = useState()

    useEffect(()=>{
        getStores()
    },[])

    return(<div className="flex-col items-center justify-center mx-10 mt-7">
        <div className="flex felx-row justify-between">
        <h1 className="text-5xl">Stores </h1>
        <Button className="mr-5 " size="lg" variant="ghost" > Add Store</Button>
        </div>
        
        {stores?  stores.map((it) => {return(<><StoreItem store={it} /></>)}) : <></>}
        </div>)
}

function StoreItem ({store}){
    return(<div className="bg-neutral-300 dark:bg-neutral-700 rounded-md my-5 ">
        <div className="flex flex-row  items-center justify-between">
            <div className="flex flex-row  items-center">
                <div className="ml-3">{store.name}</div>
                <div  className="mx-2 w-px dark:bg-neutral-200 bg-neutral-700 h-4/5" />
                <div>{store.location}</div>
            </div>
            <div className="flex flex-row  items-center">
                <Button  variant="faded">view orders</Button>
                <Button className="mx-3 my-3"  variant="faded">edit menu</Button>
            </div>
        </div>
    </div>)
}