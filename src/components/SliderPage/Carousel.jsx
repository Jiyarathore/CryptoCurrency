import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CryptoState } from "../../ContextApi";
import { TrendingCoins } from "../../apis/api";
import AliceCarousel from "react-alice-carousel"
import { Link } from 'react-router-dom';
import "./Carousel.css";

function NumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { NumberWithCommas }

function Carousel() {

    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();

    const fetchTrendCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    //we gone call fetchTrendingCoins function when our component is 1st time rendered so we will call it in useEffect 

    useEffect(() => {
        fetchTrendCoins();
    }, [currency]);

    //evertime the currency changes we fetch coins again becoz currency has changed
    const items = trending.map((coin) => {
        return (
            <Link to={`/coins/${coin.id}`}>
                <div className="carouselItem">
                    <img
                        src={coin?.image}
                        alt={coin.name}
                        height='80'
                        style={{ marginButton: 10 }}
                    />
                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span style={{
                            color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                            fontWeight: 500,
                        }}>
                            {coin.price_change_percentage_24h >= 0 && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </span>

                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol} {NumberWithCommas(coin?.current_price.toFixed(2))}

                    </span>
                </div>
            </Link>
        )
    })
    const responsive = {
        0: {
            items: 2,
        },
        500: {
            items: 4,
        },
    };

    return (
        <div className='carousel'>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel