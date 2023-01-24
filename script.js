const popupCard = document.querySelector('.popup-card')
const search = document.querySelector('.btn-search')
const input = document.querySelector('.input')

const bikes = async function(){
try{ const res = await fetch('https://api.citybik.es/v2/networks')
const data = await res.json();

const dati= data.networks;
const datum = dati.map(d => {
    return {
        ...d,
        countryName: countries[d.location.country]
    }
})
console.log(datum)

const map = L.map('map').setView([30, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

datum.forEach(la => {
    const marker = L.marker([la.location.latitude, la.location.longitude]).addTo(map);
    marker.bindPopup(`<div class="card"><div class="name"> ${la.name}</div>
    <div class="country"> ${la.countryName}</div> </div>`)
});

search.addEventListener('click', function(){
    const found = datum.filter(c => c.location.city === input.value);
    if (found[0]) {
        map.setView([found[0].location.latitude, found[0].location.longitude], 13);
    } else {
        alert('There is not city bike in this city or try uppercase first letter');
        input.value='';
    }
})



}catch(err){
    alert(err)
}}

bikes();


