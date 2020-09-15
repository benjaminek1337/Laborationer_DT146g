//#region Labb 2

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

if(window.location.pathname.includes("/contact.html")){
    document.getElementById("browser-text").addEventListener("load", getBrowserName(), false);
}
//#endregion

//#region Labb 3

function imgPreloader(){
    if(window.location.pathname.includes("/ourfleet.html")){
        
        imgPaths = [
            "./img/plane1.jpg",
            "./img/plane2.jpg",
            "./img/plane3.jpg",
            "./img/plane4.jpg"
        ]; 
    }
    else if(location.pathname.includes("/employees.html")){
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

function imageSelector(imgThumb){
    
    var imgPath = imgThumb.split("_thumb")[0] + imgThumb.split("_thumb")[1];
    var imgsrc = img.find(a => a.src == imgPath);

    document.getElementById("bigImage").src = imgsrc.src;        
}

if(location.pathname.includes("/ourfleet.html") 
|| location.pathname.includes("/employees.html")){
    var imgPaths = new Array();
    var img = new Array();

    document.getElementById("img1").addEventListener("click", function(){
        imageSelector(document.getElementById("img1").src)
    });
    document.getElementById("img2").addEventListener("click", function(){
        imageSelector(document.getElementById("img2").src)
    });
    document.getElementById("img3").addEventListener("click", function(){
        imageSelector(document.getElementById("img3").src)
    });
    document.getElementById("img4").addEventListener("click", function(){
        imageSelector(document.getElementById("img4").src)
    });
    
    window.addEventListener("load", imgPreloader(), false);
}
//#endregion

//#region Labb 4

function generateSeatButtons(){
    let container = document.querySelector("#seats");
    let counter = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            let seatBtn = document.createElement("button");
            let btnText = document.createTextNode((counter + 1).toString());
            seatBtn.setAttribute("id", (counter + 1));
            seatBtn.appendChild(btnText);
            container.appendChild(seatBtn);

            let available = true;
            if((Math.floor((Math.random() * 10) + 1) > 8)){
                seatBtn.classList.add("seat-btn-taken");
                available = false;
            } else{
                seatBtn.classList.add("seat-btn");
            }

            generateSeatsArray(counter, (i + 1), available);
            counter++;
        }
    }
}

function generateSeatsArray (counter, rowNr, available){
    let classlabel = "Ekonomiklass";

    if(counter + 1 < 7){
        classlabel = "Affärsklass";
    }

    seats[counter] = {
        row: rowNr, 
        seatNr: (counter + 1),
        availability:available,
        class:classlabel
    };
}

function selectSeat(seatInput){
    let seatLabel = document.getElementById("seat");
    let seatClass = document.getElementById("seat-class");
    let seat = seats.find(se => se.seatNr == seatInput)
    if (!seat.availability){
        seatLabel.innerHTML = "Platsen är upptagen";
        seatClass.innerHTML = "";
        selectedSeat = undefined;
    } else{
        seatLabel.innerHTML = "Rad: " + seat.row + " <br>Plats: " + seat.seatNr;
        seatClass.innerHTML = "<br>" + seat.class;
        selectedSeat = seat;
    }
}

function seatButtonFocused(seatInput){
    
    var btns = document.querySelectorAll(".seat-btn");
    
    for (let i = 0; i < btns.length; i++) {
        const element = btns[i];
        element.classList.remove("enabled");
        if(seatInput == element.id)
            element.classList.add("enabled");
        
    }
}

function clearSelectedSeat(){
    document.getElementById("seat").innerHTML="";
    document.getElementById("seat-class").innerHTML="";
    
    var btns = document.querySelectorAll(".seat-btn");
    
    for (let i = 0; i < btns.length; i++) {
        const element = btns[i];
        element.classList.remove("enabled");
    }
}

function saveBooking(){
    if(selectedSeat != undefined){
        booking = {
            firstname: fn.value,
            lastname: ln.value,
            personnr: nr.value,
            seat: selectedSeat.seatNr,
            row: selectedSeat.row
        }
    }
    else{
        booking = {
            firstname: fn.value,
            lastname: ln.value,
            personnr: nr.value
        }
    }
}

function doBooking (){
    saveBooking();
    
    if(!isOverbooked() && selectedSeat != undefined){
        showTicket();
    }
}

function storeBooking (){
    saveBooking();
    sessionStorage.setItem("booking", JSON.stringify(booking));
}

function restoreBooking(){
    booking = JSON.parse(sessionStorage.getItem("booking"));
    fn.value = booking.firstname;
    ln.value = booking.lastname;
    nr.value = booking.personnr;
    if(booking.seat != null){
        selectSeat(booking.seat);
        seatButtonFocused(booking.seat);
    }
    isFormFilled();
}

function clearBooking (){
    fn.value = "";
    ln.value = "";
    nr.value = "";
    booking = undefined;
    selectedSeat = undefined;
    clearSelectedSeat();
}

function isOverbooked(){
    seatsLeft = seats.filter(s => s.availability == true);

    if(seatsLeft.length == 0){
        return true;
    } else{
        return false;
    }
}

function isName(name){
    return /^[a-z ,.'-]+$/i.test(name);
}

function isSsnCorrect(ssn){
    return /^\d{6,8}[-|(\s)]{0,1}\d{4}$/.test(ssn);
}

function isSeatSelected(){
    if(selectedSeat == undefined || !selectedSeat.availability){
        return false;
    } else{
        return true;
    }
}
function isFormFilled(){
    if(isName(fn.value)
    && isName(ln.value)
    && isSsnCorrect(nr.value)
    && isSeatSelected()){
        btnConfirm.disabled = false;
    } else{
        btnConfirm.disabled = true;
    }
}

function showTicket(){
    var win = window.open("", "Biljett", "resizable=yes,width=780,height=250");
    var html = 
    "<!DOCTYPE html>" +
    "<html lang='en'>" +
    "<head>"+
        "<meta charset='UTF-8'>"+
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<title>Biljett</title>" + 
        "<link rel='stylesheet' href='./../css/style.css'>"+
    "</head>"+
    "<body>"+
        "<section class='ticket'>" +
            "<h1>Din biljett</h1>"+
            "<p>" + booking.firstname + " " + booking.lastname + "</p>" +
            "<p> Personnummer: " + booking.personnr + "</p>" +
            "<p> Plats: " + booking.seat + " Rad: " + booking.row +
            "<br>Biljetten avser resa i " + selectedSeat.class.toLowerCase(); + "</p>" +
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

    var seats = new Array();
    var selectedSeat;
    var booking;

    document.addEventListener("click", function(e){
        if(e.target.classList=="seat-btn" || e.target.classList=="seat-btn-taken"){
            selectSeat(e.target.id);
            seatButtonFocused(e.target.id);
            isFormFilled();
        }
    });
    
    document.getElementById("btn-clear").addEventListener("click", function(){
        clearBooking();
        isFormFilled();
    });
    
    btnConfirm.addEventListener("click", function(){
        doBooking();
    });

    fn.addEventListener("keyup", function(){
        isFormFilled();
    });

    ln.addEventListener("keyup", function(){
        isFormFilled();
    });

    nr.maxLength = 11;
    nr.addEventListener("keyup", function(){
        var key = event.keyCode;
        if(nr.value.length >5 && nr.value.length < 7 
            && key != 8 && key != 46){
            nr.value+="-";
        }
        isFormFilled();
    });

    window.onbeforeunload = function(){
        storeBooking();
    }

    window.addEventListener("load", generateSeatButtons(), false);
    if(JSON.parse(sessionStorage.getItem("booking")) != null){
        window.addEventListener("load", restoreBooking(), false);
    }
}
//#endregion