import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const LogIn = ({ userState }) => {
  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [resMessage, setResMessage] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let databody = {
      username: formValues.username,
      password: formValues.password,
    };

    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(databody),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResMessage(data);
        userState();
      });
  };

  return (
    <div>
      <h2>Entrar</h2>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          autoComplete="off"
          name="username"
          id=""
          value={formValues.username}
          onChange={handleChange}
        />
        {resMessage && <div className="error">{resMessage}</div>}
        <label htmlFor="password">Contraseña:</label>
        <input
          type="text"
          autoComplete="off"
          name="password"
          id=""
          value={formValues.password}
          onChange={handleChange}
        />
        <button>Entrar</button>
      </form>
    </div>
  );
};

export default LogIn;
