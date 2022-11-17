import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Assignments from '../components/Assignments';

const Teacher = ({ admin }) => {
  const [teacher, setTeacher] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  if (!admin) {
    navigate('/');
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/teacher/${id}`)
      .then((response) => setTeacher(response.data));
  }, []);

  return (
    <div className="main-container">
      <div>
        {teacher && (
          <h2 className="teacher-info">
            {teacher.name} {teacher.lastname}
          </h2>
        )}
      </div>
      <h3>Asignaturas:</h3>
      <Assignments />
    </div>
  );
};

export default Teacher;
