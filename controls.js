let controls = document.getElementById("controls");
controls.style.display = "flex";

let Controls = [];

class Control_Wrapper{
    constructor(x){
        this.type = x;
        this.value = 1;

        Controls.push(this);
        controls.appendChild(this.create_DOM());
    }
    create_DOM(){
        let wrapper = document.createElement("div");
        let value = document.createElement("div");
        let control = document.createElement("input");
        let symbol = document.createElement("div");

        wrapper.style.display = "flex";
        wrapper.style.flexFlow = "column";
        wrapper.style.alignItems = "center";

        control.id = this.type + "_control";
        control.type = "range";
        control.min = 0;
        control.max = 40;
        control.orient = "vretical";
        control.style.appearance = "slider-vertical"
        control.oninput = function(){
            for (const control of Controls) {
                if (control.type + "_control" == this.id) {
                    control.change_value(this.value);
                    break;
                }
            }
        };

        this.value = control.max / 2;
        control.value = this.value;

        value.id = this.type + "_value";
        value.innerHTML = this.value;

        symbol.style.width = "25px";
        symbol.style.height = "25px";
        symbol.style.backgroundSize = "100% 100%";
        switch (this.type) {
            case "r":
                symbol.style.backgroundImage = "url('rock.png')";
                break;
            case "p":
                symbol.style.backgroundImage = "url('paper.png')";
                break;
            case "s":
                symbol.style.backgroundImage = "url('scissors.png')";
                break;
            default:
                console.log(this.type)
                break;
        }

        //symbol.innerHTML = this.type;


        wrapper.appendChild(value);
        wrapper.appendChild(control);
        wrapper.appendChild(symbol);

        return(wrapper);
    }
    change_value(x){
        this.value = x;
        document.getElementById(this.type + "_value").innerHTML = x;
    }
}

Button = {
    stav: false,
    create_DOM: function(){
        let button = document.createElement("button");
        button.id = "controls_button";
        button.classList.add("btn_green");
        button.innerHTML = "ZAČÍT";
        button.onclick = function(){
            Button.change_state();
            if (Button.stav) {
                let r, p, s;
                for (const x of Controls) {
                    switch (x.type) {
                        case "r":
                            r = x.value;
                            break;
                        case "p":
                            p = x.value;
                            break;
                        case "s":
                            s = x.value;
                            break;
                        default:
                            console.log(x);
                            break;
                    }
                };
                Create_elements(r, p, s);
                Watch_tick.start();
                Element_tick.start();
            } else {
                Delete_elements();
                Watch_tick.end();
                Element_tick.end();
            }
        }
        let button_nastaveni = document.createElement("button");
        button_nastaveni.innerHTML = "NASTAVENÍ";
        button_nastaveni.id = "controls_nastaveni";
        button_nastaveni.onclick = function(){
            if (!Button.stav) {
                document.getElementById("popup_window").style.display = "flex";
                document.getElementById("change_w_range").max = window.innerWidth;
                document.getElementById("change_w_range").value = Number((pozadi.style.width).slice(0,-2));
                document.getElementById("change_h_range"). max = window.innerHeight;
                document.getElementById("change_h_range").value = Number((pozadi.style.height).slice(0,-2));
            } else{
                alert("pro nastavení ukončete hru");
            }
            
        }
        let button_wrapper = document.createElement("div");
        button_wrapper.style.display = "flex";
        button_wrapper.style.flexFlow = "column";
        button_wrapper.appendChild(button);
        button_wrapper.appendChild(button_nastaveni);
        return button_wrapper;
    },
    change_state: function(){
        button = document.getElementById("controls_button");
        this.stav = !this.stav;
        if (!this.stav) {
            button.classList.toggle("btn_green");
            button.classList.toggle("btn_red");
            button.innerHTML = "ZAČÍT";
        } else {
            button.classList.toggle("btn_green");
            button.classList.toggle("btn_red");
            button.innerHTML = "UKONČIT";
        }
    }
}

//Funkce pro objekt viz nize
function Watch_state(){
    let r = p = s = 0;
    for (const element of Elements) {
        switch (element.typ) {
            case 1:
                r = r + 1;
                break;
            case 2:
                p = p + 1;
                break;
            case 3:
                s = s + 1;
                break;
            default:
                console.log(element)
                break;
        }
    }
    let a = [r, p, s];
    let b = ["r", "p", "s"];
    for (const x in a) {
        document.getElementById(b[x] + "_value").innerHTML = a[x];
        document.getElementById(b[x] + "_control").value = a[x];
    }
}

// TICK FUNCTION OBJECT
Watch_tick = {
    stav: [],
    stav_max: "",
    watch_tick: "",
    start: function(){
        this.stav = [
            document.getElementById("r_control").value,
            document.getElementById("p_control").value,
            document.getElementById("s_control").value,
        ]
        this.stav_max = document.getElementById("r_control").max;
        let b = ["r", "p", "s"];
        for (const x of b) {
            document.getElementById(x + "_control").max = Elements.length;
        }
        this.watch_tick = setInterval(() => {
            Watch_state();
        }, 500)
    },
    end: function(){
        clearInterval(this.watch_tick);
        let b = ["r", "p", "s"];
        for (const x in this.stav) {
            document.getElementById(b[x] + "_value").innerHTML = this.stav[x];
            document.getElementById(b[x] + "_control").value = this.stav[x];
        }
        for (const x of b) {
            document.getElementById(x + "_control").max = this.stav_max;
        }
    }
}
/*
function Watch_tick(){
    let watch_tick = setInterval(() => {
        Watch_state();
    }, 1000)
}*/

let r_control = new Control_Wrapper("r");
let p_control = new Control_Wrapper("p");
let s_control = new Control_Wrapper("s");

controls.appendChild(Button.create_DOM());