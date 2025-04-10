document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    let input = document.querySelector('#searchInput').value;
    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');

       let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d6ae8b60de009cd6238c98b77a6fa74a&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === '404') {
        clearInfo()
        showWarning('Não encontramos esta localização!');
      
        } else {
            showLoading({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }
    } else {
        clearInfo();
        showWarning('Digite uma cidade para buscar!');
    }       
}); 

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function showLoading(json) {
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); 
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;   

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
    document.querySelector('.aviso').style.display = 'block';
    document.querySelector('.aviso').innerHTML = 'Digite uma cidade para buscar!';
}