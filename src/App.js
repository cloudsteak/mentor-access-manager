import logo from './logo.png';
import './App.css';
import PostApi from './PostApi';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <table class="headerTable">
          <tbody>
            <tr>
              <td style={{minWidth: "150px", width: "6%"}}><img src={logo} className="App-logo" alt="logo" /></td>
              <td>
                <p class="pageHeader">Azure hozzáférés</p>
              </td>
            </tr>
          </tbody>
        </table>


        <div className="py-6">
          <PostApi />
        </div>
      </header>
    </div>
  );
}

export default App;
