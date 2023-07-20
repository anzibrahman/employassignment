import React, {useState} from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


 
      const Admin = () => {
  
  const[userN,setuserN]=useState(sessionStorage.getItem("userN"));
  const[userid,setId]=useState(sessionStorage.getItem("admId") );
  const[userToken,setToken]=useState(sessionStorage.getItem("admToken"));

  const datas={
    "id": userid,
    "token":userToken,
    
  }

  const navigate=useNavigate();
  const logout=()=>{
       navigate('/');
  }

  const[fmdata,setfmdata]=useState();

  const inputholder=(e)=>{
    setfmdata({...fmdata,[e.target.name]:e.target.value})
    console.log(fmdata);
  }

  const nwdata={
    "id": userid,
    "token":userToken,
    "data":fmdata
  }

  const[data,setData]=useState([])
 
  const explore=()=>{
    axios.post('http://localhost:5001/api/viewallemp',datas)
    .then(response=>{
        console.log(datas);
        if(response.data.message=="admin"){
        setData(response.data.newitem)
        console.log(response.data);
      }
       else{
        console.log("unutherd rerqust");
        alert(response.data.message);
       }
    } )
  }
   const addemp=()=>{
     axios.post('http://localhost:5001/api/createmply',nwdata)
     .then(response =>{
      if (response.data.message==(" saved succesfully ")) {
        alert(response.data.message);
        window.location.reload(false);
        
      } else {
        alert("un-authorised request");
      }
     
      })
    }
    const delet=(iD)=>{
        console.log(iD);
        
        axios.post('http://localhost:5001/api/delete/'+iD,datas)
        .then(response=>{
          window.location.reload(false);
          console.log(response.data)
          alert(response.data.message);
        })
    }

      const updatte=(val)=>{
        console.log(val);
        axios.post('http://localhost:5001/api/update/'+val._id,fmdata)
        .then(response=>{
          if (response.data.message==("updated")) {
            window.location.reload(false);
            alert(response.data.message);
            
          } else {
            alert("failed to update");
          }
         
        })
       
      }
   
    return (
    <div>
          <Header/>
          <div className='App-bg'>
                <div className="container bg-">
                    {/* 1st clm  */}
                     <div className="row">
                      
                      <div className="col-8">
                        <div className="row">
                        {data.map((value,i)=>{
                          return(<div className="col-sm-4 mt-5">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">Id: {value._id}</h5>
                              <h6 className="card-title">Emp Name:{value.username}</h6>
                              <h6 className="card-title">Designation:{value.designation}</h6>
                              <h6 className="card-title">Email:{value.email}</h6>
                              <h6 className="card-title">Password:{value.password}</h6>
                              <button className='btn btn-dark btn-me-md-2' onClick={()=>delet(value._id)} >Delete</button> <span>  </span> <span>  </span>
                              <button className='btn btn-dark btn-me-md-2'  onClick={()=>updatte(value)} >Update</button> <span className='ove'></span>
                              
                            </div>
                          </div>
                        </div>)
                        })}
  
                     </div>
                        </div> 
                     
                     {/* 2nd clm */}
                     
                        <div className="col-4 App-try">
                            <div className="row mt-5 pt-5 ">
                               <h3 >HELLOO ADMIN ! ! !</h3><br/><br/>
                               <h5>Welcome to the Employee App </h5>
                            </div>
                            <div className="row mt-5">
                                <div className=' col'>
                                   <button className='btn btn-dark btn-me-md-2 App-btn'onClick={explore} >Employees</button>
                                
                                   <br/> <br/> 
                                   <button className='btn btn-dark btn-me-md-2 App-btn'onClick={logout} >Log Out</button>
                                
                                  <br/> <br/> 
                                   {/* <div className='col'>  */}
                                  <button className='btn btn-dark btn-me-md-2 App-btn' onClick={addemp} >Add Employees</button>
                                  <br/> <br/> 
                                </div>
                               
                                <div className='row '>
                                 
                                    <h5>Employee Form</h5>
                                    <h6>fill the form for UPDATE / CREATE employee</h6>
                                    <br/><br/>
                                    <label htmlFor="form-control" className="col-sm-2 col-form-label"  >EmpName</label>
                                    <input type="text"  name="username" onChange={inputholder} className='form-control' /><br/>
                                    <label htmlFor="form-control" className="col-sm-2 col-form-label"  >Password</label>
                                    <input type="text" name="password" onChange={inputholder} className='form-control' /><br/>
                                    <label htmlFor="form-control" className="col-sm-2 col-form-label"  >Email</label>
                                    <input type="text" name="email" onChange={inputholder} className='form-control' /><br/>
                                    <label htmlFor="form-control"  className="col-sm-2 col-form-label"  >Designation</label>
                                    <input type="text" name="designation" onChange={inputholder} className='form-control' /><br/>
                                  <br/>
                                  {/* <button className='btn btn-dark btn-me-md-2 App-btn' onClick={addemp} >Add Employees</button> */}
                                </div>
                             </div>
                         </div>
                    </div>                
                 </div>
         </div>     
     
      </div>
     
       
  )
}

export default Admin