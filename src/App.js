import './App.css';
import Header from './components /Header';
import PokemonInfo from './components /PokemonInfo';
import Navbar from './components /Navbar';
import Footer from './components /Footer';


function App() {
  return (
    <div classname="app"> 
        
        <Header/>
        
        <Navbar/>
        
        <PokemonInfo/>

        <Footer/>
    
    </div>
  )
}

export default App;
