import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssignmentPreview from '../components/AssignmentPreview';
import StudentPreview from '../components/StudentPreview';
import NewAssignment from '../Forms/New/NewAssignment';
import NewStudent from '../Forms/New/NewStudent';

const Course = ({ admin }) => {
  const [course, setCourse] = useState();
  const [students, setStudents] = useState();
  const [assignments, setAssignments] = useState();
  const [newassignment, setNewassignment] = useState(false);
  const [newStudent, setNewStudent] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!admin) {
    navigate('/');
  }

  let { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditForm = () => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true);
  };

  const getInfo = async () => {
    setLoading(true);
    const resCourse = await axios.get(
      `${process.env.REACT_APP_API_URL}/course/${id}`
    );
    const Course = resCourse.data;
    if (Course) setCourse(Course);

    const Res = await axios.get(
      `${process.env.REACT_APP_API_URL}/course/students/${id}`
    );
    const Students = Res.data.students;
    const Assignments = Res.data.assignments;
    if (Students) setStudents(Students);
    if (Assignments) setAssignments(Assignments);

    setNewassignment(false);
    setNewStudent(false);
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log('render');
  }, [isLoading]);

  const stateHandler = () => {
    console.log('getting info');
    getInfo();
  };

  const handleAssignment = () => {
    newassignment ? setNewassignment(false) : setNewassignment(true);
  };
  const handleStudent = () => {
    newStudent ? setNewStudent(false) : setNewStudent(true);
  };

  if (isLoading) return <div className="main-container">Loading</div>;

  return (
    <div className="main-container">
      {course && (
        <h2>
          {course.year} {course.division} {course.level}
        </h2>
      )}
      <div className="course-container">
        <div className="sub-container">
          <h3>Asignaturas:</h3>
          {!newassignment ? (
            <button onClick={handleAssignment}>Añadir Asignatura</button>
          ) : (
            <button onClick={handleAssignment}>x</button>
          )}
          {newassignment && (
            <NewAssignment
              props={{
                id: id,
                stateHandler: stateHandler,
                currentYear: course.year,
                admin_id: admin._id,
              }}
            />
          )}
          <table>
            <tr>
              <th>Materia</th>
              <th>Profesor/a</th>
              <th></th>
            </tr>
            {assignments?.map((assignment, key) => {
              if (assignment.calendarYear === course.schoolYear) {
                return (
                  <AssignmentPreview
                    assignment={assignment}
                    getInfo={getInfo}
                    key={key}
                    admin_id={admin._id}
                  />
                );
              }
            })}
          </table>
        </div>
        <div className="sub-container">
          <h3>Alumnos:</h3>

          {!newStudent ? (
            <button onClick={handleStudent}>Añadir Alumno</button>
          ) : (
            <button onClick={handleStudent}>x</button>
          )}
          {newStudent && (
            <NewStudent props={{ id: id, stateHandler: stateHandler }} />
          )}
          <ul className="list">
            {students?.map((student, key) => {
              return (
                <StudentPreview
                  showEditForm={showEditForm}
                  getInfo={getInfo}
                  student={student}
                  handleEditForm={handleEditForm}
                  key={key}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Course;
