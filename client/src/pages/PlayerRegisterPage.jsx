import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const ROLE_OPTIONS = [
  { value: 'batsman', label: 'Batsman' },
  { value: 'bowler', label: 'Bowler' },
  { value: 'wicket_keeper', label: 'Wicket Keeper' },
];

export function PlayerRegisterPage() {
  const { code } = useParams();
  const [form, setForm] = useState({
    name: '',
    age: '',
    role: 'batsman',
    subRole: '',
    imageUrl: '',
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      setMessage(null);
      await axios.post(`${API_BASE}/auctions/register-player/${code}`, {
        ...form,
        age: Number(form.age),
      });
      setStatus('succeeded');
      setMessage('Registration successful! You have been added to the pool.');
      setForm({
        name: '',
        age: '',
        role: 'batsman',
        subRole: '',
        imageUrl: '',
      });
      setPreview(null);
    } catch (err) {
      setStatus('failed');
      setMessage(
        err.response?.data?.message || 'Failed to register. Please try again.'
      );
    }
  };

  const renderSubRoleHelper = () => {
    if (form.role === 'batsman') {
      return 'e.g. Left-hand, Right-hand';
    }
    if (form.role === 'bowler') {
      return 'e.g. Left-arm fast, Right-arm off-spin';
    }
    if (form.role === 'wicket_keeper') {
      return 'e.g. Primary keeper, Part-time keeper';
    }
    return '';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-xl font-semibold text-slate-50">
          Player Registration
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Registration Code:{' '}
          <span className="font-mono text-cyan-300">{code}</span>
        </p>
        <p className="mt-3 text-sm text-slate-300">
          Fill in your details to join the auction pool for this tournament.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Player Name
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
              Age
            </label>
            <input
              name="age"
              type="number"
              min={10}
              value={form.age}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Primary Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Sub-role / Style
            </label>
            <input
              name="subRole"
              value={form.subRole}
              onChange={onChange}
              placeholder={renderSubRoleHelper()}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Example: Left-hand, Right-hand, Left-arm fast, Right-arm leg-spin.
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Player Image URL (optional)
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={onChange}
              placeholder="https://example.com/player-photo.jpg"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Paste a public image URL to show your photo to organizers.
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Or upload from device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="mt-1 w-full text-xs text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-100 hover:file:bg-slate-700"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              If you upload a photo, it will be stored with your registration.
            </p>
          </div>
          {preview && (
            <div className="pt-2">
              <p className="text-xs font-medium text-slate-300">
                Photo preview
              </p>
              <img
                src={preview}
                alt="Player preview"
                className="mt-1 h-24 w-24 rounded-lg object-cover border border-slate-700"
              />
            </div>
          // </div>
          )}
          {message && (
            <p
              className={`text-xs ${
                status === 'succeeded' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-cyan-300 hover:to-violet-400 disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </main>
    </div>
  );
}


