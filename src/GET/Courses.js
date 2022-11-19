import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursePreview from '../components/CoursePreview';
import NewCourse from '../Forms/New/NewCourse';

const Courses = ({ admin }) => {
  const [courses, setCourse] = useState();
  const [isLoading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [yearSearch, setYearSearch] = useState(new Date().getFullYear());
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  if (!admin) {
    navigate('/');
  }

  const getInfo = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/course/admin/${admin._id}`
    );
    const Course = res.data;
    if (Course) setCourse(Course);
    setShowForm(false);
    setLoading(false);
  };

  const updateYear = () => {
    fetch(`${process.env.REACT_APP_API_URL}/course/admin/${admin._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);

        handleState();
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log('render');
  }, [isLoading]);

  const handleState = () => {
    getInfo();
    setShowForm(false);
  };

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  return (
    <div className="main-container">
      <h2>Cursos:</h2>
      {message?.message && <div>{message.message}</div>}

      <button onClick={updateYear}>Pasar de año</button>
      {!showForm ? (
        <button onClick={handleShowForm}>Nuevo Curso</button>
      ) : (
        <button onClick={handleShowForm}>X</button>
      )}
      {!showForm && (
        <form>
          <label htmlFor="year">Buscar por año:</label>
          <input
            type="number"
            name="year"
            placeholder="Año..."
            value={yearSearch}
            onChange={(e) => setYearSearch(e.target.value)}
          />
        </form>
      )}

      {showForm && <NewCourse handleState={handleState} admin_id={admin._id} />}

      {courses?.map((course, key) => {
        if (course.schoolYear === parseInt(yearSearch)) {
          return <CoursePreview course={course} getInfo={getInfo} key={key} />;
        }
      })}
    </div>
  );
};

export default Courses;
