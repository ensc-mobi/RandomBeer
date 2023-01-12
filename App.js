import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import styles from "./theme/styles";
import fetchRandomBeer from "./api/punkapi";

export default App = () => {
  // Define state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [beerName, setBeerName] = useState("");
  const [beerDescription, setBeerDescription] = useState("");

  // Load a new beer
  const loadBeer = async () => {
    setLoading(true);
    setError(false);

    try {
      const beer = await fetchRandomBeer();

      // Update state
      setBeerName(beer.name);
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
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong :\</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{beerName}</Text>
      <Text style={styles.description}>{beerDescription}</Text>
      {/* Add a button to fetch another beer */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loadBeer();
        }}
      >
        <Text>Grab a new beer!</Text>
      </TouchableOpacity>
    </View>
  );
};
