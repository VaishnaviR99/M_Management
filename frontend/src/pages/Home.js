import { Button,Form } from 'react-bootstrap';
import './home.css';
import { Fragment, useEffect, useState } from 'react';
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Statistics from './statistics';
import { Link } from 'react-router-dom';
import Getmylocation from '../components/getmylocation';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const initialstate={
  Amount:""
};
const initialState1={
  category:"",
  Name:"",
  Amount:"",
  Place:"",
  Description:""
}
export default function Home(){
  const{language}=useSelector((state)=>state.lang);
  console.log(language,"helloodosods")
  const{t}=useTranslation()
  const token=JSON.parse(localStorage.getItem("trackertoken"));
  const[addcard,setcard]=useState(false)
  const[formdata,setformdata]=useState(initialstate);
  const[expensedata,setexpensedata]=useState(initialState1)
  const[accounts,setaccount]=useState([]);

    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const gradientStyles1 = {
      background: 'linear-gradient(to bottom right, #ff3d6c, #712cf9)',
      /* Additional styles can be added here */
    };
    const gradientStyles2 = {
      background: 'linear-gradient(to bottom right, rgb(39,167,69))',
      /* Additional styles can be added here */
    };
    const gradientStyles3 = {
      background: 'linear-gradient(to bottom right, rgb(220,53,69))',
      /* Additional styles can be added here */
    };
    const gradientStyles4 = {
      background: 'linear-gradient(to bottom right, rgb(13,110,253))',
      /* Additional styles can be added here */
    };
    const changevalue=(e)=>{
      
     let{name,value}=e.target;
          value=Number(value);
         
            setformdata({...formdata,[name]:value})
          
      
    }
  
    const addvalues=(e)=>{
    
       const{name,value}=e.target;
      
       setexpensedata({...expensedata,[name]:value})
    }
    const expensesubmit=async(e)=>{
e.preventDefault();

if(expensedata.Amount<=0){
  alert("add more than 0")
}
else{
  try{
    const res= await axios.post("http://localhost:8080/expense/myexpense",expensedata,{
     headers:{
       token
     }
    })
    
     handleClose1()
    setcard(false)
    getdata()
 }catch(e){
   console.log(e)
 }
}
    }
    useEffect(()=>{
      getdata()
      },[])
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
    const additem=async(e)=>{
      e.preventDefault()
      if(formdata.Amount<500){
        alert("add minimum 500")
      }
     else{
      try{
        const res=await axios.post("http://localhost:8080/expense",formdata,{
         headers:{
           token:token
         }
        });
      
        handleClose()
        getdata()
     }catch(e){
        console.log(e.message)
     }
     }
    }
function addcardto(){
  setcard(!addcard)
}
function changelocation(e){
  
    setexpensedata({...expensedata,Place:e.city})
}

 return(
        <>
<div  className="vh-100 main1  " >
<div className="p-4  text-center d-flex justify-content-evenly main">
<Link to="/" style={{textDecoration:"none",color:"gray"}}>
<div className='fw-bold'>
{t("Accounts")}
</div></Link>
<Link  to="/budgets" style={{textDecoration:"none",color:"gray"}}>
<div className='fw-bold'>
{t("Budgets")}
</div></Link>
</div>
<div>
    <div  className='fw-bold p-4 fs-5 mainaddaccount position-relative '>
        <div className='d-inline-block'>
        <p style={{direction:language=="en"?"ltr":"rtl"}}>{t("Amount")}</p>
        
       <div > 
         {language=="en"?<div className="gradientStyles2"> <span>
          {accounts.Amount?accounts.Amount:0}
         </span>
         
        </div>:<div className="gradientStyles2"> <span>
          {accounts.Amount?accounts.Amount*0.044496:0}
         </span>
         
        </div>}
        </div>
      </div>
        <div className='addaccount'><Button  style={gradientStyles1} className='button ' disabled={accounts.length==3?true:false} onClick={handleShow}>{t("AddAmount")}</Button></div>
    </div>
</div>

<div style={{marginRight:"7%"}}>{addcard?<Statistics/>:<></>}</div>
<div className='text-center'><Button onClick={addcardto}>{addcard?t("Removechart"):t("AddChart")}</Button></div>
<div className='position-relative mt-5 '>
<Button style={gradientStyles1} onClick={handleShow1} className='position-absolute ok '>+</Button>
</div>
</div>
<div>
</div>
<Fragment >
     <Modal show={show} onHide={handleClose} size='sm'  >
        <Modal.Header closeButton >
          <Modal.Title>{t("AddAmount")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={additem} >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              
            
              
              <Form.Control
               autoFocus
               name="Amount"
               onChange={changevalue}
               required
               type="number"
              />
              
            </Form.Group>
            <Form.Control
               type='submit'
               className='bg-primary text-light'
               value={t("Add")}
              />
          </Form>
        </Modal.Body>
        <Modal.Footer >
          
          
        </Modal.Footer>
      </Modal>
     </Fragment>
     

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Expense")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={expensesubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Control
             placeholder={t("Expensename")}
             name="Name"
             required
             onChange={addvalues}
             dir={language=="en"?"ltr":"rtl"}
             />
              <Form.Control
              placeholder={t("Amount")}
              name="Amount"
                type="number"
                autoFocus
                required
                min="0"
                className='mt-3'
                onChange={addvalues}
                dir={language=="en"?"ltr":"rtl"}
              />
      
  <Form.Select   dir={language=="en"?"ltr":"rtl"} onChange={addvalues} name="category"  required aria-label="Default select example" className='mt-3'>
      <option>{t("select categories")}</option>
      <option value="Food">{t("Food")}</option>
      <option value="Transportation">{t("Transportation")}</option>
      <option value="Education">{t("Education")}</option>
      <option value="Shopping">{t("Shopping")}</option>
      <option value="Other">{t("Other")}</option>
    </Form.Select>
  
             
            <div style={{position:"relative"}}>
            <Form.Control
              name="Place"
              placeholder={t("Place")}
              autoFocus
              className='mt-3'
           
              onChange={addvalues}
              required
              value={t(expensedata.Place)}
              dir={language=="en"?"ltr":"rtl"}
              />
            <div style={{position:"absolute",top:5,right:3}}><Getmylocation changelocation={changelocation}/></div>
            </div>
    <Form.Control as="textarea"  onChange={addvalues}  required name="Description" rows={3} placeholder='add description' className='mt-3' />
    <Form.Control  type="submit" value={t("Submit")} className='mt-3 bg-primary text-light'  />
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
         
        </Modal.Footer>
      </Modal>
        </>
    )
}