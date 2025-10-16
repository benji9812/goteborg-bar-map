README � Komponent- och Kod�versikt

src/components/GoteborgMap.jsx
Syfte:
Huvudkomponent som visualiserar G�teborgs �lst�llen p� en interaktiv karta och kopplar samman filtrering, marker och data.

Funktioner och variabler
Hooks & state:

const mapContainer = useRef(null);
Referens till DOM-elementet f�r Mapbox-kartan.

const map = useRef(null);
Referens till sj�lva Mapbox-gl-objektet.

const markers = useRef([]);
Lista av aktuella karto-markers � beh�vs f�r att kunna ta bort dem dynamiskt.

const [venues, setVenues] = useState(manualVenues);
Huvudlista med alla venues, b�de h�mtade och manuella fr�n fil.

const [filteredVenues, setFilteredVenues] = useState(manualVenues);
Filtrerad lista baserat p� typ/s�kterm.

const [searchTerm, setSearchTerm] = useState('');
Anv�ndarens senaste s�ktext.

const [typeFilter, setTypeFilter] = useState('all');
Filter f�r typ av st�lle ("all", "bar", "pub", "restaurant").

const [loading, setLoading] = useState(false);
Om laddning av data p�g�r.

Effekter
(1) Ladda venues vid start (och ta bort dubbletter)

useEffect(() => { ... }, []);

Funktion:

Anropar fetchVenuesFromOverpass fr�n services f�r att h�mta OSM-data.

Kombinerar OSM-data med manualVenues.

Tar bort dubbletter via unique name-filter.

S�tter state f�r venues + filteredVenues.

Metod:

Async inre funktion: async function loadVenues() med await-anrop till services.

(2) Filtrera venues (p� typ + s�kterm)

useEffect(() => { ... }, [searchTerm, typeFilter, venues]);

Funktion:

Filtrerar p� typ, d�refter p� s�kstring.

S�tter state f�r filteredVenues.

(3) Initiera Mapbox och kontrollera Auth token

useEffect(() => { ... }, []);

Funktion:

Skapar ett nytt Mapbox-gl-objekt.

S�tter dark-v11 style (m�rkt tema)

Centrerar p� G�teborg, tillf�r Navigation controls.

Tar bort karta vid unmount.

(4) L�gg till / ta bort markers vid filter�ndring

useEffect(() => { ... }, [filteredVenues]);

Funktion:

Tar bort gamla markers fr�n kartan.

L�gger in nya markers f�r varje venue i filteredVenues.

Skapar popup per marker (med �lpris, typ mm).

Visuellt marker med emoji baserat p� typ.

JSX/Props:
Renderar:

En <div ref={mapContainer}> d�r sj�lva Mapbox-kartan placeras.

SearchBar-komponent h�gst upp till v�nster, med props:

onSearch={setSearchTerm}

onTypeFilter={setTypeFilter}

Eventuell loading-indikator �ver kartan.

src/components/SearchBar.jsx
Syfte:
Panel f�r anv�ndarinteraktion med s�k & filter � all styling hanteras h�r (glassmorphism, glow, m�rkt tema).

Funktioner och props
Funktion:

function SearchBar({ onSearch, onTypeFilter })

Tar emot tv� callbacks som props (en f�r textinput, en f�r radioknapp).

Kallar dessa p� varje onChange i respektive input.

Element:

S�kf�lt

<input type="text">

Id f�r access/label, kallar onSearch vid f�r�ndring.

Typfilter (radio):

Fyra <label><input type="radio"></label>, en f�r varje typ.

Anropar onTypeFilter med korrekt typv�rde.

Varje radio har unik id f�r tillg�nglighet + ikon.

Footer

Kort info om datak�lla.

Styling (inline):

Root-div: M�rk, transparent, blur (backdrop-filter) och soft-glow (box-shadow).

Ikoner och text har glow via text-shadow, labels f�r extra glow vid hover.

src/data/venues.js
manualVenues

Array av manuellt inmatade venue-objekt:

id, name, type, longitude, latitude, minPrice, maxPrice

Anv�nds fr�mst f�r att visa st�llen som saknas/�r fel i OSM.

src/services/overpassAPI.js
fetchVenuesFromOverpass

Async funktion: h�mtar geojson-data fr�n OSM via Overpass API.

Parserar r�data till venues-array (matchar manualVenues-formatet).

Returnerar Promise med venue-lista.

Externa beroenden
mapbox-gl

Rendering och kontroll av kartan, markers och popups.

React

All rendering, state och props-hantering.

Google Fonts (Creepster/m.m.)

Anv�nds i all typografi f�r spooky theme.

CSS3 (backdrop-filter, box-shadow, text-shadow)

M�jligg�r glassmorphism och glow/stil.

�vrigt
.env

Inneh�ller k�nsliga tokens, t.ex. VITE_MAPBOX_TOKEN � alltid ignoreras i git!

.gitignore

Hanterar vilka filer som inte ska committas.