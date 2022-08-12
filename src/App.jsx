
import { HashRouter, Routes,Route } from "react-router-dom";
import { Home, Login, ProductsDetail, Purchases} from './pages'
import { NavBar, LoadingScreen } from "./components";
import { useSelector } from 'react-redux';
import { Container} from 'react-bootstrap'
import './App.css'


function App(){

    const isLoading = useSelector(state => state.isLoading)

return (
    <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      <Container>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="product/:id" element={<ProductsDetail />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
      </Container>
    </HashRouter>
    )
}

 export default App;
