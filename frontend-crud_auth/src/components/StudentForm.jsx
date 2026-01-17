import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StudentForm = ({ onSubmit, initialData }) => {
  // Initialize form state with default values
  const [formData, setFormData] = useState({
    _id: '',
    number : '',
    name: '',
    age: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Populate state with initialData if available
  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || '',
        number: initialData.number || '',
        name: initialData.name || '',
        age: initialData.age || '',
      });
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await onSubmit(formData);
      setMessage('Student submitted successfully!');
      setFormData({ _id: '', number: '', name: '', age: '' });
    } catch (error) {
      console.error(error); // Log the error to the console
      //setError(`Failed to submit student: ${error.message}`);
      setError('Failed to submit student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="hidden"
          name="_id"
          value={formData._id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Number:</label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>

      {/* Display success and error messages */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

// Add PropTypes for validation
StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number: PropTypes.oneOfType([PropTypes.number]),
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

StudentForm.defaultProps = {
  initialData: { _id: '', number: '', name: '', age: '' },
};

export default StudentForm;
