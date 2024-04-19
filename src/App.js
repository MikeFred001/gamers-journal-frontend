import './App.css';
import GamesApp from './GamesApp';


/** App, renders GamesApp
 *
 * Props:
 *  - None
 *
 * State:
 *  - None
 *
 * root -> App -> { GamesApp }  */
function App() {
  return (
    <div className="App">
      < GamesApp />
    </div>
  );
}

export default App;
