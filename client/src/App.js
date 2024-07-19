// App.js

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import AdminRegisterForm from "./Components/AdminRegister";
import RegisterForm from "./Components/RegisterForm";
import Home from "./Components/Home";
import AdminDashboard from "./Components/AdminDashboard";
import UsersList from "./Components/UsersList";
import CapstoneProjectInfo from "./Components/CapstoneProjectInfo";
import MyProfile from "./Components/MyProfile";
import Questions from "./Components/Questions";
import AnswerForm from "./Components/AnswerForm";
import Chatroom from "./Components/Chatroom";


function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginForm/>} />
        <Route path="/capstone-project-info" element={<CapstoneProjectInfo/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/questions" element={<Questions/>} />
        <Route path="/answer/:questionId" element={<AnswerForm />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/admin-register" element={<AdminRegisterForm/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/users-list" element={<UsersList/>} />
      </Routes>
    </>
  );
}

export default App;