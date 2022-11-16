import axios from 'axios';
import { useEffect, useState } from 'react';
import { resolvePath, useParams } from 'react-router-dom';

const NewCourse = ({ handleState }) => {
  const { id } = useParams();

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
    };

    fetch('/course', {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          id=""
          value={formValues.year}
          onChange={handleChange}
        />
        <label htmlFor="division">Division:</label>
        <input
          type="text"
          autoComplete="off"
          name="division"
          id=""
          value={formValues.division}
          onChange={handleChange}
        />
        <button>Crear</button>
      </form>
    </div>
  );
};

export default NewCourse;
