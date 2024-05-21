export const themePalate = [
  {
    id: 1,
    name: 'default',
    primary: '#4E008E',
    secondary: '#A562E3',
    themeIdentity: 'defaultTheme'
  }
];

export const colors = {
  dark: '#000000',
  bright: '#ffffff'
};

export const colorsDefault = {
  primary: themePalate[0].primary,
  secondary: themePalate[0].secondary,
  basic: colors
};

export const themes = {
  defaultTheme: colorsDefault
};
