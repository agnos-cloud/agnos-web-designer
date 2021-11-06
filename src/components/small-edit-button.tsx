import React from "react";
import MuiButton from '@mui/material/Button';
import { Edit as MuiEdit } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    button: {
        minHeight: 10,
        minWidth: 10,
        height: 10,
        width: 10,
        padding: 0,
    },
    edit: {
        height: 8,
        width: 8,
    }
}

const SmallButton = (props) => {
    const { classes, ...otherProps } = props;

    return (
        <MuiButton
            // InputProps={{ classes: { input: classes.button } }}
            // variant="outlined"
            className={classes.button}
            {...otherProps}
        >
            <SmallEditWithStyle/>
        </MuiButton>
    );
};

const SmallEdit = (props) => {
    const { classes, ...otherProps } = props;

    return (
        <MuiEdit
            className={classes.edit}
            fontSize="small"
            {...otherProps}
        />
    );
}
const SmallEditWithStyle = withStyles(styles)(SmallEdit);

export default withStyles(styles)(SmallButton);
