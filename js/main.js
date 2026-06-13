// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU
// ============================================
const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn) menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
if (menuClose) menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============================================
// HERO PARALLAX
// ============================================
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
  });
}

// ============================================
// ACCORDION
// ============================================
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const isActive = header.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.classList.remove('active');
      h.nextElementSibling.classList.remove('open');
    });

    // Toggle current
    if (!isActive) {
      header.classList.add('active');
      body.classList.add('open');
    }
  });
});

// ============================================
// BOOKING MODAL
// ============================================
const bookingModal = document.getElementById('bookingModal');
const invoiceModal = document.getElementById('invoiceModal');

function openBooking(packageName) {
  const packageSelect = document.getElementById('tripPackage');
  if (packageSelect && packageName) {
    packageSelect.value = packageName;
  }
  bookingModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  bookingModal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeInvoice() {
  invoiceModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click
if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBooking();
  });
}

if (invoiceModal) {
  invoiceModal.addEventListener('click', (e) => {
    if (e.target === invoiceModal) closeInvoice();
  });
}

// ============================================
// BOOKING FORM SUBMIT
// ============================================
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName').value;
    const email = document.getElementById('bookEmail').value;
    const date = document.getElementById('bookDate').value;
    const people = document.getElementById('bookPeople').value;
    const pkg = document.getElementById('tripPackage').value;

    const prices = {
      'Mentawai Jungle Surf 3D2N': 2800000,
      'Deep Culture Immersion 5D4N': 5500000,
      'Ultimate Mentawai 7D6N': 8500000,
    };

    const price = prices[pkg] || 2800000;
    const total = price * parseInt(people);

    // Format date
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Fill invoice
    document.getElementById('inv-name').textContent = name;
    document.getElementById('inv-email').textContent = email;
    document.getElementById('inv-pkg').textContent = pkg;
    document.getElementById('inv-date').textContent = dateStr;
    document.getElementById('inv-people').textContent = people + ' person(s)';
    document.getElementById('inv-price').textContent = 'IDR ' + price.toLocaleString('id-ID') + ' / person';
    document.getElementById('inv-total').textContent = 'IDR ' + total.toLocaleString('id-ID');
    document.getElementById('inv-code').textContent = 'MTW-' + Date.now().toString().slice(-6);

    // WA message
    const waMsg = encodeURIComponent(
      `Halo Mentawai Odyssey! 🌿\n\nSaya ingin konfirmasi booking:\n\n` +
      `👤 Nama: ${name}\n📧 Email: ${email}\n📦 Paket: ${pkg}\n📅 Tanggal: ${dateStr}\n👥 Peserta: ${people} orang\n💰 Total: IDR ${total.toLocaleString('id-ID')}\n\n` +
      `Mohon konfirmasi ketersediaan. Terima kasih!`
    );

    const waBtn = document.getElementById('waConfirmBtn');
    if (waBtn) waBtn.href = `https://wa.me/6281234567890?text=${waMsg}`;

    // Switch modals
    closeBooking();
    setTimeout(() => {
      invoiceModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 300);
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);
