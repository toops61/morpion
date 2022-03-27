import './App.css';
import ThemeContextProvider from './Context/ThemeContext';
import Morpion from './Morpion/Morpion';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Morpion />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
