import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewTeacher from '../Forms/New/NewTeacher';
import TeacherPreview from '../components/TeacherPreview';

const Teachers = ({ admin }) => {
  const [teachers, setTeacher] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!admin) {
    navigate('/');
  }

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const getInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/teacher/admin/${admin._id}`
      );
      const Teacher = res.data;
      if (Teacher) setTeacher(Teacher);
      setShowForm(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log('render');
  }, [isLoading]);

  if (isLoading) return <div className="main-container">Loading...</div>;

  return (
    <div className="main-container">
      <h2>Profesores:</h2>
      {!showForm ? (
        <button onClick={handleShowForm}>Agregar Profesor/a</button>
      ) : (
        <button onClick={handleShowForm}>X</button>
      )}

      {showForm && <NewTeacher getInfo={getInfo} admin_id={admin._id} />}
      {teachers?.map((teacher, key) => {
        return <TeacherPreview teacher={teacher} getInfo={getInfo} key={key} />;
      })}
    </div>
  );
};

export default Teachers;
