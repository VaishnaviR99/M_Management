
import {log,signup,logout}from "./type"
var token = JSON.parse(localStorage.getItem("trackertoken"));

const initialstate={
    login:!!token,
    issignup:false
   
}

export default function reducer(state=initialstate,action){
switch(action.type){
    case log:
        return{
            ...state,login:true
        }
       
    case logout:return{
                ...state,login:false
            }
  default:
        return state
}
}