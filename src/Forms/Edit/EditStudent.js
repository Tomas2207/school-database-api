import axios from 'axios';
import { useEffect, useState } from 'react';

const EditStudent = ({ getInfo, student, handleEditForm }) => {
  const initialValues = {
    name: student.name,
    lastname: student.lastname,
    course: student.course,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [courses, setCourse] = useState();
  const [date, setDate] = useState(new Date().getFullYear());
  const [courseId, setCourseId] = useState(student.course);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getCourses = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/course`);
      const Course = res.data;
      if (Course) setCourse(Course);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let databody = {
      name: formValues.name,
      lastname: formValues.lastname,
      course: formValues.course,
    };

    fetch(`${process.env.REACT_APP_API_URL}/student/${student._id}`, {
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
        <label htmlFor="course">course:</label>
        <select
          name="course"
          id=""
          value={formValues.course}
          onChange={handleChange}
        >
          {courses?.map((course) => {
            if (date === course.schoolYear)
              return (
                <option value={course._id}>
                  {course.level} {course.year} {course.division}
                </option>
              );
          })}
        </select>
        {/* <input
          type="text"
          autoComplete="off"
          name="course"
          id=""
          value={formValues.course}
          onChange={handleChange}
        /> */}
        <button>Actualizar</button>
      </form>
    </div>
  );
};

export default EditStudent;
