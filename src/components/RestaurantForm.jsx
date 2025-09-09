import { useState, useEffect } from "react";

export default function RestaurantForm({ onAdd, editando, onCancel }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [puntuacion, setPuntuacion] = useState(5); // valor inicial 5
  const [comentario, setComentario] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  useEffect(() => {
    if (editando) {
      setNombre(editando.nombre);
      setTipo(editando.tipo);
      setPuntuacion(editando.puntuacion);
      setComentario(editando.comentario);
      setUbicacion(editando.ubicacion);
    } else {
      setNombre("");
      setTipo("");
      setPuntuacion(5);
      setComentario("");
      setUbicacion("");
    }
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !tipo || puntuacion === "") return;

    onAdd({
      nombre,
      tipo,
      puntuacion: parseFloat(puntuacion),
      comentario,
      ubicacion,
    });

    // Limpiar formulario solo si no estamos editando
    if (!editando) {
      setNombre("");
      setTipo("");
      setPuntuacion(5);
      setComentario("");
      setUbicacion("");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Limpiar formulario
    setNombre("");
    setTipo("");
    setPuntuacion(5);
    setComentario("");
    setUbicacion("");
  };

  return (
    <form onSubmit={handleSubmit} className="restaurant-form">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editando ? "✏️ Editar restaurante" : "➕ Añadir restaurante"}
      </h2>

      <input
        type="text"
        placeholder="Nombre del restaurante"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="block mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        required
      />

      <input
        type="text"
        placeholder="Tipo de comida (ej: Italiano, Japonés, Mexicano)"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="block mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        required
      />

      {/* Slider de puntuación */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          Puntuación: <span className="text-blue-600">{puntuacion}</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)}
          className="slider w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          
        </div>
      </div>

      <textarea
        placeholder="Comentario o reseña personal (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        className="block mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        rows="3"
      />

      <input
        type="url"
        placeholder="URL de Google Maps (opcional)"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        className="block mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      <div className="flex gap-3">
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex-1"
        >
          {editando ? "💾 Guardar cambios" : "➕ Añadir"}
        </button>
        
        {editando && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
