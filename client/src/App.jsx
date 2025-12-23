import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LandingPage } from './pages/LandingPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { LiveAuctionsPage } from './pages/LiveAuctionsPage.jsx';
import { UpcomingAuctionsPage } from './pages/UpcomingAuctionsPage.jsx';
import { PreviousAuctionsPage } from './pages/PreviousAuctionsPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { DashboardLayout } from './pages/dashboard/DashboardLayout.jsx';
import { ProfilePage } from './pages/dashboard/ProfilePage.jsx';
import { MyAuctionsPage } from './pages/dashboard/MyAuctionsPage.jsx';
import { CreateAuctionPage } from './pages/dashboard/CreateAuctionPage.jsx';
import { AuctionDetailPage } from './pages/AuctionDetailPage.jsx';
import { PlayerRegisterPage } from './pages/PlayerRegisterPage.jsx';
import { TeamPage } from './pages/TeamPage.jsx';

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 brand-gradient">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auctions/live" element={<LiveAuctionsPage />} />
        <Route path="/auctions/upcoming" element={<UpcomingAuctionsPage />} />
        <Route path="/auctions/previous" element={<PreviousAuctionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard/auctions/:id/player-register/:code"
          element={<PlayerRegisterPage />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="auctions" element={<MyAuctionsPage />} />
          <Route path="auctions/new" element={<CreateAuctionPage />} />
          <Route path="auctions/:id" element={<AuctionDetailPage />} />
          <Route path="auctions/:auctionId/team/:teamId" element={<TeamPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
