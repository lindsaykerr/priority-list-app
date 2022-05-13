
// @ts-ignore

const Database = {
    dbName : "priorityList",
    _openRequest() {
        return window.indexedDB.open(this.dbName);
    },
    init() {
        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            return;
        }
        const request = this._openRequest();
        // setup operation runds if db does not exist or if db is to be upgraded
        request.onupgradeneeded = e => {
            // @ts-ignore
            const db = e.target.result;
            
            // creates a store something akin to a SQL table, 
            // providing and identifier for the store and a primary key 
            const objStore = db.createObjectStore("tasks", {autoIncrement: "id"});

            // state which fields are to be indexed by the store
            objStore.createIndex("level", "level", {unique: false});
            objStore.createIndex("completeBy", "completeBy", {unique: false});
            objStore.createIndex("status", "status", {unique: false});
        }

        request.onerror = (e) => {
            console.log("Connection to db failed");
        }

        request.onsuccess = (e) => {
            console.log("request success");
        }
    },
    addItem(item, obj) {
        const request = this._openRequest();
        request.onsuccess = e => {
            const db = e.target.result;
            const trans = db.transaction(["tasks"], "readwrite");
            
            trans.onerror = e => {
                console.log("Transaction error: " + e.target.errorCode);
            }
            
            const objStore = trans.objectStore("tasks");
            const request = objStore.add(item);
            
            request.onsuccess = e => {
                const cursor = objStore.openCursor(null, "prev");
     
                cursor.onsuccess = e => {
                    const item = e.target.result;
                    item.value["id"] = item.primaryKey;
                    obj.add(item.value);
                    obj.renderList();
                }
            }
            request.onerror = e => {
                console.log("Request error:" + e.target.onerror);
            }
        };
        request.onerror = e => {
            console.log("Request error:" + e.target.onerror);
        }
    },
    deleteItem(id) {
        const req = this._openRequest();
        req.onsuccess = e => {
            const db = e.target.result;
            const objectStore = db.transaction(["tasks"],"readwrite").objectStore("tasks");
            const range = IDBKeyRange.only(id);
            objectStore.openCursor(range).onsuccess = e => {
                const cursor = e.target.result;
                if(cursor) {
                    const deleted = cursor.delete();
                    deleted.onsuccess = e => {
                        console.log("Item deleted from database");
                    }
                }
            }

        }
    },
    changeStatus(id, statusType, tasklist) {
        const req = this._openRequest();
        req.onsuccess = e => {
            const db = e.target.result;
            const objectStore = db.transaction(["tasks"],"readwrite").objectStore("tasks");
            const range = IDBKeyRange.only(id);
            objectStore.openCursor(range).onsuccess = e => {
                const cursor = e.target.result;
                if(cursor) {
                    const obj = cursor.value;
                    obj["status"] = statusType;
                    const update = cursor.update(obj);
                    update.onsuccess = e => {
                        tasklist.renderList();
                    }
                }
            }

        }
    },
    generateTaskList(taskListObj) {
        const request = this._openRequest();
        request.onsuccess = e => {
            const db = e.target.result;
            const objStore = db.transaction(["tasks"],"readwrite").objectStore("tasks");
            const index = objStore.index("status");
            const range = IDBKeyRange.only("current");
            const keys = index.getAllKeys(range);
            keys.onsuccess = e => { 
                const keyList = e.target.result;   
                taskListObj.dataList = [];
                for(let key of keyList) {
                    const req = objStore.get(key);
                    req.onsuccess = e => {
                        const res = e.target.result;
                        res["id"] = key;
                        taskListObj.add({
                            "id": res.id,
                            "description": res.description,
                            "level": res.level,
                            "completeBy" : res.completeBy
                        }); 
                    }
                }
                taskListObj.renderList();
            }
            
        };
    }

}

export default Database;