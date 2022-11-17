import { useEffect, useState } from 'react';

const EditTeacher = ({ getInfo, course, handleEditForm }) => {
  const initialValues = {
    level: course.level,
    year: course.year,
    division: course.division,
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let databody = {
      level: formValues.level,
      year: formValues.year,
      division: formValues.division,
    };

    fetch(`${process.env.REACT_APP_API_URL}/course/${course._id}`, {
      method: 'PATCH',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getInfo();
        handleEditForm();
      });
  };

  return (
    <div className="sub-container">
      <button onClick={handleEditForm}>X</button>
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
        <button>Actualizar</button>
      </form>
    </div>
  );
};

export default EditTeacher;
