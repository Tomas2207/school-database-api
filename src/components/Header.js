import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ admin, userState }) => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(admin);

  const logOut = async () => {
    const res = await axios.get(`${process.env.API_URL}/log-out`);

    userState();
  };

  useEffect(() => {
    setUser(admin);
  }, [admin]);

  return (
    <div id="header">
      <nav>
        <Link to="/">
          <div>Inicio</div>
        </Link>
        {user && (
          <Link to="/teachers">
            <div>Profesores</div>
          </Link>
        )}
        {user && (
          <Link to="/courses">
            <div>Cursos</div>
          </Link>
        )}

        {user && <Link onClick={logOut}>Salir</Link>}
      </nav>
    </div>
  );
};

export default Header;
