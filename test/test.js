import {Notifier, ItemObserver} from '../src/logic/notifier.js';
import assert from 'assert';


describe("Testing Notifier Methods", ()=>{
    /**
     * @type {Notifier}
     */
    const testNotifier = Object.create(Notifier);
    it("Add one observer, oberserver count should equal 1", function(){
        /**
         * @type {import('../src/logic/notifier.js').Priority}
         */
        const data = {"completeBy": 10, "description": "Task 1", "id": 1, "level": 3}
        const item1 = Object.create(ItemObserver);
        item1.data = data;
        

        testNotifier.addObserver(item1);
        assert.equal(testNotifier.observerCount, 1);
    });
    it("Remove one observer, oberserver count should equal 0", function(){
        testNotifier.removeObserver(1)
        assert.equal(testNotifier.observerCount, 0);
    });
    it("Remove non-existanct observer, oberserver count should equal 0", function(){
        testNotifier.removeObserver(10)
        assert.equal(testNotifier.observerCount, 0);
    });
    it("Adding three observer objects", ()=> {

        const item1 = Object.create(ItemObserver);
        item1.data = {"completeBy": 10, "description": "Task 1", "id": 1, "level": 3};
        const item2 = Object.create(ItemObserver);
        item2.data = {"completeBy": 100, "description": "Task 2", "id": 2, "level": 2};;
        const item3 = Object.create(ItemObserver);
        item3.data = {"completeBy": 10000, "description": "Task 3", "id": 3, "level": 4};;

        testNotifier.addObserver(item1);
        testNotifier.addObserver(item2);
        testNotifier.addObserver(item3);
        assert.deepEqual(testNotifier.observers, {'1':item1,'2':item2,'3':item3});
    });
});