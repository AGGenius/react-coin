import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import styles from "../assets/css/modules/Favorites.module.css"

function Favorites () {
    const [coinsData, setCoinsData] = useState([]);
    const baseUrl = "https://api.coincap.io/v2/assets/";

    useEffect(() => {
        getCoins();
    }, [])
    
    const getCoins = async () => {
        const favCoins = JSON.parse(localStorage.getItem('favorites'));
        const allUrl = [];

        favCoins.forEach((coin) => {
            allUrl.push(axios.get(baseUrl+coin));
        })

        Promise.all(allUrl).then((val) => setCoinsData(val))
    }

    const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" });

    return (
        <div className={styles.main}>
            <h1>FAVORITE COINS</h1>
            <div className={styles.coinsWrap}>
                {coinsData ?
                coinsData.map((coin, index) =>
                <Link className={styles.coinDisplay} key={index} to={`/coin/${coin.data.data.id}`}>
                    <div>
                        <p>Name: {coin.data.data.name}</p>
                        <p>Rank: {coin.data.data.rank}</p>
                        <p>Symbol: {coin.data.data.symbol}</p>
                        <p>Price: {dollars.format(coin.data.data.priceUsd)}</p>
                    </div>
                </Link>
                ) :
                <p>No favorites stored</p>}
            </div>
        </div>
    )
}

export default Favorites