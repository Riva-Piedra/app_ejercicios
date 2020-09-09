//Variables
let o = document.getElementById('select');
let btn = document.getElementById('btn');
let ul = document.getElementById('ul');
let timer = document.getElementById('span');
let form = document.getElementById('form');
let add = document.getElementById('add');
let restart = document.getElementById('reset');
let info = document.getElementById('info');
let text = document.getElementById('text')

//Eventos

btn.addEventListener('click', define);
add.addEventListener('click', getExercies);
restart.addEventListener('click', reset)

//Funciones de los eventos

//------------------------------------------
function define(){
    add.setAttribute('disabled', "");
    let o = document.getElementById('select');
    if(ul.children.length == 0){    /* Comprabamos si hay ejercicios en lista, si es asi seguimos */
        alert('agrege ejercicios')
        add.removeAttribute('disabled', "")
        return false
    } 

    if(o.options[o.selectedIndex].value == 1){  /* Seteamos el tiempo de entrenamiento y descanso */
        pre = 10;
        time = 60;
        rest = 30; 
    } else if (o.options[o.selectedIndex].value == ""){   
        alert('Seleccione una rutina')
        add.removeAttribute('disabled', "")
        return false
    } else {
        pre = 10;
        time = 30;
        rest = 10;
    }

    o.setAttribute('style', 'display: none')

    let a = 0    /* "Contador de ejercicios" */

    countdown();

    function countdown(){  
        if(a == ul.children.length){    /* Una vez que todos los ejercicios de la lista fueron hechos se para la ejecucion */
            alert('Entrenamiento Finalizado Felicidades');
            clearTimeout();
            o.setAttribute('style', 'display: inline');
            reset();
            add.removeAttribute('disabled', "")
            } else { 
                timer.innerHTML = pre
                info.innerHTML = "Preparate!"
                if(pre == 0){
                    ul.children[a].setAttribute('class', 'active')
                    timer.innerHTML = time
                    info.innerHTML = 'Entrena!'
                    if(time == 0){
                        timer.innerHTML = rest
                        info.innerHTML = "Descansa Crack"
                            if(rest == 0 && o.options[o.selectedIndex].value == 1){   
                                rest +=30
                                time +=60        /*Esta parte es para reiniciar los valores del cronometro en cada intervalo hasta que a == ul.children.lenght */
                                a++              /* Sumamos 1 al valor en cada iteracion */
                        } else if(rest == 0 && o.options[o.selectedIndex].value == 2) {
                            rest +=10
                            time +=30        
                            a++ 
                        }
                        else 
                            rest -= 1
                            setTimeout(countdown, 1000)
                } else {
                    time -= 1
                    setTimeout(countdown, 1000)
                    }
            } else {
                pre-= 1
                setTimeout(countdown, 1000)
            }
        }       
    }  
}
 
//-------------------------------------------------------

function getExercies() {  /* Trae los ejercicios seleccionados y los suma a la lista */
    ul.innerHTML = ""
    	
    for (let i = 0; i < form.length; i++) {
        
            if (form[i].checked == true){
                let element = document.createElement('li')
                element.innerHTML = form.children[i].textContent
                ul.appendChild(element);
            } 
        }
    }
//----------------------------------------------------

function reset(){  /* Pone todo a "0" */
    let result = confirm('Desea resetear?')
        if(result == true){
            info.innerHTML = ""
            add.removeAttribute('disabled', "")
            ul.innerHTML = "";
            o.setAttribute('style', 'display: inline');
            timer.innerHTML = "";
        }
}
