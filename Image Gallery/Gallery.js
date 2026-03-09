// Selecting elements
const items = document.querySelectorAll('.brick');
const modalBg = document.getElementById('preview-modal');
const modalImg = document.getElementById('full-image');
const filterTags = document.querySelectorAll('.tag');
const closeBtn = document.querySelector('.close-modal');

let currentPos = 0;
let activeItems = []; // List of currently visible items

// 1. FILTER LOGIC (Renamed function to 'sortGallery')
function sortGallery(filterType) {
    // Styling the active button
    filterTags.forEach(tag => {
        tag.classList.remove('active');
        // Logic to check text content
        if (tag.innerText.toLowerCase().includes(filterType) || (filterType === 'all' && tag.innerText === 'Show All')) {
            tag.classList.add('active');
        }
    });

    // Filtering the items
    items.forEach(item => {
        const itemType = item.getAttribute('data-type');
        
        if (filterType === 'all' || itemType === filterType) {
            item.style.display = 'block'; // Using display block instead of class toggle
        } else {
            item.style.display = 'none';
        }
    });
}

// 2. MODAL LOGIC

// Setup click events
items.forEach((brick) => {
    brick.addEventListener('click', function() {
        // Create a fresh list of visible items for navigation
        activeItems = Array.from(document.querySelectorAll('.brick')).filter(b => b.style.display !== 'none');
        
        currentPos = activeItems.indexOf(this);
        showModal(this.querySelector('img').src);
    });
});

function showModal(src) {
    modalBg.style.display = 'flex'; // Flex used for centering
    modalImg.src = src;
}

closeBtn.onclick = () => {
    modalBg.style.display = 'none';
};

// 3. NAVIGATION LOGIC (Function named 'navigate')
function navigate(direction) {
    currentPos += direction;

    // Loop logic
    if (currentPos < 0) {
        currentPos = activeItems.length - 1;
    } else if (currentPos >= activeItems.length) {
        currentPos = 0;
    }

    const nextSrc = activeItems[currentPos].querySelector('img').src;
    modalImg.src = nextSrc;
}

// Close on outside click (Extra feature different from first project)
window.onclick = function(event) {
    if (event.target == modalBg) {
        modalBg.style.display = "none";
    }
}