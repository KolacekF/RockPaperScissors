let pozadi = document.getElementById("pozadi");

let Elements = [];

class Element{
    constructor(DOM, x){
        this.DOM_element = DOM;
        this.typ = x;
        this.pozice = [];
        this.smer = [];
        this.velikost = [25, 25];
        this.pozadi = [];
        this.kolize_pred = 0;

        this.pozadi[0] = Number((pozadi.style.width).slice(0,-2));
        this.pozadi[1] = Number((pozadi.style.height).slice(0,-2));
        this.pozice[0] = this.getRndInteger(50, this.pozadi[0] - 50);
        this.pozice[1] = this.getRndInteger(50, this.pozadi[1] - 50);
        this.smer[0] = this.getRndInteger(10, 90) / 100;
        this.smer[1] = 1 - this.smer[0];

        this.DOM_element.style.width = this.velikost[0] + "px";
        this.DOM_element.style.height = this.velikost[1] + "px";
        
        Elements.push(this);
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
    pohyb(){
        this.pozice[0] = this.pozice[0] + this.smer[0];
        this.pozice[1] = this.pozice[1] + this.smer[1];
        this.je_okraj();
        this.je_kolize();
        this.aktualizace_elementu();
    }
    je_okraj(){
        let x = this.pozice[0];
        let y = this.pozice[1];
        let a = this.pozadi[0];
        let b = this.pozadi[1];
        if((x + this.velikost[0]) > a){
            //this.smer[0] = this.smer[0] * -1;
            this.smer[0] = -Math.abs(this.smer[0]);
        }
        if((x) < 0){
            this.smer[0] = this.smer[0] * -1;
        }
        if((y + this.velikost[1]) > b){
            //this.smer[1] = this.smer[1] * -1;
            this.smer[1] = -Math.abs(this.smer[1]);
        }
        if((y) < 0){
            this.smer[1] = this.smer[1] * -1;
        }
    }
    je_kolize(){
        let nepresnost = 25;
        for (const element of Elements) {
            if (element == this) { //pokud element najde sam sebe, preskoci se vyhodnocovani
                continue;
            }
            if (this.kolize_pred > 0) { //pokud je element po kolizi, preskoci se vyhodnocovani
                return;
            }
            if (Math.floor(element.pozice[0] / nepresnost) === Math.floor(this.pozice[0] / nepresnost)) {
                if (Math.floor(element.pozice[1] / nepresnost) === Math.floor(this.pozice[1] / nepresnost)) {
                    this.kolize_pred = 100; //doba, po kterou se nebude vyhodnocovat kolize
                    this.vyhodnoceni_kolize(element);
                    //alert("kolize");
                }
            }
        }
    }
    vyhodnoceni_kolize(element){
        if (this.typ == 1 && element.typ == 2) {
            this.typ = 2;
        }
        if (this.typ == 2 && element.typ == 3) {
            this.typ = 3;
        }
        if (this.typ == 3 && element.typ == 1) {
            this.typ = 1
        }
    }
    aktualizace_elementu(){
        this.pozadi[0] = Number((pozadi.style.width).slice(0,-2));
        this.pozadi[1] = Number((pozadi.style.height).slice(0,-2));

        let dom_element_style = this.DOM_element.style;

        dom_element_style.left = this.pozice[0] + "px";
        dom_element_style.top = this.pozice[1] + "px";

        //dom_element_style.backgroundSize = "100% 100%";
        //dom_element_style.backgroundAttachment = "fixed";

        switch (this.typ) {
            case 1:
                dom_element_style.backgroundImage = "url('rock.png')";    
                break;
            case 2:
                dom_element_style.backgroundImage = "url('paper.png')";
                break;
            case 3:
                dom_element_style.backgroundImage = "url('scissors.png')";
                break;
        }
    }
}

function Create_elements(r, p, s){
    while ((r + p + s) > 0) {
        let new_element = document.createElement("div");
        new_element.style.position = "absolute";
        new_element.style.backgroundSize = "100% 100%";
        while(true){
            if (r > 0) {
                new Element(new_element, 1);
                r = r - 1;
                break;
            }
            if (p > 0) {
                new Element(new_element, 2);
                p = p - 1;
                break;
            }
            if (s > 0) {
                new Element(new_element, 3);
                s = s - 1;
                break;
            }
        }
        pozadi.appendChild(new_element);
    }
}

function Delete_elements(){
    while (Elements.length > 0) {
        Elements.pop().DOM_element.remove();
    }
}

//Create_elements(2, 2, 2);

//TICK FUNTION OBJECT
Element_tick = {
    interval: 5,
    ticks: 0,
    start: function(){
        this.ticks = 0;
        this.element_tick = setInterval(() => {Elements.forEach((e) => {
            e.pohyb();
            if (e.kolize_pred > 0) {
                e.kolize_pred = e.kolize_pred - 1;
            }
            })
            this.ticks = this.ticks + 1;
            this.je_konec();
        }, this.interval);
    },
    end: function(){
        Results();
        clearInterval(this.element_tick);
    },
    je_konec: function(){
        let i = 0;
        let x = Elements[0].typ;
        for (const element of Elements) {
            if (x == element.typ) {
                i = i + 1;
            }
        }
        if (i == Elements.length) {
            setTimeout(() => {
                this.end();
            }, 1000);
        }
    }
}