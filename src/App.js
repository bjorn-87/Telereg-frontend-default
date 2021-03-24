import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import NavBar from './components/page/NavBar.js';
import Telereg from './components/page/Telereg.js';
import './App.css';
import ShowConnection from './components/page/ShowConnection.js';
import UpdateHead from './components/page/UpdateHead.js';
import UpdateLine from './components/page/UpdateLine.js';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <NavBar/>
                </header>
                <div className="headerTitle">
                    <p>Teleregistret</p>
                </div>
                <div className="App-body" >
                    <Route exact path="/" component={Telereg} />
                    <Route path="/connection/:id" component={ShowConnection} />
                    <Route path="/update/head/:id" component={UpdateHead} />
                    <Route path="/update/line/:id" component={UpdateLine} />
                </div>
                <footer className="pageFooter">
                    <p>&copy; LKAB | 2021 </p>
                </footer>
            </div>
        </Router>
    );
}
export default App;
