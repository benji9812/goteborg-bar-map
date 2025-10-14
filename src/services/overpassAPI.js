export async function fetchVenuesFromOverpass() {
    const bbox = '57.65,11.85,57.75,12.05'; // Göteborg

    const query = `
    [out:json][timeout:25];
    (
      node["amenity"="bar"](${bbox});
      node["amenity"="pub"](${bbox});
      node["amenity"="restaurant"](${bbox});
      node["amenity"="cafe"]["outdoor_seating"="yes"](${bbox});
      node["amenity"="biergarten"](${bbox});
      node["amenity"="nightclub"](${bbox});
      node["amenity"="fast_food"]["cuisine"="burger"](${bbox});
      
      way["amenity"="bar"](${bbox});
      way["amenity"="pub"](${bbox});
      way["amenity"="restaurant"](${bbox});
      way["amenity"="cafe"]["outdoor_seating"="yes"](${bbox});
      way["amenity"="biergarten"](${bbox});
      way["amenity"="nightclub"](${bbox});
      
      relation["amenity"="bar"](${bbox});
      relation["amenity"="pub"](${bbox});
      relation["amenity"="restaurant"](${bbox});
    );
    out center;
  `;

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Overpass API');
        }

        const data = await response.json();

        const venues = data.elements.map((element) => {
            const lat = element.lat || element.center?.lat;
            const lon = element.lon || element.center?.lon;
            const name = element.tags?.name || element.tags?.brand || 'Namnlöst ställe';

            let type = 'bar';
            const amenity = element.tags?.amenity;
            if (amenity === 'restaurant' || amenity === 'fast_food') type = 'restaurant';
            if (amenity === 'pub' || amenity === 'biergarten') type = 'pub';
            if (amenity === 'cafe') type = 'bar'; // Caféer med uteservering räknas som bar
            if (amenity === 'nightclub') type = 'bar';

            return {
                id: element.id,
                name: name,
                type: type,
                longitude: lon,
                latitude: lat,
                minPrice: Math.floor(Math.random() * 20) + 60,
                maxPrice: Math.floor(Math.random() * 30) + 80,
                source: 'osm'
            };
        }).filter(v =>
            v.latitude &&
            v.longitude &&
            v.name !== 'Namnlöst ställe' &&
            !v.name.includes('McDonald') && // Filtrera bort snabbmat
            !v.name.includes('Burger King')
        );

        console.log(`Hämtade ${venues.length} ställen från OpenStreetMap`);
        return venues;

    } catch (error) {
        console.error('Error fetching from Overpass API:', error);
        return [];
    }
}
