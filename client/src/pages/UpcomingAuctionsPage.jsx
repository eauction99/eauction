import useSWR from 'swr';
import axios from 'axios';
import { Navbar } from '../components/Navbar.jsx';
import { AuctionListSkeleton } from './partials/AuctionListSkeleton.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function UpcomingAuctionsPage() {
  const { data, isLoading } = useSWR(
    `${API_BASE}/auctions?status=upcoming`,
    fetcher
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-50">
          Upcoming Auctions
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Explore tournaments scheduled for the future and share player
          registration links with teams.
        </p>
        {isLoading ? (
          <AuctionListSkeleton />
        ) : data && data.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.map((auction) => (
              <div
                key={auction._id}
                className="rounded-xl border border-amber-500/40 bg-slate-900/80 p-4 text-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                  Upcoming
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
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-slate-400">
            No upcoming auctions yet. Once you create an auction from your
            dashboard, it will appear here.
          </p>
        )}
      </main>
    </div>
  );
}


