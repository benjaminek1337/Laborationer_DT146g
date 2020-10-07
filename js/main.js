
window.onload = function(){

//Current window location pathname
const path = window.location.pathname;

//Startup function which calls functions depending on the pathname
function start(){
    if(path.includes("/contact.html")){
        getBrowserName();
    }
    else if(path.includes("/ourfleet.html") || path.includes("/employees.html")){
        imgPreloader();
        addClickEventToThumbnails();
    }
    else if(path.includes("/booking.html")){
        onInit();
    }
}    

//Checks for current browser, adds it to the DOM element sBrowser
function getBrowserName() {
    let sBrowser = document.getElementById("browser-text");

    var sUsrAg = navigator.userAgent;
    // The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser.innerHTML = "Mozilla Firefox";
        // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
        sBrowser.innerHTML = "Samsung Internet";
        // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
        sBrowser.innerHTML = "Opera";
        // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
        sBrowser.innerHTML = "Microsoft Internet Explorer";
        // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
        sBrowser.innerHTML = "Microsoft Edge";
        // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        sBrowser.innerHTML = "Google Chrome eller Chromium";
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser.innerHTML = "Apple Safari";
        // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
        sBrowser.innerHTML = "unknown";
    }
}

//#region Labb 3

if(path.includes("/ourfleet.html") || path.includes("/employees.html")){
    var imgPaths = new Array();
    //Array of the big images
    var img = new Array();
}
//Array of relative paths to the big images

//Determines which images (and corresponding image paths) should be preloaded by
//checking current location path. Fills relative paths into imgPaths.
//loads the img array with the images from the relative paths
function imgPreloader(){
    if(path.includes("/ourfleet.html")){
        
        imgPaths = [
            "./img/plane1.jpg",
            "./img/plane2.jpg",
            "./img/plane3.jpg",
            "./img/plane4.jpg"
        ]; 
    }
    else if(path.includes("/employees.html")){
        imgPaths = [
            "./img/employee1.jpg",
            "./img/employee2.jpg",
            "./img/employee3.jpg",
            "./img/employee4.jpg"
        ]; 
    }

    for(var i = 0; i < imgPaths.length; i++){
        img[i] = new Image;
        img[i].src = imgPaths[i];
    }
}

//Function which recieves an imgsrc path, splits out the _thumb part, sets the
//.bigImage DOM element source to the corresponding big image
function imageSelector(imgThumb){
    const imgPath = imgThumb.split("_thumb")[0] + imgThumb.split("_thumb")[1];
    const imgsrc = img.find(a => a.src == imgPath);

    document.getElementById("bigImage").src = imgsrc.src;        
}

//Function which adds all DOM elements of the class .image, which is the thumbnails,
//and adds an eventlistener to every element, which calls function imageSelector
//including the img src specific DOM element
function addClickEventToThumbnails(){
    let thumbArray = Array.from(document.querySelectorAll(".image"));
    for (let i = 0; i < thumbArray.length; i++) {
        const thumbnail = thumbArray[i];
        thumbnail.addEventListener("click", function(){
            imageSelector(document.getElementById("img" + (i+1)).src)
        });
    }
}

//#endregion

//#region Labb 4

function onInit(){
    btnConfirm.disabled = true;
    plane = getPlane();
    generateSeatButtons(plane);
    addEventListenerToSeatBtns();
    if(JSON.parse(sessionStorage.getItem("booking")) != null){
        restoreBooking();
    }
    if(JSON.parse(sessionStorage.getItem("bookings")) != null){
        restoreBookings();
    }
}

function getPlane(){
    return {rows:6, seatsPerRow:3}
}

function generateSeatButtons(plane){
    let counter = 0;
    let container = document.querySelector("#seats");
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < plane.rows; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < plane.seatsPerRow; j++) {
            let cell = document.createElement("td");
            let seatBtn = document.createElement("button");
            let btnText = document.createTextNode((counter + 1).toString());

            seatBtn.appendChild(btnText);
            seatBtn.classList.add("seat-btn");
            seatBtn.setAttribute("id", (counter + 1));
            
            cell.appendChild(seatBtn);
            row.appendChild(cell);
            counter++;
        }    
        table.appendChild(row);
    }

    table.appendChild(tableBody);
    container.appendChild(table);
}

function addEventListenerToSeatBtns (){
    seatBtns = document.querySelectorAll(".seat-btn");
    for (let i = 0; i < seatBtns.length; i++) {
        const element = seatBtns[i];
        element.addEventListener("click", function(){
            selectSeat(element);
            setSeatLabel(element);
            bookingButtonEnabler();
        });  
    }
}

function selectSeat(seat){
    let previouslySelecedSeat;
    if(selectedSeat != undefined){
        previouslySelecedSeat = selectedSeat;
    }
    selectedSeat = seat;
    setSelectedSeatButtonFocus(seat, previouslySelecedSeat);
}

function setSeatLabel(seat){
    let seatLabel = document.getElementById("seat");
    let seatClass = document.getElementById("seat-class");
    
    if(seat.classList.contains("taken")){
        seatLabel.innerHTML = "Platsen är upptagen";
        seatClass.innerHTML = "";
    }
    else {
        seatLabel.innerHTML = "Plats: " + seat.id + 
        " <br>Rad: " + (Math.ceil(seat.id / plane.seatsPerRow));
        seatClass.innerHTML = "<br>" + getTravelClass(seat.id); 
    }
}

function setSelectedSeatButtonFocus(seat, previouslySelecedSeat){
    if(previouslySelecedSeat != undefined)
        previouslySelecedSeat.classList.remove("focused");
    seat.classList.add("focused");
}

function getTravelClass(seatNr){
    let travelClass = "Ekonomiklass";
    if(seatNr <= (plane.seatsPerRow * 2)){
        travelClass = "Affärsklass";
    }
    return travelClass;
}

function setSelectedSeatTaken(){
    if(selectedSeat != null){
        selectedSeat.classList.add("taken");
    }
}

function clearSelectedSeat(){
    document.getElementById("seat").innerHTML="";
    document.getElementById("seat-class").innerHTML="";
    selectedSeat.classList.remove("focused");
    selectedSeat = undefined;
}

function getBooking(){
    let booking;
    if(selectedSeat != undefined){
        booking = {
            firstname: fn.value,
            lastname: ln.value,
            personnr: nr.value,
            seat: selectedSeat.id,
            row: Math.ceil(selectedSeat.id / plane.seatsPerRow)
        }
    } else{
        booking = {
            firstname: fn.value,
            lastname: ln.value,
            personnr: nr.value
        }
    }
    return booking;
}

function setBooking (){
    let booking = getBooking();
    
    if(!isOverbooked() && isFormFilled()){
        showTicket(booking);
        bookings.push(booking);
        setSelectedSeatTaken();
        clearBooking();
    }
}

function clearBooking (){
    fn.value = "";
    ln.value = "";
    nr.value = "";
    clearSelectedSeat();
    bookingButtonEnabler();
}

function storeBooking(){
    sessionStorage.setItem("booking", JSON.stringify(getBooking()));
}

function storeBookings(){
    sessionStorage.setItem("bookings", JSON.stringify(bookings));
}

function restoreBooking(){
    let booking = JSON.parse(sessionStorage.getItem("booking"));
    fn.value = booking.firstname;
    ln.value = booking.lastname;
    nr.value = booking.personnr;
    if(booking.seat != null){
        for (let i = 0; i < seatBtns.length; i++) {
            const element = seatBtns[i];
            if(booking.seat == element.id)
                selectedSeat = element;
        }
        selectSeat(selectedSeat);
        setSelectedSeatButtonFocus(selectedSeat);
    }
    bookingButtonEnabler();
}

function restoreBookings(){
    bookings = JSON.parse(sessionStorage.getItem("bookings"));
    for (let i = 0; i < seatBtns.length; i++) {
        const btn = seatBtns[i];
        if(bookings.find(b => b.seat == btn.id)){
            btn.classList.add("taken");
        }
    }
}

function isOverbooked(){
    let seatsLeft = 0;
    for (let i = 0; i < seatBtns.length; i++) {
        const element = seatBtns[i];
        if(!element.classList.contains("taken")){
            seatsLeft++;
        }
    }
    if(seatsLeft == 0){
        return true;
    } else{
        return false;
    }
}

function isName(name){
    return /^[a-ö ,.'-]+$/i.test(name);
}

function isPersonNrCorrect(pnr){
    return /[0-9]{2}[0-1]{1}[0-9]{3}[-]{1}[0-9]{4}$/.test(pnr);
}

function isSeatSelected(){
    if(selectedSeat == undefined || selectedSeat.classList.contains("taken")){
        return false;
    } else{
        return true;
    }
}
function isFormFilled(){
    if(isName(fn.value)
    && isName(ln.value)
    && isPersonNrCorrect(nr.value)
    && isSeatSelected()){
        return true;
    } else{
        return false;
    }
}

function bookingButtonEnabler(){
    if(isFormFilled()){
        btnConfirm.disabled = false;
    } else{
        btnConfirm.disabled = true;
    }
}

function showTicket(booking){
    let win = window.open("", "Biljett", "resizable=yes,width=780,height=250");
    let html = "<!DOCTYPE html>" +
    "<html lang='en'>" +
    "<head>"+
        "<meta charset='UTF-8'>"+
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<title>Biljett</title>" + 
        "<link rel='stylesheet' href='./css/style.css'>"+
    "</head>"+
    "<body>"+
        "<section class='ticket'>" +
            "<h1>Din biljett</h1>"+
            "<p>" + booking.firstname + " " + booking.lastname + "</p>" +
            "<p> Personnummer: " + booking.personnr + "</p>" +
            "<p> Plats: " + booking.seat + " Rad: " + booking.row +
            "<br>Biljetten avser resa i " + getTravelClass(booking.seat).toLowerCase(); + "</p>" +
        "</section>"
    "</body>"+
    "</html>";

    win.document.write(html);
}

if(window.location.pathname.includes("/booking.html")){

    var btnConfirm = document.getElementById("btn-confirm");
    var fn = document.getElementById("firstname");
    var ln = document.getElementById("lastname");
    var nr = document.getElementById("personnr");

    var plane;
    var selectedSeat;
    var seatBtns = new Array();
    var bookings = new Array();
    
    document.getElementById("btn-clear").addEventListener("click", function(){
        clearBooking();
        isFormFilled();
    });
    
    btnConfirm.addEventListener("click", function(){
        setBooking();
    });

    fn.addEventListener("keyup", function(){
        bookingButtonEnabler();
    });

    ln.addEventListener("keyup", function(){
        bookingButtonEnabler();
    });

    nr.maxLength = 11;
    nr.addEventListener("keyup", function(){
        var key = event.keyCode;
        if(nr.value.length >5 && nr.value.length < 7 
            && key != 8 && key != 46){
            nr.value+="-";
        }
        bookingButtonEnabler();
    });

    window.onbeforeunload = function(){
        storeBooking();
        if(bookings != undefined)
            storeBookings();
    }
}
//#endregion

    window.addEventListener("load", start(), false);
}

