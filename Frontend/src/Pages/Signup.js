import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { signup, reset, selectUserLoginState, logout } from '../features/users/authSlice';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const dispatch = useDispatch();
    let { user } = useSelector(selectUserLoginState);
    dispatch(logout())
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    
    console.log('le' + localStorage.getItem('user') + 'state wala - ' + user.token);
    const navigate = useNavigate();


    if (user) {
        navigate('/welcome');
    }

    return (
        <div>
            <div className="h-[42.9rem] bg-[#F6FBF4] flex align-middle justify-center">
                <div className='h-[25rem] border-[1px] border-green-300 w-[30rem] rounded-md'>
                    <input
                        className="h-8 p-2 w-80 ml-20 mt-20 border-[2px] rounded-full focus:outline-none focus:border-green-300
                        "
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        onChange={(e) => handleChange(e)}
                        value={formData.firstName} />

                    <input
                        className="h-8 p-2 w-80 mt-6 ml-20 border-[2px] rounded-full focus:outline-none focus:border-green-300"
                        type='text'         
                        name='lastName'
                        placeholder='Last Name'
                        onChange={(e) => handleChange(e)}
                        value={formData.lastName} />

                    <input
                        className="h-8 p-2 w-80 mt-6 ml-20 border-[2px] rounded-full focus:outline-none focus:border-green-300
                        "
                        type='email '
                        name='email'
                        placeholder='E-mail'
                        onChange={(e) => handleChange(e)}
                        value={formData.email} />

                    <input
                        className="h-8 p-2 w-80 mt-6 ml-20 border-[2px] rounded-full focus:outline-none focus:border-green-300"
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={(e) => handleChange(e)}
                        value={formData.password} />

                    <div className='block ml-48'>
                        <Button
                            buttonText='Sign Up'
                            handleClick={() => {
                                dispatch(signup(formData));
                                dispatch(reset());
                            }} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup;