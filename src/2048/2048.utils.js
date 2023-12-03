export const tileColors = {
  0: '#eee',
  2: '#139000',
  4: '#18b45f',
  8: '#1cd7be',
  16: '#ebc63f',
  32: '#d5a360',
  64: '#d9899d',
  128: '#b661b0',
  256: '#9238c2',
  512: '#932a9e',
  1024: '#941c79',
  2048: '#960030',
}

export const addNewTile = (board, times = 1) => {
  const newBoard = [...board];

  const emptyTiles = board.reduce((acc, tile, index) => {
    if (tile === 0) {
      acc.push(index);
    }
    return acc;
  }, []);
  
  if (emptyTiles.length > 0) {
    for(let i = 0; i < times; i++){
      const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      newBoard[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  return newBoard; 
};

export const mergeTiles = (board, direction) => {
  const newBoard = [...board];

  switch (direction) {
    case 'up':
      for (let col = 0; col < 4; col++) {
        const column = [newBoard[col], newBoard[col + 4], newBoard[col + 8], newBoard[col + 12]];
        const mergedColumn = mergeLine(column);
        setColumn(newBoard, col, mergedColumn);
      }
      break;

    case 'down':
      for (let col = 0; col < 4; col++) {
        const column = [newBoard[col], newBoard[col + 4], newBoard[col + 8], newBoard[col + 12]];
        const reversedColumn = column.reverse();
        const mergedColumn = mergeLine(reversedColumn);
        setColumn(newBoard, col, mergedColumn.reverse());
      }
      break;

    case 'left':
      for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const line = newBoard.slice(start, start + 4);
        const mergedLine = mergeLine(line);
        setLine(newBoard, row, mergedLine);
      }
      break;

    case 'right':
      for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const line = newBoard.slice(start, start + 4);
        const reversedLine = line.reverse();
        const mergedLine = mergeLine(reversedLine);
        setLine(newBoard, row, mergedLine.reverse());
      }
      break;

    default:
      break;
  }

  return newBoard;
};

export const shiftTiles = (board, direction) => {
  const newBoard = [...board];

  switch (direction) {
    case 'up':
      for (let col = 0; col < 4; col++) {
        const column = [newBoard[col], newBoard[col + 4], newBoard[col + 8], newBoard[col + 12]];
        const shiftedColumn = shiftLine(column);
        setColumn(newBoard, col, shiftedColumn);
      }
      break;

    case 'down':
      for (let col = 0; col < 4; col++) {
        const column = [newBoard[col], newBoard[col + 4], newBoard[col + 8], newBoard[col + 12]];
        const reversedColumn = column.reverse();
        const shiftedColumn = shiftLine(reversedColumn);
        setColumn(newBoard, col, shiftedColumn.reverse());
      }
      break;

    case 'left':
      for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const line = newBoard.slice(start, start + 4);
        const shiftedLine = shiftLine(line);
        setLine(newBoard, row, shiftedLine);
      }
      break;

    case 'right':
      for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const line = newBoard.slice(start, start + 4);
        const reversedLine = line.reverse();
        const shiftedLine = shiftLine(reversedLine);
        setLine(newBoard, row, shiftedLine.reverse());
      }
      break;

    default:
      break;
  }
  return newBoard;
};

const mergeLine = (line) => {
  const mergedLine = [];

  for (let i = 0; i < line.length; i++) {
    if (line[i] !== 0) {
      let mergedValue = line[i];

      while (i + 1 < line.length && mergedValue === line[i + 1]) {
        mergedValue *= 2;
        i++;
      }

      mergedLine.push(mergedValue);
    }
  }

  while (mergedLine.length < 4) {
    mergedLine.push(0);
  }

  return mergedLine;
};

const shiftLine = (line) => {
  const nonNullTiles = line.filter((tile) => tile !== 0);
  const shiftedLine = Array(4).fill(0);

  nonNullTiles.forEach((tile, index) => {
    shiftedLine[index] = tile;
  });

  return shiftedLine;
};

const setColumn = (board, col, column) => {
  for (let i = 0; i < 4; i++) {
    board[col + (i*4)] = column[i];
  }
};

const setLine = (board, row, line) => {
  for (let i = 0; i < 4; i++) {
    board[row * 4 + i] = line[i];
  }
};