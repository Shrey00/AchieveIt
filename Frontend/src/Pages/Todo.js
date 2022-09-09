import ItemContainer from "../Components/ItemContainer";
import { useState } from 'react';
import ItemStringContainer from "../Components/ItemStringContainer";
import { useSelector, useDispatch } from 'react-redux';
import { selectUserTodo, selectUserDone, selectUserDoing, addTodo, reqAddTodo, getUserData } from "../features/userData/userSlice";
import { selectUserLoginState } from "../features/users/authSlice";
import { FaPlus } from 'react-icons/fa';
import { useEffect } from "react";
const Todo = () => {
    const dispatch = useDispatch();
    const {isSuccess,user} = useSelector(selectUserLoginState);
    useEffect(() => {
        dispatch(getUserData(user));
    }, []);
    const todoData = useSelector(selectUserTodo);
    const doneData = useSelector(selectUserDone);
    const doingData = useSelector(selectUserDoing);
    // const {user} = useSelector(selectUserLoginState);
    
    const [addTodoText, setAddTodoText] = useState('');     
    return (
        <div className="flex justify-center bg-[#F6FBF4] absolute top-[3.9rem] left-0 right-0 bottom-0">
            <div className="flex border-2 border-green-300 justify-center w-[70rem] h-[35rem] rounded-lg text-green-100 bg-green-300 mt-14   ">
                <div className="w-[33.33%] text-center border-red-100">
                    <div className="font-bold text-green-50 text-[1.2rem] ">Todo</div>
                    <div className="block flex-none h-[29rem] overflow-y-auto">
                        {
                            todoData?.map((todoItem, i) => {
                                // console.log(todoItem);
                                return <div key={i}>
                                    <ItemContainer text={todoItem.text} check={todoItem.check} index={i} id={0} />
                                </div>
                            })
                        }
                    </div>
                    <div className="ml-6 mt-4 text-center">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(addTodo({ text: addTodoText,deadline: null, check: false  }));
                            console.log(user.token);
                            dispatch(reqAddTodo({ user ,text: addTodoText,deadline: null, check: false }));
                        }
                        } className = 'flex' >
                            <input
                                className="rounded-lg bg-[#F6FBF4] w-[19rem] focus:outline-none text-black p-[6px] text-xs"
                                type='text'
                                placeholder="add Todo"
                                onChange={(e) => setAddTodoText(e.target.value)}
                                value={addTodoText} />
                            <button type='submit' className="bg-green-300 rounded-md p-[0.08rem]"
                            >
                                <FaPlus />
                            </button>
                        </form>
                    </div>
                </div>

                <div className=" w-[33.33%] text-center ">
                    <div className="font-bold text-green-50 text-[1.2rem]">Doing</div>
                    <div className="h-[31.5rem] overflow-y-auto">
                        {
                            doingData?.map((doingItem, i) => {
                                return <div key={i}>
                                    <ItemStringContainer text={doingItem.text} check={doingItem.check} index={i} />
                                </div>
                            })
                        }
                    </div>


                </div>

                <div className=" w-[33.33%] text-center">
                    <div className="font-bold text-green-50 text-[1.2rem]">Done</div>
                    <div className="h-[31.5rem] overflow-y-auto">
                        {
                            doneData?.map((doneItem, i) => {
                                return <div key={i}>
                                    <ItemContainer text={doneItem.text} check={doneItem.check} index={i} id={1} />
                                </div>
                            })
                        }
                    </div>


                </div>
            </div>


        </div>
    )
}

export default Todo