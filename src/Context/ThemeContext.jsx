import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = props => {
    const [player, setPlayer] = useState('player2');
    const [winner, setWinner] = useState('');
    const [reset, setReset] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(null));

    return (
        <ThemeContext.Provider value={{player,setPlayer,winner,setWinner,reset,setReset,squares,setSquares}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;