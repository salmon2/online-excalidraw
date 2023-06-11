import React from 'react';
import * as Styled from './style';

const Button = ({ children = 'Default Button' }) => {
  return <Styled.Button>{children}</Styled.Button>;
};

export default Button;
