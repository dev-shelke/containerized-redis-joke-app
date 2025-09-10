import React, { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [cached, setCached] = useState(false);

  const fetchJoke = async () => {
    try {
      const res = await fetch("/api/joke"); 
      const data = await res.json();
      setJoke(data.joke);
      setCached(data.cached);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}>
      <h1>😂 Random Joke App</h1>
      <button onClick={fetchJoke} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Get Joke
      </button>
      {joke && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>{joke}</strong></p>
          <p style={{ color: cached ? "green" : "blue" }}>
            {cached ? "Served from Redis Cache ✅" : "Fetched Fresh 🌐"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

