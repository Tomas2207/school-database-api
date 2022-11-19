import { useState } from 'react';

const NewCourse = ({ handleState, admin_id }) => {
  const initialValues = { level: '', year: '', division: '' };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let databody = {
      level: formValues.level,
      year: formValues.year,
      division: formValues.division,
      schoolYear: new Date().getFullYear(),
      admin: admin_id,
    };

    fetch(`${process.env.REACT_APP_API_URL}/course`, {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handleState();
      });
  };

  return (
    <div className="sub-container">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="level">Nivel:</label>
        <select
          name="level"
          id=""
          value={formValues.level}
          onChange={handleChange}
        >
          <option>--Nivel--</option>
          <option value="SECUNDARIA">SECUNDARIA</option>
          <option value="PRIMARIA">PRIMARIA</option>
        </select>
        <label htmlFor="year">Año:</label>
        <input
          type="text"
          autoComplete="off"
          name="year"
          value={formValues.year}
          onChange={handleChange}
        />
        <label htmlFor="division">Division:</label>
        <input
          type="text"
          autoComplete="off"
          name="division"
          value={formValues.division}
          onChange={handleChange}
        />
        <button>Crear</button>
      </form>
    </div>
  );
};

export default NewCourse;
