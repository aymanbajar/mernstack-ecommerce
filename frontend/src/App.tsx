import {BrowserRouter, Route ,Routes} from  'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

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
        {/* footer */}
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App;
