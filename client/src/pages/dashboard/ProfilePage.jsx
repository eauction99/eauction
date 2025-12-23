import { useSelector } from 'react-redux';

export function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-semibold text-slate-50">Profile</h1>
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Account Details
        </p>
        <dl className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Name</dt>
            <dd className="text-slate-100">{user.name}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Email</dt>
            <dd className="text-slate-100">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Role</dt>
            <dd className="text-slate-100">{user.role || 'Organizer'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}


