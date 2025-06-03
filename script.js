const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");
const images = Array.from(document.querySelectorAll("#filterable-cards img"));
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterableCards.forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const match = title.includes(searchTerm);
        card.classList.toggle("hide", !match);
        if (match) {
            card.style.animation = "fadeInCard 0.5s ease forwards";
        }
    });
});


filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelector("#filter-buttons .active").classList.remove("active");
        e.target.classList.add("active");
        filterableCards.forEach(card => {
            const match = e.target.dataset.filter === "all" || card.dataset.name === e.target.dataset.filter;
            card.classList.toggle("hide", !match);
            if (match) card.style.animation = "fadeInCard 0.6s forwards";
        });
    });
});

let currentIndex = 0;
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <div class="lightbox-controls">
        <span id="prev">&#10094;</span>
        <span id="next">&#10095;</span>
    </div>
    <img src="" alt="Preview">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const closeBtn = lightbox.querySelector(".lightbox-close");

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        currentIndex = index;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

function showImageWithAnimation(direction) {
    lightboxImg.classList.remove("slide-left", "slide-right"); 
    void lightboxImg.offsetWidth; 

    if (direction === "next") {
        lightboxImg.classList.add("slide-left");
    } else {
        lightboxImg.classList.add("slide-right");
    }

    lightboxImg.src = images[currentIndex].src;
}

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImageWithAnimation("prev");
});

document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImageWithAnimation("next");
});


document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImageWithAnimation("prev");
        } else if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length;
            showImageWithAnimation("next");
        } else if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    }
});

filterableCards.forEach(card => {
    const img = card.querySelector('img');
    const link = document.createElement('a');
    link.href = img.src;
    link.download = '';
    link.className = 'download-btn';
    link.innerHTML = '&#x2B07;';
    link.title = 'Download';
    card.querySelector('.card-body').appendChild(link);
});

const loadMoreBtn = document.getElementById("load-more");
const cards = Array.from(document.querySelectorAll("#filterable-cards .card"));
let visibleCount = 8;
const increment = 8; 

function showVisibleCards() {
    cards.forEach((card, index) => {
        if (index < visibleCount) {
            card.classList.remove("hide");
            card.style.animation = "fadeInCard 0.5s ease forwards";
        } else {
            card.classList.add("hide");
        }
    });

    if (visibleCount >= cards.length) {
        loadMoreBtn.style.display = "none";
    }
}

showVisibleCards();

loadMoreBtn.addEventListener("click", () => {
    visibleCount += increment;
    showVisibleCards();
});
