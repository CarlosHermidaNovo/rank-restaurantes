import { useState, useEffect } from "react";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantForm from "./components/RestaurantForm";
import './App.css';

const LOCAL_STORAGE_KEY = "misRestaurantes";

function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [restaurantesJson, setRestaurantesJson] = useState([]);
  const [restaurantesLocal, setRestaurantesLocal] = useState([]);

  // Cargar datos del JSON y localStorage al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar JSON
        const response = await fetch("/data/restaurantes.json");
        const dataJson = await response.json();
        setRestaurantesJson(dataJson);

        // Cargar localStorage
        const guardados = localStorage.getItem(LOCAL_STORAGE_KEY);
        const dataLocal = guardados ? JSON.parse(guardados) : [];
        setRestaurantesLocal(dataLocal);

        // Combinar datos evitando duplicados (prioridad al JSON)
        combinarRestaurantes(dataJson, dataLocal);
      } catch (err) {
        console.error("Error cargando datos:", err);
        // Si falla el JSON, solo cargar localStorage
        const guardados = localStorage.getItem(LOCAL_STORAGE_KEY);
        const dataLocal = guardados ? JSON.parse(guardados) : [];
        setRestaurantesLocal(dataLocal);
        setRestaurantes(dataLocal);
      }
    };

    cargarDatos();
  }, []);

  // Función para combinar restaurantes evitando duplicados
  const combinarRestaurantes = (dataJson, dataLocal) => {
    // Crear un Set con los nombres de los restaurantes del JSON (en minúsculas para comparación)
    const nombresJson = new Set(
      dataJson.map(r => r.nombre.toLowerCase().trim())
    );

    // Filtrar restaurantes del localStorage que no estén en el JSON
    const localUnicos = dataLocal.filter(
      r => !nombresJson.has(r.nombre.toLowerCase().trim())
    );

    // Combinar: JSON + localStorage únicos
    const restaurantesCombinados = [...dataJson, ...localUnicos];
    setRestaurantes(restaurantesCombinados);
  };

  // Guardar solo los restaurantes del localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurantesLocal));
    // Recombinar datos cuando cambien los restaurantes locales
    combinarRestaurantes(restaurantesJson, restaurantesLocal);
  }, [restaurantesLocal, restaurantesJson]);

  const handleAddRestaurant = (nuevo) => {
    if (editando) {
      // Verificar si estamos editando un restaurante del JSON o del localStorage
      const restauranteEditando = restaurantes.find(r => r.id === editando);
      const esDelJson = restaurantesJson.some(r => r.id === editando);

      if (esDelJson) {
        // No se puede editar un restaurante del JSON, crear una copia en localStorage
        alert("No puedes editar un restaurante predefinido. Se creará una copia con tus cambios.");
        const nuevoId = Math.max(
          ...restaurantes.map(r => r.id),
          ...restaurantesLocal.map(r => r.id),
          0
        ) + 1;
        
        setRestaurantesLocal(prev => [...prev, { ...nuevo, id: nuevoId }]);
      } else {
        // Editar restaurante del localStorage
        setRestaurantesLocal(prev =>
          prev.map(r => (r.id === editando ? { ...r, ...nuevo } : r))
        );
      }
      setEditando(null);
    } else {
      // Añadir nuevo restaurante
      const nuevoId = Math.max(
        ...restaurantes.map(r => r.id),
        ...restaurantesLocal.map(r => r.id),
        0
      ) + 1;
      
      setRestaurantesLocal(prev => [...prev, { ...nuevo, id: nuevoId }]);
    }
  };

  const handleDelete = (id) => {
    const esDelJson = restaurantesJson.some(r => r.id === id);
    
    if (esDelJson) {
      alert("No puedes eliminar un restaurante predefinido del archivo JSON.");
      return;
    }
    
    // Solo eliminar de localStorage
    setRestaurantesLocal(prev => prev.filter(r => r.id !== id));
  };

  const handleEdit = (id) => {
    const r = restaurantes.find(r => r.id === id);
    if (r) setEditando(id);
  };

  const cancelEdit = () => setEditando(null);

  // Función para identificar si un restaurante viene del JSON
  const esRestauranteDelJson = (id) => {
    return restaurantesJson.some(r => r.id === id);
  };

  return (
    <div className="App" style={{ backgroundColor: '#FFD4BF', minHeight: '100vh' }}>
      <div className="main-container">
        <h1 className="main-title">Mis restaurantes</h1>

        <RestaurantForm
          onAdd={handleAddRestaurant}
          editando={editando ? restaurantes.find((r) => r.id === editando) : null}
          onCancel={cancelEdit}
        />

        <div className="restaurants-list">
          {restaurantes.length === 0 ? (
            <div className="restaurant-card" style={{ textAlign: 'center', color: '#666' }}>
              <p>No tienes restaurantes guardados aún.</p>
              <p>¡Añade tu primer restaurante usando el formulario de arriba!</p>
            </div>
          ) : (
            restaurantes
              .sort((a, b) => b.puntuacion - a.puntuacion)
              .map((r) => (
                <RestaurantCard
                  key={r.id}
                  {...r}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  esDelJson={esRestauranteDelJson(r.id)}
                />
              ))
          )}
        </div>

        {/* Información sobre los tipos de restaurantes */}
        <div className="restaurant-card" style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          backgroundColor: '#f0f8ff',
          border: '2px dashed #4CAF50'
        }}>
          <p><strong>ℹ️ Información:</strong></p>
          <p>• Los restaurantes predefinidos no se pueden eliminar</p>
          <p>• Al editar un restaurante predefinido, se crea una copia personalizable</p>
          <p>• Tus restaurantes personalizados se guardan en tu navegador</p>
        </div>
      </div>
    </div>
  );
}

export default App;