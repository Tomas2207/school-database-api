import { useState } from 'react';

const NewGrade = ({ props, handleState }) => {
  const { id } = props;

  const initialValues = { name: '', grade: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log('values', formValues);
  };

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let databody = {
      name: formValues.name,
      grade: formValues.grade,
    };

    fetch(`${process.env.REACT_APP_API_URL}/grades/${id}/grade`, {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    handleState();
  };

  return (
    <div className="main-container">
      {!showForm ? (
        <button onClick={handleShowForm}>Nueva Nota:</button>
      ) : (
        <button onClick={handleShowForm}>X</button>
      )}

      {showForm && (
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={formValues.name}
          />
          <label htmlFor="grade">Nota:</label>
          <input
            type="text"
            autoComplete="off"
            name="grade"
            value={formValues.grade}
            onChange={handleChange}
          />
          <button>Crear</button>
        </form>
      )}
    </div>
  );
};

export default NewGrade;
