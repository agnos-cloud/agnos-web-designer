import localforage from "localforage";

localforage.config({
    name: "agnos-db",
    storeName: "agnos-designs",
});

export default localforage;
