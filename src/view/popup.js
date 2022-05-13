import { AddTaskFrom } from "./taskForm.js";

function PopUp() {
    const popUpSection = document.createElement("div");
    popUpSection.setAttribute("id", "popup");
    popUpSection.appendChild(AddTaskFrom());
    return popUpSection;
}

export default PopUp;