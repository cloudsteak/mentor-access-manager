import logo from './logo.png';
import './App.css';
import PostApi from './PostApi';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="py-6">
      <PostApi />
      </div>
    </header>
  </div>
  );
}

export default App;
