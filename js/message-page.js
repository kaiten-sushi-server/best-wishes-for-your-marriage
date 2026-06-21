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

        for (const [photoType, photoNames] of Object.entries(photos)) {
            const isGroupPhoto = photoType === "group";

            photoNames.forEach(photoName => {
                const img = this.#createImage(photoName, isGroupPhoto);
                fragment.appendChild(img);
            });
        }

        MessagePage.#galleryRow.appendChild(fragment);
    }

    /**
     * @param {string} photoName
     * @param {boolean} isGroupPhoto
     * @returns {HTMLImageElement}
     */
    static #createImage(photoName, isGroupPhoto) {
        const img = document.createElement("img");
        const src = `images/avif/${photoName}.avif`;

        img.loading = "lazy";
        img.decoding = "async";
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
