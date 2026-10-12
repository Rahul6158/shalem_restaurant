/**
 * SHALEM RESTAURANT - INTERACTIVE SCRIPTS
 * Easily configure contact numbers and manage landing page actions.
 */

// ==========================================
// 1. CONFIGURATION (Stored in localStorage / Default fallback)
// ==========================================
const savedSettings = (() => {
    try {
        return JSON.parse(localStorage.getItem("shalem_settings") || "{}");
    } catch (e) {
        return {};
    }
})();

const RESTAURANT_CONFIG = {
    phone: savedSettings.phone || "9999999999",
    whatsapp: savedSettings.whatsapp || "919999999999",
    formattedPhone: savedSettings.formattedPhone || "+91 99999 99999",
    formattedWhatsApp: savedSettings.formattedWhatsApp || "+91 99999 99999"
};

// ==========================================
// 2. INITIALIZATION & DYNAMIC CONFIG REPLACEMENT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    applyConfigToDOMElements();
    initStickyHeader();
    initMobileNav();
    initScrollSpy();
    initMenuFilters();
    initContactForm();
});

// Update all placeholders in HTML with config values safely without destroying DOM listeners
function applyConfigToDOMElements() {
    // Update all tel: hrefs
    document.querySelectorAll('a[href*="tel:"]').forEach(el => {
        if (el.href.includes("XXXXXXXXXX") || el.classList.contains("btn-call") || el.id === "header-call-btn" || el.href.includes("9999999999")) {
            el.href = `tel:${RESTAURANT_CONFIG.phone}`;
        }
        if (el.innerText && el.innerText.includes("XXXXXXXXXX")) {
            el.innerText = el.innerText.replaceAll("XXXXXXXXXX", RESTAURANT_CONFIG.formattedPhone);
        }
    });

    // Update all wa.me hrefs
    document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
        if (el.href.includes("XXXXXXXXXX")) {
            el.href = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}`;
        }
        if (el.innerText && el.innerText.includes("XXXXXXXXXX")) {
            el.innerText = el.innerText.replaceAll("XXXXXXXXXX", RESTAURANT_CONFIG.formattedWhatsApp);
        }
    });

    // Replace plain text XXXXXXXXXX safely in text nodes without re-parsing innerHTML
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeValue && node.nodeValue.includes("XXXXXXXXXX")) {
            node.nodeValue = node.nodeValue.replaceAll("XXXXXXXXXX", RESTAURANT_CONFIG.formattedPhone);
        }
    }
}

function initContactForm() {
    const contactForm = document.getElementById("quick-contact-form");
    if (contactForm && !contactForm.getAttribute("onsubmit")) {
        contactForm.addEventListener("submit", handleContactSubmit);
    }
}

// ==========================================
// 3. STICKY HEADER
// ==========================================
function initStickyHeader() {
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
}

// ==========================================
// 4. MOBILE NAVIGATION
// ==========================================
function initMobileNav() {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    // Toggle menu
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navbar.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navbar.classList.remove("active");
        });
    });
}

// ==========================================
// 5. SCROLLSPY (Highlight active nav link)
// ==========================================
function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight slightly before section enters screen
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });
}

// ==========================================
// 6. MENU FILTERS (Fried Rice, Noodles, etc.)
// ==========================================
function initMenuFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            menuCards.forEach(card => {
                // Show/hide cards with smooth scaling
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// 7. LIGHTBOX FOR FOOD GALLERY
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(element) {
    const imgSrc = element.querySelector("img").src;
    const captionText = element.querySelector(".gallery-hover span").textContent;
    
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll when open
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto"; // Re-enable scroll
}

// Close lightbox on click outside the image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        closeLightbox();
    }
});

// ==========================================
// 8. ORDER FOOD MODAL & WHATSAPP INTEGRATION
// ==========================================
let currentSelectedItem = "";
let currentSelectedCategory = "";

function openOrderModal(itemName, itemCategory) {
    currentSelectedItem = itemName;
    currentSelectedCategory = itemCategory;
    
    document.getElementById("modal-item-name").textContent = itemName;
    document.getElementById("modal-item-category").textContent = itemCategory;
    
    // Reset inputs
    document.getElementById("order-quantity").value = 1;
    document.getElementById("order-instructions").value = "";
    
    document.getElementById("order-modal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
    document.body.style.overflow = "auto";
}

function submitOrder() {
    const qty = document.getElementById("order-quantity").value;
    const instructions = document.getElementById("order-instructions").value.trim();
    
    // Format WhatsApp message
    let text = `*New Order - Shalem Restaurant* 📝\n\n`;
    text += `🍛 *Item:* ${currentSelectedItem}\n`;
    text += `🏷️ *Category:* ${currentSelectedCategory}\n`;
    text += `🔢 *Quantity:* ${qty}\n`;
    
    if (instructions) {
        text += `🌶️ *Instructions:* ${instructions}\n`;
    }
    
    text += `\n_Sent via Shalem Restaurant Web App_`;
    
    // Save to local storage order history
    try {
        const orders = JSON.parse(localStorage.getItem("shalem_orders") || "[]");
        orders.unshift({
            id: 'ORD_' + Date.now(),
            item: currentSelectedItem,
            category: currentSelectedCategory,
            quantity: parseInt(qty, 10),
            instructions: instructions || '',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem("shalem_orders", JSON.stringify(orders));
    } catch (e) {}

    // Immediately open WhatsApp so browser popup blockers don't block it
    const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    closeModal("order-modal");
}

// ==========================================
// 9. CATERING BOOKING MODAL & WHATSAPP & PLANNER
// ==========================================

// State for selected catering dishes
let selectedCateringDishes = new Set();

function switchPlannerTab(tabName, element) {
    // Remove active class from all buttons in the tabs container
    const tabButtons = document.querySelectorAll(".planner-tab-btn");
    tabButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to clicked button
    element.classList.add("active");
    
    // Hide all panes
    const panes = document.querySelectorAll(".planner-pane");
    panes.forEach(pane => pane.classList.remove("active"));
    
    // Show correct pane
    const targetPane = document.getElementById(`pane-${tabName}`);
    if (targetPane) {
        targetPane.classList.add("active");
    }
}

function toggleCateringDish(dishName, element) {
    const icon = element.querySelector(".check-icon");
    if (selectedCateringDishes.has(dishName)) {
        // Deselect
        selectedCateringDishes.delete(dishName);
        element.classList.remove("selected");
        if (icon) {
            icon.className = "fa-regular fa-square check-icon";
        }
    } else {
        // Select
        selectedCateringDishes.add(dishName);
        element.classList.add("selected");
        if (icon) {
            icon.className = "fa-solid fa-square-check check-icon";
        }
    }
    
    // Update summary count
    const countBadge = document.getElementById("selected-dishes-count");
    if (countBadge) {
        countBadge.textContent = selectedCateringDishes.size;
    }
}

function openCateringModalWithPlanner() {
    // First open the modal using the default function
    openCateringModal("General Event");
    
    // Pre-fill the details text area with the selected dishes
    const detailsTextarea = document.getElementById("catering-details");
    if (detailsTextarea) {
        if (selectedCateringDishes.size > 0) {
            let detailsVal = "Custom Selected Catering Menu:\n";
            selectedCateringDishes.forEach(dish => {
                detailsVal += `- ${dish}\n`;
            });
            detailsTextarea.value = detailsVal;
        } else {
            detailsTextarea.value = "";
        }
    }
}

function clearCateringPlannerSelection() {
    // Clear the Set
    selectedCateringDishes.clear();
    
    // Update all dish-item elements to remove "selected" class and reset icons
    const dishItems = document.querySelectorAll(".dish-item");
    dishItems.forEach(item => {
        item.classList.remove("selected");
        const icon = item.querySelector(".check-icon");
        if (icon) {
            icon.className = "fa-regular fa-square check-icon";
        }
    });
    
    // Reset the count badge
    const countBadge = document.getElementById("selected-dishes-count");
    if (countBadge) {
        countBadge.textContent = "0";
    }
}

function openCateringModal(defaultEventType) {
    const eventSelect = document.getElementById("catering-event-type");
    if (defaultEventType && defaultEventType !== "General Event") {
        // Set dropdown option if matches
        for (let i = 0; i < eventSelect.options.length; i++) {
            if (eventSelect.options[i].text.includes(defaultEventType)) {
                eventSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    // Set default tomorrow date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("catering-date").value = tomorrow.toISOString().substring(0, 10);
    document.getElementById("catering-details").value = "";
    
    // Clear user fields
    document.getElementById("catering-name").value = "";
    document.getElementById("catering-phone").value = "";
    document.getElementById("catering-address").value = "";
    
    document.getElementById("catering-modal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function submitCateringInquiry() {
    const name = document.getElementById("catering-name").value.trim();
    const phone = document.getElementById("catering-phone").value.trim();
    const address = document.getElementById("catering-address").value.trim();
    const eventType = document.getElementById("catering-event-type").value;
    const guests = document.getElementById("catering-guests").value;
    const eventDate = document.getElementById("catering-date").value;
    const details = document.getElementById("catering-details").value.trim();
    
    if (!name || !phone || !address) {
        alert("Please enter your Name, Phone Number, and Event Address.");
        return;
    }
    
    let text = `*New Catering Inquiry - Shalem Restaurant* 🎊\n\n`;
    text += `👤 *Customer Name:* ${name}\n`;
    text += `📞 *Phone Number:* ${phone}\n`;
    text += `📍 *Event Address:* ${address}\n\n`;
    text += `🎉 *Event Type:* ${eventType}\n`;
    text += `👥 *Estimated Guests:* ${guests}\n`;
    text += `📅 *Date:* ${eventDate}\n`;
    
    if (details) {
        text += `\n📋 *Selected Menu/Details:*\n${details}\n`;
    }
    
    text += `\n_Sent via Shalem Restaurant Web App_`;
    
    // Save to local storage bookings history
    try {
        const bookings = JSON.parse(localStorage.getItem("shalem_bookings") || "[]");
        bookings.unshift({
            id: 'BK_' + Date.now(),
            name,
            phone,
            address,
            eventType,
            guests: parseInt(guests, 10),
            eventDate,
            details: details || '',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem("shalem_bookings", JSON.stringify(bookings));
    } catch (e) {}

    // Immediately open WhatsApp
    const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    closeModal("catering-modal");
}

// Close modals when clicking outside contents
window.addEventListener("click", (e) => {
    const orderModal = document.getElementById("order-modal");
    const cateringModal = document.getElementById("catering-modal");
    const reviewModal = document.getElementById("review-modal");
    
    if (e.target === orderModal) {
        closeModal("order-modal");
    }
    if (e.target === cateringModal) {
        closeModal("catering-modal");
    }
    if (e.target === reviewModal) {
        closeModal("review-modal");
    }
});

// ==========================================
// 10. QUICK CONTACT FORM SUBMISSION
// ==========================================
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById("form-name").value;
    const phone = document.getElementById("form-phone").value;
    const type = document.getElementById("form-type").value;
    const message = document.getElementById("form-message").value;
    
    let text = `*New Contact Inquiry - Shalem Restaurant* ✉️\n\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    text += `🏷️ *Inquiry Type:* ${type}\n`;
    text += `💬 *Message:* ${message}\n\n`;
    text += `_Sent via Shalem Restaurant Web App_`;
    
    // Save to local storage inquiries history
    try {
        const inquiries = JSON.parse(localStorage.getItem("shalem_inquiries") || "[]");
        inquiries.unshift({
            id: 'CON_' + Date.now(),
            name,
            phone,
            inquiryType: type,
            message,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem("shalem_inquiries", JSON.stringify(inquiries));
    } catch (e) {}

    // Immediately open WhatsApp
    const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    document.getElementById("quick-contact-form").reset();
}

// ==========================================
// 11. DYNAMIC CUSTOMER REVIEWS & RATING
// ==========================================
function openReviewModal() {
    document.getElementById("review-form").reset();
    resetReviewStars();
    document.getElementById("review-modal").classList.add("active");
    document.body.style.overflow = "hidden";
}

// Setup star hover and click handlers on load
function initReviewStars() {
    const starInputs = document.querySelectorAll(".star-input");
    const ratingValue = document.getElementById("review-rating-value");
    
    starInputs.forEach(star => {
        // Set default color
        updateStarDisplay(ratingValue.value);
        
        star.addEventListener("mouseover", () => {
            const val = parseInt(star.getAttribute("data-value"), 10);
            updateStarDisplay(val);
        });
        
        star.addEventListener("mouseout", () => {
            updateStarDisplay(ratingValue.value);
        });
        
        star.addEventListener("click", () => {
            const val = parseInt(star.getAttribute("data-value"), 10);
            ratingValue.value = val;
            updateStarDisplay(val);
        });
    });
}

function updateStarDisplay(rating) {
    const starInputs = document.querySelectorAll(".star-input");
    starInputs.forEach(s => {
        const val = parseInt(s.getAttribute("data-value"), 10);
        if (val <= rating) {
            s.style.color = "#ff9800"; // Active gold/orange
        } else {
            s.style.color = "#555"; // Empty charcoal/gray
        }
    });
}

function resetReviewStars() {
    const ratingValInput = document.getElementById("review-rating-value");
    if (ratingValInput) {
        ratingValInput.value = 5;
    }
    updateStarDisplay(5);
}

// Render dynamic review cards
function renderReviews(reviewsList) {
    const container = document.getElementById("reviews-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Sort reviews by creation date (newest first)
    const sorted = [...reviewsList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    sorted.forEach(rev => {
        const card = document.createElement("div");
        card.className = "review-card";
        
        // Generate stars markup
        let starsMarkup = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= rev.rating) {
                starsMarkup += `<i class="fa-solid fa-star"></i>`;
            } else {
                starsMarkup += `<i class="fa-regular fa-star" style="color: var(--text-muted);"></i>`;
            }
        }
        
        card.innerHTML = `
            <div class="stars">
                ${starsMarkup}
            </div>
            <p class="review-text">"${rev.text}"</p>
            <div class="reviewer-info">
                <div class="reviewer-avatar"><i class="fa-solid fa-user"></i></div>
                <div>
                    <h4>${rev.name}</h4>
                    <span>${rev.role}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

const DEFAULT_REVIEWS = [
    {
        id: 'REV_DEFAULT_1',
        name: 'Suresh Kumar',
        rating: 5,
        text: "Excellent taste and service. The Chicken Fried Rice is packed with flavor, and the catering staff was incredibly polite at my brother's wedding.",
        role: 'Event Host, Valluru',
        status: 'approved',
        createdAt: '2025-01-10T12:00:00.000Z'
    },
    {
        id: 'REV_DEFAULT_2',
        name: 'Rani Prasanna',
        rating: 5,
        text: 'Best catering service for our family function. They set up a clean, beautiful buffet stall, and the food was served sizzling hot. Everyone loved it!',
        role: 'Family Celebration, Valluru',
        status: 'approved',
        createdAt: '2025-01-15T12:00:00.000Z'
    },
    {
        id: 'REV_DEFAULT_3',
        name: 'K. Srinivas',
        rating: 5,
        text: 'Fresh food and reasonable prices. Our go-to spot for weekend cravings. Their Veg and Chicken Noodles are the absolute best in town.',
        role: 'Local Customer',
        status: 'approved',
        createdAt: '2025-01-20T12:00:00.000Z'
    },
    {
        id: 'REV_DEFAULT_4',
        name: 'Ramesh',
        rating: 4,
        text: 'The fried rice is delicious and always served hot! Great hygiene and quick takeaway service.',
        role: 'Local Customer, Valluru',
        status: 'approved',
        createdAt: '2025-01-25T12:00:00.000Z'
    }
];

// Load reviews from localStorage + defaults
function loadReviews() {
    let userReviews = [];
    try {
        userReviews = JSON.parse(localStorage.getItem("shalem_reviews") || "[]");
    } catch (e) {
        userReviews = [];
    }
    const allReviews = [...userReviews, ...DEFAULT_REVIEWS];
    renderReviews(allReviews);
}

// Handle new review submission entirely in frontend
function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById("review-name").value.trim();
    const role = document.getElementById("review-role").value.trim();
    const rating = document.getElementById("review-rating-value").value;
    const text = document.getElementById("review-text").value.trim();
    
    if (!name || !rating || !text) {
        alert("Please enter your name, rating, and review text.");
        return;
    }

    const newReview = {
        id: 'REV_' + Date.now(),
        name,
        role: role || 'Local Customer',
        rating: parseInt(rating, 10),
        text,
        status: 'approved',
        createdAt: new Date().toISOString()
    };

    try {
        const reviews = JSON.parse(localStorage.getItem("shalem_reviews") || "[]");
        reviews.unshift(newReview);
        localStorage.setItem("shalem_reviews", JSON.stringify(reviews));
    } catch (e) {}

    loadReviews();
    closeModal("review-modal");
    alert("Thank you! Your review has been submitted and published.");
}

function adjustHeaderForBanner() {
    const banner = document.getElementById("announcement-banner");
    const header = document.getElementById("header");
    if (!banner || !header) return;

    if (document.body.classList.contains("banner-active")) {
        const height = banner.offsetHeight;
        header.style.top = `${height}px`;
        document.body.style.paddingTop = `${height}px`;
    } else {
        header.style.top = "0px";
        document.body.style.paddingTop = "0px";
    }
}

// Window resize adjust banner height too
window.addEventListener("resize", adjustHeaderForBanner);

function updateStoreStatus() {
    const statusBadge = document.getElementById("store-status-badge");
    const statusSub = document.getElementById("store-status-sub");
    const banner = document.getElementById("announcement-banner");
    const bannerText = document.getElementById("banner-text-content");
    
    if (!statusBadge) return;

    // Check localStorage for manual admin override
    let statusData = {};
    try {
        statusData = JSON.parse(localStorage.getItem("shalem_status") || "{}");
    } catch (e) {}

    const isManualOverride = statusData && statusData.status;

    if (isManualOverride === "closed") {
        let reasonText = "Closed Today";
        if (statusData.reason === "maintenance") reasonText = "Closed for Maintenance";
        else if (statusData.reason === "festival") reasonText = "Closed for Festival Holiday";
        else if (statusData.reason === "personal") reasonText = "Closed Due to Personal Reasons";
        else if (statusData.reason === "tomorrow") reasonText = "Reopening Tomorrow";
        else if (statusData.customMessage) reasonText = statusData.customMessage;

        if (banner && bannerText) {
            bannerText.innerHTML = `<strong>Shalem Restaurant is ${reasonText}.</strong> We apologize for the inconvenience. Please contact us on WhatsApp for catering inquiries.`;
            document.body.classList.add("banner-active");
        }
        
        statusBadge.className = "status-badge closed";
        statusBadge.querySelector(".status-text").textContent = "Closed";
        if (statusSub) statusSub.style.display = "none";
    } else if (isManualOverride === "open") {
        if (banner) document.body.classList.remove("banner-active");
        statusBadge.className = "status-badge open";
        statusBadge.querySelector(".status-text").textContent = "Open Now";
        if (statusSub) {
            statusSub.style.display = "block";
            statusSub.style.color = "#2ecc71";
            statusSub.textContent = "Food Orders and Catering Bookings Available.";
        }
    } else {
        // Automatic schedule: Tuesday closed; Mon, Wed-Sun open 5 PM - 9 PM
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        let isOpen = false;

        if (day !== 2) { // 2 = Tuesday
            if (hour >= 17 && hour < 21) {
                isOpen = true;
            }
        }

        const textEl = statusBadge.querySelector(".status-text");
        if (isOpen) {
            if (banner) document.body.classList.remove("banner-active");
            statusBadge.className = "status-badge open";
            textEl.textContent = "Open Now";
            if (statusSub) {
                statusSub.style.display = "block";
                statusSub.textContent = "Food Orders and Catering Bookings Available.";
            }
        } else {
            statusBadge.className = "status-badge closed";
            if (statusSub) statusSub.style.display = "none";
            if (day === 2) {
                textEl.textContent = "Closed (Tuesday Holiday)";
            } else {
                textEl.textContent = "Closed Now";
            }
        }
    }
    adjustHeaderForBanner();
}

// ==========================================
// 13. VIRTUAL RESTAURANT MENU BOOKLET (FLIPBOOK)
// ==========================================
let currentSpreadIndex = 0;
const totalSpreads = 4;
const spreadLabels = [
    "Spread 1 of 4 • Front Cover & Heritage",
    "Spread 2 of 4 • Wok Fried Rice & Noodles",
    "Spread 3 of 4 • Royal Biryani & Traditional Meals",
    "Spread 4 of 4 • Desserts & Grand Event Catering"
];

function openFlipbookModal() {
    const modal = document.getElementById("flipbook-modal");
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    updateSpreadDisplay();
}

function closeFlipbookModal() {
    const modal = document.getElementById("flipbook-modal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

function handleFlipbookBackdropClick(event) {
    if (event.target && event.target.id === "flipbook-modal") {
        closeFlipbookModal();
    }
}

function turnFlipbookSpread(delta) {
    const nextIndex = currentSpreadIndex + delta;
    if (nextIndex >= 0 && nextIndex < totalSpreads) {
        currentSpreadIndex = nextIndex;
        updateSpreadDisplay();
    }
}

function jumpToSpread(index) {
    if (index >= 0 && index < totalSpreads) {
        currentSpreadIndex = index;
        updateSpreadDisplay();
    }
}

function updateSpreadDisplay() {
    // Spreads
    const spreads = document.querySelectorAll(".flipbook-spread");
    spreads.forEach((spread, idx) => {
        if (idx === currentSpreadIndex) {
            spread.classList.add("active");
        } else {
            spread.classList.remove("active");
        }
    });

    // Indicator label
    const indicator = document.getElementById("fb-page-indicator");
    if (indicator && spreadLabels[currentSpreadIndex]) {
        indicator.textContent = spreadLabels[currentSpreadIndex];
    }

    // Tab chips
    const tabs = document.querySelectorAll(".fb-tab-chip");
    tabs.forEach((tab, idx) => {
        if (idx === currentSpreadIndex) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    // Prev / Next button state
    const prevBtn = document.getElementById("fb-btn-prev");
    const nextBtn = document.getElementById("fb-btn-next");
    if (prevBtn) prevBtn.disabled = currentSpreadIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSpreadIndex === totalSpreads - 1;
}

function spotlightBookItem(element, spreadIndex) {
    if (!element) return;

    // 1. Manage active class in the menu list
    const parentList = element.closest('.book-menu-list');
    if (parentList) {
        parentList.querySelectorAll('.book-menu-item').forEach(item => {
            item.classList.remove('active-spotlight');
        });
    }
    element.classList.add('active-spotlight');

    // 2. Read dish data attributes
    const title = element.getAttribute('data-title') || 'Signature Specialty';
    const category = element.getAttribute('data-category') || 'Restaurant Special';
    const img = element.getAttribute('data-img') || 'assets/images/hero-banner.png';
    const badge = element.getAttribute('data-badge') || 'Fresh on Order';
    const price = element.getAttribute('data-price') || '';
    const desc = element.getAttribute('data-desc') || '';
    const tagsString = element.getAttribute('data-tags') || '';
    const diet = element.getAttribute('data-diet') || '';
    const isCatering = element.getAttribute('data-is-catering') === 'true';
    const eventType = element.getAttribute('data-event-type') || title;

    // 3. Update preview card elements on spreadIndex
    const imgEl = document.getElementById(`spotlight-img-${spreadIndex}`);
    const catEl = document.getElementById(`spotlight-cat-${spreadIndex}`);
    const titleEl = document.getElementById(`spotlight-title-${spreadIndex}`);
    const priceEl = document.getElementById(`spotlight-price-${spreadIndex}`);
    const descEl = document.getElementById(`spotlight-desc-${spreadIndex}`);
    const badgeEl = document.getElementById(`spotlight-badge-${spreadIndex}`);
    const dietEl = document.getElementById(`spotlight-diet-${spreadIndex}`);
    const tagsEl = document.getElementById(`spotlight-tags-${spreadIndex}`);
    const btnEl = document.getElementById(`spotlight-btn-${spreadIndex}`);

    if (imgEl) {
        imgEl.style.opacity = '0.35';
        setTimeout(() => {
            imgEl.src = img;
            imgEl.alt = title;
            imgEl.style.opacity = '1';
        }, 150);
    }

    if (catEl) catEl.textContent = category;
    if (titleEl) titleEl.textContent = title;
    if (priceEl) {
        priceEl.textContent = price;
        priceEl.style.display = price ? 'inline-block' : 'none';
    }
    if (descEl) descEl.textContent = desc;
    if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-crown"></i> ${badge}`;

    if (dietEl) {
        if (diet && diet !== 'none') {
            dietEl.style.display = 'inline-block';
            dietEl.className = `diet-icon ${diet} spotlight-diet-badge`;
            dietEl.title = diet === 'veg' ? 'Vegetarian' : (diet === 'egg' ? 'Contains Egg' : 'Non-Vegetarian');
        } else {
            dietEl.style.display = 'none';
        }
    }

    if (tagsEl) {
        if (tagsString) {
            const tags = tagsString.split(',');
            tagsEl.innerHTML = tags.map(t => `<span class="spotlight-tag">${t.trim()}</span>`).join('');
            tagsEl.style.display = 'flex';
        } else {
            tagsEl.style.display = 'none';
        }
    }

    if (btnEl) {
        if (isCatering) {
            btnEl.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Inquire Catering on WhatsApp`;
            btnEl.onclick = () => {
                closeFlipbookModal();
                openCateringModal(eventType);
            };
        } else {
            const priceTxt = price ? ` • ${price}` : '';
            btnEl.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Order on WhatsApp${priceTxt}`;
            btnEl.onclick = () => {
                openOrderModal(title, category);
            };
        }
    }

    // 4. In mobile single-page view, scroll smoothly to preview on top if scrolled down
    if (window.innerWidth <= 820) {
        const stage = document.getElementById('flipbook-stage');
        if (stage && stage.scrollTop > 220) {
            stage.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// Download High-Fidelity Menu PDF Function
function downloadMenuPDF() {
    showToast("Opening Official Menu PDF...", "info");
    window.open("menu.html?download=1", "_blank");
}

// Lightweight Toast Notification
function showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `luxury-toast toast-${type}`;
    const icon = type === "success" 
        ? '<i class="fa-solid fa-circle-check" style="color: #2ecc71;"></i>' 
        : (type === "error" ? '<i class="fa-solid fa-triangle-exclamation" style="color: #e74c3c;"></i>' : '<i class="fa-solid fa-circle-info" style="color: #d4af37;"></i>');

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3200);
}

function initFlipbookKeyboardNav() {
    window.addEventListener("keydown", (e) => {
        const modal = document.getElementById("flipbook-modal");
        if (!modal || !modal.classList.contains("active")) return;

        if (e.key === "ArrowLeft") {
            turnFlipbookSpread(-1);
        } else if (e.key === "ArrowRight") {
            turnFlipbookSpread(1);
        } else if (e.key === "Escape") {
            closeFlipbookModal();
        }
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initReviewStars();
    loadReviews();
    updateStoreStatus();
    initFlipbookKeyboardNav();
    // Update status every 60 seconds
    setInterval(updateStoreStatus, 60000);
});

// Expose handlers to window for HTML inline events in module / production builds
Object.assign(window, {
    openLightbox,
    closeLightbox,
    openOrderModal,
    closeModal,
    submitOrder,
    switchPlannerTab,
    toggleCateringDish,
    openCateringModalWithPlanner,
    clearCateringPlannerSelection,
    openCateringModal,
    submitCateringInquiry,
    handleContactSubmit,
    openReviewModal,
    submitReview,
    openFlipbookModal,
    closeFlipbookModal,
    handleFlipbookBackdropClick,
    turnFlipbookSpread,
    jumpToSpread,
    spotlightBookItem,
    downloadMenuPDF,
    showToast
});


