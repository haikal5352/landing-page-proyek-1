// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({...item, quantity: 1});
        }
        this.saveCart();
        this.updateTotal();
    }

    removeItem(itemName) {
        this.items = this.items.filter(item => item.name !== itemName);
        this.saveCart();
        this.updateTotal();
    }

    updateQuantity(itemName, quantity) {
        const item = this.items.find(i => i.name === itemName);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(itemName);
            }
        }
        this.saveCart();
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.updateCartDisplay();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartBadge();
    }

    updateCartBadge() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-badge').forEach(badge => {
            badge.textContent = totalItems;
        });
    }

    updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-items');
        if (!cartContainer) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p class="text-center">Keranjang belanja Anda kosong</p>';
            return;
        }

        cartContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h5 class="cart-item-title">${item.name}</h5>
                    <p class="cart-item-price">Rp ${item.price.toLocaleString()}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-name="${item.name}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" data-name="${item.name}">
                        <button class="quantity-btn plus" data-name="${item.name}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-name="${item.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Update summary
        const subtotal = document.getElementById('subtotal');
        const delivery = document.getElementById('delivery');
        const total = document.getElementById('total');
        
        if (subtotal) subtotal.textContent = `Rp ${this.total.toLocaleString()}`;
        if (delivery) delivery.textContent = 'Rp 10.000';
        if (total) total.textContent = `Rp ${(this.total + 10000).toLocaleString()}`;

        // Add event listeners
        this.addCartEventListeners();
    }

    addCartEventListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.dataset.name;
                const input = document.querySelector(`.quantity-input[data-name="${itemName}"]`);
                let quantity = parseInt(input.value);

                if (e.target.classList.contains('plus')) {
                    quantity += 1;
                } else if (e.target.classList.contains('minus')) {
                    quantity -= 1;
                }

                this.updateQuantity(itemName, quantity);
            });
        });

        // Quantity input
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemName = e.target.dataset.name;
                const quantity = parseInt(e.target.value);
                this.updateQuantity(itemName, quantity);
            });
        });

        // Remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.closest('.cart-item-remove').dataset.name;
                this.removeItem(itemName);
            });
        });
    }
}

// Initialize cart
const cart = new Cart();

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = {
            name: button.dataset.name,
            price: parseInt(button.dataset.price),
            image: button.dataset.image
        };
        cart.addItem(item);
        showNotification('Item ditambahkan ke keranjang!');
    });
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification fade-in';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Proteksi login untuk tombol checkout
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            // Tampilkan popup login
            const popup = document.getElementById('loginPopup');
            if (popup) popup.style.display = 'block';
        } else {
            window.location.href = 'checkout.html';
        }
    });
}

// Close popup
const closeLoginPopup = document.getElementById('closeLoginPopup');
if (closeLoginPopup) {
    closeLoginPopup.addEventListener('click', function() {
        document.getElementById('loginPopup').style.display = 'none';
    });
}

// Tutup popup jika klik di luar modal
window.addEventListener('click', function(event) {
    const popup = document.getElementById('loginPopup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
}); 