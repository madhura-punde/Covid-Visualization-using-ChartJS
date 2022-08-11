import './App.css';
import BarChart from './Components/BarChart';
import Info from './Components/Info'
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <h1>Covid DATA Visualization Project</h1>
      <Info/>
      <br/>
      <div className='chart'>
       
        <BarChart/>

      </div>
      <hr/>
      <Footer/>
    </div>
  );
}

export default App;
