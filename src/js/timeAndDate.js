function start() {
    var today = new Date();
    var mon = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    if (m < 10) {
        m = "0" + m
    };
    document.getElementById('time').innerHTML = h + ":" + m;
    document.getElementById('date').innerHTML = mon + "." + day + "." + year;
    var t = setTimeout(start, 500);
}