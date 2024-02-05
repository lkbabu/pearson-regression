"use client";
import React, { useState } from "react";

export default function Home() {
  const [coordinates, setCoordinates] = useState([]);
  const [xCoordinate, setXCoordinate] = useState("");
  const [yCoordinate, setYCoordinate] = useState("");
  const [pearsonsRegression, setPearsonsRegression] = useState(null);

  const handleAddToList = () => {
    if (xCoordinate !== "" && yCoordinate !== "") {
      setCoordinates([
        ...coordinates,
        { x: parseFloat(xCoordinate), y: parseFloat(yCoordinate) },
      ]);
      setXCoordinate("");
      setYCoordinate("");
    }
  };

  const calculatePearsonsRegression = () => {
    if (coordinates.length > 1) {
      const n = coordinates.length;
      const sumX = coordinates.reduce((acc, curr) => acc + curr.x, 0);
      const sumY = coordinates.reduce((acc, curr) => acc + curr.y, 0);
      const sumXY = coordinates.reduce((acc, curr) => acc + curr.x * curr.y, 0);
      const sumXSquared = coordinates.reduce(
        (acc, curr) => acc + Math.pow(curr.x, 2),
        0
      );
      const sumYSquared = coordinates.reduce(
        (acc, curr) => acc + Math.pow(curr.y, 2),
        0
      );

      const pearsonNumerator = n * sumXY - sumX * sumY;
      const pearsonDenominator = Math.sqrt(
        (n * sumXSquared - Math.pow(sumX, 2)) *
          (n * sumYSquared - Math.pow(sumY, 2))
      );

      const pearsonCorrelation = pearsonNumerator / pearsonDenominator;
      setPearsonsRegression(pearsonCorrelation);
    } else {
      setPearsonsRegression(null);
    }
  };

  return (
    <main className="bg-slate-400 min-h-screen">
      <div className="navbar bg-green-50">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl mx-auto">
            🧮Pearson's Regression
          </a>
        </div>
      </div>

      <div className="max-w-5xl mt-5 px-10 mx-auto">
        <div className="flex gap-x-4">
          <div className="card w-auto bg-base-100 shadow-xl ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Enter new coordinate</h2>

              <form>
                <div className="flex space-x-3 ">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">x coordinate</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={xCoordinate}
                      onChange={(e) => setXCoordinate(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs ">
                    <div className="label">
                      <span className="label-text">y coordinate</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={yCoordinate}
                      onChange={(e) => setYCoordinate(e.target.value)}
                    />
                  </label>
                </div>
              </form>

              <div className="card-actions">
                <button className="btn btn-primary" onClick={handleAddToList}>
                  Add to list
                </button>
              </div>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={calculatePearsonsRegression}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Data Points</h2>
              <ul>
                {coordinates.map((coord, index) => (
                  <li key={index}>{`(${coord.x}, ${coord.y})`}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Pearson's Regression</h2>
              {pearsonsRegression !== null ? (
                <p>Pearson's Regression: {pearsonsRegression}</p>
              ) : (
                <p>No enough data points to calculate Pearson's Regression.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
