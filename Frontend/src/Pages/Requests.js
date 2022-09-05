import axios from "axios";

const getMe = ()=>{
    
    const userData = await axios.get('http://localhost:5000/me')
}