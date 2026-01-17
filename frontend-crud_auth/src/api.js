import axios from 'axios';

// Créer une instance d'Axios avec la base URL de l'API
const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Base URL de votre backend
});

// Ajouter un interceptor pour inclure le token JWT dans chaque requête sortante
api.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('authToken');
    
    // Ajouter le header Authorization si le token existe
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Gérer les erreurs d'interception
    return Promise.reject(error);
  }
);

// Méthodes d'API pour les étudiants
export const getStudents = () => api.get('/students');
export const createStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Méthodes d'API pour l'authentification
export const signup = (user) => api.post('users/signup', user); // Création de compte
export const login = (user) => api.post('users/login', user);   // Connexion

// Exporter l'instance configurée
export default api;
