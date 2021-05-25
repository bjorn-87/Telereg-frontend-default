import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import NavBar from './components/page/NavBar.js';
import Telereg from './components/page/Telereg.js';
import Auth from './components/auth/Auth';
import ShowConnection from './components/page/ShowConnection.js';
import UpdateHead from './components/page/UpdateHeader.js';
import UpdateLine from './components/page/UpdateLine.js';
import NewHeader from './components/page/NewHeader.js';
import NewLine from './components/page/NewLine.js';
import DeleteLine from './components/page/DeleteLine.js';
import DeleteConnection from './components/page/DeleteConnection.js';
import ShowReport from './components/page/ShowReport.js';
import ScrollArrow from './components/content/ScrollArrow.js';
import CreatePdf from './components/page/CreatePdf';
import CreateReport from './components/page/CreateReport';
import './App.css';

function App() {
    const user = Auth.GetUser();

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <NavBar/>
                </header>
                <div className="headerTitle">
                    <p>Teleregistret</p>
                    <p className="loggedInUser">Inloggad: {user.name}</p>
                </div>
                <div className="App-body" >
                    <Route exact path="/" component={Telereg} />
                    <Route path="/connection/:id" component={ShowConnection} />
                    <Route path="/update/head/:id" component={UpdateHead} />
                    <Route path="/update/line/:id" component={UpdateLine} />
                    <Route path="/new/head" component={NewHeader} />
                    <Route path="/new/line" component={NewLine} />
                    <Route path="/delete/line/:id/:back" component={DeleteLine} />
                    <Route path="/delete/connection/:id/" component={DeleteConnection} />
                    <Route path="/report/" component={ShowReport} />
                    <Route path="/connectionpdf/:id" component={CreatePdf} />
                    <Route path="/reportpdf" component={CreateReport} />
                    <ScrollArrow/>
                </div>
                <div className="footerBorder"></div>
                <footer className="pageFooter">
                    <p>&copy; Björn Olsson | 2021 </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
