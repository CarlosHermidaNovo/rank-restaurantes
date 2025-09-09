export default function RestaurantCard({ id, nombre, tipo, puntuacion, comentario, ubicacion, onDelete, onEdit, esDelJson = false }) {
  const handleDelete = () => {
    if (esDelJson) {
      alert("No puedes eliminar un restaurante predefinido del archivo JSON.");
      return;
    }
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className={`restaurant-card ${esDelJson ? 'json-restaurant' : 'local-restaurant'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
          {esDelJson && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
              📋 Predefinido
            </span>
          )}
        </div>
        <span className="text-lg font-semibold text-yellow-600">⭐ {puntuacion}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2 font-medium">{tipo}</p>
      
      {comentario && (
        <p className="italic text-gray-700 mb-3">"{comentario}"</p>
      )}
      
      {ubicacion && (
        <div className="mb-3">
          <a 
            href={ubicacion} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-700 underline text-sm"
          >
            📍 Ver en Maps
          </a>
        </div>
      )}
      
      <div className="flex gap-2 pt-2 border-t border-gray-200">
        <button
          onClick={() => onEdit(id)}
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white font-medium transition-colors duration-200"
        >
          {esDelJson ? "📝 Copiar y editar" : "✏️ Editar"}
        </button>
        <button
          onClick={handleDelete}
          disabled={esDelJson}
          className={`px-3 py-1 rounded font-medium transition-colors duration-200 ${
            esDelJson 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}