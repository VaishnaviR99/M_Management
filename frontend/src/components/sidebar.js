import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useTranslation } from 'react-i18next';
import {AiOutlineLeft} from "react-icons/ai"
import { useSelector } from 'react-redux';
const images=["https://cdn-icons-png.flaticon.com/512/2819/2819194.png","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQv0bevhcgTqXvEWUSBPVeQRhqq83jhmrP9A&usqp=CAU","https://cdn-icons-png.flaticon.com/512/4366/4366867.png","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjM3lW74Wz0JzB__6JLWCxqpJodOThdotzA&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuGoPkRRXfJcHfUxamXHT2GNT5QYPUN2Rfw&usqp=CAU"]
export default function Sidebar({categories,changestate}){
  const {language}=useSelector((state)=>state.lang)
  const {t}=useTranslation()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let Newarray=[];
  for(let i=0;i<=categories.length-1;i++){
    Newarray.push({ele:categories[i],img:images[i]})
  }
    const gradientStyles2 = {
        background: 'linear-gradient(to bottom right,#77dd77, #77dd77)',
        /* Additional styles can be added here */
      };
      const gradientStyles3 = {
        background: 'linear-gradient(to bottom right, #5db3c0, #5db3c0)',
        /* Additional styles can be added here */
      };
    return(
        <div >
       
      <div style={{position:"absolute",top:"50%",right:"0px",zIndex:10,boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}><AiOutlineLeft size="50px" onClick={handleShow}/></div>

      <Offcanvas show={show} onHide={handleClose}  placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("Categories")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div >
          
          <div> {Newarray.map((ele,i)=>
             <div onClick={()=>changestate(ele?.ele)} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"30px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",padding:"10px",marginTop:"10px"}}>
               <img width="40px" src={ele?.img}/>
                <p  style={{color:"black",fontWeight:"bold"}}  >{t(ele?.ele)}</p>
              
             </div>
              )}</div>
             
           </div> 
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    )
    
}
