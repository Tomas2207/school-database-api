import { useEffect, useState } from 'react';

const Register = () => {
  const initialValues = { username: '', password: '', name: '', lastname: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState();
  const [resMessage, setResMessage] = useState();
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Nombre es Requerido';
    }
    if (!values.lastname) {
      errors.lastname = 'Apellido es Requerido';
    }
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
    if (values.password === values.username) {
      errors.password = 'La contraseña no puede ser igual al usuario';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
  };

  const makeRequest = () => {
    if (Object.keys(formErrors).length === 0) {
      let databody = {
        username: formValues.username,
        password: formValues.password,
        name: formValues.name,
        lastname: formValues.lastname,
      };

      fetch(`${process.env.REACT_APP_API_URL}/register`, {
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
          setSubmit(false);
          setResMessage(data.message);
          setFormValues(initialValues);
        });
    } else {
      console.log('formerrors', formErrors);
      setSubmit(false);
    }
  };

  useEffect(() => {
    if (submit) makeRequest();
  }, [submit]);

  return (
    <div>
      <h2>Registrarse</h2>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          autoComplete="off"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        {formErrors && <div className="error">{formErrors.name}</div>}
        <label htmlFor="lastname">Apellido:</label>
        <input
          type="text"
          autoComplete="off"
          name="lastname"
          value={formValues.lastname}
          onChange={handleChange}
        />
        {formErrors && <div className="error">{formErrors.lastname}</div>}
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          autoComplete="off"
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        {resMessage && <div className="error">{resMessage}</div>}
        {formErrors && <div className="error">{formErrors.username}</div>}
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          autoComplete="off"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {formErrors && <div className="error">{formErrors.password}</div>}
        {submit ? <div>Loading...</div> : <button>Crear</button>}
      </form>
    </div>
  );
};

export default Register;
