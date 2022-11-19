import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditCourse from '../Forms/Edit/EditCourse';

const CoursePreview = ({ course, getInfo }) => {
  const [error, setError] = useState();
  const [id, setId] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, [id]);

  const handleEditForm = () => {
    showEdit ? setShowEdit(false) : setShowEdit(true);
  };

  const handleSubmit = () => {
    if (id !== '') {
      fetch(`${process.env.REACT_APP_API_URL}/course/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          setError(data.messages);
          if (!data.messages) getInfo();
        });
    } else {
      console.log('no id');
    }
  };
  return (
    <div>
      {showEdit && (
        <EditCourse
          getInfo={getInfo}
          course={course}
          handleEditForm={handleEditForm}
        />
      )}
      {!showEdit && (
        <div className="preview-container">
          <div>
            <Link
              id="preview-link"
              to={{
                pathname: `/courses/${course._id}`,
              }}
            >
              <div>
                {' '}
                {course.year} {course.division} {course.level}
              </div>
            </Link>
            {error && <div className="error">{error.assignment_error}</div>}
            {error && <div className="error">{error.student_error}</div>}
          </div>

          <div className="btn-container">
            <button onClick={handleEditForm}>
              <img src="/img/edit.png" alt="edit" />
            </button>
            <button
              onClick={() => {
                setId(course._id);
              }}
            >
              <img src="/img/delete.png" alt="delete" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePreview;
