import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegister } from '../auth/authHooks';

function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      toast.error('Please fill all fields');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='John Doe'
              value={formData.name}
              onChange={handleChange}
              disabled={registerMutation.isPending}
            />
          </div>
          <br />
          <div>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='example@gmail.com'
              value={formData.email}
              onChange={handleChange}
              disabled={registerMutation.isPending}
            />
          </div>
          <br />
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='********'
              value={formData.password}
              onChange={handleChange}
              disabled={registerMutation.isPending}
            />
          </div>
          <br />
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              placeholder='********'
              value={formData.passwordConfirm}
              onChange={handleChange}
              disabled={registerMutation.isPending}
            />
          </div>
          <button type='submit' disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </button>
          <p>
            If you already have account <Link to={'/login'}>login</Link>{' '}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
