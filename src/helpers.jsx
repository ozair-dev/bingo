export function makeBoardEntries() {
  const board = Array(25)
    .fill(null)
    .map((val, idx) => ({
      value: idx + 1,
      marked: false,
    }));

  return board;
}

export function shuffle(arr) {
  const shuffled = [...arr];
  arr.forEach((val, idx) => {
    const randIdx = Math.floor(Math.random() * arr.length);
    [shuffled[idx], shuffled[randIdx]] = [shuffled[randIdx], shuffled[idx]];
  });
  return shuffled;
}

export function updateMarked(arr, val) {
  const tempArr = [...arr];
  const index = tempArr.findIndex((obj) => obj.value === val);
  tempArr[index].marked = true;
  return tempArr;
}

export function playPcTurn(arr) {
  let entries = [...arr].filter((v) => !v.marked);
  const idx = Math.floor(Math.random() * entries.length);
  return entries[idx].value;
}

export function countMarkedLines(arr) {
  let totalLinesMarked = 0;

  // checking if any horozontal line fully marked
  for (let i = 0; i <= 24; i += 6) {
    if (!arr[i].marked) break;
    else if (i === 24) totalLinesMarked++;
  }

  for (let i = 4; i <= 20; i += 4) {
    if (!arr[i].marked) break;
    else if (i === 20) totalLinesMarked++;
  }

  // checking if any horizontal line fully marked
  for (let i = 0; i <= 20; i += 5) {
    for (let j = i; j <= i + 4; j++) {
      if (!arr[j].marked) break;
      else if (j == i + 4) totalLinesMarked++;
    }
  }

  // checking if any vertical line fully marked
  for (let i = 0; i <= 4; i++) {
    for (let j = i; j <= i + 20; j += 5) {
      if (!arr[j].marked) break;
      else if (j === i + 20) totalLinesMarked++;
    }
  }

  return totalLinesMarked;
}
