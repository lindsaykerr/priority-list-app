import Database from "./database.js";
import MainSection from "../view/tasks.js";

/**
 * @typedef {Object} Priority
 * @prop {number} id - contains a unique entry id
 * @prop {number} level - value 0-9
 * @prop {number} completeBy - timestamp
 * @prop {string} description = discription 
 */

/**
 * @typedef {object} ItemObserver
 * @prop {Priority | undefined} data - priority data
 * @prop {function} update - will remove item from notifier
 */


export const Notifier = {
    observers: {},
    observerCount: 0,
    timer: undefined,

    /**
     * Add and Observer
     * @param {ItemObserver} observer 
     */
    addObserver(obj) {
        if (!(obj.id in this.observers)) {
            this.observerCount++;
            this.observers[obj.id] = obj;
            if (!this.timer || this.observerCount === 1) {
                this.run();
            } 
        }
    },

    removeObserver(observerID){
        if (observerID in this.observers) {
            observerID
            this.observerCount--;
            delete this.observers[observerID];
            if (this.observerCount <= 0) {
                this.stop();
            }
        }
    },

    notify() {
        for(let key in this.observers) {
            this.observers[key].update(this, new Date().valueOf(), MainSection);
        }
    },

    run() {
        this.timer = setInterval(()=>{
            const lastObserverCount = this.observerCount;
            if (lastObserverCount > 0) {
                MainSection.renderList();
                this.notify();
            }
        }, 60000)
    },
 
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}

export const ItemObserver = {

    update(notifier, dateTimeNumber, location) {
        if (dateTimeNumber > this.completeBy) {
            notifier.removeObserver(this.id);
            Database.changeStatus(this.id, "unfinished", location);
            Database.generateTaskList(MainSection);
            console.log("removed " + this.id);           
        }
    }
}