import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminModal from './ui/AdminModal';
import { Loader2 } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { isLoginOpen, closeLoginModal, user, login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    try {
      const success = await login(email, password);
      if (success) {
        closeLoginModal();
      } else {
        setError('Invalid credentials. Try admin@voiceit.com / admin');
      }
    } catch (err: any) {
      console.error(err);
      setError('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (user) return null;

  return (
    <AdminModal isOpen={isLoginOpen} onClose={closeLoginModal} title="Admin Access">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">{error}</div>}
        
        <div className="bg-slate-800 p-3 rounded text-xs text-slate-400 mb-4">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@voiceit.com</p>
            <p>Pass: admin</p>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Email</label>
          <input 
            type="email" 
            required 
            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-neon-orange outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-1">Password</label>
          <input 
            type="password" 
            required 
            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-neon-orange outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 mt-4 bg-neon-orange text-black font-bold rounded hover:bg-white transition-colors flex justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
        </button>
      </form>
    </AdminModal>
  );
};

export default AdminLogin;
