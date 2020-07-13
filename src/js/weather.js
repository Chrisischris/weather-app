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
            return;
        }
    }
}

function setCurrentLocation() {
    selectedLocation = currentLocation;
    getCity(currentLocation, false);
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
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            return;
        }
    }
}