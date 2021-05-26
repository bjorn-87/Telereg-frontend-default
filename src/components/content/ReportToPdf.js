import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    pageHeader: {
        margin: 10,
        padding: 10,
        border: 1,
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    lines: {
        fontSize: 10,
        margin: 2,
        padding: 2,
        flexGrow: 1,
        flexDirection: 'row',
    },
    linesHead: {
        fontSize: 10,
        margin: 2,
        padding: 2,
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    headerTitle: {
        fontSize: 15,
        margin: 2,
        padding: 2,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    lineBox: {
        fontSize: 10,
        marginLeft: 10,
        marginRight: 10,
        flexGrow: 1,
        borderLeft: 1,
        borderRight: 1,
    },
    footer: {
        fontSize: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        flexGrow: 1,
        borderTop: 1,
    },
    between: {
        fontSize: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        flexGrow: 1,
        borderBottom: 1,
    },
    columns: {
        width: 30,
        padding: 3,
        flexWrap: 'wrap',
    },
    columnsToUpper: {
        width: 30,
        padding: 3,
        flexWrap: 'wrap',
        textTransform: 'uppercase',
    },
    numberCol: {
        width: 70,
        padding: 3,
        flexWrap: 'wrap',
    },
    numberColUpper: {
        width: 70,
        padding: 3,
        flexWrap: 'wrap',
        textTransform: 'uppercase',
    },
    comment: {
        padding: 3,
        width: 110,
        flexWrap: 'wrap',
    },
    output: {
        padding: 3,
        width: 50,
        flexWrap: 'wrap',
    },
    outputToUpper: {
        padding: 3,
        width: 50,
        flexWrap: 'wrap',
        textTransform: 'uppercase',
    },
});

const ToPdf = (props) => {
    // console.log(props);
    if (props) {
        return (
            <Document>
                <Page size="A4" style={styles.page} wrap>
                    <View style={styles.section}>
                        <View style={styles.pageHeader}>
                            <Text style={styles.headerTitle}>Teleregistret</Text>
                            <Text style={styles.headerTitle}>Nätbeläggningsrapport</Text>
                        </View>
                        <View style={styles.between} fixed></View>
                        <View style={styles.lineBox}>
                            <View style={styles.linesHead} fixed>
                                <Text style={styles.columns}>Ställ</Text>
                                <Text style={styles.columns}>Fält</Text>
                                <Text style={styles.columns}>Nr</Text>
                                <Text style={styles.output}>Uttag</Text>
                                <Text style={styles.numberCol}>Förbindelse</Text>
                                <Text style={styles.comment}>Namn</Text>
                                <Text style={styles.comment}>Adress</Text>
                                <Text style={styles.comment}>Kommentar</Text>
                            </View>
                            {props.data.length > 0 ? props.data.map((element, idx) => (
                                <View style={styles.lines} key={idx} >
                                    <Text style={styles.columnsToUpper}>{element.Rack}</Text>
                                    <Text style={styles.columnsToUpper}>{element.Field}</Text>
                                    <Text style={styles.columnsToUpper}>{element.Nr}</Text>
                                    <Text style={styles.outputToUpper}>{element.Kl}</Text>
                                    <Text style={styles.numberColUpper}>{element.Number}</Text>
                                    <Text style={styles.comment}>{element.Name}</Text>
                                    <Text style={styles.comment}>{element.Address}</Text>
                                    <Text style={styles.comment}>{element.Comment}</Text>
                                </View>
                            )) : null}
                        </View>
                        <View style={styles.footer} fixed></View>
                    </View>
                </Page>
            </Document>
        );
    }
};

export default ToPdf;
