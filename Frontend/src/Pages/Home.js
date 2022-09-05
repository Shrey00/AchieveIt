import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectUserLoginState} from '../features/users/authSlice';
const Home = () => {
    const {user} = useSelector(selectUserLoginState);
    return (
        <div className=' text-center bg-[#F6FBF4] w-[100%] h-[88%] absolute'>
            <div className='text-[2rem] mt-12 text-green-400 font-bold'>
                <h1>Welcome to AchieveIt</h1>
            </div>
            <div className=' px-48 mt-8'>
                <p >We help you set goals and create todo lists for you so that you can have the day that you want, be productive, and achieve great things in life.</p>
            </div>
            <div className='px-48 mt-2'>
                <p>Now go ahead and start using this app and start setting goals and getting things done</p>
            </div>
            <div  className='px-48 mt-2'>
                <p>To start using this app Register or Sign in if you already have an account</p>
            </div>
        </div>
    )
}

export default Home