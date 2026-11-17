import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductos } from '../services/api';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [lento, setLento] = useState(false);
  const LIMIT = 4;

  useEffect(() => {
    if (!isLoading) {
      setLento(false);
      return;
    }
    const t = setTimeout(() => setLento(true), 5000);
    return () => clearTimeout(t);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getProductos({ page, limit: LIMIT, nombre: busqueda })
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else if (data && Array.isArray(data.items)) {
          setProductos(data.items);
        } else {
          setProductos([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar los productos. Intente nuevamente más tarde.');
      })
      .finally(() => setIsLoading(false));
  }, [page, busqueda]);

  const handleBusqueda = (e) => {
    setPage(0);
    setBusqueda(e.target.value);
  };

  return (
    <main className="pt-36 md:pt-40 px-4 md:px-12 max-w-[1280px] mx-auto flex flex-col gap-8 mb-24">
      {/* Encabezado editorial */}
      <section className="flex flex-col gap-5 pb-6 border-b border-surface-variant">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-secondary block mb-1.5">
              Colección Artesanal
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
              Catálogo de Productos
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {!isLoading && !error && (
              <span className="text-xs text-on-surface-variant font-medium">
                Mostrando {productos.length} {productos.length === 1 ? 'variedad disponible' : 'variedades disponibles'}
              </span>
            )}

            {/* Buscador */}
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={handleBusqueda}
                className="w-full h-10 pl-10 pr-4 bg-white border border-surface-variant rounded-full font-sans text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estados de carga y error */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 py-12">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p role="status" className="text-on-surface-variant font-medium text-sm">
            {lento
              ? 'Despertando el servidor, la primera visita puede tardar un minuto...'
              : 'Cargando productos...'}
          </p>
        </div>
      )}

      {error && (
        <p className="text-error font-bold text-center bg-[#ffdad6] p-4 rounded-2xl">
          {error}
        </p>
      )}

      {!isLoading && !error && productos.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
          <p className="text-lg">No se encontraron productos.</p>
        </div>
      )}

      {/* Grilla de productos */}
      {!isLoading && !error && productos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {productos.map((prod) => (
              <ProductCard key={prod.id} producto={prod} />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-surface-variant text-sm font-medium text-on-surface hover:border-primary/40 disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Anterior
            </button>
            <span className="text-sm font-semibold text-on-surface-variant">
              Página {page + 1}
            </span>
            <button
              disabled={productos.length < LIMIT}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-surface-variant text-sm font-medium text-on-surface hover:border-primary/40 disabled:opacity-40 transition-colors"
            >
              Siguiente
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </>
      )}
    </main>
  );
}