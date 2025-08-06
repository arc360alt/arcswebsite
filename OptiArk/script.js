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

    // --- Image Modal Functionality ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeModalBtn = document.querySelector(".close-btn");

    // Assign event listener for the close button if it exists
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal();
        });
    }

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
            "1.21.4 (Unsuported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.4.1.7.Sodium.mrpack",
            "1.21.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.5.1.7.Sodium.mrpack",
            "1.21.6": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.6.1.7.Sodium.mrpack"
        },
        "VulkanMod": {
            "1.21.4 (Unsuported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.4.1.7.VK.mrpack",
            "1.21.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.5.1.7.VK.mrpack"
        },
        "Nividium": {
            "1.21.4 (Unsuported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.4.1.7.NV.mrpack",
            "1.21.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.5.1.7.NV.mrpack",
            "1.21.6": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.21.6.1.7.NV.mrpack"
        },
        "Embeddium": {
            "1.20.1": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.20.1.1.7.EB.mrpack",
            "1.16.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.16.5.1.7.EB.mrpack"
        },
        "Old": {
            "1.8.9 OptiFine": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.8.9.1.7.OptiFine.mrpack",
            "1.12.2 Sodium": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.12.2.1.7.Sodium.mrpack",
            "1.12.2 OptiFine": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.12.2.1.7.OptiFine.mrpack"
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
    // Ensure elements exist before adding listeners to prevent errors on pages without these elements
    if (technologySelect && versionSelect && dynamicDownloadLink && downloadMessage) {
        technologySelect.addEventListener('change', () => {
            populateVersions(); // Update versions when technology changes
            updateDownloadLink(); // Update download link (will hide it if version is not selected)
        });

        versionSelect.addEventListener('change', updateDownloadLink); // Update download link when version changes

        // Initial setup on page load for download section
        populateVersions(); // Initialize version dropdown
    }
});
