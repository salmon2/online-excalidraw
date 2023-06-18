import React from 'react';
import * as Styled from './style';

const Button = ({ onClick = () => {}, children = 'Default Button' }) => {
  return <Styled.Button onClick={onClick}>{children}</Styled.Button>;
};

export default Button;
