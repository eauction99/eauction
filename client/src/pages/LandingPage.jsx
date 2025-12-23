import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-12 pb-16 md:flex-row md:gap-10">
        <section className="flex-1 space-y-6">
          <p className="inline-flex items-center rounded-full border border-cyan-400/40 bg-slate-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-200">
            Smart Auction Platform
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            Run Local to International{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Sports Auctions
            </span>{' '}
            with Ease.
          </h1>
          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            AllAuction helps organizers manage teams, players, and bidding in
            one place. Create tournaments, onboard players with shareable
            links, and run transparent auctions in real-time.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:from-cyan-300 hover:to-violet-400"
            >
              Get Started – It&apos;s Free
            </button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-full border border-slate-600/70 bg-slate-900/60 px-5 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200"
            >
              Explore Auctions
            </button>
          </div>
          <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="font-semibold text-slate-100">
                Multi-level Tournaments
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Local, state, national, and franchise-based sports events.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="font-semibold text-slate-100">Teams &amp; Players</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Create teams, register players, and assign them to squads.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="font-semibold text-slate-100">Real-time Ready</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Designed for future live bidding with Socket.io integration.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-10 flex flex-1 justify-center md:mt-0">
          <div className="glass w-full max-w-md p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
              Snapshot
            </p>
            <p className="mt-1 text-sm text-slate-200">
              Upcoming Premier League Auction
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">Tournament Date</p>
                <p className="text-sm font-semibold text-slate-100">
                  24 March 2026
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">Teams</p>
                <p className="text-sm font-semibold text-slate-100">12</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">Registered Players</p>
                <p className="text-sm font-semibold text-slate-100">180+</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">Auction Status</p>
                <p className="text-sm font-semibold text-amber-300">
                  Upcoming
                </p>
              </div>
            </div>
            <p className="mt-5 text-[11px] text-slate-400">
              Log in to create your own tournament, generate a player
              registration link, and manage squads effortlessly.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}


