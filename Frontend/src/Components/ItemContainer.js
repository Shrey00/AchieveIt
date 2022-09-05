import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';
import { selectUserTodo, selectUserDoing, selectUserDone, TransferDoneToDoing, TransferTodoToDoing, doneTodoFromDoing, 
    doneTodoFromTodo, checkTodo, undoDoneTodo, removeItem, reqTransferTodoToDoing, reqDoneTodoFromTodo, moveToTodo, reqRemoveTodo, reqRemoveDone, reqTransferDoneToDoing } from "../features/userData/userSlice";

import { selectUserLoginState } from "../features/users/authSlice";
import { useDispatch, useSelector } from "react-redux";
const ItemContainer = ({ text, check, index, id }) => {
    const [open, setOpen] = useState(false);
    const {user} = useSelector(selectUserLoginState);
    // console.log(check)
    const [checkBox, setCheckBox] = useState(check);
    const dispatch = useDispatch();
    const transerToDoing = () => {
        if (id === 1) {
            dispatch(TransferDoneToDoing(index));
            dispatch(reqTransferDoneToDoing({user,index}));
        }
        if (id === 0) {
            dispatch(TransferTodoToDoing(index));
            dispatch(reqTransferTodoToDoing({user,index}));
        }
    }
    if (checkBox) {
        // if(id===1)
        // dispatch(doneTodoFromDoing(index));
        if (id === 0) {
            dispatch(checkTodo({ index, check: checkBox }))
            setCheckBox((prev) => !prev);
            dispatch(doneTodoFromTodo(index));
            dispatch(reqDoneTodoFromTodo({user,index}))
        }
    }
    return (
        <div className="bg-[#F6FBF4] text-black flex justify-between rounded-md m-1 p-1 text-left ">
            <div className="overflow-clip w-[90%]">
                <p className = "break-words">{text}</p>
            </div>
            <div className="w-[10%] ml-1">
                <input className='mt-[-5px]' type='checkbox' value={checkBox} checked={check} onChange={() => { setCheckBox((prev) => !prev) }} />
                <div className='inline' onMouseLeave={() => setOpen(false)}>
                    <button onClick={() => setOpen(true)}><AiOutlineMenu /></button>
                    {
                        open ?
                            <div className="bg-green-100 absolute mt-[-2px] ">
                                <button className="text-xs bg-green-100 p-[6px] block"
                                 onClick={()=>{
                                    dispatch(removeItem({id,index}));
                                    if(id === 0)
                                        dispatch(reqRemoveTodo({user,index}))
                                    if(id === 1)
                                        dispatch(reqRemoveDone({user,index}))
                                    }} >Delete</button>

                                <button className="text-xs bg-green-100 p-[6px] block" onClick={transerToDoing} >Add to Doing</button>
                                {
                                    id === 1 ?
                                        <button className="text-xs bg-green-100 p-[6px] block" 
                                        onClick={() => {
                                            dispatch(undoDoneTodo(index));
                                            dispatch(moveToTodo({user,index}));
                                        }
                                            } >Move back to Todo</button>
                                        : null
                                }

                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemContainer;