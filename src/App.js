import { useState } from "react";
import data from "./data/restaurantes.json";
import RestaurantCard from "./components/RestaurantCard";

function App() {
  const [restaurantes] = useState(data);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🍽️ Mis restaurantes</h1>
      {restaurantes
        .sort((a, b) => b.puntuacion - a.puntuacion)
        .map(r => (
          <RestaurantCard key={r.id} {...r} />
        ))}
    </div>
  );
}

export default App;

