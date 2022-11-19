import { useState } from 'react';

const NewStudent = ({ props }) => {
  const { id } = props;

  const initialValues = { name: '', lastname: '', course: id };
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
      course: formValues.course,
    };

    fetch(`${process.env.REACT_APP_API_URL}/student`, {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    props.stateHandler();
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
        <button>Crear</button>
      </form>
    </div>
  );
};

export default NewStudent;
