import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, createStudent, updateStudent, deleteStudent } from './api';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fonction pour récupérer les étudiants depuis l'API
  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Appeler fetchStudents après le login
  useEffect(() => {
    if (token) {
      fetchStudents();
    }
  }, [token]);

  // Gestion de l'ajout ou de la mise à jour d'un étudiant
  const handleAddOrUpdate = async (student) => {
    try {
      if (editingStudent) {
        await updateStudent(student._id, student);
        setEditingStudent(null);
      } else {
        await createStudent(student);
      }
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // Gestion de la suppression d'un étudiant
  const handleDelete = async (_id) => {
    try {
      await deleteStudent(_id);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Gestion de l'édition d'un étudiant
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  if (!token) {
    return (
      <div>
        <SignupPage />
        <LoginPage onLogin={(token) => {
          localStorage.setItem('authToken', token);
          setToken(token);
        }} />
      </div>
    );
  }

  return (
    <div className="element">
      <h1>Student Management</h1>
      <button onClick={handleLogout}>Logout</button>
      <h3>Students Form</h3>
      <StudentForm onSubmit={handleAddOrUpdate} initialData={editingStudent} />
      <h3>Students List</h3>
      <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;