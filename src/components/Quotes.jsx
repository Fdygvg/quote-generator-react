import React from "react";
import "../index.css";
import { useEffect, useState, useCallback } from "react";

const Quotes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random");
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error("Error Retrieving Quote:" + error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="quoteBox">
        {loading ? (
          <p>Loading quote...</p>
        ) : data && data[0] ? (
          <>
            <p>{data[0].q}</p>
            <h3>-{data[0].a}</h3>
          </>
        ) : (
          <>
            <p>To be or Not to Be</p>
            <h3>-ShakesSphere</h3>
          </>
        )}
      </div>

      <button className="generateQuoteBtn" onClick={fetchData}>
        New Quote!
      </button>
    </>
  );
};

export default Quotes;
