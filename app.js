// 1. Haritayı Başlat (Merkez koordinatı Orta Asya/Türkiye arası bir yer)
const map = L.map('map').setView([40.0, 70.0], 4);

// 2. Harita Görünümünü Ekle (OpenStreetMap altlığı kullanıyoruz)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Haritadaki devlet şekillerini (daireleri) tutacağımız dizi
let aktifDevletler =[];

// 3. Paneli ve Slider'ı Seçme
const yearSlider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('current-year-display');
const infoPanel = document.getElementById('info-panel');

// 4. Slider Değiştikçe Çalışacak Fonksiyon
yearSlider.addEventListener('input', (e) => {
    let yil = parseInt(e.target.value);
    
    // Yılı M.Ö. veya M.S. olarak ekranda göster
    if (yil < 0) {
        yearDisplay.innerText = `M.Ö. ${Math.abs(yil)}`;
    } else {
        yearDisplay.innerText = `M.S. ${yil}`;
    }

    haritayiGuncelle(yil);
});

// 5. Yıla Göre Hangi Devletin Ekranda Olacağını Seçen Fonksiyon
function haritayiGuncelle(yil) {
    // Önce haritadaki eski devletleri (daireleri) temizle
    aktifDevletler.forEach(sekil => map.removeLayer(sekil));
    aktifDevletler =
