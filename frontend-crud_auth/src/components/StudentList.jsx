const StudentList = (propos) => {
    return (
      <ul>
        {propos.students.map((student) => (
          <li key={student._id}>
            {student.number} - {student.name} ({student.age} years old)
            <button onClick={() => propos.onEdit(student)}>Edit</button>
            <button onClick={() => propos.onDelete(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default StudentList;
  