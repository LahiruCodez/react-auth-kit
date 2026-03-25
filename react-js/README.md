# React Auth Kit

A fully functional, reusable React authentication kit with role-based access control, modern state management, and API integration. Perfect for kickstarting authentication in your React applications.

## Features

✅ **Complete Authentication System**

- User registration and login
- JWT token-based authentication
- Secure token storage with localStorage
- Automatic token refresh with axios interceptors

✅ **Role-Based Access Control (RBAC)**

- Protected routes with role verification
- Flexible role management
- Unauthorized access handling

✅ **Modern Architecture**

- React Context API for state management
- Custom authentication hooks (`useAuth`, `useLogin`, `useRegister`)
- React Query for server state management
- Axios with request/response interceptors

✅ **User Experience**

- Toast notifications with React Toastify
- Loading states for async operations
- Comprehensive error handling
- Form validation

✅ **Developer Experience**

- Built with Vite for fast development
- ESLint configured for code quality
- Modular and extensible architecture
- Clean project structure

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **React Query (@tanstack)** - Server state management
- **React Toastify** - Toast notifications
- **ESLint** - Code quality

## Project Structure

```
src/
├── api/
│   └── axios.js                 # Axios instance with interceptors
├── auth/
│   ├── AuthContex.jsx           # Auth context definition
│   ├── AuthProvider.jsx         # Auth provider component
│   ├── ProtectedRoute.jsx       # Role-based route protection
│   ├── authHooks.js             # useLogin, useRegister, useUser hooks
│   ├── authService.js           # Auth API calls
│   ├── roleHelper.js            # Role utility functions
│   └── useAuth.js               # useAuth hook
├── config/
│   ├── mappers/
│   │   ├── login.mapper.js      # Login DTO mapper
│   │   └── register.mapper.js   # Register DTO mapper
│   └── vars/
│       └── variables.js         # API endpoints & constants
├── pages/
│   ├── Dashboard.jsx            # Protected dashboard page
│   ├── Home.jsx                 # Home page
│   ├── Login.jsx                # Login form
│   ├── Register.jsx             # Registration form
│   └── Unauthorized.jsx         # Unauthorized access page
├── utils/
│   └── handleApiError.js        # API error handling utility
├── App.jsx                      # Application routes & setup
├── main.jsx                     # Application entry point
└── index.css                    # Global styles
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-auth-kit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update `src/config/vars/variables.js` with your backend API base URL:

   ```javascript
   export const BASE_URL = 'http://your-api-url';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Usage

### Setup Authentication Provider

Wrap your app with `AuthProvider`:

```jsx
import { AuthProvider } from './auth/AuthProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
```

### Use Authentication Hook

Access user data and authentication state anywhere in your app:

```jsx
import { useAuth } from './auth/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return <div>{isAuthenticated ? <h1>Welcome, {user.name}</h1> : <p>Please log in</p>}</div>;
}
```

### Protected Routes

Use `ProtectedRoute` to restrict access based on user roles:

```jsx
<Route element={<ProtectedRoute allowedRoles={[1, 2]} />}>
  <Route path='/dashboard' element={<Dashboard />} />
</Route>
```

### Login & Registration Hooks

```jsx
import { useLogin, useRegister } from './auth/authHooks';

function LoginForm() {
  const loginMutation = useLogin();

  const handleSubmit = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Navigate to dashboard
    } catch (error) {
      // Handle error
    }
  };
}
```

## API Integration

### Expected Backend API Endpoints

The kit expects these endpoints:

- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/me` - Get current user
- **POST** `/api/auth/logout` - User logout

### Response Format

**Login/Register Response:**

```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role_id": 1
  }
}
```

**Get User Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role_id": 1
}
```

## Configuration

### Update API Variables

Edit `src/config/vars/variables.js`:

```javascript
export const BASE_URL = 'http://your-api.com';
export const LOGIN_API = '/auth/login';
export const REGISTER_API = '/auth/register';
export const ME_API = '/auth/me';
export const LOGOUT_API = '/auth/logout';
```

### Customize Role-Based Access

Update role IDs in `src/App.jsx`:

```jsx
<Route element={<ProtectedRoute allowedRoles={[1]} />}>
  <Route path='/dashboard' element={<Dashboard />} />
</Route>
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Error Handling

The kit includes comprehensive error handling:

- **API Errors**: Automatically caught and displayed as toast notifications
- **Validation Errors**: Form validation with user feedback
- **Authentication Errors**: Handled with automatic logout on 401
- **Authorization Errors**: Redirects to unauthorized page on 403

## Token Management

Tokens are automatically managed:

- Stored in `localStorage` after login
- Attached to all API requests via axios interceptor
- Cleared on logout
- Refreshed on 401 responses (if backend supports)

## Extending the Kit

### Add New Authentication Methods

Extend `authService.js`:

```javascript
export const socialLogin = async (provider) => {
  const res = await api.post(`/auth/social/${provider}`);
  return res.data;
};
```

### Add New Hooks

Create custom hooks in `src/auth/`:

```javascript
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/user/profile').then((res) => res.data),
  });
};
```

### Add New Role Helpers

Extend `roleHelper.js`:

```javascript
export const isAdmin = (user) => user?.role_id === 1;
export const canEdit = (user) => [1, 2].includes(user?.role_id);
```

## Known Limitations

- Token refresh must be implemented in your backend
- Role validation is client-side (always validate on backend too)
- localStorage is used for token storage (consider secure alternatives for production)

## Best Practices

1. **Always validate on backend** - Never trust client-side role checks
2. **Use HTTPS** - Always use HTTPS in production
3. **Rotate tokens** - Implement token rotation for security
4. **Clear tokens on logout** - Clear all auth data when user logs out
5. **Handle token expiry** - Implement token refresh or re-login prompt

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support

## License

MIT

## Support

For issues, questions, or contributions, please open an issue on the repository.
