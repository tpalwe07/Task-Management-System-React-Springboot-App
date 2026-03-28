import { createTheme } from '@mui/material';
import './style.css';

export enum COLORS {
  white = '#fff',
  black = '#000',
  boxShadow = '#00000033',
  placeholder = '#666666',
  selectHover = '#bae6f4',
  focusBorder = '#999999',
  lightBorder = '#99999916',
  primaryMain = '#0096d6',
  primaryMainLight = '#0096d616',
  primaryDark = '#005a80',
  secondaryLight = '#edf2ff',
  secondaryMain = '#efefef',
  secondaryDark = '#dddddd',
  successColor = '#8bc34a',
  successMain = '#4caf50',
  successDark = '#009688',
  successLight = '#00bcd4',
  successColorLight = '#8bc34a16',
  errorColor = '#f50057',
  errorColorLight = '#f5005716',
  primaryDisabled = '#87cdec',
  secondaryDisabled = '#00000042',
  errorDisabled = '#F8BBD0'
}

// Dark mode colors
export enum DARK_COLORS {
  background = '#121212',
  paper = '#1e1e1e',
  white = '#ffffff',
  textSecondary = '#b0b0b0',
  boxShadow = '#ffffff33',
  placeholder = '#999999',
  selectHover = '#2a4f5c',
  focusBorder = '#666666',
  lightBorder = '#ffffff16',
  primaryMain = '#4db8e8',
  primaryMainLight = '#4db8e816',
  primaryDark = '#0096d6',
  secondaryLight = '#2a2a3e',
  secondaryMain = '#2a2a2a',
  secondaryDark = '#3a3a3a',
  primaryDisabled = '#2a5f7a',
  secondaryDisabled = '#ffffff42'
}

// eslint-disable-next-line react-func/max-lines-per-function, complexity
export const getTheme = (mode: 'light' | 'dark' = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      ...(isDark
        ? {
          background: {
            default: DARK_COLORS.background,
            paper: DARK_COLORS.paper
          },
          text: {
            primary: DARK_COLORS.white,
            secondary: DARK_COLORS.textSecondary
          }
        }
        : {}),
      primary: {
        main: isDark ? DARK_COLORS.primaryMain : COLORS.primaryMain,
        dark: isDark ? DARK_COLORS.primaryDark : COLORS.primaryDark
      },
      secondary: {
        light: isDark ? DARK_COLORS.secondaryLight : COLORS.secondaryLight,
        main: isDark ? DARK_COLORS.secondaryMain : COLORS.secondaryMain,
        dark: isDark ? DARK_COLORS.secondaryDark : COLORS.secondaryDark
      },
      success: {
        light: COLORS.successColor,
        main: COLORS.successMain,
        dark: COLORS.successDark
      },
      error: {
        light: '#ef5350',
        main: COLORS.errorColor,
        dark: '#d32f2f'
      },
      action: {
        focus: isDark ? DARK_COLORS.primaryDark : COLORS.primaryDark,
        disabledBackground: isDark ? DARK_COLORS.primaryDisabled : COLORS.primaryDisabled
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontFamily: 'Volte-Semibold',
            borderWidth: '2px',
            borderColor: 'currentColor'
          },
          outlined: {
            '&.Mui-disabled.MuiButton-colorPrimary': {
              color: COLORS.primaryDisabled,
              borderColor: COLORS.primaryDisabled
            },
            '&.Mui-disabled.MuiButton-colorSecondary': {
              color: COLORS.secondaryDisabled,
              borderColor: COLORS.secondaryDisabled
            },
            '&.Mui-disabled.MuiButton-colorError': {
              color: COLORS.errorDisabled,
              borderColor: COLORS.errorDisabled
            },
            '&.MuiButton-colorSecondary': {
              color: isDark ? COLORS.white : COLORS.black,
              borderColor: COLORS.secondaryDisabled
            }
          },
          contained: {
            '&.Mui-disabled.MuiButton-colorSecondary': {
              color: isDark ? COLORS.white : COLORS.white,
              backgroundColor: COLORS.secondaryDisabled
            },
            '&.Mui-disabled.MuiButton-colorPrimary': {
              color: isDark ? COLORS.white : COLORS.white
            }
          }
        },
        variants: [
          {
            props: { color: 'secondary', variant: 'contained' },
            style: { color: isDark ? COLORS.white : COLORS.black }
          }
        ]
      },
      MuiFilledInput: {
        styleOverrides: {
          input: {
            padding: '8px'
          },
          root: {
            color: isDark ? COLORS.white : COLORS.black,
            borderRadius: '20px',
            backgroundColor: COLORS.secondaryMain,
            boxShadow: `0 2px 4px 0 inset ${COLORS.boxShadow}`,

            '::before': {
              borderBottom: 'none'
            },
            '::after': {
              borderBottom: 'none'
            },
            ':hover': {
              backgroundColor: COLORS.secondaryMain,
              ':not(.Mui-disabled, .Mui-error)': {
                '::before': {
                  borderBottom: 'none'
                }
              }
            },
            ':focus': {
              outline: `2px solid ${COLORS.focusBorder}`
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.errorColor
            }
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            '&.Mui-error': {
              fontSize: '0.85rem'
            }
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: COLORS.placeholder,
            '&.Mui-error.Mui-focused': {
              borderColor: COLORS.errorColor
            }
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            ':hover': {
              color: COLORS.primaryMain
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              backgroundColor: isDark ? COLORS.secondaryDark : COLORS.white
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? COLORS.secondaryDark : COLORS.white,
              ':hover': {
                color: isDark ? COLORS.white : COLORS.black
              }
            }
          }
        }
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            '&:active': {
              '&.MuiSwitch-thumb': {
                width: '15px'
              }
            },
            '&.MuiSwitch-switchBase': {
              padding: 2,
              '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: isDark ? COLORS.white : COLORS.white,
                '&.MuiSwitch-track': {
                  opacity: 1,
                  backgroundColor: '#1890ff'
                }
              }
            }
          }
        }
      },
      MuiSlider: {
        styleOverrides: {
          rail: {
            opacity: 1,
            backgroundColor: isDark ? COLORS.white : COLORS.black
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '.MuiTableHead-root': {
              '.MuiTableCell-root': {
                fontWeight: 400,
                fontFamily: 'Volte-Semibold',
                borderBottom: `1px solid ${COLORS.primaryMain}`
              }
            },
            '.MuiTableBody-root': {
              borderBottom: `1px solid ${COLORS.primaryMain}`,
              '.MuiTableRow-root': {
                ':hover': {
                  backgroundColor: COLORS.selectHover
                }
              }
            }
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: isDark ? COLORS.white : '#0d0d0dff',
            textTransform: 'none',
            fontFamily: 'Volte-Semibold',
            ':focus': {
              textDecorationThickness: '4px'
            }
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: { height: '4px' },
          root: {
            color: COLORS.focusBorder
          }
        }
      }
    },
    typography: {
      fontFamily: ['Volte-Medium', 'Volte-Semibold', 'VolteRounded-Semibold'].join(',')
    },
    breakpoints: {
      values: {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1400
      }
    }
  });
};

// Export default light theme for backward compatibility
export const theme = getTheme('light');
