// Reveal animation
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.12 }
);

elements.forEach(el => observer.observe(el));

// Mobile menu toggle & accessibility
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

// Shrink navbar on scroll
const navbar = document.querySelector('.navbar');
const shrink = () => {
  if (!navbar) return;
  if (window.scrollY > 30) navbar.classList.add('navbar--scrolled'); else navbar.classList.remove('navbar--scrolled');
};
window.addEventListener('scroll', shrink);
shrink();

// Toast utility
function showToast(message, type = 'info', timeout = 5000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-info');
  toast.innerHTML = `<button class="close" aria-label="Tutup">×</button><div class="message">${message}</div>`;
  container.appendChild(toast);

  const closeBtn = toast.querySelector('.close');
  closeBtn.addEventListener('click', () => { toast.remove(); });

  if (timeout) setTimeout(() => toast.remove(), timeout);
  return toast;
}

// Global error listeners to show visible notifications when runtime errors happen
window.addEventListener('error', (e) => {
  try { showToast('Terjadi error: ' + (e.message || 'Unknown error'), 'error', 8000); } catch (err) { /* ignore */ }
});

window.addEventListener('unhandledrejection', (e) => {
  try { showToast('Promise ditolak: ' + (e.reason && e.reason.message ? e.reason.message : String(e.reason)), 'error', 8000); } catch (err) { /* ignore */ }
});

// Expose test function to simulate an error (for debugging)
window.testError = () => { throw new Error('Tes error: ini sengaja dipicu'); };

// Lead form handling (short lead -> redirect to WhatsApp with prefilled message)
(function(){
  const WA_NUMBER = '6289518573420'; // destination WhatsApp number (change if needed)
  const lead = document.getElementById('lead-form');
  if (!lead) return;

  const btnReset = document.getElementById('btn-reset');

  lead.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = lead.name.value.trim();
    const phone = lead.phone.value.trim();
    const type = lead.type.value || 'Lainnya';
    const details = lead.details.value.trim();

    if (!name || !phone || !details) {
      showToast('Lengkapi semua bidang yang diperlukan.', 'error', 5000);
      return;
    }

    const message = `Halo, saya ${name}%0aTugas: ${type}%0aDeskripsi: ${details}%0aNomor WA saya: ${phone}`;
    showToast('Mengalihkan ke WhatsApp...', 'info', 2500);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // optional: keep form filled or reset after redirect
    setTimeout(() => { lead.reset(); }, 600);
  });

  if (btnReset) btnReset.addEventListener('click', () => { lead.reset(); showToast('Form direset.', 'info', 2200); });
})();

// Counter animation
const counters = document.querySelectorAll(".proof-card strong");

counters.forEach(counter => {
  let start = 0;
  // Extract number ignoring + sign
  let end = parseInt(counter.innerText.replace(/\D/g, '')) || 0;
  if (isNaN(end) || end === 0) return;

  let duration = 1500;
  let step = Math.ceil(end / (duration / 16));

  const update = () => {
    start += step;
    if (start >= end) {
      counter.innerText = end + "+";
    } else {
      counter.innerText = start;
      requestAnimationFrame(update);
    }
  };

  update();
});
