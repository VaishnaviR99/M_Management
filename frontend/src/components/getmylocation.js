import axios from "axios";
import { BiCurrentLocation } from 'react-icons/bi';
export default function Getmylocation({changelocation}){
   
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
     
      async function getcity(lat,lon){
        try{
        let res=await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        
       
      changelocation(res.data)
        }catch(e){
         alert(e)
        }
      }
      function success(pos) {
        const crd = pos.coords;
    getcity(crd.latitude,crd.longitude)
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      function check(){
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    return(
        <div>
 <BiCurrentLocation size="25px" color="blue" onClick={check} style={{cursor:"pointer"}}/>
        </div>
    )
}