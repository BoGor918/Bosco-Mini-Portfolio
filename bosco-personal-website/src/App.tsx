import TopComponent from "./components/TopComponent";
import MiddleComponent from "./components/MiddleComponent";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <TopComponent />
      <MiddleComponent />
    </div>
  );
}

export default App;
