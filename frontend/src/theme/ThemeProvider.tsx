import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ReactNode, useState, useMemo, useEffect } from "react";
import { theme } from "./theme";
import { ThemeContext } from "./themeContext";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const currentTheme = useMemo(() => {
    return createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        mode: isDarkMode ? 'dark' : 'light',
        primary: isDarkMode ? theme.palette.secondary : theme.palette.primary,
        secondary: isDarkMode ? theme.palette.primary : theme.palette.secondary,
        background: {
          default: isDarkMode ? '#121212' : '#ffffff',
          paper: isDarkMode ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
          secondary: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
              color: isDarkMode ? '#ffffff' : '#ffffff',
              '&:hover': {
                backgroundColor: isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark,
              },
            },
            outlined: {
              backgroundColor: 'transparent',
              color: isDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
              borderColor: isDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(156, 39, 176, 0.04)' : 'rgba(25, 118, 210, 0.04)',
                borderColor: isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark,
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
            }
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
            },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: {
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              color: isDarkMode ? theme.palette.secondary.light : theme.palette.primary.main,
              '&:hover': {
                color: isDarkMode ? theme.palette.secondary.main : theme.palette.primary.dark,
              },
            },
          },
        },
      },
    });
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;