const error = document.querySelector('.error')
const search = document.querySelector('.btn-search')
const input = document.querySelector('.input')

const bikes = async function () {
    try {
        const res = await fetch('https://api.citybik.es/v2/networks')
        const data = await res.json();

        const dati = data.networks;

        const datum = dati.map(d => {
            return {
                ...d,
                countryName: countries[d.location.country]
            }
        })
        console.log(datum)

datum.push({
    company: ["Qari"],
    countryName:"Georgia",
    href: '/v2/networks/qari-Tbilisi',
    id: 'qari-tbilisi',
    location: {city: 'Tbilisi', country: 'GE', latitude: 41.69, longitude: 44.81},
    name: "Qari"
})

        const map = L.map('map').setView([30, 0], 2);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        datum.forEach(la => {
            const marker = L.marker([la.location.latitude, la.location.longitude]).addTo(map);
            marker.bindPopup(`<div class="card">
    <a href="https://www.google.com/search?q=${la.name} ${la.location.city}" target="_blank> 
    <div class="name"> ${la.name}</div></a>
    <div class="country"> ${la.countryName}</div> 
    </div>`)
        });

        search.addEventListener('click', function () {
            if (input.value.length >= 3) {
                error.innerHTML = ''
                const found = datum.filter(c => c.location.city.toLowerCase().startsWith(input.value.toLowerCase()) 
                || (c.countryName && c.countryName.toLowerCase().startsWith(input.value.toLowerCase())));
            if (found[0]) {
                map.setView([found[0].location.latitude, found[0].location.longitude], 7);
            } else {
                const errorMsg = `<div class="errorMsg"> 
             No city bikes  found in this city
        </div>`
                error.innerHTML = errorMsg;
                input.value = "";
            }
     } })


    } catch (err) {
        alert(err)
    }
}

bikes();


