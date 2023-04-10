import { ThemeOptions } from '@mui/material/styles';
import { enUS, heIL } from '@mui/material/locale';

type Fonts = {
  regular: string;
  bold: string;
  italic: string;
  light: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    fonts?: Fonts;
  }

  interface ThemeOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    fonts?: Fonts;
  }
}

const defaultTheme = {
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'OpenSansHebrew',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#356559',
      dark: '#2c544a',
      light: '#FEFDFD',
    },
    secondary: {
      main: '#D48245',
    },
  },
  fonts: {
    regular: 'OpenSansHebrew',
    bold: 'OpenSansHebrewBold',
    italic: 'OpenSansHebrewItalic',
    light: 'OpenSansHebrewLight',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.primary.light,
          fontSize: '22px',
          color: '#000',
          fontFamily: themeParam.fonts.regular,
        },
      }),
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '80px',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '22px',
          textTransform: 'none',
          '@media (max-width: 600px)': {
            fontSize: '18px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            fontSize: '19px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            fontSize: '19px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            fontSize: '19px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            fontSize: '19px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#356559',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'OpenSansHebrewBold',
        },
        h1: {
          fontSize: '60px',
          '@media (max-width: 600px)': {
            fontSize: '50px',
          },
        },
        h2: {
          fontSize: '45px',
          '@media (max-width: 600px)': {
            fontSize: '30px',
          },
        },
        h3: {
          fontSize: '35px',
          '@media (max-width: 600px)': {
            fontSize: '27px',
          },
        },
        body1: {
          fontSize: '22px',
          fontFamily: 'OpenSansHebrew',
        },
      },
    },
  },
};

const getDesignTokens = (lang: string) => {
  const langLocale = lang === 'he' ? heIL : enUS;
  return {
    ...defaultTheme,
    direction: lang === 'he' ? 'rtl' : 'ltr',
    langLocale,
  } as ThemeOptions;
};

export default getDesignTokens;
