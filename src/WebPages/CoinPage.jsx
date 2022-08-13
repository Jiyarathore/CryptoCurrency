import React,{useState,useEffect} from 'react'
//import './Coinpage.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { SingleCoin } from '../apis/api';
import { makeStyles } from '@material-ui/core/styles';
import CoinInfo from '../components/CoinInfo'
import { LinearProgress, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser'
import { CurrencyBitcoin } from '@mui/icons-material';
import { NumberWithCommas } from "../components/SliderPage/Carousel";
import { CryptoState } from '../ContextApi';

const CoinPage=() => {

  const{id}=useParams();
  const[coin,setCoin]=useState();
  const{currency,symbol}=CryptoState()

  const fetchCoin=async()=>{
    const {data}=await axios.get(SingleCoin(id))
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin()
  }, [])
  
  const useStyles=makeStyles((theme)=>({
    container:{
      display:"flex",
      color:"white",
      backgroundColor:"black",
      [theme.breakpoints.down("md")]:{
        flexDirection:'column',
        alignItems:'center',
      },
    },
    sidebar:{
      width:"30%",
      [theme.breakpoints.down("md")]:{
        widht:"100%"
      },
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      marginTop:25,
      borderRight:"2px solid grey"
    },
    heading:{
      fontWeight:"bold",
      marginBottom:20,
      fontFamily:"Montserrat"
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    }
  }))
 const classes=useStyles();
 if (!coin) return <LinearProgress style={{ backgroundColor: "purple" }} />;

  return (<div className={classes.container}>
    <div className={classes.sidebar}>
      <img src={coin?.image.large} alt={coin?.name} height="200px" style={{marginBottom:20}}/>
      <Typography variant="h3" className={classes.heading}>{coin?.name}</Typography>
      <Typography variant="subtitle1" className={classes.description}>{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</Typography>
      <div className={classes.marketData}>

        <span style={{display:"flex"}}>
          <Typography variant="h5" className={classes.heading}>Rank:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5" style={{
            fontFamily:"Montserrat"
          }}>{coin?.market_cap_rank}</Typography>
        </span>

        <span style={{display:"flex"}}>
          <Typography variant="h5" className={classes.heading}>Current Price:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5" style={{
            fontFamily:"Montserrat"
          }}>
            {symbol}{" "}
            {NumberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
        </span>

        <span style={{display:"flex"}}>
          <Typography variant="h5" className={classes.heading}>Market Cap:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5" style={{
            fontFamily:"Montserrat"
          }}>
            {symbol}{" "}
            {NumberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
            .toString()
            .slice(0,-6))}M
            </Typography>
        </span>
      </div>
    </div>
    {/*chart*/}
    <CoinInfo coin={coin}></CoinInfo>
    </div>
  )
}

export default CoinPage