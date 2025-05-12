document.addEventListener('DOMContentLoaded', () => {

    // --- Generic Smooth Scroll Logic for Internal Links ---
    // Select all anchor links that start with '#'
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid ID selector (e.g., "#features", not just "#")
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault(); // Prevent the default anchor jump
                        targetElement.scrollIntoView({
                            behavior: 'smooth', // Enable smooth scrolling
                            block: 'start' // Try to align the top of the target element with the top of the viewport
                        });
                    }
                } catch (error) {
                    // Handle cases where the targetId might be an invalid selector, though unlikely here
                    console.error("Error finding or scrolling to element:", error);
                }
            }
        });
    });

    // --- Image Modal Functionality (Keep As Is) ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeModalBtn = document.querySelector(".close-btn"); // Ensure close button is selected if not already

    window.openModal = function(src, altText) {
        if (modal && modalImg && captionText) {
            modal.style.display = "block";
            modalImg.src = src;
            modalImg.alt = altText;
            captionText.innerHTML = altText;
        }
    }

    window.closeModal = function() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(event) {
            // Close if the click is directly on the modal background, not the image or caption
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal && modal.style.display === "block") {
            closeModal();
        }
    });

});
