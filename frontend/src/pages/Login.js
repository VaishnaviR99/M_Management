import { useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { logi } from '../redux/auth/action';
const initialstate={
   
    email:"",
    password:""
}
export default function Login(){
    const[formdata,setformdata]=useState(initialstate);
    const{login}=useSelector((state)=>state.auth);
    console.log(login)
    const dispatch=useDispatch()
    const changevalue=(e)=>{
        const{name,value}=e.target;
        setformdata({...formdata,[name]:value})
        }
        console.log(formdata)
        const submit=async(e)=>{
             e.preventDefault()
            try{
              const res=await axios.post("http://localhost:8080/login",formdata)
              console.log(res.data)
              if(res.data.message=="user login successfully"){
               localStorage.setItem("trackertoken",JSON.stringify(res.data.token))
               dispatch(logi)
              }else{
                alert(res.data)
              }
            }catch(e){
                 console.log(e)
            }
        }
        if(login){
            return <Navigate to="/"/>
        }
   return(
    <div className='w-100 vh-100 mainlogin' >
        <div className='vh-100  d-flex justify-content-center p-5 align-items-center '>
            <Form className='w-25 form' onSubmit={submit} >
            <div className='d-flex justify-content-center'>
                <h2  className='mb-4 text-dark' >Login</h2>
                </div>
            <Row  >
                <Col >
                <Form.Control placeholder='Email' name="email" value={formdata.email} onChange={changevalue} required/>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col >
              
                <Form.Control placeholder='Password' name="password" type="password" value={formdata.password} onChange={changevalue} required/>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col >
              
                <Form.Control  type="submit" className='w-100 bg-danger text-light'/>
                </Col>
            </Row>
            <div>
            <p className='pt-2 text-end text-dark'>Don't have an account?<Link  to="/signup"  className='text-decoration-none text-dark'> Signup</Link></p>
            </div>
            </Form>
        </div>
    </div>
   )
}