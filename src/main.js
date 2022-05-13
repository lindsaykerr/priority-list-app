import './style.css';

import PopUp from "./view/popup.js";
import MainSection from "./view/tasks.js";
import Database from "./logic/database.js";
import {Notifier} from "./logic/notifier.js"

let dbName = "priorityList";
const mainElement = MainSection.init(Notifier);
Database.init();

const htmlBody = document.querySelector("body");
const popUpBGElement = document.createElement("div");
popUpBGElement.setAttribute("id", "popup-bg");
htmlBody.appendChild(PopUp());
htmlBody.appendChild(popUpBGElement);
htmlBody.appendChild(mainElement); 


document.getElementById("btn-add").addEventListener("click", (ev)=> {
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-bg").style.display = "block";

});


document.getElementById("submit").addEventListener("click", (e)=>{
    
    if(document.forms[0].checkValidity()) {
        hideFrom();
    } else { 
        document.forms[0].reportValidity();
    }
});

document.getElementById("cancel").addEventListener("click", (e)=>{
    hideFrom();
});




function hideFrom() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup-bg").style.display = "none";
}



if (MainSection.dataList.length == 0 ) {
    Database.generateTaskList(MainSection);
    MainSection.renderList();
}

document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    // @ts-ignore
    const data = new FormData(e.target);
    
    const dataObj = {};
    for(let pair of data.entries()) {
        dataObj[pair[0]] = pair[1];
    }
    dataObj["status"] = "current";
    dataObj["level"] = parseInt(dataObj["level"]);
    dataObj["completeBy"] = new Date(dataObj["completeBy"]);


    Database.addItem(dataObj,MainSection);
    document.getElementById("cancel").click();
});

/*





    window.setTimeout((e)=>{}, 20);
    window.addEventListener("load", (e)=>{
        if(e) {
            const getRequest = window.indexedDB.open(dbName);
            getRequest.onsuccess = getAll;
        }
    });

    console.log("in db")
    const request = window.indexedDB.open(dbName);
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
   
    request.onsuccess = getAll;

    document.forms[0].addEventListener("submit", (e) => {
        e.preventDefault();
        // @ts-ignore
        const data = new FormData(e.target);
        
        const dataObj = {};
        for(let pair of data.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        dataObj["status"] = "current";
        dataObj["level"] = parseInt(dataObj["level"]);
        dataObj["completeBy"] = new Date(dataObj["completeBy"]);

  

        const requestToAdd = window.indexedDB.open(dbName);
        requestToAdd.onsuccess = e => {
            const db = e.target.result;
            const transaction = db.transaction(["tasks"], "readwrite");
            
            transaction.onerror = e => {
                console.log("Transaction error: " + e.target.errorCode);
            }
            
            const storage = transaction.objectStore("tasks");
            
            const addingItem = storage.add(dataObj);
            addingItem.onsuccess = e => {
                console.log("Item added");
            }
            addingItem.onerror = e => {
                console.log("Request error:" + e.target.onerror);
            }
        };

        requestToAdd.onerror = e => {
            console.log("Request error:" + e.target.onerror);
        }


        const getRequest = window.indexedDB.open(dbName);
        getRequest.onsuccess = getAll;

        
        document.getElementById("cancel").click();
    });




*/







    





