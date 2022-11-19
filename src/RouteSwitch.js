import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Teacher from './GET/Teacher';
import App from './App';
import Header from './components/Header';
import Courses from './GET/Courses';
import Course from './GET/Course';
import Grades from './GET/Grades';
import Teachers from './GET/Teachers';
import { useEffect, useState } from 'react';

const RouteSwitch = () => {
  const [admin, setAdmin] = useState();

  const getUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const User = data;
        if (User) setAdmin(User);
      });
  };

  const userState = () => {
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    setAdmin(false);
  };

  useEffect(() => {
    console.log('render');
  }, [admin]);

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

          <Route
            path="/teachers/:id/grades"
            element={<Grades admin={admin} />}
          />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteSwitch;
