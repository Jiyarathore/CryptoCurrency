import axios from "axios";
import React, { useState, useEffect } from "react";
import { CryptoState } from "../ContextApi";
import { HistoricalChart } from "../apis/api";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { chartDays } from "../apis/data";
import SelectButton from "./SelectButton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    elements:{
        point:{
            radius:1,
        },
    }
  };
  const dates=[];
  const prices=[];
  historicalData && historicalData.map((coin)=>{
    let date=new Date(coin[0])
    let time=
    date.getHours()>12
    ?`${date.getHours()-12}:${date.getMinutes()} PM`
    :`${date.getHours()}:${date.getMinutes()} AM`
    dates.push(days==1?time:date.toLocaleDateString());
    prices.push(coin[1]);
  });
  const data = {
    labels: dates,
    datasets: [
      {
        label: `Price (Past ${days} Days) in `,
        data: prices,
        borderColor: '#EEBC1D',
        backgroundColor: '#EEBC1D',
      }
    ],
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "purple" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
          <Line options={options} data={data} />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value == days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
