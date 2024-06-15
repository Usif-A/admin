'use client'
import { useState, useEffect } from "react";
import MyNavbar from "../components/navbar";
import {Button} from "@nextui-org/react";
import { getValueFromUrl } from "../ytils/urler";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


export default function Orders(){

    

return (<MyNavbar children={page()}>
</MyNavbar>)
}

function page(){
    console.log(getValueFromUrl("acc_id"))
    const getOrders = async () =>{
        return fetch(`http://127.0.0.1:8000/orders-info?acc_id=${getValueFromUrl("acc_id")}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
        setOrders(json["data"])
    });
    }

    const [orders,setOrders] = useState()

    useEffect(()=>{
        getOrders()
    },[])

    return(<div className="flex-col items-center justify-center mx-10 mt-7">
        <div className="flex felx-row justify-between">
        <h1 className="text-5xl">Orders </h1>
        <div>
        <Button className="mr-5 " size="md" variant="ghost" > <span className="material-symbols-rounded select-none " >
        filter_alt
            </span></Button>
        <Button className="mr-5 " size="md" variant="ghost" > <span className="material-symbols-rounded select-none " >
        export_notes
            </span></Button>
            </div>
        </div>
        
        {orders?  
        <Accordion variant="light" selectionMode="multiple" className="mt-6 mb-6 bg-neutral-300 dark:bg-neutral-700 rounded-md">
        {orders.map((it) => {return(
            <AccordionItem  
            startContent ={
            <div className="bg-neutral-200 dark:bg-neutral-800 w-[80vw] flex p-6 flex-row rounded-md justify-between content-center items-center"> 
                <div>{it.name}</div>
                <div className="text-right">
                    <div className="">Completed: {it.completed}</div>
                    <div>In progress: {it.in_progress}</div>
                    <div>Cancelled: {it.cancelled}</div>
                </div>
            </div>}> 
                <OrderItem order={it} />
            </AccordionItem>)})}
        </Accordion> : <></>}
        </div>)
}

function OrderItem ({order}){
    return(<div className="bg-neutral-300 dark:bg-neutral-700 rounded-md my-5 ">
        <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="w-fit">Order ID</TableColumn>
        <TableColumn>Date-Time</TableColumn>
        <TableColumn>Item Name</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>total</TableColumn>

      </TableHeader>
      <TableBody>
        {order.order.map((order)=>{
            var items = order.items
            var mods = order.mods
            var ord = order.ord
            var ord_items = order.ord_items
            return(
                <TableRow >
                <TableCell>{ord.id.slice(0,8)}</TableCell>
                <TableCell>{ord.date.slice(0,10) + " "+ord.date.slice(12,16) }</TableCell>
                <TableCell>{items.name}</TableCell>
                <TableCell>{ord_items.qty}</TableCell>
                <TableCell>{ord_items.price}</TableCell>
                <TableCell>{ord_items.price*ord_items.qty}</TableCell>
                </TableRow>
            )
        })}
        
        
      </TableBody>
    </Table>

    </div>)
}