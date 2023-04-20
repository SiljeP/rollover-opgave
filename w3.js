//transform scale bruges sammen med mouse x og y
function imageZoom(event) {
    var img, lens, result, cx, cy;
    img = document.querySelector(".gallery__focusedImage");
    result = document.querySelector(".img-zoom-result");
    /* Laver lensen paa det fokuserede billede */
    lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    /* saetter lensen ind */
    img.parentElement.insertBefore(lens, img);
    /* Beregner forholdet mellem resultDIV og Lensen */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* touch screens: skal det tiløjes? test om det virker via gitHub pages */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(event) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        event.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(event);
        /* Calculate the position of the lens: */
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(event) {
        var a, x = 0, y = 0;
        event = event || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = event.pageX - a.left;
        y = event.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}
