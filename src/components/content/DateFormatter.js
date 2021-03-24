/**
 * Function to return formatted Date.
 *
 * @param {Object} props
 * @returns Formatted Date
 */
function DateFormatter(props) {
    let input = props.input,
        type = props.type,
        output = "",
        format;

    if (input && type === "created") {
        format = new Date(input);
        output = format.toLocaleDateString();
    } else if (input && type === "updated") {
        format = new Date(input);
        output = format.toLocaleDateString() + " " + format.toLocaleTimeString();
    }
    return output;
}

export default DateFormatter;
