import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function AuctionDetailPage() {
  const { id } = useParams();
   const navigate = useNavigate();
   const token = useSelector((state) => state.auth.token);
   const [teamForm, setTeamForm] = useState({ name: '', logoUrl: '' });
   const [teamStatus, setTeamStatus] = useState('idle');
   const [teamError, setTeamError] = useState(null);
  const { data, isLoading, mutate } = useSWR(
    id ? `${API_BASE}/auctions/${id}` : null,
    fetcher
  );

  if (isLoading || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-slate-400">Loading auction...</p>
      </div>
    );
  }

  const { auction, teams, players } = data;

  const onTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamForm((prev) => ({ ...prev, [name]: value }));
  };

  const onAddTeam = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      setTeamStatus('loading');
      setTeamError(null);
      await axios.post(
        `${API_BASE}/auctions/${auction._id}/teams`,
        {
          name: teamForm.name,
          logoUrl: teamForm.logoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeamStatus('succeeded');
      setTeamForm({ name: '', logoUrl: '' });
      await mutate();
    } catch (err) {
      setTeamStatus('failed');
      setTeamError(
        err.response?.data?.message || 'Failed to add team. Please try again.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">
            {auction.title}
          </h1>
          <p className="text-sm text-slate-300">
            {auction.sportType} · {auction.venue}
          </p>
          <p className="text-xs text-slate-400">
            Auction:{' '}
            {new Date(auction.auctionDateTime).toLocaleString()} · Tournament:{' '}
            {new Date(auction.tournamentDate).toLocaleDateString()}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-100">
                Created Teams
              </h2>
              {teams.length === 0 ? (
                <p className="text-xs text-slate-400">
                  No teams created yet. Use the form below to add teams.
                </p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 text-xs">
                  {teams.map((team) => (
                    <div
                      key={team._id}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 p-3"
                    >
                      <p className="text-sm font-semibold text-slate-50">
                        {team.name}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Players: {team.players.length}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/dashboard/auctions/${auction._id}/team/${team._id}`
                          )
                        }
                        className="mt-2 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
                      >
                        Open team page →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {token && (
              <form
                onSubmit={onAddTeam}
                className="mt-4 space-y-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-xs"
              >
                <p className="font-semibold text-slate-100">Add Team</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300">
                      Team Name
                    </label>
                    <input
                      name="name"
                      value={teamForm.name}
                      onChange={onTeamChange}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300">
                      Team Logo URL (optional)
                    </label>
                    <input
                      name="logoUrl"
                      value={teamForm.logoUrl}
                      onChange={onTeamChange}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                {teamError && (
                  <p className="text-[11px] text-red-400">{teamError}</p>
                )}
                <button
                  type="submit"
                  disabled={teamStatus === 'loading'}
                  className="rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:from-cyan-300 hover:to-violet-400 disabled:opacity-60"
                >
                  {teamStatus === 'loading' ? 'Adding...' : 'Add Team'}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-3 text-xs">
            <h2 className="text-sm font-semibold text-slate-100">
              Registered Players
            </h2>
            {players.length === 0 ? (
              <p className="text-xs text-slate-400">
                No players registered yet.
              </p>
            ) : (
              <div className="grid max-h-72 gap-3 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/80 p-3 sm:grid-cols-2">
                {players.map((player) => (
                  <div
                    key={player._id}
                    className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-2"
                  >
                    {player.imageUrl ? (
                      <img
                        src={player.imageUrl}
                        alt={player.name}
                        className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-slate-800 text-[11px] font-semibold text-slate-200">
                        {player.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-100">
                          {player.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {player.role} · {player.subRole}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Age {player.age}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
  );
}


