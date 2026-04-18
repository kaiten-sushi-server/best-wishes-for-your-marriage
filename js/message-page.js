// @ts-check

class MessagePage {

    /**
     * @readonly @type {string}
     */
    static #DATA_IMG = "bsImg";

    /** @private */
    constructor() {}

    static get #galleryRow() { return DomAccessor.getById("gallery-row", HTMLDivElement); }
    static get #lightboxImage() { return DomAccessor.getById("lightboxImage", HTMLImageElement); }

    static init() {
        MessagePage.#renderGallery();
        MessagePage.#setupLightbox();
    }

    static #renderGallery() {
        const fragment = document.createDocumentFragment();

        for (const [photoType, fileNames] of Object.entries(photos)) {
            const isGroupPhoto = photoType === "group";

            fileNames.forEach(fileName => {
                const img = this.#createImage(fileName, isGroupPhoto);
                fragment.appendChild(img);
            });
        }

        MessagePage.#galleryRow.appendChild(fragment);
    }

    /**
     * @param {string} fileName
     * @param {boolean} isGroupPhoto
     * @returns {HTMLImageElement}
     */
    static #createImage(fileName, isGroupPhoto) {
        const img = document.createElement("img");
        const src = `images/${fileName}`;

        img.src = src;
        img.classList.add("gallery-img");
        img.dataset.bsToggle = "modal";
        img.dataset.bsTarget = "#lightboxModal";
        img.dataset[MessagePage.#DATA_IMG] = src;

        if (isGroupPhoto) {
            img.classList.add("featured");
        }

        return img;
    }

    static #setupLightbox() {
        MessagePage.#galleryRow.addEventListener('click', MessagePage.#handleGalleryRowClick);
    }

    /**
     * @param {Event} event
     */
    static #handleGalleryRowClick(event) {
        if (!(event.target instanceof HTMLElement)) return;

        const img = event.target.closest(".gallery-img");
        if (!(img instanceof HTMLImageElement)) return;

        MessagePage.#lightboxImage.src = img.dataset[MessagePage.#DATA_IMG] ?? '';
    }

}
