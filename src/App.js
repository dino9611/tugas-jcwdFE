import './App.css';
import NaviBar from "./components/navbar";
import Home from "./pages/Home";
import Footer from "./components/footer"
import Resep from './pages/Resep';
import {TestRouter, NotFound} from './components';
import {Switch, Route} from "react-router-dom"

function App() {
  return (
    <div>
      <NaviBar />
      <Switch>
        <Route path="/" exact component={Home} />
        {/* Klo ada exact brarti harus spesifik /, ga ada wildcard di selanjutnya (ex: /pages) itu ga bisa */}
        <Route path="/resep" component={Resep} />
        <Route path="/test-router-page" component={TestRouter} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;