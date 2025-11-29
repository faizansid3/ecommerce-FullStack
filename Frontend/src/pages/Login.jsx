import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from "../redux/slices/authSlice";


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Login clicked!");

  console.log("Step 1: Values:", email, password);

  if (!email || !password) {
    console.log("Step 2: Missing inputs");
    alert("Please fill all fields");
    return;
  }

  try {
    console.log("Step 3: Sending fetch request...");

    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log("Step 4: Response received:", response);

    const data = await response.json();
    console.log("Step 5: Parsed data:", data);

    const { success, jwtToken, name, email: userEmail, _id } = data;

    if (!response.ok) {
      console.log("Step 6: Response NOT OK");
      alert(data.message || "Login failed");
      return;
    }

    if (success) {
      console.log("Step 7: Dispatching login");
      dispatch(loginSuccess({ name, email: userEmail, _id, token: jwtToken }));

      console.log("Step 8: Navigating...");
      navigate('/home');
    }

  } catch (err) {
    console.log("Step 9: Error caught", err);
  }
}


  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-[40%] p-3.5 rounded-lg shadow-lg">
        <h1 className="text-5xl pb-[30px]">Login</h1>
        <form >
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
            <label htmlFor="password">Password</label>
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
              onClick={handleLogin}
              className="cursor-pointer text-red-800 border px-6 py-2 rounded-md"
            >
              Login
            </button>



            <span>
              Don't have an account?
              <Link className="text-blue-800" to='/signup'> Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
