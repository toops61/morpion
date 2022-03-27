import React, { useContext } from 'react';
import { useEffect } from "react";
import {v4 as uuidV4} from 'uuid';
import { ThemeContext } from '../Context/ThemeContext';
import './Morpion.css';

function Square (props) {

        return (
            <div  onClick={() => props.onClick()} className="morpion-case">
                <p>{props.value}</p>
            </div>
        )
}

function Board () {

    const {squares,setSquares,player,setPlayer,setWinner,reset,setReset} = useContext(ThemeContext);

    function handleClick(i) {
        const squaresArray = squares.slice();
        if (squares[i] !== null) {
            return alert('case déjà jouée, choisissez une autre');
        }
        squaresArray[i] =  player === 'player1' ? 'X' : 'O';
        setSquares(squaresArray);
        setPlayer(player === 'player1' ? 'player2' : 'player1');
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
                squares[a] === 'O' && setWinner('player1');
                squares[a] === 'X' && setWinner('player2');
            }
        }
    
    }, [handleClick])
    
    useEffect(() => {
        console.log('reset');
        setSquares(Array(9).fill(null));
        setWinner('');
        setReset(false);
        setPlayer('player2');
    }, [reset])
    

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

    const {setReset,winner,player,squares} = useContext(ThemeContext);

    function onChange () {
        setReset(true);
    }

    return (
        <div className="morpion-container">
            <div className="morpion-board">
                <Board />
            </div>
            <p>Prochain tour : {player === 'player1' ? 'player2' : 'player1'}</p>
            {winner !== '' && <p className='flashing-text'>Le gagnant est {winner}</p>}
            {(winner === '' && !squares.includes(null)) && <p>Pas de gagnant...</p>}
            {(winner !== '' || !squares.includes(null)) && <button onClick={() => onChange()}>reset</button>}
        </div>
    )
}