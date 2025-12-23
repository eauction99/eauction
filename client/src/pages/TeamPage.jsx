import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export function TeamPage() {
  const { teamId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [assignStatus, setAssignStatus] = useState('idle');
  const [assignError, setAssignError] = useState(null);

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

  const { data, isLoading, mutate } = useSWR(
    token ? `${API_BASE}/auctions/teams/${teamId}` : null,
    fetcher
  );

  const onAssign = async (playerId) => {
    try {
      setAssignStatus('loading');
      setAssignError(null);
      await axios.post(
        `${API_BASE}/auctions/teams/${teamId}/add-player`,
        { playerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssignStatus('succeeded');
      await mutate();
    } catch (err) {
      setAssignStatus('failed');
      setAssignError(
        err.response?.data?.message || 'Failed to add player to team'
      );
    }
  };

  if (isLoading || !data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-slate-400">Loading team...</p>
      </div>
    );
  }

  const { team, auction, availablePlayers } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <section className="space-y-2">
          <p className="text-xs text-slate-400">
            <Link
              to={`/dashboard/auctions/${auction._id}`}
              className="text-cyan-300 hover:text-cyan-200"
            >
              ← Back to Auction
            </Link>
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            {team.name}
          </h1>
          <p className="text-sm text-slate-300">
            Tournament: {auction.title} · {auction.sportType}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 text-sm">
            <h2 className="text-sm font-semibold text-slate-100">
              Assigned Players
            </h2>
            {team.players.length === 0 ? (
              <p className="text-xs text-slate-400">
                No players assigned yet. Use the list on the right to add
                players from the registered pool.
              </p>
            ) : (
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs">
                {team.players.map((player) => (
                  <div
                    key={player._id || player}
                    className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-2"
                  >
                    <div>
                      {player.imageUrl ? (
                        <img
                          src={player.imageUrl}
                          alt={player.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800 text-[11px] font-semibold text-slate-200">
                          {(player.name || '').slice(0, 2).toUpperCase() ||
                            'PL'}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-slate-100 text-xs">
                        {player.name || player._id}
                      </p>
                      {player.name && (
                        <p className="text-[11px] text-slate-400">
                          {player.role} · {player.subRole}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-3 text-sm">
            <h2 className="text-sm font-semibold text-slate-100">
              Registered Players (Available)
            </h2>
            {availablePlayers.length === 0 ? (
              <p className="text-xs text-slate-400">
                No unassigned registered players left for this auction.
              </p>
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs">
                {availablePlayers.map((player) => (
                  <div
                    key={player._id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-2"
                  >
                    <div className="flex items-center gap-3">
                      {player.imageUrl ? (
                        <img
                          src={player.imageUrl}
                          alt={player.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800 text-[11px] font-semibold text-slate-200">
                          {player.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-slate-100 text-xs">
                          {player.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {player.role} · {player.subRole}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAssign(player._id)}
                      disabled={assignStatus === 'loading'}
                      className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-1 text-[11px] font-semibold text-slate-950 hover:from-cyan-300 hover:to-violet-400 disabled:opacity-60"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
            {assignError && (
              <p className="text-xs text-red-400">{assignError}</p>
            )}
          </div>
        </section>
      </div>
  );
}


