const gallery = (function () {
    const GALLERY = document.querySelector(".gallery__container");
    const FOCUSED_IMAGE = document.createElement("img");

    FOCUSED_IMAGE.classList.add("gallery__focusedImage");

    const THUMBNAILS = document.createElement("div");
    THUMBNAILS.classList.add("gallery__thumbnails");


    function buildThumbnail(image) {
        const BUTTON = document.createElement("button");
        BUTTON.addEventListener("click", changeFocus);
        BUTTON.innerHTML = `<img src = "${image}" alt = "gallereri miniature" class = "gallery__thumbnail">`;
        BUTTON.classList.add("gallery__button");
        THUMBNAILS.append(BUTTON);
    }

    function changeFocus(event){
        FOCUSED_IMAGE.src = event.target.src;
    }


    function init(images = []) {
        FOCUSED_IMAGE.src = images[0];
        images.forEach(buildThumbnail); //putter thumbnails ind i div'en
        GALLERY.append(FOCUSED_IMAGE, THUMBNAILS);
    }
    return {
        init
    };

})()