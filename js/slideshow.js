var myIndex = -1;
var carouselTimer;
var slides = document.getElementsByClassName("mySlides");
var dotsContainer = document.querySelector("[data-slider-dots]");
var dots = [];

for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "omega-slider__dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "الانتقال إلى الشريحة " + (i + 1));
    dot.addEventListener("click", createDotHandler(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
}

carousel();

function createDotHandler(index) {
    return function () {
        window.clearTimeout(carouselTimer);
        showSlide(index);
        scheduleCarousel();
    };
}

function carousel() {
    var nextIndex = (myIndex + 1) % slides.length;
    showSlide(nextIndex);
    scheduleCarousel();
}

function showSlide(index) {
    var i;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].setAttribute("aria-hidden", "true");
        dots[i].classList.remove("is-active");
        dots[i].setAttribute("aria-selected", "false");
    }

    myIndex = index;
    slides[myIndex].style.display = "flex";
    slides[myIndex].setAttribute("aria-hidden", "false");
    dots[myIndex].classList.add("is-active");
    dots[myIndex].setAttribute("aria-selected", "true");
}

function scheduleCarousel() {
    carouselTimer = window.setTimeout(carousel, 5000);
}

var revealItems = document.querySelectorAll(".scroll-reveal:not(.is-visible)");

if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach(function (item) {
        item.classList.add("is-visible");
    });
}
