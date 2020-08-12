function startTime() {
    var today = new Date();
    var mon = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    if (m < 10) {
        m = "0" + m
    };

    if (h > 12) {
        document.getElementById('time').innerHTML = (h - 12) + ":" + m + " PM";
    } else if (h == 0) {
        document.getElementById('time').innerHTML = (h + 12) + ":" + m+ " AM";
    } else if (h == 12) {
        document.getElementById('time').innerHTML = h + ":" + m + " PM";
    } else {
        document.getElementById('time').innerHTML = h + ":" + m+ " AM";
    }
    document.getElementById('date').innerHTML = mon + "." + day + "." + year;
    var t = setTimeout(startTime, 500);
}