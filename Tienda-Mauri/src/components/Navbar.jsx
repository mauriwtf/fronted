import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

export default function Navbar() {
  const context = useCarrito();
  const items = context?.items || [];
  const totalItems = items.reduce((acc, item) => acc + (item?.cantidad || 0), 0);
  const navigate = useNavigate();

  const token = localStorage.getItem('token') || localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-surface/95 backdrop-blur-md border-b border-surface-variant z-50">
      <nav className="max-w-[1280px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-xl">local_drink</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-on-surface leading-none">
              FreshMix
            </span>
            <span className="text-[10px] tracking-[0.18em] uppercase text-on-surface-variant font-semibold mt-1">
              Cold-Press Botánico
            </span>
          </div>
        </Link>

        {/* Navegación central */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-on-surface border-b-2 border-primary pb-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Catálogo
          </Link>
        </div>

        {/* Acciones derecha */}
        <div className="flex items-center gap-4 text-sm font-semibold text-on-surface">
          <Link
            to="/carrito"
            className="flex items-center gap-2.5 bg-white border border-surface-variant text-on-surface px-4 py-2 rounded-full hover:border-primary/40 transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-lg text-primary">shopping_cart</span>
            <span>Carrito</span>
            <span className="bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </Link>

          {token ? (
            <>
              <Link to="/mis-pedidos" className="hover:text-primary transition-colors hidden sm:inline">
                Mis Pedidos
              </Link>
              <Link to="/mis-datos" className="hover:text-primary transition-colors hidden sm:inline">
                Mis Datos
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#ffdad6] text-[#93000a] font-bold px-4 py-2 rounded-full hover:bg-error hover:text-white transition-colors text-xs"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-on-surface hover:text-primary transition-colors font-semibold">
                Ingresar
              </Link>
              <Link
                to="/register"
                className="bg-primary text-on-primary font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Franja superior Cosecha del día */}
      <div className="bg-surface-container-low border-t border-surface-variant/70 py-2 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-3 py-0.5 rounded-full font-bold tracking-wider uppercase text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Cosecha del día
          </span>
          <p className="text-on-surface font-medium">
            Prensados en frío cada mañana{' '}
            <span className="text-on-surface-variant font-normal">
              · 100% natural, sin conservantes ni azúcar añadida
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}