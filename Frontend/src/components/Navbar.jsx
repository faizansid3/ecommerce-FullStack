import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const user= useSelector((state)=>state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ProfileUser= user.name

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/login")
  }
  return (
    <div>
      <nav className='flex  items-center justify-evenly shadow-md p-4 fixed w-full bg-white px-20'>
        <h2>ShopEasy</h2>
        <ul className='flex gap-25 items-center'> 
            <li className='style-none'>Home</li>
            <li className='cursor-pointer ' onClick={()=>navigate('/signup')}>Signup</li>
            <li className='cursor-pointer ' onClick={()=>navigate('/login')}>Login</li>
            <li className='cursor-pointer ' onClick={()=>navigate('/cart')}>Cart</li>
            <li className='cursor-pointer' onClick={()=>navigate('/profile')}>{ProfileUser}</li>
            <li>{user ? (<>
                <button className='cursor-pointer' onClick={handleLogout}>Logout</button>
            </>):
            (<>
                <span>Guest</span>
            </>)}</li>
        </ul>
      </nav>
      <div className='h-16'></div>
    </div>
  )
}

export default Navbar
