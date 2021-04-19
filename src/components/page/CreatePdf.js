import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {PDFDownloadLink} from '@react-pdf/renderer';
import ToPdf from '../content/ToPdf';
import './CreateDelete.css';

class CreatePdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: props.match.params.id,
            data: props.location.data,
        };
    }

    render() {
        const {
            Id,
            data,
        } = this.state;

        if (!data) {
            return <Redirect to={`/`}/>;
        } else {
            return (
                <main>
                    <div className="backButton">
                        <Link
                            to={`/connection/${Id}`}
                            className="blue-button"
                        >Tillbaka
                        </Link>
                    </div>
                    <div className="confirmationBox noHeader">
                        <PDFDownloadLink
                            document={<ToPdf data={data} />}
                            fileName="Forbindelsetabell.pdf"
                            className="createButton blue-button noHeaderButton"
                        >{({loading}) =>
                                loading ? 'Laddar dokument...' : 'Generera PDF'}
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
