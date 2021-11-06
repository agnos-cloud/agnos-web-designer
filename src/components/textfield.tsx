import React from "react";
import MuiTextField from '@mui/material/TextField';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    textField: {
        height: 8,
        fontSize: 10,
    }
}

const TextField = (props) => {

    const { classes, ...otherProps } = props;

    return (
        <MuiTextField
            InputProps={{ classes: { input: classes.textField } }}
            {...otherProps}
        />
    );
};

export default withStyles(styles)(TextField);
