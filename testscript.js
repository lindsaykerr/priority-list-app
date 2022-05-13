import { Notifier, ItemObserver } from "./src/logic/notifier.js";

const item1 = Object.create(ItemObserver);
item1.setDate({"completeBy": new Date().valueOf()+10000, "description": "Task 1", "id": 1, "level": 3});
const item2 = Object.create(ItemObserver);
item2.data = {"completeBy": new Date().valueOf()+30000, "description": "Task 2", "id": 2, "level": 2};;
const item3 = Object.create(ItemObserver);
item3.data = {"completeBy": new Date().valueOf()+50000, "description": "Task 3", "id": 3, "level": 4};;



Notifier.addObserver(item1);
Notifier.addObserver(item2);
Notifier.addObserver(item3);
Notifier.run();
for(let i = 34; i > 0; i--) {
    console.log("Out of the interval loop")
}