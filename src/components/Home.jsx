import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/modules/Home.module.css"

function Home() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets/')
            .then((response) => response.json())
            .then((data) => setCoins(data.data))
    }, [])

    const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" });

    return (
        <div className={styles.home}>
            <h1>ALL COINS</h1>
            <div className={styles.coinsWrap}>
                {coins.map((coin) =>
                    <Link className={styles.coinDisplay} key={coin.id} to={`/coin/${coin.id}`}>
                        <div>
                            <p>Name: {coin.name}</p>
                            <p>Rank: {coin.rank}</p>
                            <p>Symbol: {coin.symbol}</p>
                            <p>Price: {dollars.format(coin.priceUsd)}</p>
                        </div>
                    </Link>)}
            </div>
        </div>
    )
}

export default Home