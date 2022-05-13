export function AddTaskFrom() {
    const formSection = document.createElement('div');
    formSection.setAttribute("id", "add-priority");
    formSection.innerHTML = `
    <form id="form-add-task">
    <div>
        <textarea id="task-descrip" required="required" name="description"  rows="4" placeholder="Task" maxlength="150" minlength="1"></textarea>
    </div>
    <div>
       <label>Due:</label> <input id="completeBy" required="required" type="datetime-local" name="completeBy"/>
    </div>
    <div>
     <label>Priority Level: </label> <input required="required" id="level-input" type="number" min="1" max="5" step="1" value="1" name="level" />
    </div>
    <div id="submit-controls">
       <button id="cancel" name="cancel"type="reset">Cancel</button><button id="submit" type="submit" name="add">Add</button>
    </div>
    </form>
    `;
    return formSection;
}