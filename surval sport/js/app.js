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

    const resenas = [
        { nombre: "Facundo Pereyra", texto: "Excelente atención para autos deportivos. Recomendado." },
        { nombre: "Martín Rodríguez", texto: "Honestidad total en el diagnóstico. Muy profesionales." },
        { nombre: "Luciana Gómez", texto: "El sistema de turnos por WhatsApp es rapidísimo. 10 puntos." }
    ];

    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const anioSelect = document.getElementById('anio');
    const serviceCards = document.querySelectorAll('.service-card');
    const btnSend = document.getElementById('sendWhatsapp');
    const errorMsg = document.getElementById('error-msg');
    const reviewsContainer = document.getElementById('reviews-container');

    let selectedService = "";

    // Cargar Reseñas
    resenas.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `<div style="color:var(--gold); margin-bottom:0.5rem">★★★★★</div>
                         <h4 style="margin-bottom:0.5rem">${r.nombre}</h4>
                         <p style="font-size:0.85rem; color:var(--gray)">"${r.texto}"</p>`;
        reviewsContainer.appendChild(div);
    });

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
/**
 * Surval Sport Slider Engine
 * Implementación de Loop Infinito por clonado de nodos
 */

class SurvalSlider {
    constructor(id) {
        this.slider = document.getElementById(id);
        this.track = this.slider.querySelector('.slider-track');
        this.slides = Array.from(this.track.children);
        this.nextBtn = this.slider.querySelector('.next');
        this.prevBtn = this.slider.querySelector('.prev');
        this.pagination = this.slider.querySelector('.slider-pagination');
        
        this.index = 1; // Empezamos en 1 debido al clon inicial
        this.isTransitioning = false;
        this.autoplayInterval = 5000;
        this.timer = null;

        // Touch handling
        this.startX = 0;
        this.currentTranslate = 0;

        this.init();
    }

    init() {
        // 1. Clonar primer y último slide para el efecto infinito
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);

        this.track.appendChild(firstClone);
        this.track.insertBefore(lastClone, this.slides[0]);

        // 2. Crear dots de paginación
        this.slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i + 1));
            this.pagination.appendChild(dot);
        });

        // 3. Posicionar inicialmente el track
        this.updatePosition(false);

        // 4. Event Listeners
        this.nextBtn.addEventListener('click', () => this.moveNext());
        this.prevBtn.addEventListener('click', () => this.movePrev());
        
        this.track.addEventListener('transitionend', () => this.checkEdge());
        
        // Autoplay logic
        this.startAutoplay();
        this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch events
        this.track.addEventListener('touchstart', (e) => this.startX = e.touches[0].clientX);
        this.track.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            if (this.startX - endX > 50) this.moveNext();
            if (this.startX - endX < -50) this.movePrev();
        });
    }

    updatePosition(animate = true) {
        this.track.style.transition = animate ? `transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)` : 'none';
        this.track.style.transform = `translateX(-${this.index * 100}%)`;
        this.updateDots();
    }

    moveNext() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.index++;
        this.updatePosition();
    }

    movePrev() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.index--;
        this.updatePosition();
    }

    checkEdge() {
        this.isTransitioning = false;
        const totalSlides = this.track.children.length;

        if (this.index >= totalSlides - 1) {
            this.index = 1;
            this.updatePosition(false);
        }
        if (this.index <= 0) {
            this.index = totalSlides - 2;
            this.updatePosition(false);
        }
    }

    updateDots() {
        const dots = Array.from(this.pagination.children);
        let activeDotIndex = this.index - 1;
        
        // Ajuste para clones
        if (this.index >= this.slides.length + 1) activeDotIndex = 0;
        if (this.index <= 0) activeDotIndex = this.slides.length - 1;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }

    goTo(targetIndex) {
        if (this.isTransitioning) return;
        this.index = targetIndex;
        this.updatePosition();
    }

    startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => this.moveNext(), this.autoplayInterval);
    }


    stopAutoplay() {
        clearInterval(this.timer);
    }
}

// Instanciar slider al cargar DOM
document.addEventListener('DOMContentLoaded', () => {
    new SurvalSlider('main-slider');
});