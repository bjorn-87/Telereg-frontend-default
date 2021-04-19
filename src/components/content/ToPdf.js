import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import DateFormatter from './DateFormatter';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    pageHeader: {
        margin: 10,
        padding: 5,
        border: 1,
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontSize: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: 1
    },
    lines: {
        fontSize: 10,
        margin: 2,
        padding: 2,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    linesHead: {
        fontSize: 10,
        margin: 2,
        padding: 2,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: 1,
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
        padding: 5,
        flexGrow: 1,
        borderLeft: 1,
        borderRight: 1,
    },
    footer: {
        fontSize: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        flexGrow: 1,
        borderTop: 1,
    },
    between: {
        fontSize: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        flexGrow: 1,
        borderBottom: 1,
    },
    headerPairs: {
        fontSize: 10,
        margin: 2,
        padding: 2,
        flexGrow: 1,
        width: 200,
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
    comment: {
        padding: 3,
        width: 100,
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
    upper: {
        textTransform: 'uppercase',
    }
});

const ToPdf = (props) => {
    if (props.data) {
        return (
            <Document>
                <Page size="A4" style={styles.page} wrap>
                    <View style={styles.section}>
                        <View style={styles.pageHeader}>
                            <Text style={styles.headerTitle}>LKAB Teleregister</Text>
                            <Text style={styles.headerTitle}>
                                Förbindelsetabell för: <Text style={styles.upper}>
                                    {props.data.head.Number}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.header}>
                            <View style={styles.headerPairs}>
                                <Text>Förbindelse:</Text>
                                <Text style={styles.upper}>{props.data.head.Number}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Namn:</Text>
                                <Text>{props.data.head.Name}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Adress:</Text>
                                <Text>{props.data.head.Address}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Funktion:</Text>
                                <Text>{props.data.head.Func}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Dokument:</Text>
                                <Text>{props.data.head.Document}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>AppTyp:</Text>
                                <Text>{props.data.head.Apptype}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Apptyp2:</Text>
                                <Text>{props.data.head.ApptypeTwo}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Ritning:</Text>
                                <Text>{props.data.head.Drawing}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Skapad:</Text>
                                <Text>
                                    <DateFormatter
                                        input={props.data.head.Created}
                                        type={"created"}
                                    />
                                </Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Uppdaterad:</Text>
                                <Text>
                                    <DateFormatter
                                        input={props.data.head.Updated}
                                        type={"updated"}
                                    />
                                </Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Användare:</Text>
                                <Text>{props.data.head.UserFullName}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>AnvändarId:</Text>
                                <Text>{props.data.head.UserId}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Kontaktperson:</Text>
                                <Text>{props.data.head.Contact}</Text>
                            </View>
                            <View style={styles.headerPairs}>
                                <Text>Övrigt:</Text>
                                <Text>{props.data.head.Other}</Text>
                            </View>
                        </View>
                        <View style={styles.between} fixed></View>
                        <View style={styles.lineBox}>
                            <View style={styles.linesHead} fixed>
                                <Text style={styles.columns}>Rad</Text>
                                <Text style={styles.comment}>Notering</Text>
                                <Text style={styles.columns}>Ställ</Text>
                                <Text style={styles.columns}>Fält</Text>
                                <Text style={styles.columns}>Nr</Text>
                                <Text style={styles.output}>Uttag</Text>
                                <Text style={styles.columns}></Text>
                                <Text style={styles.columns}>Fält</Text>
                                <Text style={styles.columns}>Nr</Text>
                                <Text style={styles.output}>Uttag</Text>
                                <Text style={styles.comment}>Kommentar</Text>
                            </View>
                            {props.data.line.length > 0 ? props.data.line.map(element => (
                                <View style={styles.lines} key={element.Id} wrap={false}>
                                    <Text style={styles.columns}>{element.Position}</Text>
                                    <Text style={styles.comment}>{element.Note}</Text>
                                    <Text style={styles.columnsToUpper}>{element.Rack}</Text>
                                    <Text style={styles.columnsToUpper}>{element.FieldFrom}</Text>
                                    <Text style={styles.columnsToUpper}>{element.NrFrom}</Text>
                                    <Text style={styles.outputToUpper}>{element.KlFrom}</Text>
                                    <Text style={styles.columns}>-</Text>
                                    <Text style={styles.columnsToUpper}>{element.FieldTo}</Text>
                                    <Text style={styles.columnsToUpper}>{element.NrTo}</Text>
                                    <Text style={styles.outputToUpper}>{element.KlTo}</Text>
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
