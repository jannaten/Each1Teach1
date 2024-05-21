import { createContext, useState } from 'react';
import { colors } from '../config';

export const ColorContext = createContext();

const ColorContextProvider = ({ children }) => {
  const { defaultColor } = colors;
  const [primary, setPrimary] = useState(defaultColor);

  return (
    <ColorContext.Provider
      value={{
        setPrimary,
        primary
      }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContextProvider;
