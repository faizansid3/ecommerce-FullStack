import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate= useNavigate();

    const handleSignup= async (e)=>{
        e.preventDefault();
        console.log("Signup clicked!");
        console.log(name,email,password);
        if(!name || !email || !password){
            alert("Please fill all the fields");
            return
        }
        try{
            const url= 'http://localhost:8000/auth/signup'
            const response= await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Signup failed");
                return;
            }
            const data= await response.json();
            const {success}=data
            if(success){
                setTimeout(()=>{
                    navigate('/login');
                },1000)
            }
            console.log({data})
        }
        catch(err){
            console.log("Signup error", err);
        }
    }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
    <div className="w-[40%] p-3.5 rounded-lg shadow-lg">
      <h1 className ="text-5xl pb-[30px]">Signup</h1> 
      <form className="" onSubmit={handleSignup}>
        <div>
            <label className="" htmlFor="name">Name</label>
            <input 
                className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=> setName(e.target.value)}
                type="text"
                name="name"
                autoFocus
                placeholder="Enter your Name" />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input 
                className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=> setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Enter your Email" />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input 
                className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=> setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter your Password" />
        </div>
        <div className="flex flex-col items-center">
            <button
                type="submit"
                className="cursor-pointer text-red-800 border px-6 py-2 rounded-md"
            >
            Signup
            </button>
            <span>Already have an account?
                <Link className="text-blue-800" to='/login'>Login</Link>
            </span>
        </div>
      </form>
    <ToastContainer/>
    </div>
    </div>
  )
}

export default Signup
