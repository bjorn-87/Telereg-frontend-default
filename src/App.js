import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import NavBar from './components/page/NavBar.js';
import Telereg from './components/page/Telereg.js';
import './App.css';
import ShowConnection from './components/page/ShowConnection.js';
import UpdateHead from './components/page/UpdateHeader.js';
import UpdateLine from './components/page/UpdateLine.js';
import NewHeader from './components/page/NewHeader.js';
import NewLine from './components/page/NewLine.js';
import DeleteLine from './components/page/DeleteLine.js';
import DeleteConnection from './components/page/DeleteConnection.js';

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
                    <Route path="/new/head" component={NewHeader} />
                    <Route path="/new/line/:id" component={NewLine} />
                    <Route path="/delete/line/:id/:back" component={DeleteLine} />
                    <Route path="/delete/connection/:id/" component={DeleteConnection} />
                </div>
                <footer className="pageFooter">
                    <p>&copy; LKAB | 2021 </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
