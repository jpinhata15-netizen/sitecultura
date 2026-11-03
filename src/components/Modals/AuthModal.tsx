import React, { useState } from 'react';
import { X, Lock, Mail, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { switchUserRole, showToast } = useCultural();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('artist');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      switchUserRole('admin');
      showToast('Bem-vindo(a) de volta à MOSAICO!', 'success');
    } else {
      switchUserRole(role);
      showToast(`Conta cadastrada com sucesso como: ${role.toUpperCase()}!`, 'success');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-labelledby="auth-modal-title"
      >
        <div className="bg-[#1C1917] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B84A39] via-[#D97706] to-[#1F4E38] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-white text-2xl font-serif-culture font-bold">M</span>
          </div>
          <h2 id="auth-modal-title" className="text-2xl font-serif-culture font-bold">
            Portal MOSAICO
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Conectando artistas, produtores e amantes da cultura nacional
          </p>
        </div>

        {/* Alternância Login / Cadastro */}
        <div className="flex border-b border-stone-200">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-xs font-bold transition ${
              tab === 'login'
                ? 'border-b-2 border-[#B84A39] text-[#B84A39] bg-stone-50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-xs font-bold transition ${
              tab === 'register'
                ? 'border-b-2 border-[#B84A39] text-[#B84A39] bg-stone-50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Criar Conta Cultural
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Nome Completo ou Razão Social
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome ou nome do grupo..."
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com.br"
                className="w-full text-sm pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full text-sm pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Tipo de Perfil Cultural
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              >
                <option value="artist">Artista / Mestre / Detentor de Saber</option>
                <option value="producer">Produtor(a) ou Coletivo Independente</option>
                <option value="institution">Espaço Cultural, Museu ou Galeria</option>
                <option value="user">Cidadão / Espectador Cultural</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#B84A39] hover:bg-[#9E392A] text-white py-3 rounded-xl text-sm font-bold shadow-md transition transform hover:-translate-y-0.5 mt-2"
          >
            {tab === 'login' ? 'Entrar na Plataforma' : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
};
