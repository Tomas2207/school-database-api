import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Register from './Forms/Register';
import LogIn from './Forms/LogIn';

const App = ({ admin, userState }) => {
  const [teachers, setTeacher] = useState();
  const [user, setUser] = useState(admin);
  const [check, setCheck] = useState(false);

  const handleCheck = (e) => {
    setCheck((current) => !current);
  };

  useEffect(() => {
    if (admin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/teacher/admin/${admin._id}`)
        .then((response) => {
          console.log(response.data);
          setTeacher(response.data);
        });
    }
  }, []);

  useEffect(() => {
    setUser(admin);
    setCheck(false);
  }, [admin]);

  if (user)
    return (
      <div className="switch-container">
        <h2>Bienvenido/a {user.name} </h2>

        <div className="profile">
          <img src="/img/user.png" alt="user" />
        </div>
        <Link to="/courses">
          <button>Ver Cursos</button>
        </Link>
        <Link to="/teachers">
          <button>Ver Profesores</button>
        </Link>
      </div>
    );

  return (
    <div className="switch-container">
      <span className="switch">
        <input
          type="checkbox"
          id="switcher"
          value={check}
          onChange={handleCheck}
        />
        <label htmlFor="switcher"></label>
      </span>
      {!check && <Register />}
      {check && <LogIn userState={userState} />}
    </div>
  );
};

export default App;
