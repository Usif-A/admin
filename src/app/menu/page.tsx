'use client'
import { useState, useEffect } from "react";
import MyNavbar from "../components/navbar";
import {Button, Divider} from "@nextui-org/react";
import { getValueFromUrl } from "../ytils/urler";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter,useDisclosure} from "@nextui-org/modal";
export default function Menu(){

    

return (<MyNavbar children={page()}>
</MyNavbar>)
}

function page(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    console.log(getValueFromUrl("acc_id"))
    const getStores = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/storeitems?acc_id=${getValueFromUrl("acc_id")}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
          console.log(json);
          setMenu(json.data);
        } catch (error) {
          console.error('Fetch error:', error);
          window.location.href = `${location.origin}/signin`;
        }
      };

    const [menu,setMenu] = useState()

    useEffect(()=>{
        getStores()
    },[])

    return(<div className="flex-col items-center justify-center mx-10 mt-7">
        <div className="flex felx-row justify-between">
        <h1 className="text-5xl">Menus </h1>
        
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                Action
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                        </ModalContent>
                    </Modal> 
        </div>
        
        {menu?  
        <Accordion variant="light" selectionMode="multiple" className="mt-6 mb-6 bg-neutral-300 dark:bg-neutral-700 rounded-md">
        {menu.map((it) => {return(
            <AccordionItem  
            startContent ={
            <div className="bg-neutral-200 dark:bg-neutral-800 w-[80vw] flex p-6 flex-row rounded-md justify-between items-center"> 
                <div>{it.name}</div>
                <div className="flex flex-row gap-2">
                    <div >
                    <Button variant="ghost" onPress={onOpen}  className="h-10" color="success" size="sm">
                    <span className="material-symbols-rounded  select-none " >add</span>
                    
                    </Button></div><div>
                    <Button variant="ghost" onPress={onOpen} className="h-10" color="danger" size="sm">
                    <span className="material-symbols-rounded  select-none " >remove</span>
                    </Button></div>
                </div>
            </div>}> 
                <MenuItem menuItems={it.menu} />
            </AccordionItem>)})}
        </Accordion> : <></>}
        </div>)

function MenuItem ({menuItems}){
    return(<div className="bg-neutral-300 dark:bg-neutral-700 rounded-md my-5  flex flex-col">
        <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        
        <TableColumn>Item Name</TableColumn>
        
        <TableColumn>Price</TableColumn>
        <TableColumn>on sale</TableColumn>
        <TableColumn>sale Price</TableColumn>
        <TableColumn>sale start</TableColumn>
        <TableColumn>sale end</TableColumn>
        

      </TableHeader>
      <TableBody>
         {menuItems.map((it)=>{
            var item = it.item
            return(<TableRow >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.on_discount ? "YES" : "NO" }</TableCell>
                <TableCell>{item.discount_price}</TableCell>
                <TableCell>{item.deal_start ? item.deal_start.slice(0,10) + " "+item.deal_start.slice(12,16):""}</TableCell>
                <TableCell>{item.deal_end ? item.deal_end.slice(0,10) + " "+item.deal_end.slice(12,16):""}</TableCell>
                </TableRow >)
        })}

        </TableBody>
    </Table>  
    </div>)
}
}