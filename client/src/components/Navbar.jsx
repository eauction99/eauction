import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.js';

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const linkClass =
    'text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors duration-200';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 font-bold transition-transform duration-200 hover:scale-105">
            AA
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-50">
              AllAuction
            </p>
            <p className="text-[11px] text-slate-400">
              Smart Sports Auction Platform
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/auctions/live" className={linkClass}>
            Live Auctions
          </NavLink>
          <NavLink to="/auctions/upcoming" className={linkClass}>
            Upcoming
          </NavLink>
          <NavLink to="/auctions/previous" className={linkClass}>
            Previous
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact Us
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="hidden rounded-full border border-cyan-500/70 px-3 py-1 text-xs font-medium text-cyan-100 hover:bg-cyan-500/10 transition-colors duration-200 md:inline-block"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors duration-200"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="hidden rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-sm hover:bg-cyan-400 transition-colors duration-200 md:inline-block"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


