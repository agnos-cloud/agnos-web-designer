import React, { useState } from "react";
import {
    Button,
    Collapse,
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    // ListSubheader,
    TextField,
} from "@mui/material";
import { Delete, ExpandLess, ExpandMore } from "@material-ui/icons";
import { ErrorObject } from "ajv";
import uuid from "react-native-uuid";
import { Menu as MenuDefinition } from "../menu-definitions";
import MenuActionIcon from "../components/menu-action-icon";
import { validateMenu } from "../validations/menu";

export type ManageMenusDialogProps = {
    open: boolean;
    menus: MenuDefinition[];
    onClose: () => void;
    setInstalledMenus: React.Dispatch<React.SetStateAction<MenuDefinition[]>>
}

export default function ManageMenusDialog(props: ManageMenusDialogProps) {
    const { open, menus, onClose, setInstalledMenus } = props;
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [menuDefinitionText, setMenuDefinitionText] = useState("");
    const [menuDefinitionError, setMenuDefinitionError] = useState(false);
    const [menuDefinitionErrorMessage, setMenuDefinitionErrorMessage] = useState("");

    const isOpen = (id: string) => anchorElement ? anchorElement.id === id : false;
    const handleClose = () => {
        onClose();
        setAnchorElement(null);
    }
    const handleClick = (event) => {
        if (isOpen(event.currentTarget.id)) {
            setAnchorElement(null);
        } else {
            setAnchorElement(event.currentTarget);
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuDefinitionError(false);
        setMenuDefinitionErrorMessage("");
        setMenuDefinitionText(event.target.value);

        try {
            const menuDefJson = JSON.parse(event.target.value);
            const [isValid, validationErrors] = validateMenu(menuDefJson);
            setMenuDefinitionError(!isValid);
            if (!isValid) {
                setMenuDefinitionErrorMessage((validationErrors as ErrorObject<string, Record<string, any>, unknown>[]).map((e) => e.message).join("\n"));
            }
        } catch (e) {
            setMenuDefinitionError(true);
            setMenuDefinitionErrorMessage(e.message);
        }
      };
    const handleSaveClick = () => {
        if (menuDefinitionError) return;

        const menuDefJson = JSON.parse(menuDefinitionText);
        const menu: MenuDefinition = menuDefJson;
        setInstalledMenus((menus) => menus.concat({
            ...menu,
            id: uuid.v4().toString(),
            actions: menu.actions.map((a) => ({
                ...a,
                id: uuid.v4().toString(),
            })),
        }));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
        >
            <DialogTitle>Manage Menus</DialogTitle>
            <TextField
                id="outlined-multiline-static"
                label="New Menu Definition"
                multiline
                rows={4}
                style={{ marginLeft: 10, marginRight: 10 }}
                error={menuDefinitionError}
                helperText={menuDefinitionErrorMessage}
                value={menuDefinitionText}
                onChange={handleChange}
            />
            <Button
                style={{ margin: 10 }}
                disabled={menuDefinitionError}
                onClick={handleSaveClick}
            >Save</Button>
            <Divider />
            {menus.length > 0 && <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //         Installed Menu Items
                //     </ListSubheader>
                // }
            >
                {menus.map((menu) => (
                    <React.Fragment key={menu.id}>
                        <ListItemButton
                            key={menu.id}
                            id={menu.id}
                            onClick={handleClick}
                        >
                            <ListItemText primary={menu.text} />
                            {isOpen(menu.id) ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={isOpen(menu.id)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {menu.actions.map((action) => (
                                    <ListItem
                                        key={action.id}
                                        sx={{ pl: 4 }}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <Delete />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemIcon>
                                            <MenuActionIcon action={action} />
                                        </ListItemIcon>
                                        <ListItemText primary={action.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>}
        </Dialog>
    );
}
