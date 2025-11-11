// Countdown până la Crăciun
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25); // 25 Decembrie
    
    // Dacă Crăciunul a trecut deja anul acesta, targetează anul viitor
    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
    }
    
    const timeDifference = christmas - now;
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// JavaScript pentru funcționalități
document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu
    const menuToggle = document.querySelector('.menu-toggle');
    const phoneSidebar = document.querySelector('.phone-sidebar');
    
    menuToggle.addEventListener('click', function() {
        phoneSidebar.classList.toggle('active');
    });

    // Form submission
    const registrationForm = document.getElementById('registrationForm');
    const submitBtn = registrationForm.querySelector('.submit-btn');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Formularul a fost trimis cu succes!');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            registrationForm.reset();
        }, 2000);
    });

    // Countdown timer
    function updateCountdown() {
        const targetDate = new Date('2024-12-31T23:59:59').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Navigare între secțiuni
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Închide meniul pe mobile
        if (window.innerWidth <= 768) {
            document.querySelector('.phone-sidebar').classList.remove('active');
        }
        
        // Actualizează meniul activ
        document.querySelectorAll('.menu-link').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll smooth către secțiune
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Funcționalitate pentru checkbox și radio buttons
document.querySelectorAll('.checkbox-option, .radio-option').forEach(option => {
    option.addEventListener('click', function() {
        const input = this.querySelector('input');
        if (input.type === 'checkbox') {
            input.checked = !input.checked;
        } else if (input.type === 'radio') {
            input.checked = true;
            // Dezactivează toate celelalte radio buttons din același grup
            const groupName = input.name;
            document.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
                radio.closest('.radio-option').classList.remove('selected');
            });
            this.classList.add('selected');
        }
    });
});

// Funcționalitate pentru membri
document.querySelectorAll('.member-option').forEach(option => {
    option.addEventListener('click', function() {
        const input = this.querySelector('input');
        input.checked = true;
        
        // Dezactivează toate celelalte opțiuni
        document.querySelectorAll('.member-option').forEach(item => {
            item.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Form submission

document.getElementById('mainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mainForm = document.getElementById('mainForm');
    const submitBtn = mainForm.querySelector('.submit-btn');

    // Animatie de încărcare
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulează procesarea datelor
    setTimeout(() => {
        // Verifică dacă numele a fost completat
        const numeInput = document.getElementById('nume');
        if (!numeInput.value.trim()) {
            alert('Te rog completează cel puțin numele tău!');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }
        
        // Mesaj de succes
        alert(`Mulțumim, ${numeInput.value}! Răspunsurile tale au fost înregistrate. 🎉`);
        
        // Resetează formularul
        this.reset();
        
        // Resetează butonul
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Resetează selecțiile vizuale
        document.querySelectorAll('.member-option, .radio-option').forEach(item => {
            item.classList.remove('selected');
        });
    }, 2000);
});

// Actualizează countdown-ul la fiecare secundă
setInterval(updateCountdown, 1000);
updateCountdown(); // Inițializează imediat

// Efect de scris pentru textul "Despre"
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    const originalText = aboutText.textContent;
    aboutText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            aboutText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect when section is visible
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                aboutObserver.unobserve(entry.target);
            }
        });
    });
    
    aboutObserver.observe(aboutText);
}

// Animatie de fade in pentru elemente
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe form elements
document.querySelectorAll('.form-group, .social-link, .countdown-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Închide meniul când dai click în afara lui
document.addEventListener('click', function(e) {
    const phoneSidebar = document.querySelector('.phone-sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (phoneSidebar.classList.contains('active') && 
        !phoneSidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        phoneSidebar.classList.remove('active');
    }
});

// Actualizează ora pe telefon
function updatePhoneTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    const phoneTime = document.querySelector('.phone-time');
    if (phoneTime) {
        phoneTime.textContent = timeString;
    }
}

setInterval(updatePhoneTime, 60000);
updatePhoneTime();

// Efect de hover pentru elementele interactive
document.querySelectorAll('.menu-link, .social-link, .submit-btn').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Verifică dacă formularul este focusabil
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#4a5568';
        });
    });
});

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];

  const size = Math.random() * 1.5 + 1;
  snowflake.style.fontSize = `${size}rem`;
  snowflake.style.left = `${Math.random() * 100}%`;
  const duration = Math.random() * 5 + 5;
  snowflake.style.animationDuration = `${duration}s`;

  // Elimină fulgul când animația se termină
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });

  document.body.appendChild(snowflake); // vezi punctul 2
}
setInterval(createSnowflake, 500);
