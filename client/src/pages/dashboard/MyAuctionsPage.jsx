import useSWR from 'swr';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export function MyAuctionsPage() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

  const { data, isLoading } = useSWR(
    token ? `${API_BASE}/auctions/mine` : null,
    fetcher
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-50">My Auctions</h1>
        <button
          type="button"
          onClick={() => navigate('/dashboard/auctions/new')}
          className="rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:from-cyan-300 hover:to-violet-400"
        >
          + Add Auction
        </button>
      </div>
      {isLoading ? (
        <p className="text-sm text-slate-400">Loading your auctions...</p>
      ) : data && data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          {data.map((auction) => (
            <div
              key={auction._id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {auction.status}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-50">
                {auction.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Auction Date:{' '}
                {new Date(auction.auctionDateTime).toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Teams: {auction.numberOfTeams} · Sport: {auction.sportType}
              </p>
              <p className="mt-2 text-[11px] text-slate-500">
                Player registration code:{' '}
                <span className="font-mono text-cyan-300">
                  {auction.playerRegistrationCode}
                </span>
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Share this link with players:{' '}
                <code className="rounded bg-slate-800 px-1 py-0.5">
                  /dashboard/auctions/{auction._id}/player-register/
                  {auction.playerRegistrationCode}
                </code>
              </p>
              <Link
                to={`/dashboard/auctions/${auction._id}`}
                className="mt-3 inline-block text-xs font-medium text-cyan-300 hover:text-cyan-200"
              >
                View teams &amp; players →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          You haven&apos;t created any auctions yet. Use the &quot;Add
          Auction&quot; button to get started.
        </p>
      )}
    </div>
  );
}


