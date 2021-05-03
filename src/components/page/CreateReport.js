import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {PDFDownloadLink} from '@react-pdf/renderer';
import ReportToPdf from '../content/ReportToPdf';
import './CreateDelete.css';

class CreatePdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.location.data,
        };
    }

    render() {
        const {
            data,
        } = this.state;

        if (!data) {
            return <Redirect to={`/report/`}/>;
        } else {
            return (
                <main>
                    <div className="backButton">
                        <Link
                            to={`/report/`}
                            className="blue-button"
                        >Tillbaka
                        </Link>
                    </div>
                    <div className="confirmationBox noHeader">
                        <PDFDownloadLink
                            document={<ReportToPdf data={data} />}
                            fileName="Forbindelsetabell.pdf"
                            className="createButton blue-button noHeaderButton"
                        >{({loading}) =>
                                loading ? 'Laddar dokument...' : 'Ladda ned PDF'}
                        </PDFDownloadLink>
                    </div>
                </main>
            );
        }
    }
}

CreatePdf.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default CreatePdf;
