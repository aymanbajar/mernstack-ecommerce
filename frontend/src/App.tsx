import {BrowserRouter, Route ,Routes} from  'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {


  return (
    <>

    {/* browser router */}
      <BrowserRouter>
        {/* navbar */}
        <Navbar />
        
        {/* routes */}
        <Routes>
          {/* Route paths */}
          <Route path='/' element={ <HomePage /> } />
        
 
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
