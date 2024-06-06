import './App.css';
import GameSearch from './GameSearch';
// import RoutesList from './RoutesList';


/** App, renders GamesApp
 *
 * Props:
 *  - None
 *
 * State:
 *  - None
 *
 * root -> App -> GameSearch  */
function App() {
  return (
    <div className="App">
      < GameSearch />
      {/* < RoutesList /> */}
    </div>
  );
}

export default App;