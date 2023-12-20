/**
 * 2C = Two of Clubs
 * 2D = Two of Diamons
 * 2H = Two of hearts
 * 2S = Two of shades
 */

let deck = [];
let tipos = ['C','D','H','S'];
let especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;
//Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener =document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');



//esta funcion crea una nueva baraja
const crearDeck = ()=>{
        for (let i = 2; i <= 10; i++) {
           
           for (let tipo of tipos) {
                deck.push( i+ tipo);
           }
        }

        for(let tipo of tipos){
            for(esp of especiales){
                deck.push( esp + tipo);
            }
        }      
      
      deck = _.shuffle(deck);
      console.log(deck);

      return deck;
}
crearDeck();

//Esta funcion me permite romar una carta
const pedircarta = ()=>{

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); 
    return carta;
   
}

const valorCarta = ( carta)=>{
    const valor = carta.substring(0,carta.length - 1);
    // let puntos =0;
    // if( isNaN(valor)){// por si llega un KD, QD
    //    puntos = ( valor === 'A') ? 11 : 10;
    // }else{
       
    //     puntos = valor *1;
    // }

    return ( isNaN(valor) ) ?
           ( valor ==='A' ) ? 11 : 10
           : valor * 1; //algo * 1 lo vuelve numero
 
}

//turno computadora

const turnoComputadora =( puntosMinimos)=>{
    do{
        const carta = pedircarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);   
        puntosHTML[1].innerText =puntosComputadora;
        //<img src="assets/cartas/10C.png" alt="" class="carta">
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        
    //Si el jugador saco mas de 21 puntos ya no tiene caso seguir sacando cartas
        if( puntosMinimos > 21){
            break;
        }

    }while( (puntosComputadora < puntosMinimos) &&  (puntosMinimos<= 21));

    //Espera que termine el do-while y despues de un tiempo esto
    setTimeout(() => {
        
        if( puntosComputadora === puntosMinimos){
            alert('Nadie gana :(')
        }else if( puntosMinimos > 21){
            alert('Computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador Gana');
        }else{
            alert('Computadora gana');
        }
    }, 100);
}

//Eventos
btnPedir.addEventListener('click',()=>{

    const carta = pedircarta();
    puntosJugador = puntosJugador + valorCarta(carta);   
    puntosHTML[0].innerText =puntosJugador;
    //<img src="assets/cartas/10C.png" alt="" class="carta">
    const imgCarta = document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled =true;
        btnDetener.disabled=true;
       
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('21, genial');
        btnPedir.disabled =true;
        
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled =true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{
    //Limpiar la mesa de cartas
    divCartasJugador.innerHTML='';
    divCartasComputadora.innerHTML=''; 
    
    //Crear el deck nuevamenet con las 52 cartas
    deck = [];
    crearDeck();
    // resetaer los puntajes a 0
    puntosHTML[0].innerText =0;
    puntosHTML[1].innerText =0;
    puntosJugador=0;
    puntosComputadora=0;
    //Habilitar acciones  pedir carta y detener
    btnPedir.disabled =false;
    btnDetener.disabled=false;
});

