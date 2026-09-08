import React from 'react';
export const useTheme = () => {
  const [theme, setTheme] = React.useState('light');    

  return [theme, setTheme];
};