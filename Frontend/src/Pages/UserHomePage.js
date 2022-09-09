import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLoginState, logout } from '../features/users/authSlice';
import { reset, getUserData, selectUserData } from '../features/userData/userSlice';
import SmallButton from '../Components/SmallButton';
import { FaRegEdit } from 'react-icons/fa'
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
// const getUserData = async () => {
//     const response = await axios.get('http://localhost:5000/me', { headers: { Authorization: `Bearer ${user.token}` } })
//     return response.data;
// }
const UserHomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user } = useSelector(selectUserLoginState);
    console.log(user);
    useEffect(() => {
        dispatch(getUserData(user));
    }, [dispatch,user]);

    const { email, firstName, lastName } = useSelector(selectUserData);
    const [changeEmail, setEmail] = useState();
    const [change, setChange] = useState(false);
    return (
        <div className='bg-[#F6FBF4] w-[100%] absolute top-[3.9rem] left-0 right-0 bottom-0 overflow-hidden'>
            <div className='text-[2rem] mx-4 text-green-400 font-bold'>
                <h1>Welcome {firstName}</h1>
            </div>
            <div className='mx-4 mt-4 w-[100vw] h-96 '>
                <table className='border-2 border-green-400 border-collapse'>
                    <tbody>
                        <tr>
                            <td className="py-4 px-16 ">First Name</td>
                            <td className="py-4 px-16 ">{firstName}</td>
                        </tr>
                        <tr className='border-2 border-green-400'>
                            <td className="py-4 px-16 ">Last Name</td>
                            <td className="py-4 px-16 ">{lastName}</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-16 ">E-mail</td>
                            {

                                change ?
                                    <td>
                                        <div className='mt-4 px-[0.35rem]'>
                                            <input
                                                className='focus:outline-none focus:border-2 focus:border-green-400'
                                                type='email'
                                                placeholder='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={changeEmail} />
                                            <SmallButton buttonText={'Ok'} />
                                            <SmallButton buttonText={'Cancel'} handleClick={() => setChange(false)} />
                                        </div>
                                    </td>
                                    : <td className="py-4 px-16 ">{email}</td>
                            }

                            <td><button onClick={() => setChange(true)}><FaRegEdit /></button></td>
                        </tr>
                    </tbody>
                </table>
                <Button buttonText={'Logout'} handleClick={() => { dispatch(logout()); dispatch(reset()); navigate('/') }} />
            </div>
        </div>
    )
}

export default UserHomePage