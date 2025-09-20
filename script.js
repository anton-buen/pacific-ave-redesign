document.addEventListener('DOMContentLoaded', () => {

    // --- Active Navigation Logic ---
    function setActiveNav() {
        const currentPage = location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // --- Building Features Gallery Logic ---
    const mainImage = document.querySelector('.gallery-main img');
    const mainTitle = document.querySelector('.gallery-main p');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;
    let autoplayInterval;

    const updateGallery = (index) => {
        const selectedThumbnail = thumbnails[index];
        const imageUrl = selectedThumbnail.src;
        const imageTitle = selectedThumbnail.alt;

        mainImage.src = imageUrl;
        mainTitle.textContent = imageTitle;

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        selectedThumbnail.classList.add('active');
        currentIndex = index;
    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateGallery(currentIndex);
        }, 4000); // Change image every 4 seconds
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                stopAutoplay();
                updateGallery(index);
                startAutoplay(); // Restart autoplay after manual selection
            });
        });
        
        // Initial setup and autoplay start
        updateGallery(currentIndex);
        startAutoplay();
    }

    // --- Execute on Load ---
    setActiveNav();
    smoothScroll();

});