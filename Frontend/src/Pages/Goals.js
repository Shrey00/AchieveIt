import ItemContainer from "../Components/ItemContainer";
import { useState } from 'react';
import ItemStringContainer from "../Components/ItemStringContainer";
import { useSelector, useDispatch } from 'react-redux';
import { selectUserTodo, selectUserDone, selectUserDoing, addTodo, reqAddTodo, getUserData, selectUserGoals } from "../features/userData/userSlice";
import { selectUserLoginState } from "../features/users/authSlice";
import { FaPlus } from 'react-icons/fa';
import { useEffect } from "react";
const Goals = () => {
    const dispatch = useDispatch();
    const {isSuccess,user} = useSelector(selectUserLoginState);
    useEffect(() => {
        dispatch(getUserData(user));
    }, []);
    const goalsData = useSelector(selectUserGoals);
    // const {user} = useSelector(selectUserLoginState);
    
    const [addTodoText, setAddTodoText] = useState('');     
    return (
        <div className="flex justify-center bg-[#F6FBF4] h-[42.9rem]">
            <div className="flex border-2 border-green-300 justify-center w-[70rem] h-[35rem] rounded-lg text-green-100 bg-green-300 mt-14   ">
                {
                        
                }
            </div>
        </div>
    )
}

export default Goals;