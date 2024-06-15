'use client'
import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button
} from "@nextui-org/react";
import { useState, useEffect, useContext } from 'react';
import { Account } from './accContext';
import { getValueFromUrl, pathVars,setPathValue,noVarsPath } from '../ytils/urler';



const MyNavbar = ({ children }) => {
  const { value, setValue } = useContext(Account);
  const [accounts,setAccs] = useState();
  

  function SideMenuItem({name,icon,link ="/st" }:{name:String,icon:String,link:String}){
    return(<a href={`${location.origin}${link}?${pathVars()}`}>
    <div  className ={location.href.includes(`${location.origin}${link}`) ?'flex flex-row items-center mt-5 mr-2 py-3  rounded-r-full bg-neutral-200 dark:bg-neutral-800': 'flex flex-row items-center mt-5 mr-2 py-3  rounded-r-full hover:bg-neutral-200 dark:hover:bg-neutral-800'}>
          <span className="material-symbols-rounded ml-5 mr-3 select-none " >
            {icon}
            </span>  
            <h1>{name}</h1>
            </div>
            </a>)
  }
  
  const getAcc = async () =>{
    return fetch('http://127.0.0.1:8000/accounts',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },})
.then((response) => response.json())
.then((json) => {
  console.log(json)
  console.log(json["data"])
  setAccs(json["data"])


}).catch(()=>{
  window.location.href = `${location.origin}/signin`
});
}


useEffect(()=>{
  getAcc()

},[])

useEffect(()=>{
  
  
  if(location.href == noVarsPath() && accounts){
    window.location.href = noVarsPath()+setPathValue("acc_id",accounts[0].id)
  }

},[accounts])

  return (
    <div>
      <header className='drop-shadow-md  h-16 flex flex-row items-center justify-between  bg-neutral-200 dark:bg-neutral-800 sticky top-0'> 
      <div className="flex flex-row items-center">
      <span className="material-symbols-rounded  ml-5 select-none" onClick={()=>{document.getElementById("sidebar")?.classList.toggle("hidden")}}>menu</span>  
        <a href={`${location.origin}/home?${pathVars()}`}><span className="ml-6 select-none">Header</span></a>
        </div>

        <div className="flex flex-row items-center mr-14">
          {accounts   ?   (accounts.length > 1? <Dropdown >
      <DropdownTrigger>
        <Button 
          
          variant="ghost" 
          
        >
          {value? value.acc_name:""}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
     
        aria-label="Action event example" 
        
        color="primary"
      >
        
        {accounts.map((acc)=>{
          return(<DropdownItem onClick={() => {
            setValue(acc)
            window.location.href = noVarsPath()+setPathValue("acc_id",acc.id)
          }} key={acc.id}>{acc.acc_name}</DropdownItem>)
        })}
        
       
      </DropdownMenu>
    </Dropdown> : 
    <></>    )      
:<></>}
        </div>
        </header>
      <div className="flex flex-row sticky left-0">
      <div className='w-40 flex-none flex-col h-screen  bg-neutral-300 dark:bg-neutral-700 ' id="sidebar">
      <SideMenuItem name="Stores" icon ="storefront" link="/stores"/>
      <SideMenuItem name="Items" icon ="sell" link="/items"/>
      <SideMenuItem name="Orders" icon ="shopping_bag" link="/orders"/>
      <SideMenuItem name="Menus" icon ="menu_book" link="/menu"/>
      {/* <SideMenuItem name="Inventory" icon ="inventory" link="/inventory"/> */}
      
      </div>
      <main className='bg-neutral-200 dark:bg-neutral-800 w-full'>{children}</main>

      </div>
      
      
    </div>
  );
};





export default MyNavbar;