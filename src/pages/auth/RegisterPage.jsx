import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Full name is required (at least 2 characters).';
    }

    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
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
      // Public registration unconditionally creates a student account on backend
      await register(name.trim(), email.trim().toLowerCase(), password);
      toast.success('Registration successful! Welcome to SmartLMS.');
      navigate('/student/dashboard');
    } catch (err) {
      if (!err.response) {
        const networkMsg =
          'Cannot connect to the SmartLMS backend server. Please verify the backend is running and reachable.';
        setErrorMessage(networkMsg);
        toast.error('Connection failed: Server unreachable');
      } else {
        const msg = err.response.data?.message || 'Registration failed. Please check your details.';
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
          <p className="text-slate-500 mt-1 text-sm">Create your student learning account</p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2.5">
            <span className="text-rose-600 font-bold shrink-0 mt-0.5">⚠️</span>
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              disabled={loading}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: '' }));
                if (errorMessage) setErrorMessage('');
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition ${
                fieldErrors.name
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
              }`}
              placeholder="e.g. Rahul Sharma"
            />
            {fieldErrors.name && (
              <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors.name}</p>
            )}
          </div>

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
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                if (errorMessage) setErrorMessage('');
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition ${
                fieldErrors.email
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
              }`}
              placeholder="you@example.com"
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }));
                if (errorMessage) setErrorMessage('');
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition ${
                fieldErrors.password
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
              }`}
              placeholder="At least 8 characters"
            />
            {fieldErrors.password && (
              <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Confirm Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              disabled={loading}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (fieldErrors.confirmPassword) {
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }
                if (errorMessage) setErrorMessage('');
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition ${
                fieldErrors.confirmPassword
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
              }`}
              placeholder="Re-enter your password"
            />
            {fieldErrors.confirmPassword && (
              <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors.confirmPassword}</p>
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
                <span>Creating account...</span>
              </>
            ) : (
              'Create Student Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
