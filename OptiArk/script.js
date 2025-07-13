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

    // --- NEW: Download Page Specific JavaScript ---

    // Data structure for technologies, versions, and download links
    // IMPORTANT: Replace these placeholder URLs with your actual download links!
    const DOWNLOAD_DATA = {
        "Sodium": {
            "1.21.4": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.5/OptiArk.1.5.1.21.4.mrpack",
            "1.21.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.6/OptiArk.1.6.1.21.5.mrpack",
            "1.21.6": "https://github.com/arc360alt/arcswebsite/releases/download/oa.1.6(21.6)/OptiArk.1.6.1.21.6.mrpack"
        },
        "VulkanMod": {
            "1.21.4": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.5/OptiArk.1.5.1.21.4.1.5.0VK.mrpack",
            "1.21.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.6/OptiArk.1.6.1.21.5.VULKAN.mrpack"
        },
        "Nividium": {
            "1.21.6": "https://github.com/arc360alt/arcswebsite/releases/download/oa.1.6(21.6)/OptiArk.1.6.1.21.6NV.1.6.0NV.mrpack",
            "1.21.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.6/OptiArk.1.6.1.21.5NV.1.6.0.mrpack"
        }
    };

    const technologySelect = document.getElementById('technology-select');
    const versionSelect = document.getElementById('version-select');
    const dynamicDownloadLink = document.getElementById('dynamic-download-link');
    const downloadMessage = document.getElementById('download-message');

    // Function to populate the version dropdown based on selected technology
    function populateVersions() {
        const selectedTechnology = technologySelect.value;
        versionSelect.innerHTML = '<option value="">-- Select Version --</option>'; // Clear existing options
        versionSelect.disabled = true; // Disable until a technology is chosen
        dynamicDownloadLink.classList.add('hidden'); // Hide download link
        downloadMessage.textContent = 'Please select a technology and version to get your download link.';

        if (selectedTechnology && DOWNLOAD_DATA[selectedTechnology]) {
            const versions = Object.keys(DOWNLOAD_DATA[selectedTechnology]);
            versions.forEach(version => {
                const option = document.createElement('option');
                option.value = version;
                option.textContent = version;
                versionSelect.appendChild(option);
            });
            versionSelect.disabled = false; // Enable version select
        }
    }

    // Function to update the download link
    function updateDownloadLink() {
        const selectedTechnology = technologySelect.value;
        const selectedVersion = versionSelect.value;

        if (selectedTechnology && selectedVersion && DOWNLOAD_DATA[selectedTechnology] && DOWNLOAD_DATA[selectedTechnology][selectedVersion]) {
            const url = DOWNLOAD_DATA[selectedTechnology][selectedVersion];
            dynamicDownloadLink.href = url;
            dynamicDownloadLink.classList.remove('hidden'); // Show download link
            downloadMessage.textContent = `Download your selected ${selectedTechnology} ${selectedVersion} file here:`;
        } else {
            dynamicDownloadLink.classList.add('hidden'); // Hide download link
            downloadMessage.textContent = 'Please select a technology and version to get your download link.';
        }
    }

    // Event Listeners for download dropdowns
    technologySelect.addEventListener('change', () => {
        populateVersions(); // Update versions when technology changes
        updateDownloadLink(); // Update download link (will hide it if version is not selected)
    });

    versionSelect.addEventListener('change', updateDownloadLink); // Update download link when version changes

    // Initial setup on page load for download section
    document.addEventListener('DOMContentLoaded', () => {
        populateVersions(); // Initialize version dropdown
    });

});
