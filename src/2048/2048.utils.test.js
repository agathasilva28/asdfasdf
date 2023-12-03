import { addNewTile, mergeTiles, shiftTiles } from './2048.utils';

describe('addNewTile function', () => {
  test('adds a new tile to the board', () => {
    const board = [0, 2, 4, 0, 0, 0, 0, 8, 0, 0, 0, 0, 16, 0, 32, 64];
    const newBoard = addNewTile(board);

    expect(newBoard).toContainEqual(expect.any(Number));
    expect(board).not.toEqual(newBoard);
  });

  test('adds multiple new tiles to the board', () => {
    const board = Array(16).fill(0);
    const newBoard = addNewTile(board, 2);

    expect(newBoard.filter(tile => tile !== 0).length).toBe(2);
    expect(board).not.toEqual(newBoard);
  });

  test('does not add a new tile when the board is full', () => {
    const board = [
      32, 32, 32, 32,
      32, 32, 32, 32,
      32, 32, 32, 32,
      32, 32, 32, 32
    ];
    const newBoard = addNewTile(board);

    expect(newBoard).toEqual(board);
  });
});

describe('mergeTiles function', () => {
  test('merges tiles upward', () => {
    const board = [2, 2, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0];
    const mergedBoard = mergeTiles(board, 'up');
    const expectedBoard = [2, 2, 0, 0, 4, 4, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0];

    expect(mergedBoard).toEqual(expectedBoard);
  });

  test('merges tiles downward', () => {
    const board = [2, 2, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0];
    const mergedBoard = mergeTiles(board, 'down');
    const expectedBoard = [0, 0, 0, 0, 2, 2, 0, 0, 4, 4, 0, 0, 8, 8, 0, 0];

    expect(mergedBoard).toEqual(expectedBoard);
  });

  test('merges tiles leftward', () => {
    const board = [2, 2, 0, 0, 4, 4, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0];
    const mergedBoard = mergeTiles(board, 'left');
    const expectedBoard = [4, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0];

    expect(mergedBoard).toEqual(expectedBoard);
  });

  test('merges tiles rightward', () => {
    const board = [2, 2, 0, 0, 4, 4, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0];
    const mergedBoard = mergeTiles(board, 'right');
    const expectedBoard = [0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 0];

    expect(mergedBoard).toEqual(expectedBoard);
  });

  test('does not modify the board for an invalid direction', () => {
    const board = [2, 2, 0, 0, 4, 4, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0];
    const mergedBoard = mergeTiles(board, 'invalidDirection');

    expect(mergedBoard).toEqual(board);
  });
});

describe('shiftTiles function', () => {
  test('shifts tiles upward', () => {
    const board = [
      2, 0, 4, 0,
      8, 0, 0, 0,
      0, 0, 0, 0,
      16, 0, 32, 64];
    const shiftedBoard = shiftTiles(board, 'up');
    const expectedBoard = [
      2, 0, 4, 64,
      8, 0, 32, 0,
      16, 0, 0, 0,
      0, 0, 0, 0];

    expect(shiftedBoard).toEqual(expectedBoard);
  });

  test('shifts tiles downward', () => {
    const board = [
      2, 0, 4, 0,
      8, 0, 0, 0,
      0, 0, 0, 0,
      16, 0, 32, 64
    ];
    const shiftedBoard = shiftTiles(board, 'down');
    const expectedBoard = [
      0, 0, 0, 0,
      2, 0, 0, 0,
      8, 0, 4, 0,
      16, 0, 32, 64
    ];

    expect(shiftedBoard).toEqual(expectedBoard);
  });

  test('shifts tiles leftward', () => {
    const board = [
      2, 0, 4, 0,
      8, 0, 0, 0,
      0, 0, 0, 0,
      16, 0, 32, 64
    ];
    const shiftedBoard = shiftTiles(board, 'left');
    const expectedBoard = [
      2, 4, 0, 0,
      8, 0, 0, 0,
      0, 0, 0, 0,
      16, 32, 64, 0
    ];

    expect(shiftedBoard).toEqual(expectedBoard);
  });

  test('shifts tiles rightward', () => {
    const board = [
      2, 0, 4, 0,
      8, 0, 0, 0,
      0, 0, 0, 0,
      16, 0, 32, 64];
    const shiftedBoard = shiftTiles(board, 'right');
    const expectedBoard = [
      0, 0, 2, 4,
      0, 0, 0, 8,
      0, 0, 0, 0,
      0, 16, 32, 64];

    expect(shiftedBoard).toEqual(expectedBoard);
  });

  test('does not modify the board for an invalid direction', () => {
    const board = [2, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0, 16, 0, 32, 64];
    const shiftedBoard = shiftTiles(board, 'invalidDirection');

    expect(shiftedBoard).toEqual(board);
  });
});