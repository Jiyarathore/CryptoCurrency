import React from 'react';
import "./Header.css";
import { AppBar,Container,createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";
import { CryptoState } from '../ContextApi';

const Header = () => {

  const navigate = useNavigate();

const {currency, setCurrency} = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
   <AppBar color='transparent' position='static'>
    <Container>
    <Toolbar>
      <Typography 
       onClick={() => navigate('/')}
       className="head"
       variant ="h6">
        CryptoVerse
      </Typography>

      <Select variant='outlined'
      style={{
        width:100,
        height:40,
        marginRight:15,
        color:'white'
      }}
      value={currency}
      onChange={(e)=>setCurrency(e.target.value)}
      >
        <MenuItem value={"USD"}>USD</MenuItem>
        <MenuItem value={"INR"}>INR</MenuItem>
      </Select>
    </Toolbar>
    </Container>
   </AppBar>
   </ThemeProvider>
  )
}

export default Header