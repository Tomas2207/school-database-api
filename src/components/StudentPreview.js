import { useEffect, useState } from 'react';
import EditStudent from '../Forms/Edit/EditStudent';

const StudentPreview = ({ showEditForm, getInfo, student, handleEditForm }) => {
  const [deleteId, setDeleteId] = useState('');
  const [error, setError] = useState();

  const handleDelete = () => {
    if (deleteId !== '') {
      fetch(`${process.env.REACT_APP_API_URL}/student/${deleteId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          setError(data.error);
          if (!data.error) getInfo();
        });
    } else {
      console.log('no id');
    }
  };

  useEffect(() => {
    if (deleteId !== '') handleDelete();
  }, [deleteId]);
  return (
    <li>
      {showEditForm && (
        <EditStudent
          getInfo={getInfo}
          student={student}
          handleEditForm={handleEditForm}
        />
      )}
      {!showEditForm && (
        <div>
          {student.lastname}, {student.name}
          <div className="btn-container">
            <button onClick={handleEditForm}>
              <img src="/img/edit.png" alt="edit" />
            </button>
            <button onClick={() => setDeleteId(student._id)}>
              <img src="/img/delete.png" alt="delete" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default StudentPreview;
