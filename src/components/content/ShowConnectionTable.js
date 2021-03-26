import React from 'react';
import {Link} from 'react-router-dom';
import DateFormatter from '../content/DateFormatter';
import '../page/ShowConnection.css';
import '../page/Table.css';

const ShowConnectionTable = (props) => {
    // const props.data = props.data;

    function checkEmpty(input) {
        if (input) {
            return input;
        }
        return "n/a";
    }

    if (props) {
        return (
            <main className="mainPage">
                <div className="connectionNavBar">
                    <Link
                        to={`/update/head/${encodeURIComponent(props.data.head.Id)}`}
                    >Redigera huvud</Link>
                    <Link
                        to={`/update/line/${encodeURIComponent(props.data.head.Id)}`}
                    >Redigera Linje</Link>
                    <Link
                        to={`/delete/connection/${encodeURIComponent(props.data.head.Id)}`}
                    >Radera Kopplingskort</Link>
                </div>
                <div className="headerData">
                    <div className="headerBlock">
                        <h5>Nummer:</h5>
                        <p>
                            {props.data.head.Number}
                        </p>
                    </div>
                    <div className="headerBlock">
                        <h5>Namn:</h5>
                        <p>{checkEmpty(props.data.head.Name)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Funktion:</h5>
                        <p>{checkEmpty(props.data.head.Func)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Address:</h5>
                        <p>{checkEmpty(props.data.head.Address)}</p>
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
                            {props.data.head.Updated ?
                                <DateFormatter
                                    input={props.data.head.Updated}
                                    type={"updated"}
                                />
                                : "n/a"
                            }
                        </p>
                    </div>
                    <div className="headerBlock">
                        <h5>Apptyp:</h5>
                        <p>{checkEmpty(props.data.head.Apptype)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Apptyp2:</h5>
                        <p>{checkEmpty(props.data.head.ApptypeTwo)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Användarnamn:</h5>
                        <p>{checkEmpty(props.data.head.UserId)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Användare:</h5>
                        <p>{checkEmpty(props.data.head.UserFullName)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Ritning:</h5>
                        <p>{checkEmpty(props.data.head.Drawing)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Dokument:</h5>
                        <p>{checkEmpty(props.data.head.Document)}</p>
                    </div>
                    <div className="headerBlock">
                        <h5>Kommentar:</h5>
                        <p>{checkEmpty(props.data.head.Comment)}</p>
                    </div>
                </div>
                <table className="table table-scroll table-stacked">
                    <thead>
                        <tr>
                            <th>Rad</th>
                            <th>Notering</th>
                            <th>Ställ</th>
                            <th>Från fält</th>
                            <th>Från nummer</th>
                            <th>Från uttag</th>
                            <th>          </th>
                            <th>Till fält</th>
                            <th>Till nummer</th>
                            <th>Till uttag</th>
                            <th>Kommentar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.line ? props.data.line.map(element => (
                            <tr key={element.Id}>
                                <td>{element.Position}</td>
                                <td>{element.Note}</td>
                                <td>{element.Rack}</td>
                                <td>{element.FieldFrom}</td>
                                <td>{element.NrFrom}</td>
                                <td>{element.KlFrom}</td>
                                <td className="arrow">--&gt;</td>
                                <td>{element.FieldTo}</td>
                                <td>{element.NrTo}</td>
                                <td>{element.KlTo}</td>
                                <td>{element.Comment}</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </main>
        );
    }
};

export default ShowConnectionTable;