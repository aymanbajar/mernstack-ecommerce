import {BrowserRouter, Route ,Routes} from  'react-router-dom'
import './App.css'
import Navbar from './components/navbar';

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
        
 
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
