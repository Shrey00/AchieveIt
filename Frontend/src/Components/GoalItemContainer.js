
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { doneTodoFromDoing, reqDoneTodoFromDoing } from '../features/userData/userSlice';
import { selectUserLoginState } from '../features/users/authSlice';
const GoalItemContainer = ({ text, check, note, index }) => {
    const [checkBox, setCheckBox] = useState(check);
    const { user } = useSelector(selectUserLoginState);
    const dispatch = useDispatch();

    return (
        <div className="bg-[#F6FBF4] text-black flex justify-between rounded-md m-1 p-1 text-left">
            <p className="inline">{text}</p>
            <div>
                <input className='mt-[-5px] ml-1 ' type='checkbox' value={checkBox} checked={check}
                    onChange={() => {
                        setCheckBox((prev) => !prev);
                    }
                    } />
            </div>
        </div>
    )
}

export default GoalItemContainer;