import React from 'react'
import logoText from '../assets/logo2.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserLoginState } from '../features/users/authSlice';
const Header = () => {
    const { user } = useSelector(selectUserLoginState);
    const navigate = useNavigate();
    return (
        <div className="bg-[#F6FBF4]  h-[3.9rem]">
            <div className='flex z-0'>
                <div className='w-[8rem]'>
                    <img src={logoText} alt='logo' />
                </div>
                {
                    user ?
                        <div >
                            <button className=' py-[1.2rem] px-[1rem] hover:bg-green-300'
                                onClick={() => navigate('/todo')}>My Todos</button>
                            <button className='py-[1.2rem] px-[1rem] hover:bg-green-300'
                                onClick = {()=>navigate('/goals')}>Goals</button>
                        </div>
                        :
                        <div>
                            <button className=' py-[1.2rem] px-[1rem] hover:bg-green-300'
                                onClick={() => navigate('/signup')}>Register</button>
                            <button className='py-[1.2rem] px-[1rem] hover:bg-green-300'
                                onClick={() => navigate('/signin')}>Sign In</button>
                        </div>

                }  
                 </div>
                {
                    user ?
                            <div className='Z-2 rounded-[50%] w-[40px] h-[40px] bg-green-800 absolute right-8 top-2 hover:cursor-pointer' onClick={()=>navigate('/welcome')}>
                        </div> : null
                }
    
         
        </div>
    )
}

export default Header