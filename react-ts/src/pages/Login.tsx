import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../auth/authHooks';
import type { LoginData } from '../config/types/loginData';

function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await loginMutation.mutateAsync(formData);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='example@gmail.com'
              value={formData.email}
              onChange={handleChange}
              disabled={loginMutation.isPending}
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
              disabled={loginMutation.isPending}
            />
          </div>
          <button type='submit' disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          If you don't have account <Link to={'/register'}>Register</Link>{' '}
        </p>
      </div>
    </div>
  );
}

export default Login;
