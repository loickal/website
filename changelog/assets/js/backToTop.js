var backButton;
var minHeight;

function initController(gotMinHeight) {

    backButton = document.querySelector("#backTopTop");
    if (backButton == null) {
        console.error("Cannot initialize the backToTop Controller, because the backToTop button wasn't found!")
        return;
    }
    minHeight = gotMinHeight;


    window.addEventListener("scroll", checkScroll);
    backButton.addEventListener("click", checkClick)
}


function checkScroll() {
    if (backButton == null) {
        return;
    }
    if (window.pageYOffset > minHeight) {
        showBackToTopButton();
    } else {
        hideBackToTopButton();
    }
}

function checkClick() {
    if (backButton == null) {
        return;
    }
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

function showBackToTopButton() {
    if (backButton == null) {
        console.error("Cannot hide backToTop Button, button is null!")
        return;
    }
    if (!backButton.classList.contains("btnEntrance")) {
        backButton.classList.remove("btnExit");
        backButton.classList.add("btnEntrance");
        backButton.style.display = "block";
    }
}

function hideBackToTopButton() {
    if (backButton == null) {
        console.error("Cannot hide backToTop Button, button is null!")
        return;
    }
    if (backButton.classList.contains("btnEntrance")) {
        backButton.classList.remove("btnEntrance");
        backButton.classList.add("btnExit");
        setTimeout(function() {
            backButton.style.display = "none";
        }, 250);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};