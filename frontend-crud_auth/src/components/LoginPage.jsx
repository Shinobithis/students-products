import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { login } from '../api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token); // Stocker le token
      onLogin(token); // Appeler la fonction parent pour gérer l'état global
    } catch (err) {
        console.log(err)
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Ajouter PropTypes pour valider les propriétés
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired, // Valider que onLogin est une fonction et est obligatoire
};

export default LoginPage;
