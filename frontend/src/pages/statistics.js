import { useEffect, useState } from "react";
import PieChart from "../components/piechart";
import "../pages/home.css"
import axios from "axios";
export default function Statistics(){
    const token=JSON.parse(localStorage.getItem("trackertoken"));
    const[records,setrecords]=useState([]);
    console.log(records)
    useEffect(()=>{
        getdata()
        },[])
        const getdata=async()=>{
            try{
             const res= await axios.get("http://localhost:8080/expense/myexpense",{
                headers:{
                    token
                }
             })
             setrecords(res.data)
            }catch(e){
                console.log(e)
            }
        }
    return(
        <div className="d-flex flex-end  vh-100 justify-content-center align-items-center" >
            <PieChart ele={records}/>
        </div>
    )
}