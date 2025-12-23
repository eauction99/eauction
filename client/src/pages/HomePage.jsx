import { Navbar } from '../components/Navbar.jsx';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">
            What We Offer
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="font-semibold text-slate-100">
                End-to-End Auction Setup
              </p>
              <p className="mt-1 text-slate-300 text-xs">
                Configure tournaments, dates, venues, and formats in minutes.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="font-semibold text-slate-100">
                Teams &amp; Player Management
              </p>
              <p className="mt-1 text-slate-300 text-xs">
                Create teams, register players with shareable links, and assign
                them to squads effortlessly.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="font-semibold text-slate-100">Analytics Ready</p>
              <p className="mt-1 text-slate-300 text-xs">
                Capture structured data for post-auction reporting and future
                insights.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">
            Auction Insights
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-xs text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-slate-400">Live Auctions</p>
              <p className="mt-1 text-2xl font-semibold text-emerald-300">
                —
              </p>
              <p className="mt-1 text-[11px]">
                Real-time data will appear here once auctions go live.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-slate-400">Upcoming Events</p>
              <p className="mt-1 text-2xl font-semibold text-amber-300">
                —
              </p>
              <p className="mt-1 text-[11px]">
                View all scheduled auctions in the Upcoming section.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-slate-400">Completed Auctions</p>
              <p className="mt-1 text-2xl font-semibold text-sky-300">
                —
              </p>
              <p className="mt-1 text-[11px]">
                Explore past tournament summaries and team compositions.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50">
            Get in Touch
          </h2>
          <p className="max-w-xl text-sm text-slate-300">
            Have a league, tournament, or corporate sports event in mind? Reach
            out to us via the Contact page and we&apos;ll help you set up a
            tailored auction experience.
          </p>
        </section>
      </main>
    </div>
  );
}


