import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
export default function Showbar({ele}){
  const{t}=useTranslation()
  const{language}=useSelector((state)=>state.lang)
  console.log(ele,"ia m imnjjerkjfdjjf")
  let x=[]
for(let i in ele){
        if(ele[i].limit>0){
          x.push({category:i,...ele[i]})
      }
  }
  console.log(x,"iamx");
return(
  <div style={{margin:"auto",width:"85%",marginLeft:"11%"}}>
      <div style={{width:"70%",margin:"auto",padding:"30px",fontWeight:"bold" }}>
     {x.map((ele)=>
     
     <div  style={{marginTop:"50px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",padding:"20px 20px 20px 20px"}}>  <p style={{textAlign:"center",color:"gray",fontWeight:"bold"}}>{t(ele?.category)}</p><ProgressBar variant="info" now={language=="en"?ele?.initialAmount:ele?.initialAmount* 0.044497} max={language=="en"?ele?.limit:ele?.limit*0.044497} label={`${language=="en"?ele?.initialAmount:ele?.initialAmount* 0.044497}`} />
   <p style={{textAlign:"center",color:"gray",margin:"10px",fontWeight:"bold"}}>{language=="en"?ele?.limit:ele?.limit*0.044497}</p>
     </div>
     )}
    </div>
  </div>
)
}