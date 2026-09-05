import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft } from "lucide-react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    clearError();
    try {
      await register(firstName, lastName, email, password, role);
      navigate("/");
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      
      {/* Left Pane - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-slate-800">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-835de38aa6b5?q=80&w=1920&auto=format&fit=crop" 
            alt="Chef preparing beautiful dish" 
            className="object-cover w-full h-full opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-slate-900/60 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
          </div>
          
          <div className="w-full max-w-lg mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Join the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">Culinary Revolution.</span>
            </h1>
            <p className="text-lg text-slate-300 font-light">
              Create an account today to discover exclusive partner restaurants and lightning-fast premium delivery.
            </p>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="glass-card bg-white/10 border-white/10 p-4 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-1">5k+</h3>
                <p className="text-sm text-slate-400 font-medium">Partner Restaurants</p>
              </div>
              <div className="glass-card bg-white/10 border-white/10 p-4 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-1">Under 30m</h3>
                <p className="text-sm text-slate-400 font-medium">Average Delivery Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 py-10">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
              Your next great meal is just a few clicks away.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 glass-card border-red-500/20 bg-red-50/50 dark:bg-red-900/10 rounded-xl flex items-start gap-3 text-red-600 animate-shake">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                  placeholder="John"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                placeholder="••••••••"
              />
              <p className="mt-1.5 text-xs font-medium text-slate-400">Must be at least 6 characters</p>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Account Type
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all appearance-none font-medium text-slate-700 dark:text-slate-200"
                >
                  <option value="Buyer">Customer</option>
                  <option value="Seller">Restaurant Owner</option>
                  <option value="DeliveryBoy">Delivery Partner</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_25px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">{isLoading ? "Creating Account..." : "Create Account"}</span>
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
            Already have an account?{" "}
            <Link to="/signin" className="text-red-500 hover:text-red-600 font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
