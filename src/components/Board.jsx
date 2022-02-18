import React from "react";
import { countMarkedLines } from "../helpers";

const BINGO = "BINGO".split("");

const Board = ({ data, handleMark, myTurn, fill }) => {
  const markedLines = countMarkedLines(data);
  return (
    <div className={`board ${myTurn ? "turn" : ""}`}>
      <div className="board__bingo">
        {BINGO.map((a, i) => (
          <div key={i} className={`cell ${i < markedLines ? "done" : ""}`}>
            <p>{a}</p>
          </div>
        ))}
      </div>

      <div className="board__entries">
        {data.map(({ value, marked }, idx) => (
          <div
            key={idx}
            onClick={handleMark ? () => myTurn && handleMark(value) : null}
            className={`cell ${marked ? "marked" : ""} ${fill}`}
          >
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
