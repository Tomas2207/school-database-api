import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ admin, userState }) => {
  const [user, setUser] = useState(admin);

  const logOut = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/log-out`, {
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
        console.log(data);
        userState();
      });
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
          <Link to="/courses">
            <div>Cursos</div>
          </Link>
        )}
        {user && (
          <Link to="/teachers">
            <div>Profesores</div>
          </Link>
        )}

        {user && <Link onClick={logOut}>Salir</Link>}
      </nav>
    </div>
  );
};

export default Header;
