var currentLocation;
var selectedLocation;
var units = 'imperial';

function getLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        currentLocation = [lat, lng];
        selectedLocation = [lat, lng];
        getCity([lat, lng], true);
        getWeather([lat, lng]);
        return;
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates, setListName) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.fd2d679210df7e7b6ccb040ea1702593&lat=" + lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            document.getElementById('cityNameCircle').innerHTML = city;

            if (setListName) {
                document.getElementById('cityNameList').innerHTML = city;
            }
            return;
        }
    }
}

function setCity(cityName) {
    if (cityName == 'customLocation') {
        cityName = document.getElementById('customLocation').value
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://us1.locationiq.com/v1/search.php?key=pk.fd2d679210df7e7b6ccb040ea1702593&q=" + cityName + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            selectedLocation = [response[0].lat, response[0].lon];
            document.getElementById('cityNameCircle').innerHTML = cityName;
            getCity(selectedLocation, false);
            getWeather(selectedLocation)
            return;
        }
    }
}

function setCurrentLocation() {
    selectedLocation = currentLocation;
    getCity(currentLocation, false);
    getWeather(currentLocation)
}

function getWeather(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    xhr.open('GET', "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&units=" + units + "&exclude=minutely&appid=c9ff3785b1e8c08df3e431a95e09e18b", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);

            document.getElementById('curTempLow').innerHTML = Math.round(resp.daily[0].temp.min);
            document.getElementById('curTemp').innerHTML = Math.round(resp.current.temp);
            document.getElementById('curTempHigh').innerHTML = Math.round(resp.daily[0].temp.max);
            document.getElementById('curInfo').innerHTML = resp.current.weather[0].main;

            var curType = resp.current.weather[0].id;
            curType = curType - (curType % 100);

            switch (curType) {
                case 200:
                case 300:
                case 500:
                case 600:
                    document.getElementById("curInfoImg").src = "resources/rain.png";
                    break;
                case 700:
                    document.getElementById("curInfoImg").src = "resources/wind.png";
                    break;
                default:
                    document.getElementById("curInfoImg").src = "resources/cloud.png";
            }

            if (units == 'imperial') {
                document.getElementById('actKite').innerHTML = resp.current.wind_speed + " mph";
            } else {
                document.getElementById('actKite').innerHTML = resp.current.wind_speed + " m/s";
            }

            document.getElementById('actJog').innerHTML = resp.current.humidity + "%";
            document.getElementById('actSki').innerHTML = resp.current.snow ? ["1h"] + " mm" : '0 mm';

            var hourImgs = document.getElementsByClassName('hourImg');
            for (var i = 0; i < hourImgs.length; i++) { 
                var type = resp.hourly[i].weather[0].id;
                
                switch (type) {
                    case 200:
                    case 300:
                    case 500:
                    case 600:
                        hourImgs[i].src = "resources/rain.png";
                        break;
                    case 700:
                        hourImgs[i].src = "resources/wind.png";
                        break;
                    default:
                        hourImgs[i].src = "resources/cloud.png";
                }
            }

            var hourTemps = document.getElementsByClassName('hourTemp');
            for (var i = 0; i < hourTemps.length; i++) { 
                hourTemps[i].innerHTML = Math.round(resp.hourly[i].temp);
            }

            var hourTimes = document.getElementsByClassName('hourTime');
            for (var i = 0; i < hourTimes.length; i++) { 
                var time = new Date(resp.hourly[i].dt * 1000);
                hr = time.getHours();

                if (hr > 12) {
                    hourTimes[i].innerHTML = (hr - 12) + "PM";
                } else if (hr == 0) {
                    hourTimes[i].innerHTML = (hr + 12) + "AM";
                } else if (hr == 12) {
                    hourTimes[i].innerHTML = hr + "PM";
                } else {
                    hourTimes[i].innerHTML = hr + "AM";
                }
            }

            return;
        }
    }
}