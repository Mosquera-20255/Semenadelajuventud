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

    // 2. Datos y Coordenadas
    const defaultCoords = [4.704936, -74.230412]; // Coordenadas de Mosquera

    // ⚠️ ==================================================================
    // ⚠️ CRONOGRAMA Y EVENTOS ACTUALIZADOS (RUTAS CORREGIDAS)
    // ⚠️ ==================================================================
    const preMapImages = {
        '2025-11-11': ['martes-11-nov.jpg'],
        '2025-11-12': ['miercoles-12-nov.jpg'],
        '2025-11-13': ['jueves-13-nov.jpg'],
        '2025-11-14': ['viernes-14-nov.jpg'],
        '2025-11-15': ['sabado-15-nov.jpg'],
        '2025-11-16': ['domingo-16-nov.jpg'],
    };

    const eventsData = [
        // Martes, 11 de noviembre
        { 
            lat: 4.7049, lng: -74.2298, location: 'Parque de Mosquera', 
            name: 'Noche de Poderes', time: '6:00 p.m. a 9:00 p.m.', 
            date: '2025-11-11', category: 'cultura', img: 'icono_concierto.png' // RUTA ACTUALIZADA
        },

        // Miércoles, 12 de noviembre
        { 
            lat: 4.7105, lng: -74.2258, location: 'Auditorio Municipal', 
            name: '"Capitan Eco-impacto" (Cine Foro Ambiental)', time: '8:00 a.m. a 11:00 a.m.', 
            date: '2025-11-12', category: 'cultura', img: 'icono_cine.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7125, lng: -74.2215, location: 'Ecoplaza', 
            name: '"Capitán Misión Futuro" (Feria de empleo y practicas Juveniles)', time: '12:00 m. a 5:00 p.m.', 
            date: '2025-11-12', category: 'cultura', img: 'icono_empleo.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.6833, lng: -74.2571, location: 'Los Puentes', 
            name: '"La Pluma de Superman" (Taller de literatura)', time: '7:00 p.m. a 9:00 p.m.', 
            date: '2025-11-12', category: 'cultura', img: 'icono_literatura.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7095, lng: -74.2335, location: 'La Salle, Tenco (SENA Aprox.)', 
            name: '"Escuadrón Campus" (Talleres para jóvenes universitarios de nocturna)', time: '7:00 p.m. a 9:00 p.m.', 
            date: '2025-11-12', category: 'cultura', img: 'icono_educacion.png' // RUTA ACTUALIZADA
        },

        // Jueves, 13 de noviembre
        { 
            lat: 4.6905, lng: -74.2747, location: 'Laguna de la Herrera', 
            name: 'Guardianes del Planeta (Siembra de árboles)', time: '8:00 a.m. a 11:00 a.m.', 
            date: '2025-11-13', category: 'cultura', img: 'icono_eco.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7062, lng: -74.2305, location: 'Barrio Orinzo', 
            name: 'El Color del Cambio: El héroe que pinta los sueños (Mural)', time: '9:00 a.m. a 10:30 a.m.', 
            date: '2025-11-13', category: 'cultura', img: 'icono_arte.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7049, lng: -74.2298, location: 'Salón de Alcaldes (Alcaldía)', 
            name: 'Guardianes Holográficos (Taller de Hologramas)', time: '2:00 p.m. a 3:00 p.m.', 
            date: '2025-11-13', category: 'cultura', img: 'icono_tech.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.6930, lng: -74.1735, location: 'Centro Cultural de Oriente', 
            name: '"La Pluma de Superman" (Obra - Candida Erendidira)', time: '4:00 p.m.', 
            date: '2025-11-13', category: 'cultura', img: 'icono_teatro.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7035, lng: -74.2325, location: 'Skate Park (Punto de inicio)', 
            name: 'Héroes Sobre Ruedas: La Ciudad es Nuestra Pista (Rodada nocturna)', time: '7:00 p.m. a 9:00 p.m.', 
            date: '2025-11-13', category: 'deporte', img: 'icono_bici.png' // RUTA ACTUALIZADA
        },

        // Viernes, 14 de noviembre
        { 
            lat: 4.7049, lng: -74.2298, location: 'Lugar por definir (Mostrando Parque)', 
            name: 'Misión Juventud: Operación Sabana (Encuentro de Consejeros de Juventud)', time: '8:00 a.m. a 12:00 m.', 
            date: '2025-11-14', category: 'cultura', img: 'icono_educacion.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7038, lng: -74.2319, location: 'Coliseo Lucio Amortegui', 
            name: '"Fuerza Juvenil: Súper Remate" (Torneo de Voleibol Piso Mixto)', time: '6:00 p.m. a 10:00 p.m.', 
            date: '2025-11-14', category: 'deporte', img: 'icono_deporte.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7129, lng: -74.2286, location: 'La Cumbre', 
            name: '"Fuerza Juvenil: Flash gol" (Torneo de Futsal Femenino)', time: '6:00 p.m. a 10:00 p.m.', 
            date: '2025-11-14', category: 'deporte', img: 'icono_deporte.png' // RUTA ACTUALIZADA
        },
        { 
            lat: 4.7260, lng: -74.2282, location: 'Ciudad Sabana', 
            name: '"Fuerza Juvenil: Flash gol" (Torneo de Futsal Masculino)', time: '6:00 p.m. a 10:00 p.m.', 
            date: '2025-11-14', category: 'deporte', img: 'icono_deporte.png' // RUTA ACTUALIZADA
        },

        // Sábado, 15 de noviembre
        { 
            lat: 4.7147, lng: -74.2181, location: 'Lote Zapatoca de Mosquera', 
            name: 'MEGA FEST ESPACIO CHILL (Stands, Moda, Concierto y más)', time: '11:00 a.m. a 11:00 p.m.', 
            date: '2025-11-15', category: 'cultura', img: 'icono_concierto.png' // RUTA ACTUALIZADA
        },

        // Domingo, 16 de noviembre
        { 
            lat: 4.7086, lng: -74.2236, location: 'Parque del Trébol', 
            name: '"Súper huella: Guardianes de 4 patas" (Carrera PetFriendly)', time: '8:00 a.m. a 11:00 a.m.', 
            date: '2025-11-16', category: 'deporte', img: 'icono_pet.png' // RUTA ACTUALIZADA
        }
    ];
    // ⚠️ ==================================================================
    // ⚠️ FIN DE LA SECCIÓN DE DATOS
    // ⚠️ ==================================================================


    let mapInstance;
    let visibleMarkers = L.layerGroup();
    let selectedDate = null;
    let selectedTimeFilter = 'all';
    let selectedCategoryFilter = 'all'; 

    // --- Definición de TODAS las funciones ANTES de usarlas ---

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
            imagesForDate.forEach(imageName => {
                const newImage = document.createElement('img');
                // RUTA ACTUALIZADA - Se quitó 'img/'
                newImage.src = imageName; 
                newImage.alt = "Cronograma del Evento";
                newImage.className = 'pre-map-image';
                preMapImageContainer.appendChild(newImage);
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
        
        // RUTA ACTUALIZADA - Se quitó 'img/'
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
        // RUTA ACTUALIZADA - Se quitó 'img/'
        card.innerHTML = `
            <img src="FECHA.png" alt="Icono de navegación">
            <p class="date-day" style="margin-top: 8px;">${text}</p>
        `;
        return card;
    }

    function showDateCards(datesToShow) {
        dateCardsWrapper.innerHTML = '';
        const backCard = createNavCard('‹ Volver');
        backCard.addEventListener('click', setupDynamicDateFilter);
        dateCardsWrapper.appendChild(backCard);
        datesToShow.forEach(dateStr => {
            const dateCard = createDateCard(dateStr);
            dateCardsWrapper.appendChild(dateCard);
        });
    }

    function showFixedFutureDates(allEventDates, todayString) {
        dateCardsWrapper.innerHTML = '';
        const backCard = createNavCard('‹ Volver');
        backCard.addEventListener('click', setupDynamicDateFilter);
        dateCardsWrapper.appendChild(backCard);

        const futureDates = allEventDates.filter(d => d > todayString);
        
        futureDates.forEach(dateStr => {
            const dateCard = createDateCard(dateStr);
            dateCardsWrapper.appendChild(dateCard);
        });
    }

    function showInitialDateView(todayString, pastDates, allEventDates) {
        dateCardsWrapper.innerHTML = '';
        
        if (pastDates.length > 0) {
            const pastCard = createNavCard('‹ Anteriores');
            pastCard.addEventListener('click', () => showDateCards(pastDates));
            dateCardsWrapper.appendChild(pastCard);
        }

        if (allEventDates.includes(todayString)) {
            const todayCard = createDateCard(todayString);
            const dayParagraph = todayCard.querySelector('.date-day');
            const dateText = dayParagraph.textContent;
            dayParagraph.innerHTML = `Hoy<br><span style="font-size: 0.8em; font-weight: normal;">${dateText}</span>`;
            todayCard.dataset.dateType = 'today';
            dateCardsWrapper.appendChild(todayCard);
        }

        const futureDates = allEventDates.filter(d => d > todayString);
        if (futureDates.length > 0) {
            const futureCard = createNavCard('Futuros ›');
            futureCard.addEventListener('click', () => showFixedFutureDates(allEventDates, todayString));
            dateCardsWrapper.appendChild(futureCard);
        }
    }

    function setupDynamicDateFilter() {
        const todayString = getTodayString(); 
        const allEventDates = [...new Set(eventsData.map(e => e.date))].sort(); 
        const pastDates = allEventDates.filter(d => d < todayString);
        
        showInitialDateView(todayString, pastDates, allEventDates);
        
        const todayCard = document.querySelector('.date-card[data-date-type="today"]');
        if (todayCard) {
            todayCard.click();
        } else {
            const firstFutureDate = allEventDates.find(d => d > todayString);
            if (firstFutureDate) {
                const futureCardElement = document.querySelector(`.date-card[data-date="${firstFutureDate}"]`);
                if (futureCardElement) {
                    futureCardElement.click();
                }
            } else if (pastDates.length > 0) {
                const lastPastCard = document.querySelector(`.date-card[data-date="${pastDates[pastDates.length - 1]}"]`);
                 if(lastPastCard) lastPastCard.click();
            }
        }
    }


    function parseTime(timeString) {
        try {
            const cleanTime = timeString.replace(/\./g, '').toLowerCase();
            const parts = cleanTime.split(' a ');
            let startHour = parseInt(parts[0].split(':')[0]);
            let endHour = parseInt(parts[1].split(':')[0]);
            if (parts[0].includes('p.m.') && startHour !== 12) startHour += 12;
            if (parts[0].includes('m.') && startHour == 12) startHour = 12; // Mediodía
            if (parts[0].includes('a.m.') && startHour === 12) startHour = 0; // Medianoche
            if (parts[1].includes('p.m.') && endHour !== 12) endHour += 12;
            if (parts[1].includes('a.m.') && endHour === 12) endHour = 24; // Medianoche
            if (parts[1].includes('m.') && endHour == 12) endHour = 12; // Mediodía
            return [startHour, endHour];
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
            acc[key].events.push({ name: event.name, time: event.time });
            return acc;
        }, {});
    }

    function mostrarMarcadores(eventosAgrupados) {
        Object.values(eventosAgrupados).forEach(group => {
            // RUTA ACTUALIZADA - 'group.img' ya no tiene prefijo 'img/'
            const icon = L.divIcon({ 
                className: 'marker-wrapper', 
                html: `<img src="${group.img}" style="width: 75px; height: auto;">`, 
                iconSize: [75, 62], 
                iconAnchor: [37, 62] 
            });
            const marker = L.marker([group.lat, group.lng], { icon: icon });
            
            const cronogramaUrl = '#'; 
            
            let popupContent = `<div class="event-popup-content"><h3>${group.location}</h3>`;
            group.events.forEach(event => {
                popupContent += `<p><strong>${event.name}</strong><br><span>${event.time}</span></p>`;
            });
            
            if(cronogramaUrl !== '#') {
                popupContent += `<a href="${cronogramaUrl}" target="_blank" class="cronograma-btn">Ver cronograma completo</a>`;
            }
            popupContent += `</div>`;
            
            marker.bindPopup(popupContent);
            marker.bindTooltip(group.location, { 
                permanent: true, 
                direction: 'top', 
                offset: [0, -70], 
                className: 'permanent-label' 
            });
            visibleMarkers.addLayer(marker);
        });
    }

    function updateMapMarkers() {
        if (!selectedDate) return;
        visibleMarkers.clearLayers();
        let eventosDelDia = eventsData.filter(event => event.date === selectedDate);
        
        let eventosFiltradosPorHora = eventosDelDia.filter(event => {
            if (selectedTimeFilter === 'all') return true;
            const [startHour, endHour] = parseTime(event.time);
            if (startHour === null) return true;
            if (selectedTimeFilter === 'am') return startHour < 12;
            if (selectedTimeFilter === 'pm') return endHour >= 12;
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

    function mostrarMensajesIntroductorios() {
        // Función vacía
    }

    function inicializarMapa(coords, userLocationFound) {
        document.body.style.overflow = 'auto';
        mainContainer.style.display = 'block';
        
        if (mapInstance) {
             mapInstance.remove();
        }
        
        mapInstance = L.map('mapa').setView(coords, 14);

        const lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);
        
        const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        });

        themeBtn.addEventListener('click', function () {
            if (mapInstance.hasLayer(lightLayer)) {
                mapInstance.removeLayer(lightLayer);
                darkLayer.addTo(mapInstance);
                this.textContent = 'Cambiar a Mapa Claro';
            } else {
                mapInstance.removeLayer(darkLayer);
                lightLayer.addTo(mapInstance);
                this.textContent = 'Cambiar a Mapa Oscuro';
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

    // --- Ejecución e Inicialización ---

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