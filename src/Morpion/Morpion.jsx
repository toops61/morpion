import React from 'react';
import { useState,useEffect } from "react";
import {v4 as uuidV4} from 'uuid';
import './Morpion.css';

function Square (props) {

        return (
            <div  onClick={() => props.onClick()} className="morpion-case">
                <p>{props.value}</p>
            </div>
        )
}

function Board (props) {

    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        const squaresArray = squares.slice();
        if (squares[i] !== null) {
            return alert('case déjà jouée, choisissez une autre');
        }
        squaresArray[i] =  props.player === 'player1' ? 'X' : 'O';
        setSquares(squaresArray);
        props.setPlayer(props.player === 'player1' ? 'player2' : 'player1');
    }

    useEffect(() => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                squares[a] === 'O' && props.setWinner('player1');
                squares[a] === 'X' && props.setWinner('player2');
            }
        }
    
    }, [handleClick])
    
    useEffect(() => {
        console.log('reset');
        setSquares(Array(9).fill(null));
        props.setWinner('');
        props.setReset(false);
        props.setPlayer('player2');
    }, [props.reset])
    

    return(
        <>
            {squares.map((item,index) => {
                return (
                    <Square 
                        value={squares[index]} 
                        onClick={() => handleClick(index)}
                        key={uuidV4()} />
                )
            })}
        </>
    )
}

export default function Morpion () {
    const [player, setPlayer] = useState('player2');
    const [winner, setWinner] = useState('');
    const [reset, setReset] = useState(false);

    function onChange () {
        setReset(true);
    }

    return (
        <div className="morpion-container">
            <div className="morpion-board">
                <Board 
                player={player}
                setPlayer={setPlayer}
                winner={winner}
                setWinner={setWinner}
                reset={reset}
                setReset={setReset}
                 />
            </div>
            <p>Prochain tour : {player === 'player1' ? 'player2' : 'player1'}</p>
            {winner !== '' && <p className='flashing-text'>Le gagnant est {winner}</p>}
            {winner !== '' && <button onClick={() => onChange()}>reset</button>}
        </div>
    )
}