import React from 'react';
import {Link} from 'react-router-dom';
import DateFormatter from '../content/DateFormatter';
import '../page/ShowConnection.css';
import '../page/Table.css';

const ShowConnectionTable = (props) => {
    if (props) {
        return (
            <main className="mainPage">
                <div className="connectionNavBar">
                    <Link
                        to="/"
                        className="blue-button"
                    >Tillbaka</Link>
                    <Link
                        to={`/update/head/${encodeURIComponent(props.data.head.Id)}`}
                        className="blue-button"
                    >Redigera huvud</Link>
                    <Link
                        to={`/update/line/${encodeURIComponent(props.data.head.Id)}`}
                        className="blue-button"
                    >Redigera Linje</Link>
                    <Link to={
                        {
                            pathname: `/downloadpdf/${encodeURIComponent(props.data.head.Id)}`,
                            data: props.data
                        }
                    } className="blue-button">Generera PDF</Link>
                    <Link
                        to={`/delete/connection/${encodeURIComponent(props.data.head.Id)}`}
                        className="red-button"
                    >Radera Kopplingskort</Link>
                </div>
                <div className="headerData">
                    <div className="headerBlock">
                        <h5>Förbindelse:</h5>
                        <p className="upper">
                            {props.data.head.Number}
                        </p>
                    </div>
                    <div className="headerBlock">
                        <h5>Namn:</h5>
                        <p>{props.data.head.Name}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Address:</h5>
                        <p>{props.data.head.Address}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Funktion:</h5>
                        <p>{props.data.head.Func}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Dokument:</h5>
                        <p>{props.data.head.Document}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Apptyp:</h5>
                        <p>{props.data.head.Apptype}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Apptyp2:</h5>
                        <p>{props.data.head.ApptypeTwo}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Ritning:</h5>
                        <p>{props.data.head.Drawing}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Skapad:</h5>
                        <p>
                            <DateFormatter input={props.data.head.Created} type={"created"} />
                        </p>
                    </div>
                    <div className="headerBlock">
                        <h5>Uppdaterad:</h5>
                        <p>
                            <DateFormatter
                                input={props.data.head.Updated}
                                type={"updated"}
                            />
                        </p>
                    </div>
                    <div className="headerBlock">
                        <h5>Användare:</h5>
                        <p>{props.data.head.UserFullName}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>AnvändarId:</h5>
                        <p>{props.data.head.UserId}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Kontaktperson:</h5>
                        <p>{props.data.head.Contact}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Övrigt:</h5>
                        <p>{props.data.head.Other}</p>
                    </div>
                </div>
                <table className="table table-stacked">
                    <thead>
                        <tr>
                            <th>Rad</th>
                            <th>Notering</th>
                            <th>Ställ</th>
                            <th>Fält</th>
                            <th>Förbindelse</th>
                            <th>Uttag</th>
                            <th>          </th>
                            <th>Fält</th>
                            <th>Förbindelse</th>
                            <th>Uttag</th>
                            <th>Kommentar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.line.length > 0 ? props.data.line.map(element => (
                            <tr key={element.Id}>
                                <td>{element.Position}</td>
                                <td>{element.Note}</td>
                                <td className="upper">{element.Rack}</td>
                                <td className="upper">{element.FieldFrom}</td>
                                <td className="upper">{element.NrFrom}</td>
                                <td className="upper">{element.KlFrom}</td>
                                <td className="arrow">--&gt;</td>
                                <td className="upper">{element.FieldTo}</td>
                                <td className="upper">{element.NrTo}</td>
                                <td className="upper">{element.KlTo}</td>
                                <td className="comment"><p>{element.Comment}</p></td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </main>
        );
    }
};

export default ShowConnectionTable;
