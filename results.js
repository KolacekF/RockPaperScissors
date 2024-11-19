let send = false;

function Results(){
    send = true;   
}

let id = setInterval(() => {
    if (send) {
        send = false;
        
        let xhr = new XMLHttpRequest();
        let start = Watch_tick.stav;
        let end = Elements[0].typ;
        let lenght = Element_tick.ticks * Element_tick.interval;
        xhr.open("GET", "http://kolacek.atwebpages.com/portfolio/RockPaperScissors/results.php/?" + "start=" + start + "&end=" + end + "&lenght=" + lenght, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(null); 
    }
}, 2000);