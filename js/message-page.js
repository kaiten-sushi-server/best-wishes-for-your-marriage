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

        INDIVIDUAL_PHOTO_NAMES.forEach(name => {
            const src = `messages/${name}.png`;
            const img = `
                <img src="${src}" class="gallery-img"
                    data-bs-toggle="modal" data-bs-target="#lightboxModal"
                    data-bs-img="${src}">
            `;
            MessagePage.#galleryRow.innerHTML += img;
        });

        const src = `messages/${GROUP_PHOTO_NAME}.png`;
        const img = `
            <img src="${src}" class="gallery-img featured"
                data-bs-toggle="modal" data-bs-target="#lightboxModal"
                data-bs-img="${src}">
        `;
        MessagePage.#galleryRow.innerHTML += img;
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
