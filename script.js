document.addEventListener('DOMContentLoaded', function () {

    // 1. Selección de Elementos del DOM
    const welcomeBanner = document.getElementById('welcome-banner');
    const getLocationBtn = document.getElementById('get-location-btn');
    const skipLocationBtn = document.getElementById('skip-location-btn');
    const loaderContainer = document.getElementById('loader-container');
    const introVideo = document.getElementById('intro-video');
    const mainContainer = document.querySelector('.main-container');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const skipBtn = document.getElementById('skip-video-btn');
    const dateCardsWrapper = document.getElementById('date-cards-wrapper');
    const dateFilterContainer = document.getElementById('date-filter-container');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    const timeFilterButtons = document.querySelectorAll('.time-filter-btn');
    const categoryFilterButtons = document.querySelectorAll('.category-filter-btn');
    const specialBtnContainer = document.getElementById('special-day-button-container');

    // 2. Datos y Coordenadas
    const defaultCoords = [4.705050, -74.230410];

    // ⚠️ IMÁGENES DEL CRONOGRAMA
    const preMapImages = {
        '2025-11-11': ['martes-11-nov.JPG'],
        '2025-11-12': ['miercoles-12-nov.JPG'],
        '2025-11-13': [
            {
                src: 'jueves-13-nov.JPG',
                link: 'https://docs.google.com/forms/d/e/1FAIpQLScdxEqYz8OZ_nQC3B1D8jt5nQzgPmpsfVQoIbKpKxwJzc-_3A/viewform'
            },
            {
                src: 'jueves-13-nov2.JPG',
                link: 'https://docs.google.com/forms/d/e/1FAIpQLSfU6cFgK5-04FiJ2Y7AdmhVjU9fqGFAPpRRfaYlMZUZYHEBjQ/viewform'
            },
            'jueves-13-nov3.JPG'
        ],
        '2025-11-14': ['viernes-14-nov.JPG'],
        '2025-11-15': ['sabado-15-nov.JPG', 'sabado-15-nov2.JPG'],
        '2025-11-16': [
             {
                src: 'domingo-16-nov.JPG',
                link: 'https://docs.google.com/forms/d/e/1FAIpQLSdS31pcdsctW1pjuad1IW6NSaEQgf30B_c_vEQKbpREIiwB0A/viewform'
            },
             'domingo-16-nov2.JPG'
        ],
    };

    // ⚠️ LISTA DE EVENTOS OFICIAL
    const eventsData = [
        // --- Martes, 11 de Noviembre ---
        {
            lat: 4.705050, lng: -74.230410, location: 'Parque Principal de Mosquera',
            name: 'INAGURACIÓN ¡Noche de Poderes!', time: '6:00 p.m. a 9:00 p.m.',
            date: '2025-11-11', category: 'cultura', img: 'icono_concierto.png'
        },
        // --- Miércoles, 12 de Noviembre ---
        {
            lat: 4.711621, lng: -74.230172, location: 'CDI La Cumbre',
            name: 'CINE FORO AMBIENTAL "Capitán Eco-impacto"', time: '8:00 a.m. a 11:00 a.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_cine.png'
        },
        {
            lat: 4.712396, lng: -74.221405, location: 'Centro Comercial Ecoplaza',
            name: 'FERIA DE EMPLEO Y PRÁCTICAS JUVENILES "Capitán Misión Futuro"', time: '11:00 a.m. a 5:00 p.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_empleo.png'
        },
        {
            lat: 4.712396, lng: -74.221405, location: 'Centro Comercial Ecoplaza',
            name: 'OBRA DE TEATRO "Almas de libertad"', time: '6:00 p.m. a 7:00 p.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_teatro.png'
        },
        {
            lat: 4.683085, lng: -74.259008, location: 'I.E. La Merced sede Los Puentes',
            name: 'ARMA TU PERSONAJE Y TALLER DE CINE Y TV', time: '4:00 p.m. a 7:00 p.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_cine.png'
        },
        {
            lat: 4.708047, lng: -74.222551, location: 'I.E. Compartir',
            name: 'TALLERES JÓVENES UNIVERSITARIOS "Escuadrón Campus"', time: '7:00 p.m. a 9:00 p.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_educacion.png'
        },
        // --- Jueves, 13 de Noviembre ---
        {
            lat: 4.704722, lng: -74.230674, location: 'Salida frente a la Iglesia Municipal',
            name: 'SIEMBRA DE ÁRBOLES LAGUNA LA HERRERA', time: '8:00 a.m. a 12:00 p.m.',
            date: '2025-11-13', category: 'cultura', img: 'icono_eco.png'
        },
        {
            lat: 4.720524, lng: -74.226988, location: 'Cra. 14C #162 (Barrio Orinzo)',
            name: 'MURAL "El Color del Cambio"', time: '8:00 a.m. a 5:00 p.m.',
            date: '2025-11-13', category: 'cultura', img: 'icono_arte.png'
        },
        {
            lat: 4.710125, lng: -74.226019, location: 'Biblioteca Salón de Alcaldes',
            name: 'TALLER DE HOLOGRAMAS "Guardianes Holográficos"', time: '2:00 p.m. a 3:00 p.m.',
            date: '2025-11-13', category: 'cultura', img: 'icono_tech.png',
            link: 'https://docs.google.com/forms/d/e/1FAIpQLSfU6cFgK5-04FiJ2Y7AdmhVjU9fqGFAPpRRfaYlMZUZYHEBjQ/viewform',
            linkText: 'Inscríbete aquí'
        },
        {
            lat: 4.692910, lng: -74.173548, location: 'Centro Cultural de Oriente Porvenir Río',
            name: 'OBRAS TEATRALES Y TALLER DE COMBATE ESCÉNICO', time: '4:00 p.m. a 7:00 p.m.',
            date: '2025-11-13', category: 'cultura', img: 'icono_teatro.png'
        },
        {
            lat: 4.710850, lng: -74.232754, location: 'Frente al Jardín Infantil La Cumbre',
            name: 'RODADA NOCTURNA "Héroes Sobre Ruedas"', time: '6:00 p.m. a 9:00 p.m.',
            date: '2025-11-13', category: 'deporte', img: 'icono_bici.png',
            link: 'https://docs.google.com/forms/d/e/1FAIpQLScdxEqYz8OZ_nQC3B1D8jt5nQzgPmpsfVQoIbKpKxwJzc-_3A/viewform',
            linkText: 'Inscríbete aquí'
        },
        // --- Viernes, 14 de Noviembre ---
        {
            lat: 4.704769, lng: -74.229956, location: 'Palacio Municipal',
            name: 'CHARLA DE LIDERAZGO', time: '5:00 p.m. a 7:00 p.m.',
            date: '2025-11-14', category: 'cultura', img: 'icono_educacion.png'
        },
        {
            lat: 4.703939, lng: -74.231814, location: 'Coliseo Lucio Amortegui',
            name: 'TORNEO DE VOLEIBOL "Fuerza Juvenil: Súper Remate"', time: '6:00 p.m. a 11:00 p.m.',
            date: '2025-11-14', category: 'deporte', img: 'icono_deporte.png',
            link: 'https://docs.google.com/forms/d/e/1FAIpQLScXNqAtEHvlf2B6ZtMXpZxvZdfdz9EdOHjPitPSyF_M_DIu3A/viewform',
            linkText: 'Regístrate aquí'
        },
        {
            lat: 4.712772, lng: -74.228711, location: 'Polideportivo La Cumbre',
            name: 'TORNEO DE FUTSAL FEMENINO "Fuerza Juvenil: Flash gol"', time: '6:00 p.m. a 11:00 p.m.',
            date: '2025-11-14', category: 'deporte', img: 'icono_deporte.png',
            link: 'https://docs.google.com/forms/d/e/1FAIpQLScXNqAtEHvlf2B6ZtMXpZxvZdfdz9EdOHjPitPSyF_M_DIu3A/viewform',
            linkText: 'Regístrate aquí'
        },
        {
            lat: 4.726631, lng: -74.228300, location: 'Polideportivo Ciudad Sabana',
            name: 'TORNEO DE FUTSAL MASCULINO "Fuerza Juvenil: Flash gol"', time: '6:00 p.m. a 11:00 p.m.',
            date: '2025-11-14', category: 'deporte', img: 'icono_deporte.png',
            link: 'https://docs.google.com/forms/d/e/1FAIpQLScXNqAtEHvlf2B6ZtMXpZxvZdfdz9EdOHjPitPSyF_M_DIu3A/viewform',
            linkText: 'Regístrate aquí'
        },
        // --- Sábado, 15 de Noviembre ---
        {
            lat: 4.711557, lng: -74.230114, location: 'CDI La Cumbre',
            name: 'ENCUENTRO DE FORMACIÓN PARA CONSEJEROS DE JUVENTUD ELECTOS', time: '8:00 a.m. a 12:00 p.m.',
            date: '2025-11-15', category: 'cultura', img: 'icono_educacion.png'
        },
        {
            lat: 4.714190, lng: -74.217849, location: 'Lote Zapatoca',
            name: 'SUPERFEST', time: '11:00 a.m. a 9:00 p.m.',
            date: '2025-11-15', category: 'cultura', img: 'icono_concierto.png'
        },
        // --- Domingo, 16 de Noviembre ---
        {
            lat: 4.708514, lng: -74.223823, location: 'Rotonda Parque Rincón del Trébol',
            name: 'CARRERA PET "Súper huella"', time: '9:00 a.m. a 1:00 p.m.',
            date: '2025-11-16', category: 'deporte', img: 'icono_pet.png',
            link: 'https://docs.google.com/forms/d/e/1FAIpQLSdS31pcdsctW1pjuad1IW6NSaEQgf30B_c_vEQKbpREIiwB0A/viewform',
            linkText: 'Regístrate aquí'
        },
        {
            lat: 4.704762, lng: -74.230030, location: 'Palacio Municipal',
            name: 'TALLER DE SALUD MENTAL', time: '2:00 p.m. a 5:00 p.m.',
            date: '2025-11-16', category: 'cultura', img: 'icono_educacion.png'
        }
    ];

    function preloadDataImages() {
        const dailyImagesRaw = Object.values(preMapImages).flat();
        const dailyImagesSrc = dailyImagesRaw.map(img => typeof img === 'string' ? img : img.src);
        const markerIcons = [...new Set(eventsData.map(event => event.img))];
        const allImagesToPreload = [...dailyImagesSrc, ...markerIcons];
        allImagesToPreload.forEach(url => { if (url) { const img = new Image(); img.src = url; } });
    }

    let mapInstance;
    let visibleMarkers = L.layerGroup();
    let selectedDate = null;
    let selectedTimeFilter = 'all';
    let selectedCategoryFilter = 'all';

    function getTodayString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function updatePreMapImage(dateString) {
        const preMapImageContainer = document.querySelector('.pre-map-image-container');
        if (!preMapImageContainer) return;
        preMapImageContainer.innerHTML = '';
        const imagesForDate = preMapImages[dateString];
        if (imagesForDate && imagesForDate.length > 0) {
            imagesForDate.forEach(imageData => {
                const src = typeof imageData === 'string' ? imageData : imageData.src;
                const linkUrl = typeof imageData === 'object' ? imageData.link : null;
                const newImage = document.createElement('img');
                newImage.src = src;
                newImage.alt = "Cronograma del Evento";
                newImage.className = 'pre-map-image';
                if (linkUrl) {
                    const linkElement = document.createElement('a');
                    linkElement.href = linkUrl;
                    linkElement.target = '_blank';
                    linkElement.appendChild(newImage);
                    preMapImageContainer.appendChild(linkElement);
                } else {
                    preMapImageContainer.appendChild(newImage);
                }
            });
            preMapImageContainer.style.display = 'block';
        } else {
            preMapImageContainer.style.display = 'none';
        }
    }

    function createDateCard(dateString) {
        const parts = dateString.split('-');
        const date = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
        const card = document.createElement('div');
        card.className = 'date-card';
        card.dataset.date = dateString;
        card.innerHTML = `
            <img src="FECHA.png" alt="Icono de fecha">
            <p class="date-day">${date.toLocaleString('es-ES', { weekday: 'short', day: 'numeric', timeZone: 'UTC' })}</p>
            <p class="date-full">${date.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' })}</p>
        `;
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDate = dateString;
            updateMapMarkers();
            updatePreMapImage(selectedDate);
        });
        return card;
    }

    function createNavCard(text) {
        const card = document.createElement('div');
        card.className = 'date-card nav-card';
        card.innerHTML = `
            <img src="FECHA.png" alt="Icono de navegación">
            <p class="date-day" style="margin-top: 8px;">${text}</p>
        `;
        return card;
    }

    function showDateList(datesToShow) {
        dateCardsWrapper.innerHTML = '';
        const backCard = createNavCard('‹ Volver');
        backCard.addEventListener('click', setupDynamicDateFilter);
        dateCardsWrapper.appendChild(backCard);
        datesToShow.forEach(dateStr => {
            const dateCard = createDateCard(dateStr);
            dateCardsWrapper.appendChild(dateCard);
        });
        // Auto-selecciona la primera fecha de la lista para evitar pantalla vacía
        const firstDateCard = dateCardsWrapper.querySelector('.date-card:not(.nav-card)');
        if (firstDateCard) firstDateCard.click();
    }

    // 🔥 LÓGICA DE FILTRO INTELIGENTE (CORREGIDA) 🔥
    function setupDynamicDateFilter() {
        const todayString = getTodayString();
        const allEventDates = [...new Set(eventsData.map(e => e.date))].sort();
        const pastDates = allEventDates.filter(d => d < todayString);
        const futureDates = allEventDates.filter(d => d > todayString);
        const isEventToday = allEventDates.includes(todayString);

        dateCardsWrapper.innerHTML = '';

        // CASO 1: ANTES DEL EVENTO (Hoy no hay nada, pero vienen eventos)
        if (!isEventToday && pastDates.length === 0 && futureDates.length > 0) {
             const futureCard = createNavCard('Futuros ›');
             futureCard.addEventListener('click', () => showDateList(futureDates));
             dateCardsWrapper.appendChild(futureCard);
             return;
        }

        // CASO 2: DESPUÉS DEL EVENTO (Ya todo pasó)
        if (!isEventToday && futureDates.length === 0 && pastDates.length > 0) {
            const pastCard = createNavCard('‹ Anteriores');
            pastCard.addEventListener('click', () => showDateList(pastDates));
            dateCardsWrapper.appendChild(pastCard);
            return;
        }

        // CASO 3: DURANTE EL EVENTO (Mezcla de días)
        if (pastDates.length > 0) {
            const pastCard = createNavCard('‹ Anteriores');
            pastCard.addEventListener('click', () => showDateList(pastDates));
            dateCardsWrapper.appendChild(pastCard);
        }

        if (isEventToday) {
            const todayCard = createDateCard(todayString);
            const dayParagraph = todayCard.querySelector('.date-day');
            dayParagraph.innerHTML = `Hoy<br><span style="font-size: 0.8em; font-weight: normal;">${dayParagraph.textContent}</span>`;
            todayCard.dataset.dateType = 'today';
            dateCardsWrapper.appendChild(todayCard);
            todayCard.click(); // Auto-seleccionar Hoy
        }

        if (futureDates.length > 0) {
            const futureCard = createNavCard('Futuros ›');
            futureCard.addEventListener('click', () => showDateList(futureDates));
            dateCardsWrapper.appendChild(futureCard);
        }
        
        // Si estamos en un día "hueco" entre eventos (ni hoy, ni solo pasados, ni solo futuros)
        if (!isEventToday && pastDates.length > 0 && futureDates.length > 0) {
             // No hacemos nada extra, el usuario debe elegir "Anteriores" o "Futuros"
        }
    }

    function parseTime(timeString) {
        try {
            const cleanTime = timeString.toLowerCase().replace(/\./g, '').trim();
            const match = cleanTime.match(/^(\d{1,2}):(\d{2})\s*(am|pm|m)?/);
            if (match) {
                let hour = parseInt(match[1]);
                const period = match[3];
                if (period === 'pm' && hour !== 12) hour += 12;
                else if (period === 'am' && hour === 12) hour = 0;
                else if (period === 'm' && hour === 12) hour = 12;
                return [hour, null];
            }
            return [null, null];
        } catch (e) {
            return [null, null];
        }
    }

    function agruparEventos(eventos) {
        return eventos.reduce((acc, event) => {
            const key = `${event.lat},${event.lng}`;
            if (!acc[key]) {
                acc[key] = { location: event.location, lat: event.lat, lng: event.lng, img: event.img, events: [] };
            }
            acc[key].events.push(event);
            return acc;
        }, {});
    }

    function mostrarMarcadores(eventosAgrupados) {
        Object.values(eventosAgrupados).forEach(group => {
            const icon = L.divIcon({
                className: 'marker-wrapper',
                html: `<img src="${group.img}" style="width: 75px; height: auto;">`,
                iconSize: [75, 62],
                iconAnchor: [37, 62]
            });
            const marker = L.marker([group.lat, group.lng], { icon: icon });
            let popupContent = `<div class="event-popup-content"><h3>${group.location}</h3>`;
            group.events.forEach(event => {
                popupContent += `<p><strong>${event.name}</strong><br><span>${event.time}</span>`;
                if (event.link) {
                    const btnText = event.linkText || "Regístrate aquí";
                    popupContent += `<br><a href="${event.link}" target="_blank" class="popup-register-btn">${btnText}</a>`;
                }
                popupContent += `</p>`;
            });
            popupContent += `</div>`;
            marker.bindPopup(popupContent);
            marker.bindTooltip(group.location, {
                permanent: true, direction: 'top', offset: [0, -70], className: 'permanent-label'
            });
            visibleMarkers.addLayer(marker);
        });
    }

    function updateMapMarkers() {
        if (!selectedDate) return;
        visibleMarkers.clearLayers();
        if (selectedDate === '2025-11-14') {
            const linkViernes = 'https://docs.google.com/forms/d/e/1FAIpQLScXNqAtEHvlf2B6ZtMXpZxvZdfdz9EdOHjPitPSyF_M_DIu3A/viewform';
            specialBtnContainer.innerHTML = `<a href="${linkViernes}" target="_blank" class="cronograma-btn" style="display: inline-block; margin-top:0;">¡Participa aquí!</a>`;
            specialBtnContainer.style.display = 'block';
        } else {
            specialBtnContainer.style.display = 'none';
        }
        let eventosDelDia = eventsData.filter(event => event.date === selectedDate);
        let eventosFiltradosPorHora = eventosDelDia.filter(event => {
            if (selectedTimeFilter === 'all') return true;
            const [startHour, _] = parseTime(event.time);
            if (startHour === null) return true;
            if (selectedTimeFilter === 'am') return startHour < 12;
            if (selectedTimeFilter === 'pm') return startHour >= 12;
            return false;
        });
        let eventosFinales = eventosFiltradosPorHora.filter(event => {
            if (selectedCategoryFilter === 'all') return true;
            return event.category === selectedCategoryFilter;
        });
        const eventosAgrupados = agruparEventos(eventosFinales);
        mostrarMarcadores(eventosAgrupados);
    }

    function setupCarouselButtons() {
        const scrollAmount = 300;
        scrollLeftBtn.addEventListener('click', () => { dateFilterContainer.scrollLeft -= scrollAmount; });
        scrollRightBtn.addEventListener('click', () => { dateFilterContainer.scrollLeft += scrollAmount; });
    }

    function setupTimeFilterButtons() {
        timeFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                timeFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedTimeFilter = button.dataset.filter;
                updateMapMarkers();
            });
        });
    }

    function setupCategoryFilterButtons() {
        categoryFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedCategoryFilter = button.dataset.filter;
                updateMapMarkers();
            });
        });
    }

    function inicializarMapa(coords, userLocationFound) {
        document.body.style.overflow = 'auto';
        mainContainer.style.display = 'block';
        if (mapInstance) { mapInstance.remove(); }
        mapInstance = L.map('mapa').setView(coords, 15);
        const lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);
        const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        });
        themeBtn.addEventListener('click', function () {
            if (mapInstance.hasLayer(lightLayer)) {
                mapInstance.removeLayer(lightLayer); darkLayer.addTo(mapInstance); this.textContent = 'Cambiar a Mapa Claro';
            } else {
                mapInstance.removeLayer(darkLayer); lightLayer.addTo(mapInstance); this.textContent = 'Cambiar a Mapa Oscuro';
            }
        });
        visibleMarkers.addTo(mapInstance);
        setupDynamicDateFilter();
        setupCarouselButtons();
        setupTimeFilterButtons();
        setupCategoryFilterButtons();
        if (userLocationFound) {
            const userIcon = L.divIcon({ className: 'user-location-marker', iconSize: [20, 20] });
            L.marker(coords, { icon: userIcon }).addTo(mapInstance)
                .bindTooltip('Estás aquí', { permanent: true, direction: 'top', offset: [0, -15], className: 'permanent-label' }).openTooltip();
        }
        mapInstance.addControl(new L.Control.Fullscreen());
    }

    function irAlBannerDeUbicacion() {
        if (loaderContainer.style.display === 'none') return;
        loaderContainer.style.display = 'none';
        welcomeBanner.style.display = 'flex';
    }

    preloadDataImages();
    introVideo.addEventListener('ended', irAlBannerDeUbicacion);
    introVideo.addEventListener('error', irAlBannerDeUbicacion);
    skipBtn.addEventListener('click', irAlBannerDeUbicacion);
    getLocationBtn.addEventListener('click', () => {
        welcomeBanner.style.display = 'none';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => inicializarMapa([position.coords.latitude, position.coords.longitude], true),
                () => inicializarMapa(defaultCoords, false)
            );
        } else {
            inicializarMapa(defaultCoords, false);
        }
    });
    skipLocationBtn.addEventListener('click', () => {
        welcomeBanner.style.display = 'none';
        inicializarMapa(defaultCoords, false);
    });
});

