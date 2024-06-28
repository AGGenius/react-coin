import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../assets/css/modules/Coin.module.css"

function Coin () {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(()=>{
        fetch(`https://api.coincap.io/v2/assets/${id}`)
        .then((response)=> response.json())
        .then((data)=> setCoin(data.data))
    }, [id])

    useEffect(()=>{
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite){
        favorites=favorites.filter(fav=>fav !== id)
    } else {
        favorites.push(id)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

    const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" });

    const decimalFormat = (number) => {
        return Number(parseFloat(number).toFixed(2)).toLocaleString('en');
    }
    
    return (
        <div className={styles.coinWrap}>
            <h1>COIN DETAILS</h1>
            {coin &&
            <div className={styles.coinDisplay}>
                    <p>Name: {coin.name}</p>
                    <p>Rank: {coin.rank}</p>
                    <p>Symbol: {coin.symbol}</p>
                    <p>Price: {dollars.format(coin.priceUsd)}</p> 
                    <p>Supply: {decimalFormat(coin.supply)}</p>
                    <p>maxSupply: {coin.maxSupply ? decimalFormat(coin.maxSupply) : "No value stored"}</p>
                    <p>marketCapUsd: {decimalFormat(coin.marketCapUsd)}</p>
                    <p>volumeUsd24Hr: {decimalFormat(coin.volumeUsd24Hr)}</p> 
                    <p>changePercent24Hr: {decimalFormat(coin.changePercent24Hr)}</p>
                    <p>vwap24Hr: {decimalFormat(coin.vwap24Hr)}</p>         
                    <button className={isFavorite ? styles.faved : null} onClick={handleFavorite}>
                        {isFavorite ? "Eliminar fav" : "Añadir fav"}
                    </button>

            </div>
            }
        </div>
    )
}

export default Coin