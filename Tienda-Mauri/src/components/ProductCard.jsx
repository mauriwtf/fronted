import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { getImageUrl } from '../services/api';

export default function ProductCard({ producto }) {
  const { agregar } = useCarrito();

  const imagenUrl = getImageUrl(producto.imagen_url);
  const tieneStock = producto.stock !== undefined;
  const agotado = tieneStock && producto.stock <= 0;

  return (
    <article className="bg-white border border-surface-variant rounded-2xl overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">
      {/* Imagen superior con badges flotantes */}
      <div className="relative h-56 w-full bg-surface-container-low overflow-hidden">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            width="320"
            height="224"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">local_drink</span>
          </div>
        )}

        {/* Badge flotante de Stock arriba a la derecha */}
        {tieneStock && (
          <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-on-surface px-3 py-1 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${agotado ? 'bg-error' : 'bg-emerald-500'}`}></span>
            {agotado ? 'Agotado' : `Stock: ${producto.stock}`}
          </span>
        )}

        {/* Etiqueta inferior izquierda sobre la imagen */}
        <span className="absolute bottom-3 left-3 bg-primary/90 text-on-primary px-3 py-1 rounded-full text-[11px] font-medium">
          500 ml · Cold-Press
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <span className="bg-primary-container text-primary text-[11px] font-semibold px-2.5 py-0.5 rounded-md w-fit">
          Natural
        </span>

        <h3 className="font-display text-xl font-bold text-on-surface leading-snug">
          {producto.nombre}
        </h3>

        <p className="font-sans text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
          {producto.descripcion || 'Jugo natural prensado en frío.'}
        </p>

        {/* Precio y botón de agregar */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-surface-variant/60">
          <span className="font-display text-xl font-bold text-on-surface">
            ${producto.precio}
          </span>

          <button
            onClick={() => agregar(producto)}
            disabled={agotado}
            title={agotado ? 'Sin stock' : 'Agregar al carrito'}
            className="bg-primary text-on-primary h-10 w-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}