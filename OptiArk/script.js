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
            "1.20.1 (Unsupported)": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.20.1.1.8.Sodium.zip",
            "1.21.4 (Unsupported)": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.4.1.8.Sodium.zip",
            "1.21.5": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.5.1.8.Sodium.zip",
            "1.21.6": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.6.1.8.Sodium.zip",
            "1.21.7": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.7.1.8.Sodium.zip",
            "1.21.8": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.8.1.8.Sodium.zip"
        },
        "VulkanMod": {
            "1.20.1": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.20.1.1.8.VK.zip",
            "1.21.4": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.4.1.8.VK.zip",
            "1.21.5": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.5.1.8.VK.zip"
        },
        "Nividium": {
            "1.20.1 (Unsupported)": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.20.1.1.8.NV.zip",
            "1.21.4 (Unsupported)": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.4.1.8.NV.zip",
            "1.21.5": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.5.1.8.NV.zip",
            "1.21.6": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.6.1.8.NV.zip",
            "1.21.7": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.7.1.8.NV.zip",
            "1.21.8": "https://github.com/arc360alt/OptiArk/releases/download/optiark-v1.8.0%2B1.21.8/OptiArk.1.21.8.1.8.NV.zip"
        },
        "Embeddium": {
            "1.20.1": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.20.1.1.7.EB.mrpack",
            "1.16.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.16.5.1.7.EB.mrpack"
        },
        "Old": {
            "1.8.9 OptiFine": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.8.9.1.7.OptiFine.mrpack",
            "1.12.2 Sodium": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.12.2.1.7.Sodium.mrpack",
            "1.12.2 OptiFine": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.12.2.1.7.OptiFine.mrpack"
        },
        "Adventure Edition": {
            "1.21.5-0.1 (Unsupported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.1.mrpack",
            "1.21.5-0.2": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.2.mrpack"
        }
    };

    const technologySelect = document.getElementById('technology-select');
    const versionSelect = document.getElementById('version-select');
    const dynamicDownloadLink = document.getElementById('dynamic-download-link');
    const downloadMessage = document.getElementById('download-message');

    // Helper function to check if a version is unsupported
    function isUnsupportedVersion(version) {
        // Add any keywords that indicate unsupported versions here
        const unsupportedKeywords = ['unsuported', 'unsupported', 'deprecated', 'discontinued'];
        return unsupportedKeywords.some(keyword => 
            version.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // Helper function to check if a technology has infrequent updates
    function isInfrequentlyUpdatedTechnology(technology) {
        const infrequentTechnologies = ['Old', 'Embeddium'];
        return infrequentTechnologies.includes(technology);
    }

    // Helper function to check if version is Adventure Edition
    function isAdventureEdition(technology, version) {
        return technology === 'Adventure Edition' && version === '1.21.5-0.2';
    }

    // Function to show/hide unsupported version banner
    function toggleUnsupportedBanner(show, version = '') {
        let banner = document.getElementById('unsupported-banner');
        
        if (show) {
            // Create banner if it doesn't exist
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'unsupported-banner';
                banner.className = 'unsupported-banner';
                
                const downloadSection = document.getElementById('download-section');
                const title = downloadSection.querySelector('.section-title');
                title.parentNode.insertBefore(banner, title.nextSibling);
            }
            
            banner.innerHTML = `
                <div class="banner-content">
                    <span class="warning-icon">⚠️</span>
                    <div class="banner-text">
                        <strong>Warning:</strong> The version "${version}" is no longer being updated and may contain bugs or compatibility issues.
                    </div>
                    <button class="banner-close" onclick="document.getElementById('unsupported-banner').style.display='none'">×</button>
                </div>
            `;
            banner.style.display = 'block';
        } else {
            // Hide banner if it exists
            if (banner) {
                banner.style.display = 'none';
            }
        }
    }

    // Function to show/hide infrequent updates banner
    function toggleInfrequentUpdatesBanner(show, technology = '') {
        let banner = document.getElementById('infrequent-updates-banner');
        
        if (show) {
            // Create banner if it doesn't exist
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'infrequent-updates-banner';
                banner.className = 'infrequent-updates-banner';
                
                const downloadSection = document.getElementById('download-section');
                const title = downloadSection.querySelector('.section-title');
                
                // Insert after unsupported banner if it exists, otherwise after title
                const unsupportedBanner = document.getElementById('unsupported-banner');
                if (unsupportedBanner) {
                    unsupportedBanner.parentNode.insertBefore(banner, unsupportedBanner.nextSibling);
                } else {
                    title.parentNode.insertBefore(banner, title.nextSibling);
                }
            }
            
            banner.innerHTML = `
                <div class="banner-content">
                    <span class="info-icon">📝</span>
                    <div class="banner-text">
                        <strong>Note:</strong> These versions will not be frequently updated like the other ones for various reasons.
                    </div>
                    <button class="banner-close" onclick="document.getElementById('infrequent-updates-banner').style.display='none'">×</button>
                </div>
            `;
            banner.style.display = 'block';
        } else {
            // Hide banner if it exists
            if (banner) {
                banner.style.display = 'none';
            }
        }
    }

    // Function to show/hide Adventure Edition banner
    function toggleAdventureEditionBanner(show) {
        let banner = document.getElementById('adventure-edition-banner');
        
        if (show) {
            // Create banner if it doesn't exist
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'adventure-edition-banner';
                banner.className = 'infrequent-updates-banner'; // Reuse the same CSS class as the note banner
                
                const downloadSection = document.getElementById('download-section');
                const title = downloadSection.querySelector('.section-title');
                
                // Find the last existing banner to insert after it
                const unsupportedBanner = document.getElementById('unsupported-banner');
                const infrequentBanner = document.getElementById('infrequent-updates-banner');
                
                if (infrequentBanner) {
                    infrequentBanner.parentNode.insertBefore(banner, infrequentBanner.nextSibling);
                } else if (unsupportedBanner) {
                    unsupportedBanner.parentNode.insertBefore(banner, unsupportedBanner.nextSibling);
                } else {
                    title.parentNode.insertBefore(banner, title.nextSibling);
                }
            }
            
            banner.innerHTML = `
                <div class="banner-content">
                    <span class="info-icon">🎮</span>
                    <div class="banner-text">
                        <strong>Adventure Edition:</strong> This version is in development, and is not for performance, it is for the looks and for the adventure, expect bugs and less than optimal performance.
                    </div>
                    <button class="banner-close" onclick="document.getElementById('adventure-edition-banner').style.display='none'">×</button>
                </div>
            `;
            banner.style.display = 'block';
        } else {
            // Hide banner if it exists
            if (banner) {
                banner.style.display = 'none';
            }
        }
    }

    // Function to populate the version dropdown based on selected technology
    function populateVersions() {
        const selectedTechnology = technologySelect.value;
        versionSelect.innerHTML = '<option value="">-- Select Version --</option>'; // Clear existing options
        versionSelect.disabled = true; // Disable until a technology is chosen
        dynamicDownloadLink.classList.add('hidden'); // Hide download link
        downloadMessage.textContent = 'Please select a technology and version to get your download link.';
        
        // Hide banners when technology changes
        toggleUnsupportedBanner(false);
        toggleInfrequentUpdatesBanner(false);
        toggleAdventureEditionBanner(false);

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

        // Check if version is unsupported and show/hide banner accordingly
        if (selectedVersion) {
            if (isUnsupportedVersion(selectedVersion)) {
                toggleUnsupportedBanner(true, selectedVersion);
            } else {
                toggleUnsupportedBanner(false);
            }
        } else {
            toggleUnsupportedBanner(false);
        }

        // Check if technology has infrequent updates and show/hide banner accordingly
        if (selectedTechnology && selectedVersion) {
            if (isInfrequentlyUpdatedTechnology(selectedTechnology)) {
                toggleInfrequentUpdatesBanner(true, selectedTechnology);
            } else {
                toggleInfrequentUpdatesBanner(false);
            }
        } else {
            toggleInfrequentUpdatesBanner(false);
        }

        // Check if it's Adventure Edition and show/hide banner accordingly
        if (selectedTechnology && selectedVersion) {
            if (isAdventureEdition(selectedTechnology, selectedVersion)) {
                toggleAdventureEditionBanner(true);
            } else {
                toggleAdventureEditionBanner(false);
            }
        } else {
            toggleAdventureEditionBanner(false);
        }

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
