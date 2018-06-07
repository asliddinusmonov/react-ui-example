import indigo from '@material-ui/core/colors/indigo'
import deepPurple from '@material-ui/core/colors/deepPurple'
import { createMuiTheme } from '@material-ui/core/styles'

export const muiTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: indigo,
    secondary: deepPurple,
    input: {
      bottomLine: '#e3ecf7',
      helperText: 'rgba(0, 0, 0, 0.54)',
      labelText: 'rgba(0, 0, 0, 0.54)',
      inputText: 'rgba(0, 0, 0, 0.87)',
      disabled: 'rgba(0, 0, 0, 0.42)',
    }
  },
  error: {
    color: '#F44336'
  },
  components: {
    snackbar: {
      info: '#42a5f5',
      warning: '#f8c200',
      success: '#28bebd',
      danger: '#EF5350'
    },
    table: {
      contentBgColor: '#fff',
    },
    confirmDialog: {
      backgroundColor: '#F44336',
      text: '#fff',
      hover: {
        backgroundColor: '#E53935'
      }
    }
  },
  menu: {
    buttonHover: 'rgb(234, 243, 248)',
    textColor: '#fff',
    backgroundColor: '#fff'
  },
  table: {
    headerTextColor: '#fff',
    headerIconColor: '#fff',
    backgroundColor: '#fff'
  },
  widget: {
    whiteText: '#fff'
  },
  contacts: {
    textColor: '#fff'
  },
  red: {
    bgColor: '#f00',
    hoverBg: '#f00000'
  },
  common: {
    bgColor: {
      white: '#fff'
    },
    text: {
      white: '#fff'
    }
  }
})
