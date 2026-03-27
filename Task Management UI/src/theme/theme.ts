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

// Reuse these checkout colors, and if colors needs to modify please update hard coded values in svg files also
export const CHECKOUT_STATUS_COLORS = {
  billed: COLORS.successDark,
  chargebacked: COLORS.errorColor,
  completed: COLORS.primaryMain, // same for collectable
  deleted: COLORS.focusBorder,
  open: COLORS.primaryDisabled,
  partiallyRefunded: COLORS.successColor,
  // eslint-disable-next-line camelcase
  partially_refunded: COLORS.successColor,
  partiallyBilled: COLORS.successLight,
  // eslint-disable-next-line camelcase
  partially_billed: COLORS.successLight,
  pendingCompletion: COLORS.focusBorder,
  // eslint-disable-next-line camelcase
  pending_completion: COLORS.focusBorder,
  refunded: COLORS.successMain
};

export const STATUS_STYLES: Record<string, { color: string; backgroundColor: string }> = {
  Active: {
    color: COLORS.successColor,
    backgroundColor: COLORS.successColorLight
  },
  Deactivated: {
    color: COLORS.errorColor,
    backgroundColor: COLORS.errorColorLight
  },
  Available: {
    color: COLORS.primaryMain,
    backgroundColor: COLORS.primaryMainLight
  }
};

export const theme = createTheme({
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
            color: COLORS.black,
            borderColor: COLORS.secondaryDisabled
          }
        },
        contained: {
          '&.Mui-disabled.MuiButton-colorSecondary': {
            color: COLORS.white,
            backgroundColor: COLORS.secondaryDisabled
          },
          '&.Mui-disabled.MuiButton-colorPrimary': {
            color: COLORS.white
          }
        }
      },
      variants: [
        {
          props: { color: 'secondary', variant: 'contained' },
          style: { color: COLORS.black }
        }
      ]
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          padding: '8px'
        },
        root: {
          color: COLORS.black,
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
            color: COLORS.errorColor
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
            backgroundColor: COLORS.white
          },
          '&.Mui-selected': {
            backgroundColor: COLORS.white,
            ':hover': {
              color: COLORS.black
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
              color: COLORS.white,
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
          backgroundColor: COLORS.black
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
          color: '#0D0D0D',
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
  palette: {
    primary: {
      main: COLORS.primaryMain,
      dark: COLORS.primaryDark
    },
    secondary: {
      light: COLORS.secondaryLight,
      main: COLORS.secondaryMain,
      dark: COLORS.secondaryDark
    },
    success: {
      light: COLORS.successColor,
      main: COLORS.successMain,
      dark: COLORS.successDark
    },
    error: {
      // TODO: If other colors are suggested for light and dark colors, then replace the light and dark colors
      light: '#ef5350',
      main: COLORS.errorColor,
      dark: '#d32f2f'
    },

    action: {
      // Note: In Material UI focus, hover, disabled works, independent of color
      focus: COLORS.primaryDark,
      // hover: '#005a80', //TODO: Check the hover behaviour of all custom components.
      disabledBackground: '#87cdec'
      // disabled: '#ffffff' // This is making Icon button invisible
    }
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
