import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditTeacher from '../Forms/Edit/EditTeacher';

const TeacherPreview = ({ teacher, getInfo }) => {
  const [error, setError] = useState();
  const [id, setId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  console.log('t', id);

  useEffect(() => {
    handleSubmit();
  }, [id]);

  const handleEditForm = () => {
    showEdit ? setShowEdit(false) : setShowEdit(true);
  };

  const handleSubmit = () => {
    console.log(id);
    if (id !== '') {
      fetch(`/teacher/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          console.log(data.errorMessage);
          setError(data.errorMessage);
          if (!data.errorMessage) getInfo();
        });
    } else {
      console.log('no id');
    }
  };
  return (
    <div>
      {showEdit && (
        <EditTeacher
          getInfo={getInfo}
          teacher={teacher}
          handleEditForm={handleEditForm}
        />
      )}
      {!showEdit && (
        <div className="preview-container">
          <div>
            <Link
              id="preview-link"
              to={{ pathname: `/teachers/${teacher._id}` }}
            >
              <div>
                <div>
                  {teacher.name} {teacher.lastname}
                </div>
              </div>
            </Link>

            {error && <div className="error">{error}</div>}
          </div>
          <div className="btn-container">
            <button
              onClick={() => {
                setId(teacher._id);
              }}
            >
              Eliminar profesor
            </button>
            <button onClick={handleEditForm}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPreview;
