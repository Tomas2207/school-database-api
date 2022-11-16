import { useState } from 'react';
import NewGrade from '../Forms/New/newGrade';

const Gradesheet = ({ props, array, handleState, getInfo }) => {
  const { year, id } = props;
  const [showGrades, setShowGrades] = useState(false);
  const [Array, setArray] = useState(array);

  const handleDelete = () => {
    fetch(`/grades/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        getInfo();
      });
  };

  const handleShowGrades = () => {
    if (showGrades) {
      setShowGrades(false);
    } else {
      setShowGrades(true);
    }
  };
  return (
    <div className="sub-container">
      <div>{year}</div>
      {!showGrades ? (
        <div>
          <button onClick={handleShowGrades}>Mostrar Notas</button>
          <button onClick={handleDelete}>Borrar Hoja de notas</button>
        </div>
      ) : (
        <button onClick={handleShowGrades}>Ocultar Notas</button>
      )}
      {showGrades && (
        <div>
          <NewGrade props={{ id: id }} handleState={handleState} />
          <h3>Notas:</h3>
          <table>
            <tr>
              <th>Nombre</th>
              <th>Nota</th>
            </tr>
            {Array.map((grade) => {
              return (
                <tr>
                  <td>{grade.name}</td>
                  <td>{grade.grade}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Gradesheet;
