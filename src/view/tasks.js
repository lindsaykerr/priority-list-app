import {CompleteButtonSVG} from "./completeBtn.js"
import LevelColours from "./colors.js";
import { getElementById, newElement } from "../utils/domHelper.js";
import { ItemObserver, Notifier } from "../logic/notifier.js";
import Database from "../logic/database.js";

/**
 * @typedef {Object} Priority
 * @prop {number} id - contains a unique entry id
 * @prop {number} level - value 0-9
 * @prop {Date} completeBy - timestamp
 * @prop {string} description = discription 
 */



const MainSection = {
    dataList: [],
    init(notifier){
        this.notifier = notifier;
        const el = newElement("div").addId("main")
        el.appendChild(this._controlSection());
        el.appendChild(newElement("div").addId("task-listing").refElement());
        return el.refElement();
    },


    setDataList(dataList) {
        this.dataList = dataList;
    },
    add(item) {
        this.dataList.push(item);
        item.update = ItemObserver.update;
        this.notifier.addObserver(item);
    },

    renderList() {
         
        window.setTimeout(()=>{
            const el = getElementById("task-listing");
            el.innerHTML("")
            if(this.dataList.length === 0) {
                return;
            };
            
            this.dataList.sort((a, b)=> b.level - a.level);
         
       
            el.appendChildren(
                this.dataList.map((obj)=> this._taskElement(obj))
            );
        },100);
    },
    
    _controlSection() {
        const el = newElement("div").addClass("controls").innerHTML(`
            <div id="btn-holder">
                <button id="btn-add" type="button">
                    <svg viewbox="0 0 5.2916665 5.2916668">
                        <g fill="none"
                        transform="translate(0,-291.70832)"
                        id="layer1">
                    <circle
                        r="2.6458333"
                        cy="294.35416"
                        cx="2.6458333"
                        id="path863"
                        style="opacity:1;vector-effect:none;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" />
                    <path
                        id="rect821"
                        d="m 2.3175239,292.23748 v 1.78333 H 0.53485112 v 0.66163 H 2.3175239 v 1.7827 h 0.6616508 v -1.7827 H 4.7625 v -0.66163 H 2.9791747 v -1.78333 z"
                        style="opacity:1;fill:#383838;fill-opacity:1;stroke:none;stroke-width:0.79793423;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.98507463" />
                    </g>
                    </svg>
                <span class="sr-only">Add Item</span></button>
            </div>`);
        return el.refElement();
    },

    /**
     * 
     * @param {Priority} dataObj 
     * @returns 
     */
    _taskElement(dataObj) {
        let durationMessage = "";
  
        let secs = parseInt((dataObj.completeBy - Date.now()) / 1000);
        const days = secs >= 86400 ? `${parseInt(secs / 86400)}d` : "";
        secs = secs >= 86400 ? secs % 86400: secs;
        const hours = secs >= 3600 ? ` ${parseInt(secs / 3600)}hrs` : ""; 
        secs = secs >= 3600 ? secs % 3600: secs;
        const minutes = secs >= 60 ? ` ${parseInt(secs / 60)}min` : "0min"; 
        durationMessage = days + hours + minutes;


        const el = newElement("article").addId("task-" + dataObj["id"].toString())
        el.addClass("priority-item");
        el.setStyle({backgroundColor: LevelColours[dataObj.level.toString()]}); 
        el.innerHTML(`
        <div class="task-descrip">${dataObj.description}</div>
        <div class="controls">
            <button type="button" class="remove"><svg width="30" height="10">
                <rect width="30" height="10" style="fill:rgba(122, 122, 122, .5);stroke-width:0;stroke:rgb(0,0,0)" />
              </svg> <span class="sr-only">remove</span></button>
            <div class="time-view">${durationMessage}</div>
            <button type="button" class="complete"><span class="sr-only">complete</span></button>
        </div>`
        );
    
        const controls = el.refElement().querySelector(".controls");
        controls.querySelector(".complete").append(CompleteButtonSVG(dataObj.id,dataObj.level));
        controls.querySelector(".complete").addEventListener("click", (e) => {
            //const btnId = btn.id.match(/^completebtn-(\d+)$/)[1];
            Notifier.removeObserver(dataObj.id);
            Database.changeStatus(dataObj.id, "complete", this);
            Database.generateTaskList(this);
        });
        controls.querySelector(".remove").addEventListener("click", (e) => {
            //const btnId = btn.id.match(/^completebtn-(\d+)$/)[1];
            Notifier.removeObserver(dataObj.id);
            Database.deleteItem(dataObj.id);
            Database.generateTaskList(this);
            console.log("should remove")
        });
        
        return el.refElement();
    }

}

export default MainSection;