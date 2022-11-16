import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
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
    const res = await axios.get(`/course`);
    const Course = res.data;
    if (Course) setCourse(Course);
    setShowForm(false);
    setLoading(false);
  };

  const updateYear = () => {
    fetch('/course', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data);
        console.log('message', message);
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
            id=""
            placeholder="Año..."
            value={yearSearch}
            onChange={(e) => setYearSearch(e.target.value)}
          />
        </form>
      )}

      {showForm && <NewCourse handleState={handleState} />}

      {courses?.map((course) => {
        if (course.schoolYear === parseInt(yearSearch)) {
          return <CoursePreview course={course} getInfo={getInfo} />;
        }
      })}
    </div>
  );
};

export default Courses;
