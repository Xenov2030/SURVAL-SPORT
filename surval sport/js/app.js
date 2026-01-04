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
        Ford: ["Fiesta", "Focus", "Ka", "Ranger", "Mustang"],
        Chevrolet: ["Corsa", "Cruze", "Onix", "Tracker", "S10"],
        Volkswagen: ["Gol", "Polo", "Vento", "Amarok", "Golf"],
        Toyota: ["Corolla", "Hilux", "Etios", "Yaris", "SW4"],
        Peugeot: ["206", "207", "208", "308", "Partner"],
        BMW: ["Serie 1", "Serie 3", "Serie 5", "X1", "X5"],
        Audi: ["A3", "A4", "A6", "Q3", "Q5"]
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