// @ts-check

class DomAccessor {

    /**
     * @template {HTMLElement} T
     * @param {string} id
     * @param {new () => T} constructor
     * @returns {T}
     */
    static getById(id, constructor) {
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`Element with id "${id}" was not found`);
        }
        if (!(element instanceof constructor)) {
            throw new Error(
                `Expected element with id "${id}" to be an instance of ${constructor.name}, but got ${element.constructor.name}`
            );
        }
        return element;
    }
}