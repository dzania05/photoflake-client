import React from 'react'
import { StoreProvider } from './libs/store'
import SearchBar from './components/SearchBar'
import Grid from './components/Grid'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  return (
    <div className="container app">
      <StoreProvider>
        <SearchBar />
        <Grid />
        <Footer />
      </StoreProvider>
    </div>
  )
}

export default App
