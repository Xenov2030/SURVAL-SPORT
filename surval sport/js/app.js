document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENU RESPONSIVE (Toggle)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animación simple hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    });

    // Cerrar menú al hacer click en un link (Mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(s => s.style = "");
        });
    });

    // 2. LÓGICA DE VEHÍCULOS (Surval Sport)
    const vehiculos = {
        Ford: ["Territory", "Bronco Sport", "Bronco","Kuga","Mustang", "Transit", "Ranger", "EcoSport", "Focus", "Fiesta", "Mondeo",],
        Chevrolet: ["Corsa", "Cruze", "Onix", "Tracker", "S10"],
        Volkswagen: ["Gol", "Polo", "Vento", "Amarok", "Golf"],
        Toyota: ["Corolla", "Hilux", "Etios", "Yaris", "SW4"],
        Peugeot: ["206", "207", "208", "308", "Partner", "Fiesta"],
        BMW: ["Serie 1", "Serie 3", "Serie 5", "X1", "X5"],
        Audi: ["A3", "A4", "A6", "Q3", "Q5"],
        Renault: ["Clio", "Kangoo", "Sandero", "Duster", "Logan", "kwid", "Captur", "torino"],
        Mercedez: ["Clase A", "Clase C", "Clase E", "GLA", "GLE"],
        Nissan: ["March", "Sentra", "Versa", "Frontier", "X-Trail"],
        Dodge: ["Ram 1500", "Durango", "Challenger", "Charger", "Journey"],
        Suzuki: ["Swift", "Vitara", "Jimny", "Baleno", "Celerio"],
        Honda: ["Civic", "Accord", "Fit", "CR-V", "HR-V"],
        Fiat: ["Palio", "Siena", "Cronos", "Toro", "Strada"],
        Subaru: ["Impreza", "Forester", "Outback", "XV", "WRX"],
        Mazda: ["Mazda2", "Mazda3", "CX-3", "CX-5", "MX-5"],
        Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
        Jeep: ["Renegade", "Compass", "Wrangler", "Grand Cherokee", "Cherokee"],
        Chery: ["Tiggo 2", "Tiggo 3", "Tiggo 5", "Arrizo 5", "Otro"],
        Hyundai: ["i10", "i20", "Tucson", "Santa Fe", "Elantra"],
        Kia: ["Picanto", "Rio", "Sportage", "Sorento", "Cerato"],
        Otro: ["Otro"],
    };

    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const anioSelect = document.getElementById('anio');
    const serviceCards = document.querySelectorAll('.service-card');
    const btnSend = document.getElementById('sendWhatsapp');
    const errorMsg = document.getElementById('error-msg');

    let selectedService = "";


    // Lógica Selectores
    Object.keys(vehiculos).sort().forEach(m => {
        marcaSelect.innerHTML += `<option value="${m}">${m}</option>`;
    });

    for (let i = 2026; i >= 1970; i--) {
        anioSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    marcaSelect.addEventListener('change', (e) => {
        const m = e.target.value;
        modeloSelect.innerHTML = '<option value="">Seleccione Modelo</option>';
        if(m) {
            modeloSelect.disabled = false;
            vehiculos[m].forEach(mod => {
                modeloSelect.innerHTML += `<option value="${mod}">${mod}</option>`;
            });
        } else { modeloSelect.disabled = true; }
    });

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            serviceCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedService = card.dataset.service;
            errorMsg.style.display = 'none';
        });
    });

    btnSend.addEventListener('click', () => {
        const b = marcaSelect.value, m = modeloSelect.value, a = anioSelect.value;
        if(!selectedService || !b || !m || !a) {
            errorMsg.style.display = 'block';
            return;
        }
        const text = `Hola Surval Sport! 👋\nTurno para: *${selectedService}*\nVehículo: ${b} ${m} (${a})`;
        window.open(`https://wa.me/5492613382725?text=${encodeURIComponent(text)}`, '_blank');
    });
});
// CARRUSEL TESTIMONIOS – AUTOPLAY INFINITO
// ======================================
(() => {
    const track = document.getElementById("testimonials-track");
    if (!track) return;

    const slides = track.children;
    const prevBtn = document.getElementById("test-prev");
    const nextBtn = document.getElementById("test-next");
    const pagination = document.getElementById("test-pagination");

    let index = 0;
    const total = slides.length;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 4500; // 4.5s suave

    // Crear dots
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goTo(i);
            restartAutoplay();
        });
        pagination.appendChild(dot);
    }

    const dots = pagination.children;

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        [...dots].forEach(d => d.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function goTo(i) {
        index = i;
        update();
    }

    function next() {
        index = (index + 1) % total;
        update();
    }

    function prev() {
        index = (index - 1 + total) % total;
        update();
    }

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Eventos
    nextBtn.addEventListener("click", () => {
        next();
        restartAutoplay();
    });

    prevBtn.addEventListener("click", () => {
        prev();
        restartAutoplay();
    });

    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);

    // Init
    update();
    startAutoplay();
})();
