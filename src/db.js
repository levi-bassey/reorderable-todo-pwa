import { openDB } from "idb";

if (!("indexedDB" in window)) {
  console.warn("IndexedDB not supported");
}

const db = await openDB("todoDB", 1, {
  upgrade(db, oldVersion, newVersion, transaction) {
    db.createObjectStore("todos", { keyPath: "id" });
  },
});

const tx = db.transaction("todos", "readwrite");

const todoDB = tx.objectStore("todos");

export default todoDB;
