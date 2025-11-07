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
    const defaultCoords = [4.7059, -74.2302]; // Coordenadas aproximadas del centro de Mosquera

    // ⚠️ ==================================================================
    // ⚠️ CRONOGRAMA Y EVENTOS ACTUALIZADOS (CON MÚLTIPLES IMÁGENES .JPG)
    // ⚠️ ==================================================================
    const preMapImages = {
        '2025-11-11': ['martes-11-nov.JPG'],
        '2025-11-12': ['miercoles-12-nov.JPG'],
        '2025-11-13': ['jueves-13-nov.JPG', 'jueves-13-nov2.JPG', 'jueves-13-nov3.JPG'],
        '2025-11-14': ['viernes-14-nov.JPG'],
        '2025-11-15': ['sabado-15-nov.JPG', 'sabado-15-nov2.JPG'],
        '2025-11-16': ['domingo-16-nov.JPG', 'domingo-16-nov2.JPG'],
    };

    const eventsData = [
        // Martes, 11 de noviembre
        {
            lat: 4.7059, lng: -74.2302, location: 'Parque Principal',
            name: 'Noche de Poderes (Apertura)', time: '6:00 p.m.',
            date: '2025-11-11', category: 'cultura', img: 'icono_concierto.png'
        },

        // Miércoles, 12 de noviembre
        {
            lat: 4.7065, lng: -74.2288, location: 'Auditorio Municipal',
            name: 'Cine al barrio (Eco-impacto)', time: '8:00 a.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_cine.png'
        },
        {
            lat: 4.7059, lng: -74.2302, location: 'Parque Principal',
            name: 'Feria de oportunidades', time: '9:00 a.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_empleo.png'
        },
        {
            lat: 4.7035, lng: -74.2272, location: 'Biblioteca San Juan Bosco',
            name: 'Taller de literatura', time: '4:00 p.m.',
            date: '2025-11-12', category: 'cultura', img: 'icono_literatura.png'
        },
        {
            lat: 4.7120, lng: -74.2235, location: 'Plazoleta Villa Nueva',
            name: 'Rumbaterapia neón', time: '7:00 p.m.',
            date: '2025-11-12', category: 'deporte', img: 'icono_deporte.png'
        },

        // Jueves, 13 de noviembre
        {
            lat: 4.6950, lng: -74.2550, location: 'Humedal Gualí', // Coordenadas aproximadas
            name: 'Sembratón (Guardianes del Planeta)', time: '8:00 a.m.',
            date: '2025-11-13', category: 'cultura', img: 'icono_eco.png'
        },
        {
            lat: 4.7090, lng: -74.2315, location: 'Skate Park',
            name: 'Muralismo (El color del cambio)', time: '9:00 a.m.',
            date: '2025-11-13', category: 'cultura', img: 'icono_arte.png'
        },
        {
            lat: 4.7042, lng: -74.2320, location: 'Coliseo Lucio Amórtegui',
            name: 'Taller de Defensa Personal', time: '4:00 p.m.',
            date: '2025-11-13', category: 'deporte', img: 'icono_deporte.png'
        },
        {
            lat: 4.7059, lng: -74.2302, location: 'Salida Parque Principal',
            name: 'Rodada Nocturna', time: '7:00 p.m.',
            date: '2025-11-13', category: 'deporte', img: 'icono_bici.png'
        },

        // Viernes, 14 de noviembre
        {
            lat: 4.7059, lng: -74.2302, location: 'Parque Principal',
            name: 'Feria de emprendimiento', time: '2:00 p.m.',
            date: '2025-11-14', category: 'cultura', img: 'icono_empleo.png'
        },
        {
            lat: 4.7059, lng: -74.2302, location: 'Parque Principal',
            name: 'Concierto de Talentos Locales', time: '5:00 p.m.',
            date: '2025-11-14', category: 'cultura', img: 'icono_concierto.png'
        },

        // Sábado, 15 de noviembre
        {
            lat: 4.7030, lng: -74.2310, location: 'Villa Olímpica',
            name: 'Festival de la Juventud (Mega Fest)', time: '10:00 a.m.',
            date: '2025-11-15', category: 'cultura', img: 'icono_concierto.png'
        },

        // Domingo, 16 de noviembre
        {
            lat: 4.7059, lng: -74.2302, location: 'Salida Parque Principal (hacia Mondoñedo)',
            name: 'Caminata Ecológica', time: '7:00 a.m.',
            date: '2025-11-16', category: 'deporte', img: 'icono_eco.png'
        },
        {
            lat: 4.7150, lng: -74.2250, location: 'Parque de las Aguas', // Coordenadas aproximadas
            name: 'Picnic al parque', time: '2:00 p.m.',
            date: '2025-11-16', category: 'cultura', img: 'icono_pet.png'
        }
    ];
    // ⚠️ ==================================================================
    // ⚠️ FIN DE LA SECCIÓN DE DATOS
    // ⚠️ ==================================================================

    // ==================================================================
    // ⬇️ FUNCIÓN DE PRECARGA ⬇️
    // ==================================================================
    function preloadDataImages() {
        // console.log("Iniciando precarga de imágenes dinámicas...");
        const dailyImages = Object.values(preMapImages).flat();
        const markerIcons = [...new Set(eventsData.map(event => event.img))];
        const allImagesToPreload = [...dailyImages, ...markerIcons];

        allImagesToPreload.forEach(url => {
            if (url) {
                const img = new Image();
                img.src = url;
            }
        });
    }
    // ==================================================================
    // ⬆️ FIN DE LA FUNCIÓN DE PRECARGA ⬆️
    // ==================================================================


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
                if (lastPastCard) lastPastCard.click();
            }
        }
    }


    function parseTime(timeString) {
        try {
            const cleanTime = timeString.toLowerCase().replace(/\./g, '').trim();
            const match = cleanTime.match(/^(\d{1,2}):(\d{2})\s*(am|pm|m)?/);

            if (match) {
                let hour = parseInt(match[1]);
                const period = match[3];

                if (period === 'pm' && hour !== 12) {
                    hour += 12;
                } else if (period === 'am' && hour === 12) {
                    hour = 0;
                } else if (period === 'm' && hour === 12) {
                     hour = 12;
                }

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
            acc[key].events.push({ name: event.name, time: event.time });
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

            const cronogramaUrl = '#';

            let popupContent = `<div class="event-popup-content"><h3>${group.location}</h3>`;
            group.events.forEach(event => {
                popupContent += `<p><strong>${event.name}</strong><br><span>${event.time}</span></p>`;
            });

            if (cronogramaUrl !== '#') {
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

        if (mapInstance) {
            mapInstance.remove();
        }

        mapInstance = L.map('mapa').setView(coords, 15);

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
