import { useState } from 'react';

const EditTeacher = ({ getInfo, teacher, handleEditForm }) => {
  const initialValues = { name: teacher.name, lastname: teacher.lastname };
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

    fetch(`${process.env.REACT_APP_API_URL}/teacher/${teacher._id}`, {
      method: 'PATCH',
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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          autoComplete="off"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <label htmlFor="lastname">Apellido:</label>
        <input
          type="text"
          autoComplete="off"
          name="lastname"
          value={formValues.lastname}
          onChange={handleChange}
        />
        <button>Actualizar</button>
      </form>
    </div>
  );
};

export default EditTeacher;
