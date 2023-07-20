import React,{useEffect,useState} from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
 
    const navigate= useNavigate()
    //  useEffect(()=>{
    //   sharedata()
    // },[])
    const [input,setInputs]=useState({});

     const inputhold=(e)=>{
        setStatus(false);
        setInputs({...input,[e.target.name]:e.target.value})
      console.log(input);
     }
     const [status,setStatus]=useState(true)
     
     const sharedata=()=>{
       
        axios.post('http://localhost:5001/api/login',input)
        .then(response=>{
            console.log(response);
          if (response.data.message==("user")) {
             
            const usr=response.data.data.username;
            const token=response.data.token;
            const userId=response.data.data._id;
            console.log(token);
            console.log(response.data);
            sessionStorage.setItem("userToken",token);
            sessionStorage.setItem("userId",userId);
            sessionStorage.setItem("userN",usr);
            navigate('/viewallemp')

          } else if(response.data.message==("admin")) {
            let token=response.data.token;
            let id=response.data.data._id;
            let userName=response.data.username;
            console.log(token);
            sessionStorage.setItem("admToken",token);
            sessionStorage.setItem("admId",id)
            navigate('/admin')
            
          }
           
           else{
            alert(response.data.message)
            console.log(alert);
           } 
         
        })
     }

  return (
    <div className="container ">
        <Header/>
        <div className="container ">
    
          <br/><br/>
        
        <div className="App-header">
    <div className="row">
        <div className="col col-12 col-sm-12 col-md-12">
          <div className="row g-3">
          <div className="col-3">

          <h1 className=''> LOGIN </h1><br/>
          </div><br/>
          </div>
            
          
            <div className="row g-3 h-100">
                <div className="col-12 ">

                    <label htmlFor="" className="form-label">  Username </label>
                    <input type="text" className="form-control" name="username" onChange={inputhold} />
                    <br/>
                {/* </div>
                <div className="col-8"> */}
                <label htmlFor="" className="form-label">  Password </label>
                    <input type="password" name="password" id="" className="form-control"  onChange={inputhold}/>
                {/* </div>
                <div className="col-8"> */}
                <br/> <br/>
                    <button className="btn btn-dark mb-5 mr-5"  onClick={sharedata}> LOGIN </button>
                </div>
                </div>
                <div className="col-4 " >
                     <h1 className='' ></h1>
                </div>
            </div>
            


        </div>
    </div>
</div>

  
    

    
    </div>
  )
}

export default User