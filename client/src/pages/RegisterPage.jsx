import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../store/authSlice.js';
import { Navbar } from '../components/Navbar.jsx';

export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(form));
    if (register.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-50">Register</h1>
        <p className="mt-1 text-sm text-slate-300">
          Create an organizer account to start creating auctions.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          {auth.error && (
            <p className="text-xs text-red-400">{auth.error}</p>
          )}
          <button
            type="submit"
            disabled={auth.status === 'loading'}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-cyan-300 hover:to-violet-400 disabled:opacity-60"
          >
            {auth.status === 'loading' ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}


