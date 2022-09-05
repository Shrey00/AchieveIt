import React from 'react';
import Header from './Components/Header';
import Login from './Pages/Login';
import Todo from './Pages/Todo';
import Goals from './Pages/Goals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserHomePage from './Pages/UserHomePage';
import Signup from './Pages/Signup';
const App = () => {
  // localStorage.setItem('user', '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmJhZDNhNzVhMWY3NTE4OWFiOGRiMSIsImlhdCI6MTY2MTA2NjA0OSwiZXhwIjoxNjYzNjU4MDQ5fQ.frm6ZeCWs9_Zy-AHr4Bsqh8RRm3nLKVZUrBRhPnarMM"}');
  return (
    <BrowserRouter>
      <main className='flex-col h-[100%] w-[100%]'>
        <div className='overflow-y-auto'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/welcome' element={<UserHomePage />} />
            <Route path='/todo' element={<Todo />} />
            <Route path = '/goals' element = {<Goals/>}/>
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </main>


    </BrowserRouter>

  )
}

export default App      