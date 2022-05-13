
/**
 * 
 * @typedef {Object} DomElementChain
 * @prop {function} addId - sets the id attribute of an element
 * @prop {function} addClass - sets a class attribute of an element
 * @prop {function} addClasses - sets multiple class attributes of an element
 * @prop {function} addAttribute - sets a attribute for the element
 * @prop {function} addAttributes - sets multiple attributes for a element
 * @prop {function} appendChild - adds and appends a child element
 * @prop {function} appendChildren - adds multiple child elements to element
 * @prop {function} refElement - get reference to element
 * @prop {function} innerHTML - adds inner HTML
 * @prop {function} setStyle - add style elements;
 */

/**
 * Get element by ID
 * @param {string} id valid DOM id
 * @returns {DomElementChain | null}
 */
export function getElementById(id) {
    const element = document.getElementById(id);
    return element !== null ? elementChain(element) : null;
}
/**
 * Create a new element
 * @param {string} tagName 
 * @returns {DomElementChain}
 */
export function newElement(tagName) {
    return elementChain(document.createElement(tagName))
}


/**
 * Allows a number of operations to carried out on a element, by 
 * chaining methods.
 * @param {HTMLElement} element 
 * @returns {object}
 */
function elementChain(element) {
    return {
        element: element,
        innerHTML(html) {
            this.element.innerHTML = html;
            return this;
        },
        addId(id) {
            this.element.setAttribute("id", id);
            return this;
        },
        addClass(className) {
            this.element.classList.add(className);
            return this;
        },
        addClasses(classNameArray) {
            this.element.classList.add(...classNameArray);
            return this;
        },
        addAttribute(attr, value) {
            this.element.setAttribute(attr, value);
            return this;
        },
        addAttributes(attrObject) {
            for(let key in attrObject) {
                this.element.setAttribute(key, attrObject[key]);
            }
            return this;
        },
        appendChild(child) {
            this.element.appendChild(child);
            return this;
        },
        appendChildren(childList) {
            for(let child of childList) {
                this.element.appendChild(child);
            }
            return this;
        },
        setStyle(styleObj) {
            for(let key in styleObj) {
                this.element.style[key] = styleObj[key];
            }
            return this;
        },
        refElement() {
            return this.element;
        }
    };
}