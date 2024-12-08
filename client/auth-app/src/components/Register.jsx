import React, { useState } from 'react'
import './mix.css'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
     const[passShow,setPassShow]=useState(false);
     const[cpassShow,setCPassShow]=useState(false);
     const[userData,setUserData] =useState({
        name:"",
        email:"",
        password:"",
        cpassword:""

     });
  
const handleSubmit =(e)=>{
    const {name,value}=e.target;
    setUserData((prev)=>({
    
        
         ...prev,[name]:value
        }))
    
}
const addUser =async(e)=>{
    e.preventDefault();
    const{name,email,password,cpassword}=userData;
    if (name === '') {
        toast.info('Name is Required..', {
            position: 'top-center',
        });
        return; 
    }
    else if (email === '') {
        toast.info('Email is Required..', {
            position: 'top-center',
        });
        return; 
    }
    else if (!email.includes('@')) {
        toast.error('Enter valid email..', {
            position: 'top-center',
        });
        return; 
    }
    else if (password === '') {
        toast.info('Password is Required..', {
            position: 'top-center',
        });
        return; 
    }
    else if (password.length<6) {
        toast.error('Required length more than 6', {
            position: 'top-center',
        });
        return; 
    }
   else  if (cpassword === '') {
        toast.info('confirm password is Required..', {
            position: 'top-center',
        });
        return; 
    }
    else if (password !== cpassword) {
        toast.error('Confirm Password not matched', {
            position: 'top-center',
        });
        return; 
    }
    else {
       
        const data = await fetch("http://localhost:3000/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password,cpassword})
        })
        const res = await data.json();
        console.log(res)
    }
    setUserData({...userData,name:"",email:"",password:"",cpassword:""})
}
  return (
   <>
    <section>
        <div className="form_data">
            <div className="form_heading">
              <h1>Sign Up</h1>
              <p>we are glad that ypu wiil be using Project Cloude to manage your tasks! We hope that you will get like it.</p>  
              <form  >
                <div className="form_input">
                    <label htmlFor="name">Name</label>
                <input value={userData.name} onChange={handleSubmit} type="text" id='name' name='name' placeholder='Enter Your Name'/>
                </div>
                <div className="form_input">
                    <label htmlFor="email">Email</label>
                <input value={userData.email} onChange={handleSubmit} type="email" id='email' name='email' placeholder='Enter Your email Address'/>
                </div>
                <div className="form_input">
                    <label htmlFor="password">Password</label>
                    <div className="two">
                <input value={userData.password} onChange={handleSubmit} type={passShow?'password':'text'} id='password' name='password' placeholder='Enter Your Password'/>
                <div onClick={()=>setPassShow((prev)=>!prev)} className="showpass">
                    {passShow?'hide':'show'}
                </div>
             </div>
                </div>
                <div className="form_input">
                    <label htmlFor="password">Confirm-Password</label>
                    <div className="two">
                <input value={userData.cpassword} onChange={handleSubmit} type={passShow?'password':'text'} id='cpassword' name='cpassword' placeholder='Enter Your Confirm-Password'/>
                <div onClick={()=>setCPassShow((prev)=>!prev)} className="showpass">
                    {cpassShow?'hide':'show'}
                </div>
             </div>
                </div>
                <button onClick={addUser} type='button' className="btn">Sign Up</button>
               <ToastContainer/>
                <p>Already have account? <NavLink to='/'>Log In</NavLink></p>
              </form>
            </div>
        </div>
      
    </section>
   </>
  )
}

export default Register
