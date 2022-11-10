document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchinput").value;

  if (input != "") {
    warning("carregando....");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=4b740d4c82089a8996d57a9c2c44223a&units=metric&lang=pt_br`;

    let result = await fetch(url);
    let json = await result.json();

    console.log(json.weather[0].icon,)
    if (json.cod == 200) {
     
      showinfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      warning("Não enconteri essa localização");
    }
  }else{
    clearInfo()
  }
});

function warning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function showinfo(json) {
  warning('')
  document.querySelector(".titulo").innerHTML = `${json.name},${json.country}`;
  document.querySelector('.tempinfo').innerHTML = `${json.temp}<sup>°c</sup>`
  document.querySelector('.ventoinfo').innerHTML= `${json.windSpeed} <span>km/h</span>`

  document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  document.querySelector('.vento-ponto').style.transform= `rotate(${json.windAngle})`
  document.querySelector('.resultado').style.display= 'block'
}

function clearInfo(){
  warning('')
  document.querySelector('.resultado').style.display='none'
}
