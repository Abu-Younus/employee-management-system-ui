import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/employee/AddEmployee';
import Navbar from './components/Navbar';
import AllEmployee from './components/employee/AllEmployee';
import UpdateEmployee from './components/employee/UpdateEmployee';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<AllEmployee/>}/>
          <Route path='/' element={<AllEmployee/>}/>
          <Route path='/employee' element={<AllEmployee/>}/>
          <Route path='/employee/add' element={<AddEmployee/>}/>
          <Route path='/employee/edit/:id' element={<UpdateEmployee/>}/>
        </Routes>
      </BrowserRouter>      
    </>
  );
}

export default App;
