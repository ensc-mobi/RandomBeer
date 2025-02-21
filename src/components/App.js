import { useState, useEffect } from "react";
import '../styles/App.css';
import { fetchRandomBeer, getImageUrl } from "../services/punkapi";

function App() {

  // Define state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [beerName, setBeerName] = useState("");
  const [beerImage, setBeerImage] = useState("");
  const [beerDescription, setBeerDescription] = useState("");

  // Load a new beer
  const loadBeer = async () => {
    setLoading(true);
    setError(false);

    try {
      const beer = await fetchRandomBeer();

      // Update state
      setBeerName(beer.name);
      setBeerImage(getImageUrl(beer.image));
      setBeerDescription(beer.description);
    } catch (e) {
      setError(true);
    }

    setLoading(false);
  };

  // The empty array [] prevents the effect from running at each re-render
  useEffect(() => {
    // More details; https://www.robinwieruch.de/react-hooks-fetch-data/
    loadBeer();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong :\</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>{beerName}</h1>
      <div className="Description">
        <img className="DescriptionImage" src={beerImage} alt={beerName} />
        <p className="DescriptionText">{beerDescription}</p>
      </div>

      {/* Add a button to fetch another beer */}
      <div className="Button"
        onClick={() => {
          loadBeer();
        }}
      >
        <p >Grab a new beer!</p>
      </div>
    </div>
  );
  
}

export default App;
