import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Database, LayoutDashboard } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight sm:text-5xl">
            Production-Ready <span className="text-indigo-600">Authentication</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            A fully functional full-stack application featuring JWT, Express.js backend, and MongoDB Atlas integration.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="flex justify-center text-indigo-500 mb-4">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">Secure JWT Auth</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">Industry standard implementation with HTTP Bearer tokens and bcryptjs hashing.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="flex justify-center text-green-500 mb-4">
                <Database className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">MongoDB Integration</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">Mongoose ORM models out of the box with unique constraint validation.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="flex justify-center text-indigo-400 mb-4">
                <LayoutDashboard className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">Protected Routes</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">Express middleware protecting API endpoints and React private routes.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all focus:outline-none"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-slate-200 shadow-sm text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all focus:outline-none"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all focus:outline-none"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
