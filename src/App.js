import './App.css';
import GamesApp from './GamesApp';
// import RoutesList from './RoutesList';


/** App, renders GamesApp
 *
 * Props:
 *  - None
 *
 * State:
 *  - None
 *
 * root -> App -> GamesApp  */
function App() {
  return (
    <div className="App">
      < GamesApp />
      {/* < RoutesList /> */}
    </div>
  );
}

export default App;