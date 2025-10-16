README – Komponent- och Kodöversikt

src/components/GoteborgMap.jsx
Syfte:
Huvudkomponent som visualiserar Göteborgs ölställen på en interaktiv karta och kopplar samman filtrering, marker och data.

Funktioner och variabler
Hooks & state:

const mapContainer = useRef(null);
Referens till DOM-elementet för Mapbox-kartan.

const map = useRef(null);
Referens till själva Mapbox-gl-objektet.

const markers = useRef([]);
Lista av aktuella karto-markers – behövs för att kunna ta bort dem dynamiskt.

const [venues, setVenues] = useState(manualVenues);
Huvudlista med alla venues, både hämtade och manuella från fil.

const [filteredVenues, setFilteredVenues] = useState(manualVenues);
Filtrerad lista baserat på typ/sökterm.

const [searchTerm, setSearchTerm] = useState('');
Användarens senaste söktext.

const [typeFilter, setTypeFilter] = useState('all');
Filter för typ av ställe ("all", "bar", "pub", "restaurant").

const [loading, setLoading] = useState(false);
Om laddning av data pågår.

Effekter
(1) Ladda venues vid start (och ta bort dubbletter)

useEffect(() => { ... }, []);

Funktion:

Anropar fetchVenuesFromOverpass från services för att hämta OSM-data.

Kombinerar OSM-data med manualVenues.

Tar bort dubbletter via unique name-filter.

Sätter state för venues + filteredVenues.

Metod:

Async inre funktion: async function loadVenues() med await-anrop till services.

(2) Filtrera venues (på typ + sökterm)

useEffect(() => { ... }, [searchTerm, typeFilter, venues]);

Funktion:

Filtrerar på typ, därefter på sökstring.

Sätter state för filteredVenues.

(3) Initiera Mapbox och kontrollera Auth token

useEffect(() => { ... }, []);

Funktion:

Skapar ett nytt Mapbox-gl-objekt.

Sätter dark-v11 style (mörkt tema)

Centrerar på Göteborg, tillför Navigation controls.

Tar bort karta vid unmount.

(4) Lägg till / ta bort markers vid filterändring

useEffect(() => { ... }, [filteredVenues]);

Funktion:

Tar bort gamla markers från kartan.

Lägger in nya markers för varje venue i filteredVenues.

Skapar popup per marker (med ölpris, typ mm).

Visuellt marker med emoji baserat på typ.

JSX/Props:
Renderar:

En <div ref={mapContainer}> där själva Mapbox-kartan placeras.

SearchBar-komponent högst upp till vänster, med props:

onSearch={setSearchTerm}

onTypeFilter={setTypeFilter}

Eventuell loading-indikator över kartan.

src/components/SearchBar.jsx
Syfte:
Panel för användarinteraktion med sök & filter – all styling hanteras här (glassmorphism, glow, mörkt tema).

Funktioner och props
Funktion:

function SearchBar({ onSearch, onTypeFilter })

Tar emot två callbacks som props (en för textinput, en för radioknapp).

Kallar dessa på varje onChange i respektive input.

Element:

Sökfält

<input type="text">

Id för access/label, kallar onSearch vid förändring.

Typfilter (radio):

Fyra <label><input type="radio"></label>, en för varje typ.

Anropar onTypeFilter med korrekt typvärde.

Varje radio har unik id för tillgänglighet + ikon.

Footer

Kort info om datakälla.

Styling (inline):

Root-div: Mörk, transparent, blur (backdrop-filter) och soft-glow (box-shadow).

Ikoner och text har glow via text-shadow, labels får extra glow vid hover.

src/data/venues.js
manualVenues

Array av manuellt inmatade venue-objekt:

id, name, type, longitude, latitude, minPrice, maxPrice

Används främst för att visa ställen som saknas/är fel i OSM.

src/services/overpassAPI.js
fetchVenuesFromOverpass

Async funktion: hämtar geojson-data från OSM via Overpass API.

Parserar rådata till venues-array (matchar manualVenues-formatet).

Returnerar Promise med venue-lista.

Externa beroenden
mapbox-gl

Rendering och kontroll av kartan, markers och popups.

React

All rendering, state och props-hantering.

Google Fonts (Creepster/m.m.)

Används i all typografi för spooky theme.

CSS3 (backdrop-filter, box-shadow, text-shadow)

Möjliggör glassmorphism och glow/stil.

Övrigt
.env

Innehåller känsliga tokens, t.ex. VITE_MAPBOX_TOKEN – alltid ignoreras i git!

.gitignore

Hanterar vilka filer som inte ska committas.