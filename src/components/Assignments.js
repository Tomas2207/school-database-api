import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AssignmentStudent from './AssignmentStudent';

const Assignments = () => {
  const [assignments, setAssignment] = useState();
  const [yearSearch, setYearSearch] = useState(new Date().getFullYear());

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/teacher/${id}/assignment`)
      .then((response) => setAssignment(response.data));
  }, []);
  console.log(assignments);

  return (
    <div>
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
      <br></br>
      {assignments?.map((assignment) => {
        if (parseInt(yearSearch) === assignment.calendarYear) {
          return (
            <div className="sub-container">
              <div>
                {assignment.name} {assignment.currentYear}
                {assignment.course.division} {'('}
                {assignment.calendarYear}
                {')'}
              </div>

              <AssignmentStudent
                props={{ id: assignment._id, teacher_id: id }}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Assignments;
