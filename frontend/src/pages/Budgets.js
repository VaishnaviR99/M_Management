import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Showbar from "../components/showbar";
import { useTranslation } from "react-i18next";
const initialstate={
    category:"",
    limit:""
}
export default function Budgets(){
const{t}=useTranslation()
    const token=JSON.parse(localStorage.getItem("trackertoken"));
    const[accounts,setaccount]=useState([])
    const[records,setrecords]=useState([])
    console.log(records,"myrecords");
    const[budget,setbudget]=useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[formdata,setformdata]=useState(initialstate)
    const addvalue=(e)=>{
      const{name,value}=e.target;
      setformdata({...formdata,[name]:value})
    }
    useEffect(()=>{
        getdata()
        },[])
        useEffect(()=>{
            myrecords()
        },[])
        const myrecords=async()=>{
            try{
                const res= await axios.get("http://localhost:8080/expense/myexpense",{
                   headers:{
                       token
                   }
                })
                console.log(res.data,"hello i am in records network")
                let Newdata=[]
                res.data.forEach((ele)=>{
                        Newdata.push(ele.Budgets)
                })
                setrecords(Newdata)
               }catch(e){
                   console.log(e)
               }
        }
        const getdata=async()=>{
          try{
            const res=await axios.get("http://localhost:8080/expense",{
             headers:{
               token:token
             }
            });
         setaccount(res.data)
         }catch(e){
            console.log(e.message)
         }
        }
    async function createBudget(e){
        console.log(formdata)
           e.preventDefault()
      if(formdata.limit<500){
        alert("create a limit min 500")
      }else{
        
        try{
           let res= await axios.post("http://localhost:8080/expense/createbudget",formdata,{
            headers:{
                token:token
            }
           })
           myrecords()
           console.log(res.data)
        }catch(e){
               console.log(e.message)
        }
      }
    }
    

    return(
        <div>
          <div style={{marginLeft:"7%"}}>
          <Button variant="light"  onClick={handleShow}>{t("CreateBudget")}</Button>
          </div>
          <div >
         {records.map((ele)=>
         <Showbar ele={ele}/>
         )}
          </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("CreateBudget")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createBudget}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           
    <Form.Select name="category" onChange={addvalue} required aria-label="Default select example" className='mt-3'>
      <option>{t("select categories")}</option>
      <option value="Food">{t("Food")}</option>
      <option value="Transportation">{t("Transportation")}</option>
      <option value="Education">{t("Education")}</option>
      <option value="Shopping">{t("Shopping")}</option>
      <option value="Other">{t("Other")}</option>
    </Form.Select>
    <Form.Control name="limit" className="mt-3" min="500" type="number" onChange={addvalue} placeholder={t("limit")} required/>
    
    <Form.Control variant="primary" className="bg-primary text-light mt-3" required type="submit" value={t("CreateBudget")}/>
  </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
       </Modal.Footer>
      </Modal>
        </div>
    )
}