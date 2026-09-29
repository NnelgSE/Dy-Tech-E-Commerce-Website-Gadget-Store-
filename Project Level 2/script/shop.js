/* ============================================================
   Gadget Store — shop.js
   Handles: product catalog, cart (localStorage), lightbox,
   and rendering for product.html / checkout.html / index.html.

   BACKEND HAND-OFF POINTS are marked with "TODO(backend):" —
   search for that string when you're ready to connect a real API.
   ============================================================ */

/* ---------------- Product catalog ----------------
   TODO(backend): replace this array with a fetch:
   const PRODUCTS = await fetch('/api/products').then(r => r.json());
--------------------------------------------------- */
const PRODUCTS = [
  {
    id: "p1",
    name: "Samsung Galaxy S21",
    category: "Smartphones",
    price: 25000,
    rating: 4.9,
    image: "images/Samsung Galaxy S212.jpg",

    gallery: [
      "images/Samsung Galaxy S212.jpg",
      "images/Samsung1.jpg",
      "images/samsung2.jpg",
      "images/Samsung3.jpg",
    ],

    description:
      "Flagship Android smartphone with a smooth 120Hz display, triple camera system, and all-day battery life.",

    specs: [
      ["Display", '6.2" Dynamic AMOLED, 120Hz'],
      ["Chipset", "Exynos 2100"],
      ["RAM / Storage", "8GB / 128GB"],
      ["Battery", "4000 mAh"],
      ["Camera", "12MP triple rear"],
    ],
  },

  {
    id: "p2",
    name: "MacBook Air M2",
    category: "Laptop",
    price: 55000,
    rating: 4.6,
    image: "images/MacBook Air M2.jpg",

    gallery: [
      "images/MacBook Air M2.jpg",
      "images/MacBook Air M22.jpg",
      "images/MacAir2.jpg",
      "images/MacAir1.jpg",
    ],

    description:
      "Thin, fanless laptop built on Apple's M2 chip — fast enough for everyday work and creative apps, with all-day battery.",

    specs: [
      ["Chip", "Apple M2, 8-core CPU"],
      ["RAM / Storage", "8GB / 256GB SSD"],
      ["Display", '13.6" Liquid Retina'],
      ["Battery", "Up to 18 hours"],
      ["Weight", "1.24 kg"],
    ],
  },

  {
    id: "p3",
    name: "Gaming Headphones",
    category: "Headphones",
    price: 3500,
    rating: 4.5,
    image: "images/Headphones.jpg",

    gallery: [
      "images/Headphones.jpg",
      "images/headset.jpg",
      "images/HeadPhone.jpg",
      "images/headset-removebg-preview.png",
    ],

    description:
      "Over-ear gaming headset with a noise-cancelling mic and deep bass drivers, built for long sessions.",

    specs: [
      ["Driver", "50mm dynamic"],
      ["Mic", "Detachable, noise-cancelling"],
      ["Connection", "3.5mm + USB"],
      ["Weight", "310 g"],
    ],
  },

  {
    id: "p4",
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    price: 1999,
    rating: 4.0,
    image: "images/Smartwatch.jpg",

    gallery: ["images/Smartwatch.jpg"],

    description:
      "Smartwatch with fitness tracking, heart-rate monitoring, notifications, and a bright always-on display.",

    specs: [
      ["Display", "Always-on Retina"],
      ["Sensors", "Heart rate, blood oxygen"],
      ["Water resistance", "50m"],
      ["Battery", "Up to 18 hours"],
    ],
  },

  {
    id: "p5",
    name: "PC Digital Mouse",
    category: "Mouse",
    price: 499,
    rating: 4.5,
    image: "images/gaming mouse.png",

    gallery: ["images/gaming mouse.png"],

    description:
      "Responsive gaming mouse designed for accurate control, comfortable handling, and everyday computer use.",

    specs: [
      ["Connection", "USB"],
      ["Type", "Gaming mouse"],
      ["Design", "Ergonomic"],
      ["Use", "Gaming and productivity"],
    ],
  },

  {
    id: "p6",
    name: "EPSON EcoTank L3350",
    category: "Printer",
    price: 10799,
    rating: 4.6,
    image: "images/epson2.jpg",

    gallery: ["images/epson2.jpg"],

    description:
      "Epson EcoTank all-in-one printer designed for everyday printing, scanning, and copying.",

    specs: [
      ["Type", "All-in-one printer"],
      ["Functions", "Print, Scan, Copy"],
      ["Technology", "EcoTank"],
      ["Connection", "USB / Wireless"],
    ],
  },

  {
    id: "p7",
    name: "iMac Pro Desktop",
    category: "Apple Mac Pro Desktop",
    price: 463210,
    rating: 4.5,
    image: "images/IOSdesktop.png",

    gallery: ["images/IOSdesktop.png"],

    description:
      "Apple desktop computer designed for productivity, creative work, and demanding everyday applications.",

    specs: [
      ["Type", "Desktop computer"],
      ["Brand", "Apple"],
      ["Display", "Retina display"],
      ["Operating System", "macOS"],
    ],
  },

  {
    id: "p8",
    name: 'LCD Monitor ACER 19.6"',
    category: "LCD Monitor",
    price: 10999,
    rating: 4.4,
    image: "images/LCDMonitor-removebg-preview.png",

    gallery: ["images/LCDMonitor-removebg-preview.png"],

    description:
      "Acer LCD monitor designed for everyday computing, office work, entertainment, and productivity.",

    specs: [
      ["Display", '19.6" LCD'],
      ["Brand", "Acer"],
      ["Type", "LCD Monitor"],
      ["Use", "Office and everyday computing"],
    ],
  },
];

const TAX_RATE = 0.0; // adjust if you need VAT added at checkout
const SHIPPING_FLAT = 0; // set a peso amount if shipping isn't free

/* ---------------- Cart (localStorage) ----------------
   Shape: [{ id: "p1", qty: 2 }, ...]
   TODO(backend): once there's a login/session, swap localStorage
   for a server-side cart tied to the user (POST /api/cart).
-------------------------------------------------------- */
const CART_KEY = "gadgetstore_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Could not save cart:", e);
  }
  renderCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function updateCartQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  updateCartQty(id, 0);
}

function cartWithProducts() {
  return getCart()
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter(Boolean);
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return cartWithProducts().reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
}

function formatPeso(amount) {
  return "₱" + amount.toLocaleString("en-PH", { maximumFractionDigits: 2 });
}

function renderCartBadge() {
  document.querySelectorAll(".cart-badge").forEach((el) => {
    el.textContent = cartCount();
    el.style.display = cartCount() > 0 ? "inline-flex" : "none";
  });
}

/* ------ ORDER NOW AND EXPLORE MORE Buttons-----*/

document.querySelectorAll(".orderBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("#service").scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.querySelector(".bookBtn")?.addEventListener("click", () => {
  document.querySelector("#about").scrollIntoView({
    behavior: "smooth",
  });
});

/*-----Checkout Page Card Payment ---*/

let selectedPayment = "card";

document.querySelectorAll(".pay-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedPayment = tab.dataset.pay;
  });
});

/* ---------------- Lightbox ----------------
   Any <img> with class "lightbox-trigger" opens in the overlay.
   Works from a single shared image, or a data-gallery group.
-------------------------------------------- */
function initLightbox() {
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
    <img class="lightbox-image" src="" alt="">
    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector(".lightbox-image");
  let currentGroup = [];
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    imgEl.src = currentGroup[currentIndex];
  }

  function open(src, group) {
    currentGroup = group && group.length ? group : [src];
    currentIndex = currentGroup.indexOf(src);
    if (currentIndex === -1) currentIndex = 0;
    show(currentIndex);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".lightbox-trigger");
    if (!trigger) return;
    e.preventDefault();
    const groupName = trigger.dataset.gallery;
    const group = groupName
      ? Array.from(
          document.querySelectorAll(
            `.lightbox-trigger[data-gallery="${groupName}"]`,
          ),
        ).map((el) => el.dataset.full || el.src)
      : [];
    open(trigger.dataset.full || trigger.src, group);
  });

  overlay.querySelector(".lightbox-close").addEventListener("click", close);
  overlay
    .querySelector(".lightbox-prev")
    .addEventListener("click", () => show(currentIndex - 1));
  overlay
    .querySelector(".lightbox-next")
    .addEventListener("click", () => show(currentIndex + 1));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
}

/* ---------------- Star rating helper ---------------- */
function renderStars(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-${i <= Math.round(rating) ? "solid" : "regular"} fa-star"></i>`;
  }
  return html + `<span>${rating.toFixed(1)}</span>`;
}

/* ---------------- Page: product.html ---------------- */
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const product =
    PRODUCTS.find((p) => p.id === params.get("id")) || PRODUCTS[0];

  document.title = `${product.name} — Gadget Store`;
  document
    .querySelectorAll("[data-product-name]")
    .forEach((el) => (el.textContent = product.name));
  document
    .querySelectorAll("[data-product-price]")
    .forEach((el) => (el.textContent = formatPeso(product.price)));
  document
    .querySelectorAll("[data-product-description]")
    .forEach((el) => (el.textContent = product.description));
  document
    .querySelectorAll("[data-product-rating]")
    .forEach((el) => (el.innerHTML = renderStars(product.rating)));
  document
    .querySelectorAll("[data-product-category]")
    .forEach((el) => (el.textContent = product.category));

  const mainImage = document.querySelector(".product-main-image");
  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
    mainImage.dataset.full = product.image;
  }

  const thumbRow = document.querySelector(".product-thumbs");
  if (thumbRow) {
    thumbRow.innerHTML = product.gallery
      .map(
        (src, i) => `
        <img src="${src}" alt="${product.name} view ${i + 1}"
             class="product-thumb lightbox-trigger ${i === 0 ? "is-active" : ""}"
             data-full="${src}" data-gallery="product-gallery">`,
      )
      .join("");
    thumbRow.querySelectorAll(".product-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.dataset.full;
        mainImage.dataset.full = thumb.dataset.full;
        thumbRow
          .querySelectorAll(".product-thumb")
          .forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
      });
    });
  }

  const specBody = document.querySelector(".spec-table-body");
  if (specBody) {
    specBody.innerHTML = product.specs
      .map(
        ([label, value]) =>
          `<div class="spec-row"><dt>${label}</dt><dd>${value}</dd></div>`,
      )
      .join("");
  }

  const qtyInput = document.querySelector(".qty-value");
  document.querySelectorAll(".qty-decrease").forEach((btn) =>
    btn.addEventListener("click", () => {
      qtyInput.textContent = Math.max(1, parseInt(qtyInput.textContent) - 1);
    }),
  );
  document.querySelectorAll(".qty-increase").forEach((btn) =>
    btn.addEventListener("click", () => {
      qtyInput.textContent = parseInt(qtyInput.textContent) + 1;
    }),
  );

  const addBtn = document.querySelector(".add-to-cart-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart(product.id, parseInt(qtyInput.textContent));
      addBtn.textContent = "Added ✓";
      setTimeout(() => (addBtn.textContent = "Add to Cart"), 1200);
    });
  }

  const buyNowBtn = document.querySelector(".buy-now-btn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      addToCart(product.id, parseInt(qtyInput.textContent));
      window.location.href = "checkout.html";
    });
  }

  // Related products (everything except the current one)
  const relatedRow = document.querySelector(".related-products");
  if (relatedRow) {
    relatedRow.innerHTML = PRODUCTS.filter((p) => p.id !== product.id)
      .map(
        (p) => `
        <a class="product-list" href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <div class="rating">${renderStars(p.rating)}</div>
          <p>${formatPeso(p.price)}</p>
        </a>`,
      )
      .join("");
  }
}

/* ---------------- Page: checkout.html ---------------- */
function initCheckoutPage() {
  const itemsEl = document.querySelector(".checkout-items");
  const emptyEl = document.querySelector(".checkout-empty");
  const items = cartWithProducts();

  if (items.length === 0) {
    if (itemsEl) itemsEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
  } else {
    if (emptyEl) emptyEl.style.display = "none";
    if (itemsEl) {
      itemsEl.innerHTML = items
        .map(
          (item) => `
        <div class="ticket-item" data-id="${item.id}">
          <img class="ticket-thumb" src="${item.image}" alt="${item.name}">
          <div class="ticket-info">
            <div class="name">${item.name}</div>
            <div class="qty-controls">
              <button type="button" class="qty-decrease" data-id="${item.id}">–</button>
              <span>${item.qty}</span>
              <button type="button" class="qty-increase" data-id="${item.id}">+</button>
              <button type="button" class="remove-item" data-id="${item.id}">Remove</button>
            </div>
          </div>
          <div class="ticket-price">${formatPeso(item.price * item.qty)}</div>
        </div>`,
        )
        .join("");
    }
  }

  function refreshTotals() {
    const subtotal = cartSubtotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + (subtotal > 0 ? SHIPPING_FLAT : 0);
    document
      .querySelectorAll("[data-subtotal]")
      .forEach((el) => (el.textContent = formatPeso(subtotal)));
    document
      .querySelectorAll("[data-tax]")
      .forEach((el) => (el.textContent = formatPeso(tax)));
    document
      .querySelectorAll("[data-total]")
      .forEach((el) => (el.textContent = formatPeso(total)));
  }
  refreshTotals();

  document.querySelectorAll(".checkout-items").forEach((container) => {
    container.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (!id) return;
      const current = getCart().find((c) => c.id === id);
      if (e.target.classList.contains("qty-increase"))
        updateCartQty(id, current.qty + 1);
      if (e.target.classList.contains("qty-decrease"))
        updateCartQty(id, current.qty - 1);
      if (e.target.classList.contains("remove-item")) removeFromCart(id);
      initCheckoutPage(); // re-render
    });
  });

  // Payment method tabs (Card / GCash / Installment / COD)
  document.querySelectorAll(".pay-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".pay-tab")
        .forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      document
        .querySelectorAll(".pay-panel")
        .forEach((p) => p.classList.remove("is-active"));
      document
        .querySelector(`.pay-panel[data-panel="${tab.dataset.pay}"]`)
        ?.classList.add("is-active");
    });
  });

  // Place order
  const form = document.querySelector(".checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cartCount() === 0) {
        alert("Your cart is empty.");
        return;
      }
      /* TODO(backend): replace this block with a real request, e.g.
         const res = await fetch('/api/orders', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ items: getCart(), customer: formDataObject, payment: selectedMethod })
         });
         Then redirect to a confirmation page using the order id the API returns. */
      alert(
        "Order placed! (This is a demo — connect a backend to actually process orders.)",
      );
      localStorage.removeItem(CART_KEY);
      window.location.href = "index.html";
    });
  }
}

/* ---------------- Page: index.html wiring ---------------- */
function initHomePage() {
  document.querySelectorAll(".product-list[data-id]").forEach((card) => {
    const id = card.dataset.id;
    const link = document.createElement("a");
    // Make the whole card clickable through to the product page,
    // but keep the Add to Cart button working independently.
    card.querySelectorAll("img, h4").forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener(
        "click",
        () => (window.location.href = `product.html?id=${id}`),
      );
    });
    const btn = card.querySelector("button");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(id, 1);
        btn.textContent = "Added ✓";
        setTimeout(() => (btn.textContent = "Add to Cart"), 1200);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLightbox();
  renderCartBadge();
  if (document.body.dataset.page === "product") initProductPage();
  if (document.body.dataset.page === "checkout") initCheckoutPage();
  if (document.body.dataset.page === "home") initHomePage();
});

// This is for Installment Toggle hide and Show ///

const installmentToggle = document.querySelector("#installment-toggle");
const installmentContent = document.querySelector("#installment-content");

if (installmentToggle && installmentContent) {
  installmentToggle.addEventListener("click", () => {
    installmentContent.classList.toggle("show");

    const isOpen = installmentContent.classList.contains("show");

    installmentToggle.setAttribute("aria-expanded", isOpen);
  });
}

// Toast Notification Product //

function showToast(message) {
  const toast = document.getElementById("toast_cart");
 

  toast.textContent = message;
  toast.classList.add("show");

  // Hide it after 3 seconds

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.querySelector(".add-to-cart-btn").addEventListener("click", () => {
  showToast("Item Added to Cart");
 
});


// Toast notication Checkout //

const checkoutForm = document.querySelector("form");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  showBuyToast("Order placed successfully!");
});




