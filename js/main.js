// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Hardcoded menu data
const menuItems = [
    {
        id: 1,
        name: 'Nasi Goreng Spesial',
        description: 'Nasi goreng dengan bumbu rahasia, telur, dan sayuran segar',
        price: 15000,
        image: 'images/Nasi_Goreng.jpg',
        category: 'makanan'
    },
    {
        id: 2,
        name: 'Ayam Goreng Crispy',
        description: 'Ayam goreng dengan tepung rahasia, renyah di luar juicy di dalam',
        price: 20000,
        image: 'images/Ayam_Goreng.jpg',
        category: 'makanan'
    },
    {
        id: 3,
        name: 'Ayam Bakar Spesial',
        description: 'Ayam bakar dengan bumbu khas, disajikan dengan sambal terasi',
        price: 20000,
        image: 'images/Ayam_Bakar.jpg',
        category: 'makanan'
    },
    {
        id: 4,
        name: 'Es Teh Manis',
        description: 'Teh manis dengan es batu segar',
        price: 5000,
        image: 'images/Nasi_Goreng.jpg',
        category: 'minuman'
    },
    {
        id: 5,
        name: 'Es Jeruk',
        description: 'Jeruk peras segar dengan es batu',
        price: 7000,
        image: 'images/Ayam_Goreng.jpg',
        category: 'minuman'
    },
    {
        id: 6,
        name: 'Es Campur',
        description: 'Campuran buah-buahan segar dengan sirup dan es batu',
        price: 10000,
        image: 'images/Ayam_Bakar.jpg',
        category: 'minuman'
    }
];

// Function to format price to Indonesian Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
}

// Function to create menu item card
function createMenuItemCard(item) {
    return `
        <div class="col-md-4 menu-item" data-aos="fade-up">
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="price">${formatPrice(item.price)}</p>
                    <button class="btn-order-now add-to-cart mt-auto" 
                        data-name="${item.name}"
                        data-price="${item.price}"
                        data-image="${item.image}">
                        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to display menu items
function displayMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    if (menuContainer) {
        menuContainer.innerHTML = menuItems.map(item => createMenuItemCard(item)).join('');
    }
}

// Shopping cart functionality
let cart = [];

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        cart.push(item);
        updateCartCount();
        showNotification(`${item.name} ditambahkan ke keranjang`);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Function to handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    showNotification('Terima kasih! Pesan Anda telah terkirim.');
    form.reset();
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display menu items
    displayMenuItems();

    // Add contact form submit handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Add navbar scroll handler
    window.addEventListener('scroll', handleNavbarScroll);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Favorite Marquee Hover Image
    const preview = document.getElementById('favoriteImagePreview');
    document.querySelectorAll('.marquee-item').forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            const imgSrc = this.getAttribute('data-img');
            if (imgSrc) {
                preview.innerHTML = `<img src="${imgSrc}" alt="${this.textContent}">`;
                preview.style.display = 'block';
            }
        });
        item.addEventListener('mouseleave', function() {
            preview.innerHTML = '';
            preview.style.display = 'none';
        });
    });
});