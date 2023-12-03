import React from 'react';
import styled from 'styled-components';
import { tileColors } from '../2048.utils';

const StyledTile = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.color || '#777'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

const Tile = ({index, value}) => {
  return (
    <StyledTile key={index} color={tileColors[value]} >
      {value}
    </StyledTile>
  );
};

export default Tile;