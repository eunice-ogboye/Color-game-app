import React, { useState, useEffect } from "react";
import "./Game.css";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [revealed, setRevealed] = useState(Array(6).fill(false));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => startNewGame(), []);

  const startNewGame = () => {
    const newTarget = colors[Math.floor(Math.random() * colors.length)];
    const shuffledOptions = shuffleArray([newTarget, ...getRandomColors(newTarget)]);
    setTargetColor(newTarget);
    setOptions(shuffledOptions);
    setRevealed(Array(6).fill(false));
    setStatus("");
  };

  const getRandomColors = (correctColor) => 
    colors.filter(color => color !== correctColor).sort(() => Math.random() - 0.5).slice(0, 5);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleGuess = (index) => {
    setRevealed(prevRevealed => {
      const updatedRevealed = [...prevRevealed];
      updatedRevealed[index] = true;
      return updatedRevealed;
    });

    const isCorrect = options[index] === targetColor;
    setStatus(isCorrect ? "Correct!" : "Wrong! Try Again");
    if (isCorrect) setScore(prevScore => prevScore + 1);
  };

  return (
    <div className="game-container">
      <h1 data-testid="gameInstructions">Guess the Correct Color!</h1>
      <div className="color-box" data-testid="colorBox" style={{ backgroundColor: targetColor }}></div>
      <div className="options">
        {options.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className={`color-button ${revealed[index] ? "revealed" : ""}`}
            style={{ backgroundColor: revealed[index] ? color : "white" }}
            onClick={() => handleGuess(index)}
          ></button>
        ))}
      </div>
      <p data-testid="gameStatus" className={`status ${status === "Correct!" ? "correct-anim" : status ? "wrong-anim" : ""}`}>{status}</p>
      <p data-testid="score" className="score">Score: {score}</p>
      <button data-testid="newGameButton" className="new-game" onClick={startNewGame}>New Game</button>
    </div>
  );
};

export default ColorGame;
