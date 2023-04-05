import React from 'react'
import './PokemonCard.css';

const PokemonCard = ({ image, name, move, weight, abilities }) => {
    const style = name + " card-container";
    return (
        <div className={style}>
            <div className="card">
                <h2>{name}</h2>
                <img src={image} alt={name} />
                <h3>Moves: {move}</h3>
                <h3>Weight: {weight}</h3>
                <h3>Abilities:</h3>
                {abilities}
            </div>
        </div>
    )
}

export default PokemonCard;
