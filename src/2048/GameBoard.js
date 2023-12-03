import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shiftTiles, mergeTiles, addNewTile } from './2048.utils';
import Tile from './components/Tile';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  justify-content: center;
`;

const GameBoard = () => {
  const [gameBoard, setBoard] = useState(Array(16).fill(0));
  
  const move = (direction) => {
    let newBoard = [...gameBoard];
    newBoard = shiftTiles(newBoard, direction);
    newBoard = mergeTiles(newBoard, direction);
    newBoard = shiftTiles(newBoard, direction);
    newBoard = addNewTile(newBoard)

    setBoard(newBoard);
  };

  const handleKeyDown = (event) => {
    const key = event.key;
  
    switch (key) {
      case 'ArrowUp':
        move('up');
        break;
      case 'ArrowDown':
        move('down');
        break;
      case 'ArrowLeft':
        move('left');
        break;
      case 'ArrowRight':
        move('right');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setBoard(addNewTile(gameBoard, 2));
  }, []);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameBoard]);

  return (
    <Grid>
      {gameBoard.map((value, index) => (
        <Tile index={index} value={value} />
      ))}
    </Grid>
  );
};

export default GameBoard;