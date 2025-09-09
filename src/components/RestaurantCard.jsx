export default function RestaurantCard({ nombre, tipo, puntuacion, comentario, ubicacion }) {
  return (
    <div className="border rounded-2xl shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold">{nombre}</h2>
      <p className="text-sm text-gray-600">{tipo}</p>
      <p className="mt-2">⭐ {puntuacion}</p>
      <p className="italic">"{comentario}"</p>
      <a href={ubicacion} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        Ver en Maps
      </a>
    </div>
  );
}
