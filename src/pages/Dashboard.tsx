import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Activity, Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch protected profile data');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err: any) {
        setError(err.message);
        // Auto logout if verification fails
        if (err.message.includes('Failed')) {
           // We might want to logout, but let's just show the error for now
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!user) {
    return null; // Should be handled by ProtectedRoute wrapper
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 flex-1 w-full">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-slate-800 sm:text-3xl sm:truncate">
            Dashboard Overview
          </h2>
          <p className="mt-1 flex text-sm text-slate-500">
            Welcome back, {user.name}! You are completely securely authenticated.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg leading-6 font-bold text-slate-700 flex items-center">
            <User className="h-5 w-5 mr-2 text-slate-400" />
            User Profile Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Personal details and application status.
          </p>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading secure data...</div>
        ) : error ? (
           <div className="p-8 text-center text-red-500">
             <p>{error}</p>
             <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="mt-4 px-4 py-2 border border-red-300 text-red-700 rounded hover:bg-red-50 text-sm font-medium"
              >
                Clear Session
              </button>
           </div>
        ) : (
          <div className="border-t border-slate-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-slate-50">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full name</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 font-medium">{profileData?.name}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email address</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 font-medium">{profileData?.email}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account ID</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 font-mono text-xs">{profileData?._id}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">Authentication Level</dt>
                <dd className="mt-1 text-sm text-green-600 sm:mt-0 sm:col-span-2 flex items-center font-medium bg-green-50 w-fit px-2 py-1 rounded">
                  <Activity className="h-4 w-4 mr-1" /> Verified JWT Token
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-200 text-white flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
             <h4 className="text-sm font-medium flex items-center p-2 bg-indigo-500/50 rounded-lg">
               <Clock className="w-4 h-4 mr-2" /> Session Status
             </h4>
             <span className="text-[10px] bg-white/20 px-2 py-1 rounded tracking-tighter">PROT-ROUTE</span>
           </div>
           <p className="text-xs font-light opacity-80 leading-relaxed mb-4">
             Your session is currently active and protected via HTTP Authorization Bearer token headers.
             The API endpoints verify this token using Express middleware before granting access.
           </p>
           <div className="mt-auto flex justify-between items-center">
             <span className="font-mono text-sm tracking-tight opacity-90">JWT_ACTIVE</span>
             <div className="w-8 h-8 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-[10px] font-bold">OK</div>
           </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
           <div>
             <h4 className="font-bold text-slate-700 mb-1">Sign Out securely</h4>
             <p className="text-slate-500 text-xs">Clear local session data</p>
           </div>
           <button 
             onClick={() => { logout(); navigate('/'); }}
             className="inline-flex items-center px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-sm font-medium transition-all"
            >
             <LogOut className="w-4 h-4 mr-2" />
             Logout
           </button>
        </div>
      </div>
    </div>
  );
}
