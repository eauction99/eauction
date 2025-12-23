import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { Navbar } from '../../components/Navbar.jsx';

export function DashboardLayout() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItemClass =
    'block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-colors duration-200';

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        <aside className="hidden h-full w-56 flex-col border-r border-slate-800 bg-slate-950/90 px-3 py-5 transition-colors duration-200 md:flex">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Dashboard
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-100">
              {user?.name}
            </p>
            <p className="text-[11px] text-slate-500">{user?.email}</p>
          </div>
          <nav className="space-y-1 text-sm">
            <NavLink to="profile" className={navItemClass}>
              Profile
            </NavLink>
            <NavLink to="auctions" className={navItemClass}>
              Auctions
            </NavLink>
          </nav>
          <button
            type="button"
            onClick={onLogout}
            className="mt-auto rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:border-red-500 hover:text-red-300"
          >
            Logout
          </button>
        </aside>
        <main className="flex-1 px-4 py-5 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


