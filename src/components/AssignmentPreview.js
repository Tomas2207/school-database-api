import axios from 'axios';
import { useEffect, useState } from 'react';

const AssignmentPreview = ({ assignment, getInfo }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [teachers, setTeachers] = useState();
  const [formValues, setFormValues] = useState({
    name: assignment.name,
    teacher: assignment.teacher,
  });

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/assignment/${assignment._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getInfo();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let databody = {
      name: formValues.name,
      teacher: formValues.teacher,
    };

    fetch(`${process.env.REACT_APP_API_URL}/assignment/${assignment._id}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditForm = () => {
    showEdit ? setShowEdit(false) : setShowEdit(true);
  };

  const getTeachers = async () => {
    const Teachers = await axios.get(
      `${process.env.REACT_APP_API_URL}/teacher`
    );
    const ResTeacher = Teachers.data;
    if (ResTeacher) setTeachers(ResTeacher);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <tr>
      {showEdit ? (
        <td>
          <input
            type="text"
            name="name"
            className="td-input"
            placeholder="Materia"
            value={formValues.name}
            onChange={handleChange}
          />
        </td>
      ) : (
        <td>{assignment.name}</td>
      )}
      {showEdit ? (
        <td>
          <select
            name="teacher"
            id=""
            value={formValues.teacher}
            onChange={handleChange}
          >
            {teachers?.map((teacher) => {
              return (
                <option value={teacher._id}>
                  {teacher.name} {teacher.lastname}
                </option>
              );
            })}
          </select>
        </td>
      ) : (
        <td>
          {assignment.teacher.name} {assignment.teacher.lastname}
        </td>
      )}
      {showEdit ? (
        <td>
          <button onClick={handleSubmit}>Actualizar</button>{' '}
          <button onClick={handleEditForm}>X</button>
        </td>
      ) : (
        <td>
          <button onClick={handleEditForm}>
            <img src="/img/edit.png" />
          </button>{' '}
          <button onClick={handleDelete}>
            <img src="/img/delete.png" />
          </button>
        </td>
      )}
    </tr>
  );
};

export default AssignmentPreview;
