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
            "1.19.4": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.19.4.1.8.EB.mrpack",
            "1.16.5": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7/OptiArk.1.16.5.1.7.EB.mrpack"
        },
        "Old": {
            "1.8.9 OptiFine": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.8.9.1.7.OptiFine.mrpack",
            "1.12.2 Sodium": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.12.2.1.7.Sodium.mrpack",
            "1.12.2 OptiFine": "https://github.com/arc360alt/arcswebsite/releases/download/oa1.7OLD/OptiArk.1.12.2.1.7.OptiFine.mrpack"
        },
        "Adventure Edition": {
            "1.21.5-0.1 (Unsupported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.1.mrpack",
            "1.21.5-0.2 (Unsupported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.2.mrpack",
            "1.21.5-0.3 (Unsupported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.Test.0.3.0.mrpack",
            "1.21.5-0.4 (Unsupported)": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.4.mrpack",
            "1.21.5-0.4.1": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.4.1.mrpack",
            "1.21.5-0.5 (TEST, UNSTABLE)": "https://github.com/arc360alt/arcswebsite/releases/download/oa-ae/OptiArk.Adventure.Edition.0.5-EARLYPR.mrpack"
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
        return technology === 'Adventure Edition' && version === '1.21.5-0.4.1';
    }

// Function to show/hide unsupported version banner
function toggleUnsupportedBanner(show, version = '') {
    let banner = document.getElementById('unsupported-banner');
    
    if (show) {
        // Create banner if it doesn't exist
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'unsupported-banner';
            banner.className = 'nes-container is-warning';
            banner.style.margin = '1rem auto 2rem auto';
            banner.style.maxWidth = '800px';
            banner.style.position = 'relative';
            
            const downloadSection = document.getElementById('download-section');
            if (downloadSection) {
                downloadSection.insertBefore(banner, downloadSection.firstChild);
            }
        }
        
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.25rem; flex-shrink: 0;">⚠️</span>
                <div style="flex-grow: 1; font-size: 0.75rem; line-height: 1.4;">
                    <strong>Warning:</strong> The version "${version}" is no longer being updated and may contain bugs or compatibility issues.
                </div>
                <button onclick="document.getElementById('unsupported-banner').style.display='none'" 
                        style="background: rgba(0,0,0,0.1); border: 2px solid #212529; 
                               cursor: url('pointing.png'), pointer; font-size: 0.875rem; font-weight: bold; 
                               height: 24px; width: 24px; display: flex; align-items: center; 
                               justify-content: center; font-family: 'Press Start 2P', cursive;">×</button>
            </div>
        `;
        banner.style.display = 'block';
    } else {
        if (banner) {
            banner.style.display = 'none';
        }
    }
}

// Function to show/hide infrequent updates banner
function toggleInfrequentUpdatesBanner(show, technology = '') {
    let banner = document.getElementById('infrequent-updates-banner');
    
    if (show) {
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'infrequent-updates-banner';
            banner.className = 'nes-container';
            banner.style.margin = '1rem auto 2rem auto';
            banner.style.maxWidth = '800px';
            banner.style.backgroundColor = '#f7d51d';
            
            const downloadSection = document.getElementById('download-section');
            const unsupportedBanner = document.getElementById('unsupported-banner');
            
            if (downloadSection) {
                if (unsupportedBanner) {
                    downloadSection.insertBefore(banner, unsupportedBanner.nextSibling);
                } else {
                    downloadSection.insertBefore(banner, downloadSection.firstChild);
                }
            }
        }
        
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.25rem; flex-shrink: 0;">📝</span>
                <div style="flex-grow: 1; font-size: 0.75rem; line-height: 1.4; color: #212529;">
                    <strong>Note:</strong> These versions will not be frequently updated like the other ones for various reasons.
                </div>
                <button onclick="document.getElementById('infrequent-updates-banner').style.display='none'" 
                        style="background: rgba(44, 62, 80, 0.2); border: 2px solid #212529; 
                               cursor: url('pointing.png'), pointer; font-size: 0.875rem; font-weight: bold; 
                               height: 24px; width: 24px; display: flex; align-items: center; 
                               justify-content: center; font-family: 'Press Start 2P', cursive; color: #212529;">×</button>
            </div>
        `;
        banner.style.display = 'block';
    } else {
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
            banner.className = 'nes-container';
            banner.style.margin = '1rem auto 2rem auto';
            banner.style.maxWidth = '800px';
            banner.style.backgroundColor = '#00aaff';
            banner.style.color = '#fff';
            
            const downloadSection = document.getElementById('download-section');
            const unsupportedBanner = document.getElementById('unsupported-banner');
            const infrequentBanner = document.getElementById('infrequent-updates-banner');
            
            if (downloadSection) {
                // Insert after the last existing banner
                if (infrequentBanner) {
                    downloadSection.insertBefore(banner, infrequentBanner.nextSibling);
                } else if (unsupportedBanner) {
                    downloadSection.insertBefore(banner, unsupportedBanner.nextSibling);
                } else {
                    downloadSection.insertBefore(banner, downloadSection.firstChild);
                }
            }
        }
        
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.25rem; flex-shrink: 0;">🎮</span>
                <div style="flex-grow: 1; font-size: 0.75rem; line-height: 1.4;">
                    <strong>Adventure Edition:</strong> This version is in development, and is not for performance, it is for the looks and for the adventure, expect bugs and less than optimal performance.
                </div>
                <button onclick="document.getElementById('adventure-edition-banner').style.display='none'" 
                        style="background: rgba(255,255,255,0.2); border: 2px solid #fff; 
                               cursor: url('pointing.png'), pointer; font-size: 0.875rem; font-weight: bold; 
                               height: 24px; width: 24px; display: flex; align-items: center; 
                               justify-content: center; font-family: 'Press Start 2P', cursive; color: #fff;">×</button>
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
