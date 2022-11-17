import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Teacher from './GET/Teacher';
import App from './App';
import Header from './components/Header';
import Courses from './GET/Courses';
import Course from './GET/Course';
import Grades from './GET/Grades';
import Teachers from './GET/Teachers';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RouteSwitch = () => {
  const [admin, setAdmin] = useState();

  const getUser = async () => {
    const res = await axios.get(`${process.env.API_URL}/user`);
    const User = res.data;
    if (User) setAdmin(User);
  };

  const userState = () => {
    getUser();
  };

  const logout = () => {
    setAdmin(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Header userState={logout} admin={admin} />
        <Routes>
          <Route
            path="/"
            element={<App userState={userState} admin={admin} />}
          />

          <Route path="/courses" element={<Courses admin={admin} />} />
          <Route path="/courses/:id" element={<Course admin={admin} />} />

          <Route path="/teachers" element={<Teachers admin={admin} />} />
          <Route path="/teachers/:id" element={<Teacher admin={admin} />} />

          <Route path="/teachers/:id/grades" element={<Grades />} />
          <Route path="*" element={<Navigate to={'/'} />} />

          {/* <Route
            path="/courses/:id/newassignment"
            element={<NewAssignments />}
          />
          <Route
            path="/teachers/:id/assignment/:id"
            element={<AssignmentStudent />}
          />
          <Route path="/newcourse" element={<NewCourse />} /> */}

          {/* <Route path="/teachers/:id/assignment" element={<Assignments />} />
          
         
          <Route path="/sign-in" element={<NewTeacher />} />
          <Route path="/courses/:id/newstudent" element={<NewStudent />} />
          <Route path="/log-in" element={<Sign />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteSwitch;
