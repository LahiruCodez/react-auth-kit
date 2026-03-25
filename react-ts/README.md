# React Auth Kit - TypeScript Edition

A modern, reusable authentication system for React applications built with TypeScript, Vite, React Router, and Axios. This project provides a complete authentication solution with context-based state management, custom hooks, role-based access control, and protected routes.

## ✨ Features

- **🔐 Authentication Context** - Centralized auth state management using React Context API
- **🎣 Custom Hooks** - Ready-to-use hooks for login, register, logout, and user queries
- **🛡️ Protected Routes** - Role-based access control (RBAC) with route protection
- **📡 API Integration** - Pre-configured Axios instance with auth support
- **⚡ React Query** - Efficient data fetching and caching
- **🎨 TypeScript** - Full type safety across the application
- **🚀 Vite** - Lightning-fast development and build experience
- **📱 React Router v7** - Modern routing with outlet-based navigation
- **🔔 Toast Notifications** - User-friendly feedback with react-toastify

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd react-ts
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 💻 Usage

### Setting Up the Auth Provider

Wrap your application with the `AuthProvider` in your main entry point:

```tsx
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
```

### Using Authentication Hooks

Access authentication data and methods using the `useAuth` hook:

```tsx
import { useAuth } from './auth/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login.mutateAsync(credentials);
      // Handle successful login
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={() => logout.mutate()}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Protected Routes with Role-Based Access

Create protected routes with role-based access control:

```tsx
import ProtectedRoute from './auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const router = (
  <Routes>
    <Route element={<ProtectedRoute allowedRoles={[1, 2]} />}>
      <Route path='/dashboard' element={<Dashboard />} />
    </Route>
    <Route path='/unauthorized' element={<Unauthorized />} />
  </Routes>
);
```

The `allowedRoles` prop accepts an array of role IDs. Users without these roles will be redirected to the unauthorized page.

## 📁 Project Structure

```
src/
├── api/
│   └── axios.ts                 # Axios configuration
├── auth/
│   ├── AuthContex.tsx           # Auth context definition
│   ├── authHooks.ts             # Custom React Query hooks
│   ├── AuthProvider.tsx          # Auth provider component
│   ├── authService.ts           # API service methods
│   ├── ProtectedRoute.tsx        # Route protection component
│   ├── roleHelper.ts            # Role validation utilities
│   └── useAuth.ts               # Main auth hook
├── config/
│   ├── mappers/
│   │   ├── login.dto.mapper.ts  # Login DTO mapping
│   │   └── register.dto.mapper.ts # Register DTO mapping
│   ├── types/
│   │   ├── authUser.ts          # Auth response type
│   │   ├── loginData.ts         # Login form type
│   │   ├── registerData.ts      # Register form type
│   │   └── user.ts              # User type
│   └── vars/
│       └── variables.ts         # API endpoint constants
├── pages/
│   ├── Dashboard.tsx            # Protected dashboard page
│   ├── Home.tsx                 # Home page
│   ├── Login.tsx                # Login page
│   ├── Register.tsx             # Registration page
│   └── Unauthorized.tsx         # Unauthorized access page
└── utils/
    └── handleApiError.ts        # Error handling utility
```

## 🔧 Configuration

### API Endpoints

Update the API endpoints in `src/config/vars/variables.ts`:

```typescript
export const LOGIN_API = '/api/auth/login';
export const REGISTER_API = '/api/auth/register';
export const ME_API = '/api/auth/me';
export const LOGOUT_API = '/api/auth/logout';
```

### Axios Configuration

Customize the Axios instance in `src/api/axios.ts` to add interceptors, headers, or base URL configuration.

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🧪 Type Definitions

### User Type

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  roleId: number;
}
```

### Login Data Type

```typescript
interface LoginData {
  email: string;
  password: string;
}
```

### Register Data Type

```typescript
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

## 🎯 Authentication Flow

1. **Registration**: User submits registration form → API validates & creates account
2. **Login**: User submits credentials → API authenticates & returns user data
3. **Session**: AuthProvider queries `/me` endpoint to restore session on app load
4. **Protected Access**: ProtectedRoute checks authentication status and role permissions
5. **Logout**: User logs out → Session is cleared

## 🤝 Hooks Reference

### useAuth()

Main hook for accessing auth state and mutations.

```typescript
const {
  user, // Current user object or null
  isLoading, // Loading state
  isAuthenticated, // Boolean indicating if user is authenticated
  register, // Mutation for registration
  login, // Mutation for login
  logout, // Mutation for logout
} = useAuth();
```

### useUser()

Query hook for fetching current user.

```typescript
const { data: user, isLoading } = useUser();
```

### useLogin()

Mutation hook for login.

```typescript
const login = useLogin();
login.mutateAsync(credentials);
```

### useRegister()

Mutation hook for registration.

```typescript
const register = useRegister();
register.mutateAsync(formData);
```

### useLogout()

Mutation hook for logout.

```typescript
const logout = useLogout();
logout.mutate();
```

## 🛠️ Development

### Project Setup

This project uses:

- **Vite** for fast development and building
- **React 19** for UI components
- **TypeScript 5.9** for type safety
- **ESLint** for code quality
- **React Query 5** for server state management
- **React Router 7** for routing
- **Axios** for HTTP requests

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

## 📝 Best Practices

1. **Always use the `useAuth` hook** to access auth state and methods
2. **Wrap protected routes properly** with `ProtectedRoute` component
3. **Handle loading states** when checking authentication
4. **Use type-safe DTO mappers** for API requests
5. **Implement proper error handling** with toast notifications
6. **Store API endpoints** in configuration variables

## 🚀 Customization

### Adding Custom Roles

Update the role validation in `src/auth/roleHelper.ts`:

```typescript
const ROLE_MAP = {
  ADMIN: 1,
  MODERATOR: 2,
  USER: 3,
};

export const hasAllowedRole = (userRole: number, allowedRoles: number[]) => {
  return allowedRoles.includes(userRole);
};
```

### Extending Auth Context

Add custom data to the auth context by modifying `src/auth/AuthContex.tsx`:

```typescript
interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions?: string[];
}
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com)

## 🐛 Troubleshooting

### Auth not persisting after page refresh

- Ensure the `useUser()` hook is called in your `AuthProvider`
- Check that the `/me` endpoint is properly configured
- Verify that token/session is stored and sent with requests

### Protected routes redirect to login

- Verify user role matches `allowedRoles` in `ProtectedRoute`
- Check that user object is properly populated with `roleId`
- Ensure auth context is properly provided to your app

### API requests failing

- Verify API endpoints in `src/config/vars/variables.ts`
- Check Axios configuration in `src/api/axios.ts`
- Ensure CORS is properly configured on backend

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with using React, TypeScript, and Vite**
