import { useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
const initialstate={
    name:"",
    email:"",
    password:""
}
export default function Signup(){
    const[formdata,setformdata]=useState(initialstate);
    const navigate=useNavigate()
    const changevalue=(e)=>{
    const{name,value}=e.target;
    setformdata({...formdata,[name]:value})
    }
    const submit=async(e)=>{
        e.preventDefault()

        try{
          const res=await axios.post("http://localhost:8080/signup",formdata)
          console.log(res.data)
          if(res.data.message=="user signed up successfully"){
            return navigate("/login")
          }
        }catch(e){
             console.log(e)
        }
    }
    return(
        <div className=' vh-100 w-100 mainsignup' >
        <div className=' vh-100 d-flex justify-content-center p-5 align-items-center gap-20 '>
            <Form className='w-25 form ' onSubmit={submit} >
            <div className='d-flex justify-content-center'>
                <h2 className='mb-4  text-dark' >Signup</h2>
                </div>
            <Row >
                <Col >
               
                <Form.Control placeholder='Name' value={formdata.name} name="name" onChange={changevalue} required/>
                </Col>
            </Row>
            <Row className="pt-3" >
                <Col >
                
                <Form.Control placeholder='Email' value={formdata.email} type="email" name="email" onChange={changevalue} required/>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col >
              
                <Form.Control placeholder='Password' type="password" value={formdata.password} name="password" onChange={changevalue} required/>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col >
              
                <Form.Control  type="submit" className='w-100 bg-danger text-light'/>
                </Col>
            </Row>
           
            <div>
            <p className='pt-2 text-end text-dark'>Already have an account?<Link to="/login" className='text-decoration-none text-dark' > Login</Link></p>
            </div>
            </Form>
        </div>
        </div>
    )
}