import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { manualVenues } from '../data/venues';
import { fetchVenuesFromOverpass } from '../services/overpassAPI';
import SearchBar from './SearchBar';



function GoteborgMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);

    const [venues, setVenues] = useState(manualVenues);
    const [filteredVenues, setFilteredVenues] = useState(manualVenues);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [loading, setLoading] = useState(false);

    // Hämta data från Overpass API vid start och uppdatera venues
    useEffect(() => {
        async function loadVenues() {
            setLoading(true);
            const overpassVenues = await fetchVenuesFromOverpass();

            // Kombinera OSM-data med manuella ställen
            const combinedVenues = [...overpassVenues, ...manualVenues];

            // Ta bort dubbletter baserat på namn
            const uniqueVenues = combinedVenues.filter((venue, index, self) =>
                index === self.findIndex((v) => v.name.toLowerCase() === venue.name.toLowerCase())
            );

            console.log(`Totalt: ${uniqueVenues.length} ställen (${overpassVenues.length} från OSM + ${manualVenues.length} manuella = ${combinedVenues.length} före dubblettborttagning)`);

            setVenues(uniqueVenues);
            setFilteredVenues(uniqueVenues);
            setLoading(false);
        }

        loadVenues();
    }, []);

    // Filtrera venues baserat på sökning och typ
    useEffect(() => {
        let filtered = venues;

        // Filtrera på typ
        if (typeFilter !== 'all') {
            filtered = filtered.filter(v => v.type === typeFilter);
        }

        // Filtrera på sökterm
        if (searchTerm) {
            filtered = filtered.filter(v =>
                v.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredVenues(filtered);
    }, [searchTerm, typeFilter, venues]);

    useEffect(() => {
        const token = import.meta.env.VITE_MAPBOX_TOKEN;

        if (!token) {
            console.error('Token saknas!');
            return;
        }

        mapboxgl.accessToken = token;

        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [11.9746, 57.7089],
            zoom: 12
        });

        map.current.on('load', () => {
            console.log('Karta laddad!');
            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        });

        return () => {
            if (map.current) map.current.remove();
        };
    }, []);

    // Uppdatera markers när filteredVenues ändras
    useEffect(() => {
        if (!map.current) return;

        // Ta bort gamla markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Lägg till nya markers
        filteredVenues.forEach((venue) => {
            const icon = venue.type === 'restaurant' ? '🍴' : venue.type === 'pub' ? '🍻' : '🍺';

            const popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false,
                maxWidth: '280px'
            }).setHTML(`
  <div style="padding: 15px; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 12px 0; font-size: 17px; color: #333; font-weight: bold; display: flex; align-items: center;">
      ${icon} ${venue.name}
    </h3>
    <div style="background: #f5f5f5; padding: 10px; borderRadius: 6px; marginBottom: 10px;">
      <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">
        <strong>Typ:</strong> ${venue.type === 'restaurant' ? 'Restaurang' : venue.type === 'pub' ? 'Pub' : 'Bar'}
      </p>
    </div>
    <div style="background: #fff3cd; padding: 10px; borderRadius: 6px; border: 1px solid #ffc107;">
      <p style="margin: 0; font-size: 12px; color: #856404; fontWeight: 600; marginBottom: 6px;">
        🍺 ÖLPRISER
      </p>
      <p style="margin: 5px 0; font-size: 14px; color: #333;">
        <strong>Lägsta:</strong> ${venue.minPrice} kr/öl
      </p>
      <p style="margin: 5px 0 0 0; font-size: 14px; color: #333;">
        <strong>Högsta:</strong> ${venue.maxPrice} kr/öl
      </p>
    </div>
  </div>
`);


            const el = document.createElement('div');
            el.innerHTML = icon;
            el.style.fontSize = '2.3rem';
            el.style.cursor = 'pointer';
            el.style.userSelect = 'none';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.width = '43px';
            el.style.height = '43px';
            el.style.borderRadius = '50%';
            el.style.background = 'rgba(40,42,54,0.68)';
            el.style.boxShadow = '0 0 16px 3px #F7BB36aa, 0 2px 6px #000b'; // soft gold glow!
            el.style.backdropFilter = 'blur(3px)';
            el.style.border = '2.5px solid #444';
            el.style.transition = 'box-shadow 0.2s, transform 0.2s';

            const marker = new mapboxgl.Marker(el)
                .setLngLat([venue.longitude, venue.latitude])
                .setPopup(popup)
                .addTo(map.current);

            el.addEventListener('mouseenter', () => {
                marker.togglePopup();
            });

            el.addEventListener('mouseleave', () => {
                marker.togglePopup();
            });

            markers.current.push(marker);
        });

        console.log(`Visar ${filteredVenues.length} markers`);
    }, [filteredVenues]);

return (
  <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    {/* KARTAN - längst bak, tar hela skärmen */}
    <div
      ref={mapContainer}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh'
      }}
    />

    {/* SIDOPANEL/SÖKBAR - ligger över kartan */}
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10, // Måste vara högre än kartan!
      minWidth: 335
    }}>
      <SearchBar
        onSearch={setSearchTerm}
        onTypeFilter={setTypeFilter}
      />
    </div>

    {/* LOADING SPINNER */}
    {loading && (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 999,
        transform: 'translate(-50%, -50%)',
        background: 'rgba(30,30,36,0.98)',
        padding: '22px 30px',
        borderRadius: '12px',
        color: '#fff',
        fontWeight: 600,
        fontSize: '1.2em',
        boxShadow: '0 2px 14px #1118'
      }}>
        Laddar ställen från OpenStreetMap...
      </div>
    )}
        </div>
    );
}

export default GoteborgMap;
