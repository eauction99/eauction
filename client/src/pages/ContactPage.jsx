import { Navbar } from '../components/Navbar.jsx';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold text-slate-50">Contact Us</h1>
        <p className="max-w-xl text-sm text-slate-300">
          Get in touch with the AllAuction team for partnerships, custom
          deployments, or tournament support.
        </p>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Admin Email
            </p>
            <p className="mt-1 text-slate-100">admin@allauction.app</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Phone Number
            </p>
            <p className="mt-1 text-slate-100">+91-98765-43210</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Address
            </p>
            <p className="mt-1 text-slate-100">
              AllAuction Sports Tech, Sector 62, Noida, Uttar Pradesh, India
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Organization
            </p>
            <p className="mt-1 text-slate-100">
              AllAuction – Smart Auction Platform for Sports &amp; Events
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}


