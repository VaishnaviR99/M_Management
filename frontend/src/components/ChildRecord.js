
import { useEffect, useState } from "react";
import "../pages/home.css"

import Sidebar from "./sidebar";

export default function ChildRecord({ele}){
const[state,setstate]=useState("false")
useEffect(()=>{
 setstate("false")
},[ele])
    const categories=["Food","Transportation","Education","Shopping","Other"]
    const gradientStyles2 = {
        background: 'linear-gradient(to bottom right,#77dd77, #77dd77)',
        /* Additional styles can be added here */
      };
      const gradientStyles3 = {
        background: 'linear-gradient(to bottom right, #5db3c0, #5db3c0)',
        /* Additional styles can be added here */
      };
      function changestate(e){
        console.log(ele[e],"hellow")
              setstate(ele[e])
      }
return(
        <div >
     
    <div style={{margin:"auto"}}>
    <Sidebar categories={categories} changestate={changestate}/>
    </div>
          {(state=="false"?ele?.Food:state)?.map((ele,i)=>
           <div  className="childdiv text-secondary" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} >
           <div style={{display:"flex",alignItems:"center",gap:"30px"}}>
             <img width="60px" src={ele?.image}/>
             <div style={{fontSize:"18px",fontWeight:"bold"}}>{ele?.Name}</div>
            </div>
            <div style={{fontSize:"18px",color:"red",fontWeight:"bold"}}>-{ele?.Amount}.00 RS</div>
            
           </div>
          )}
          
        </div>
    )
}