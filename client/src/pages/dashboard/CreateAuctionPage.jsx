import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export function CreateAuctionPage() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    auctionDateTime: '',
    numberOfTeams: 8,
    tournamentDate: '',
    sportType: '',
    venue: '',
    tournamentType: '',
    logoUrl: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      setError(null);
      await axios.post(
        `${API_BASE}/auctions`,
        {
          ...form,
          numberOfTeams: Number(form.numberOfTeams),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus('succeeded');
      navigate('/dashboard/auctions');
    } catch (err) {
      setStatus('failed');
      setError(err.response?.data?.message || 'Failed to create auction');
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-semibold text-slate-50">
        Create New Auction
      </h1>
      <form onSubmit={onSubmit} className="space-y-4 text-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Auction Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Sport Type
            </label>
            <input
              name="sportType"
              value={form.sportType}
              onChange={onChange}
              placeholder="Cricket, Football, etc."
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Auction Date &amp; Time
            </label>
            <input
              name="auctionDateTime"
              type="datetime-local"
              value={form.auctionDateTime}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Tournament Date
            </label>
            <input
              name="tournamentDate"
              type="date"
              value={form.tournamentDate}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Number of Teams
            </label>
            <input
              name="numberOfTeams"
              type="number"
              min={2}
              value={form.numberOfTeams}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Tournament Type
            </label>
            <input
              name="tournamentType"
              value={form.tournamentType}
              onChange={onChange}
              placeholder="Knockout, League, etc."
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300">
            Venue
          </label>
          <input
            name="venue"
            value={form.venue}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300">
            Logo URL (optional)
          </label>
          <input
            name="logoUrl"
            value={form.logoUrl}
            onChange={onChange}
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-cyan-300 hover:to-violet-400 disabled:opacity-60"
        >
          {status === 'loading' ? 'Creating...' : 'Create Auction'}
        </button>
      </form>
    </div>
  );
}


