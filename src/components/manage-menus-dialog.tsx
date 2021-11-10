import React, { useState } from "react";
import {
    Collapse,
    Dialog,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    // ListSubheader,
} from "@mui/material";
import { Delete, ExpandLess, ExpandMore } from "@material-ui/icons";
import { Menu as MenuDefinition } from "../menu-definitions";
import MenuActionIcon from "../components/menu-action-icon";

export type ManageMenusDialogProps = {
    open: boolean;
    menus: MenuDefinition[];
    onClose: () => void;
}

export default function ManageMenusDialog(props: ManageMenusDialogProps) {
    const { open, menus, onClose } = props;
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

    const isOpen = (id: string) => anchorElement ? anchorElement.id === `menu-${id}` : false;
    const handleClose = () => {
        onClose();
        setAnchorElement(null);
    }
    const handleClick = (event) => {
        setAnchorElement(event.currentTarget);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
        >
            <DialogTitle>Manage Menus</DialogTitle>
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
                            id={`menu-${menu.id}`}
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
            {menus.length === 0 && <>There are no installed menus at this time</>}
        </Dialog>
    );
}
