import React, { useEffect, useState, } from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Viewallemp = () => {
  const[usr,setUsr]=useState(sessionStorage.getItem("userN"));
  // console.log(first)
  const[userid,setId]=useState(sessionStorage.getItem("userId") );
  const[userToken,setToken]=useState(sessionStorage.getItem("userToken"));
  const datas={
    "id": userid,
    "token":userToken,
    // "data":
  }
  const navigate=useNavigate();
  const logout=()=>{
       navigate('/');
  }
  const[data,setData]=useState([])

  const explor=()=>{
      axios.post('http://localhost:5001/api/viewemp',datas)
      
      .then(response=>{
        console.log(datas);
        if(response.data.message=="user"){
          setData(response.data.newitem)
          console.log(response.data);
        }
         else{
          console.log("unutherd rerqust");
          alert({message:"unautherised request"});
         }
      } )
        
     
  }
  // useEffect(()=>{
  //   explore()
  // },[])

return (
        <div>
            
        <Header/>
          <div className='App-try'>
                <div className="container bg-">
                {/* 1st clm  */}
                     <div className="row">
                        <div className="col-8">
                        <div className="row">
                        {data.map((value,i)=>{
                          return(<div className="col-sm-4 mt-5">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title"><h4>Employeee Name </h4>{value.username}</h5>
                              <h6 className="card-title">Designation:{value.designation}</h6>
                              <h6 className="card-title">Email:{value.email}</h6>
                              {/* <h6 className="card-title">Password {value.password}</h6> */}
                              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                          </div>
                        </div>)
                        })}
  
                     </div>
                        </div> 
                     
                     {/* 2nd clm */}
                        <div className="col-4">
                            <div className="row mt-5 pt-5 ">
                               <h3 >HELLOO  {usr} ! ! !</h3><br/><br/>
                               <h5>Welcome to the Employee App </h5>
                            </div>
                            <div className="row mt-5">
                                <div className='col'>
                                <button className='btn btn-dark btn-me-md-2'onClick={explor} >Explore</button>
                                </div> <br/> <br/> <br/>
                                <div className='col'>
                                <button className='btn btn-dark btn-me-md-2' onClick={logout} >Log Out</button>
                                </div>
                            </div>

                        </div>
                   </div>
              </div>
          </div>
      </div>   
    )
}


export default Viewallemp