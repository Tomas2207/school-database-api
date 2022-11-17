import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState();
  const [resMessage, setResMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Usuario es Requerido';
    } else if (values.username.length < 6) {
      errors.username = 'El usuario debe tener al menos 6 caracteres';
    }
    if (!values.password) {
      errors.password = 'Contraseña es Requerida';
    } else if (values.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (Object.keys(formErrors).length === 0) {
      let databody = {
        username: formValues.username,
        password: formValues.password,
      };

      fetch(`${process.env.API_URL}/register`, {
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
          setResMessage(data.message);
        });
    } else {
      console.log(formErrors);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>

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
        {formErrors && <div className="error">{formErrors.username}</div>}
        <label htmlFor="password">Contraseña:</label>
        <input
          type="text"
          autoComplete="off"
          name="password"
          id=""
          value={formValues.password}
          onChange={handleChange}
        />
        {formErrors && <div className="error">{formErrors.password}</div>}
        <button>Crear</button>
      </form>
    </div>
  );
};

export default Register;
