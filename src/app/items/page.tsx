'use client'
import { useState, useEffect } from "react";
import MyNavbar from "../components/navbar";
import {Button, Divider} from "@nextui-org/react";
import { getValueFromUrl } from "../ytils/urler";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter,useDisclosure} from "@nextui-org/modal";
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import {Switch} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";
import {now, getLocalTimeZone,parseDate,parseZonedDateTime} from "@internationalized/date";

export default function Items(){

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

return (<MyNavbar children={page()}>
</MyNavbar>)
}

function page(){

    function ItemItem ({item}){
        return( <div className=" rounded-md my-5 flex flex-rox justify-between items-center flex-wrap">
            
            <img className="w-[150px] mx-5" src={item.image}/>
            <div className=" my-5 flex flex-rox justify-between items-center  w-4/5">
            <div>{item.decr}</div>
            
            <div className="flex flex-col  gap-4 mr-10">
                <Button color="secondary" onPress={() =>{
                    console.log(focusItem);
                    setFItem(item)
                    setDiscounted(item.on_discount)
                    onOpen()
                }} variant="ghost">
                <span className="material-symbols-rounded ml-5 mr-1 select-none " >edit</span>
                    Edit Item</Button>
                <Button color="danger" variant="ghost"><span className="material-symbols-rounded ml-5 mr-3 select-none " >
                delete
                </span> Delete Item</Button>    
            </div>
            </div>
        </div>
        )
    }

    const getItems = async () =>{
        return fetch(`http://127.0.0.1:8000/items?acc_id=${getValueFromUrl("acc_id")}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
        setItems(json["data"])
    });
    }

    const onSave = async () =>{

    }


    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    console.log(getValueFromUrl("acc_id"))
    

    const [items,setItems] = useState()
    const [focusItem,setFItem] = useState()
    const [onDiscount,setDiscounted] = useState(false)

    useEffect(()=>{
        getItems()
    },[])

    return(<div className="flex-col items-center justify-center mx-10 mt-7">
        <div className="flex felx-row justify-between">
        <h1 className="text-5xl">Items </h1>
        <Button className="mr-5 " size="lg" onPress={()=>{setFItem(null); onOpen()}} variant="ghost" > Add Item</Button>
        <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1">review Item</ModalHeader>
                            <ModalBody>
                            <Input
                                key="item_name"
                                type="item_name"
                                label="item name"
                                defaultValue={focusItem ?  focusItem.name : "" }
                                labelPlacement="outside"
                                />
                                <Input
                                key="image_link"
                                type="image_link"
                                label="image link"
                                defaultValue={focusItem ? focusItem.image : "" }
                                labelPlacement="outside"
                                />
                                <Textarea
                                key="item_description"
                                defaultValue={focusItem ? focusItem.decr : "" }
                                label="item description"
                                
                                />
                                <Input
                                key="price"
                                type="price"
                                label="price"
                                defaultValue={focusItem ? focusItem.price : "" }
                                labelPlacement="outside"
                                />
                                <Divider />
                                <div className="flex flex-row justify-between  items-center">
                                <h1> On Discount </h1>
                                <Switch  isSelected={onDiscount} onValueChange={setDiscounted}/>
                                </div>
                                {onDiscount ? 
                                <>
                                <Input
                                key="discounted_price"
                                type="discounted_price"
                                label="discounted_price"
                                defaultValue={focusItem ? focusItem.discount_price : "" }
                                labelPlacement="outside"
                                />
                                <div className="flex flex-row justify-between  items-center gap-3">
                                <DatePicker label="Start date"
                                hideTimeZone
                                showMonthAndYearPickers  
                                defaultValue={now(getLocalTimeZone())}
                                 />

                                </div>
                                <div className="flex flex-row justify-between  items-center gap-3">
                                <DatePicker 
                                    label="End date" 
                                    hideTimeZone
                                    showMonthAndYearPickers  
                                    defaultValue={now(getLocalTimeZone())}
                                    />
                                    {console.log(new Date(focusItem.deal_end))}
                                    {console.log(new Date(focusItem.deal_end).toISOString())}
                                </div>
                                </>
                                : <></>}
                                

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                                <Button color="primary" onPress={ () =>{
                                    onSave()
                                    onClose()
                                }
                                    }>
                                Save
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                        </ModalContent>
                    </Modal> 
        </div>
        
        {items?  
        <Accordion variant="light" selectionMode="single" className="mt-6 mb-6 bg-neutral-300 dark:bg-neutral-700 rounded-md">
        {items.map((it) => {return(<AccordionItem  startContent ={
            <div className="bg-neutral-200 dark:bg-neutral-800 w-[80vw] flex p-6 flex-row rounded-md justify-between align-middle"> 
                <div>{it.name}</div>
                <div>{it.price}EGP</div>
            </div>}><ItemItem item={it} /></AccordionItem>)})}
        </Accordion>
        : <></>}
        </div>)
}

