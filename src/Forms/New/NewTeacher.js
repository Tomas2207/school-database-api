import { useState } from 'react';

const NewTeacher = ({ getInfo }) => {
  const initialValues = { name: '', lastname: '' };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let databody = {
      name: formValues.name,
      lastname: formValues.lastname,
    };

    fetch(`${process.env.REACT_APP_API_URL}/teacher`, {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getInfo();
      });
  };

  return (
    <div className="sub-container">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          autoComplete="off"
          name="name"
          id=""
          value={formValues.name}
          onChange={handleChange}
        />
        <label htmlFor="lastname">Apellido:</label>
        <input
          type="text"
          autoComplete="off"
          name="lastname"
          id=""
          value={formValues.lastname}
          onChange={handleChange}
        />
        <button>Crear</button>
      </form>
    </div>
  );
};

export default NewTeacher;
