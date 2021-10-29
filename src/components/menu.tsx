import React from "react";
// import { Divider, Menu as MenuUI, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Button, Divider, Menu as MenuUI, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

export type MenuPropType = {
    id?: string;
    anchorElement: HTMLElement | null;
    closeContent?: JSX.Element | string;
    openContent?: JSX.Element | string;
    setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    items: MenuItemPropType[];
}

export type MenuItemPropType = {
    id?: string;
    draggable?: boolean;
    onDragStart?: React.DragEventHandler<HTMLLIElement>
    icon?: JSX.Element;
    isDivider?: boolean;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const Menu = (prop: MenuPropType) => {
    const {
        id,
        anchorElement,
        closeContent,
        openContent,
        setAnchorElement,
        items,
    } = prop;

    const isOpen = (id: string) => anchorElement ? anchorElement.id === `button-${id}` : false;

    const handleMenuClose = () => setAnchorElement(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElement(event.currentTarget);

    return (
        <>
            <Button
                id={`button-${id}`}
                aria-controls={`menu-${id}`}
                aria-haspopup="true"
                aria-expanded={isOpen(id) ? "true" : undefined}
                onClick={handleMenuOpen}
            >
                {isOpen(id) ? openContent : closeContent}
            </Button>
            <MenuUI
                id={`menu-${id}`}
                anchorEl={anchorElement}
                // getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={isOpen(id)}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {items.map((item) => item.isDivider ? (<Divider key={item.id} />) : (
                    <MenuItem
                        key={item.id}
                        id={item.id}
                        draggable={item.draggable}
                        onClick={(event => {
                            item.onClick(event);
                            handleMenuClose();
                        })}
                        onDragStart={item.onDragStart}
                    >
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        {item.text && <ListItemText>{item.text}</ListItemText>}
                    </MenuItem>
                ))}
            </MenuUI>
        </>
    );
};

export default Menu;
