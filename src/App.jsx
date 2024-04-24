import Quiz from "./components/Quiz";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Quiz App</h1>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  );
};

export default App;
