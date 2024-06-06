import {  BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import Home from "./Home";
import LocationComponent from "./Home/Location";
function App() {
  return ( 
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/loc" element={<LocationComponent/>}></Route>
      </Routes>
    </Router>
    </>
   );
}

export default App;