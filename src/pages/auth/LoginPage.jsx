import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to the appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'ROLE_ADMIN':
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'ROLE_TEACHER':
          navigate('/teacher/dashboard', { replace: true });
          break;
        default:
          navigate('/student/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const validate = () => {
    const errors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login(email.trim().toLowerCase(), password);
      toast.success('Welcome back, ' + (loggedInUser.name || 'User') + '!');

      // Route strictly based on the server-authenticated role
      switch (loggedInUser.role) {
        case 'ROLE_ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'ROLE_TEACHER':
          navigate('/teacher/dashboard');
          break;
        default:
          navigate('/student/dashboard');
      }
    } catch (err) {
      // Differentiate network/connection failures from invalid credentials
      if (!err.response) {
        const networkMsg =
          'Cannot connect to the SmartLMS backend server. Please verify the backend is running and reachable.';
        setErrorMessage(networkMsg);
        toast.error('Connection failed: Server unreachable');
      } else if (err.response.status === 401 || err.response.status === 400) {
        const msg = err.response.data?.message || 'Invalid email or password.';
        setErrorMessage(msg);
        toast.error(msg);
      } else if (err.response.status === 403) {
        const msg = 'Your account has been disabled or suspended. Please contact support.';
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        const msg = err.response.data?.message || 'An unexpected error occurred during sign in.';
        setErrorMessage(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-2xl mb-2">
            🎓
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">SmartLMS</h1>
          <p className="text-slate-500 mt-1 text-sm">Sign in to access your courses and assignments</p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2.5">
            <span className="text-rose-600 font-bold shrink-0 mt-0.5">⚠️</span>
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              disabled={loading}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: '' }));
                }
                if (errorMessage) setErrorMessage('');
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition ${
                fieldErrors.email
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
              }`}
              placeholder="e.g. student@smartlms.com"
              autoComplete="email"
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-slate-700">
                Password <span className="text-rose-500">*</span>
              </label>
            </div>
            <input
              type="password"
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: '' }));
                }
                if (errorMessage) setErrorMessage('');
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition ${
                fieldErrors.password
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
              }`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition shadow-sm text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create Student Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
