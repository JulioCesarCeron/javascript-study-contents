import React, { useState, useEffect} from "react"
import { Header } from "./Header"
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios";
import Generos from './Generos'
import NewGenero from './NewGenero'
import EditarGenero from './EditarGenero'

const Home = () => <h1>Home</h1>


function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data);
    })
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/novo" exact component={NewGenero} />
        <Route path="/generos/:id/editar" exact component={EditarGenero} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App
