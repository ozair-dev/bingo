import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import Board from "./components/Board";

import {
  makeBoardEntries,
  updateMarked,
  shuffle,
  playPcTurn,
  countMarkedLines,
} from "./helpers";

function App() {
  const titleRef = useRef(null);

  const [myBoard, setMyBoard] = useState(shuffle(makeBoardEntries()));
  const [myTurn, setMyTurn] = useState(false);
  const [iWin, setIWin] = useState(false);

  const [opponentBoard, setOpponentBoard] = useState(
    shuffle(makeBoardEntries())
  );

  const [gameState, setGameState] = useState("fresh");

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add("transform");
    }
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      if (countMarkedLines(myBoard) >= 5) {
        setIWin(true);
        setGameState("finished");
        return;
      } else if (countMarkedLines(opponentBoard) >= 5) {
        setGameState("finished");
        return;
      }

      if (!myTurn) {
        setTimeout(() => handleMark(playPcTurn(opponentBoard)), 1000);
      }
    }
  }, [myTurn]);

  return (
    <div className="App">
      <div className="title" ref={titleRef}>
        <span>B</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>O</span>
      </div>

      {/* Board:
          User can see a 5X5 board.
          Below that are shuffle and start button
          game starts on start button
          user can click on any number to mark it, then it is computer's turn
          First to have 5 lines with all numbers marked wins
       */}

      {gameState === "finished" && (
        <p className="who-won">You {iWin ? "Won" : "Lost"}</p>
      )}

      <div className="boards">
        <Board
          data={myBoard}
          handleMark={handleMark}
          myTurn={myTurn}
          fill="dodgerblue"
        />
        {gameState == "finished" && (
          <Board data={opponentBoard} myTurn={!myTurn} fill="tomato" />
        )}
      </div>

      <div className="controls">
        {gameState == "fresh" ? (
          <>
            <button onClick={handleShuffle}>Shuffle</button>
            <button onClick={handleGameStart}>Start</button>
          </>
        ) : (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
    </div>
  );

  function handleMark(val) {
    if (!myBoard.find((obj) => obj.value == val).marked) {
      setMyBoard(updateMarked(myBoard, val));
      setOpponentBoard(updateMarked(opponentBoard, val));
      setMyTurn((prev) => !prev);
    }
  }

  function handleShuffle() {
    setMyBoard(shuffle(myBoard));
    setOpponentBoard(shuffle(opponentBoard));
  }

  function handleGameStart() {
    setMyTurn(true);
    setGameState("playing");
  }

  function handleReset() {
    setMyBoard(shuffle(makeBoardEntries()));
    setOpponentBoard(shuffle(makeBoardEntries()));
    setMyTurn(false);
    setIWin(false);
    setGameState("fresh");
  }
}

export default App;
