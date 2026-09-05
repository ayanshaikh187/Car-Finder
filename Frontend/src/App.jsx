import { useEffect, useState } from "react";

function App() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        search,
        make,
        model,
        price,
      });

      const url = `${import.meta.env.VITE_API_URL}/cars?${params.toString()}`;

      window.history.pushState({}, "", `?${params.toString()}`);

      const res = await fetch(url);

      const data = await res.json();

      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [search, make, model, price]);

  const resetFilters = () => {
    setSearch("");
    setMake("");
    setModel("");
    setPrice("");
  };

  return (
    <div className="app">
      <h1>🚗 Car Finder</h1>

      <div className="search">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Make */}
        <select
          value={make}
          onChange={(e) => setMake(e.target.value)}
        >
          <option value="">All Makes</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="Tesla">Tesla</option>
        </select>

        {/* Model */}
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="">All Models</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Reset */}
        <button onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {/* Results */}
      <div className="car-list">

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading cars...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="no-cars">
            <h2>🚫 No Cars Found</h2>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <h2>{car.name}</h2>

              <p>
                <strong>Make:</strong> {car.make}
              </p>

              <p>
                <strong>Model:</strong> {car.model}
              </p>

              <p className="price">
                ${car.price.toLocaleString()}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default App;