import localforage from "localforage";

localforage.config({
    name: "agnos_db",
});

export default localforage;
