// (function(){
// })();

const miModulo = (()=>{
    'use strict'   
    
    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];
    
    
    let puntosJugadores=[];//para extenderla a varios jugadores
    //Referencias del HTML
    
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener =document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
    
    // Esta funcion inicializa el 
    //el ultimo jugador es la computadora
    const inicializarJuego = ( numJugadores = 2)=>{
        deck = crearDeck();
        puntosJugadores = [];
        for(let i =0; i< numJugadores; i++){
            puntosJugadores.push(0);
        }
        puntosHTML.forEach( elem =>{
            elem.innerText=0;
        });

        divCartasJugadores.forEach( elem =>{
            elem.innerHTML='';
        });      
       
        //Habilitar acciones  pedir carta y detener
        btnPedir.disabled =false;
        btnDetener.disabled=false;
    }
    
    //esta funcion crea una nueva baraja
    const crearDeck = ()=>{
            deck = [];
            for (let i = 2; i <= 10; i++) {
               
               for (let tipo of tipos) {
                    deck.push( i+ tipo);
               }
            }
    
            for(let tipo of tipos){
                for(let esp of especiales){
                    deck.push( esp + tipo);
                }
            }              
       
          return _.shuffle(deck);
    }

    
    
    //Esta funcion me permite romar una carta
    const pedircarta = ()=>{
    
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }          
        return deck.pop();       
    }
    
    const valorCarta = ( carta)=>{
        const valor = carta.substring(0,carta.length - 1);      
    
        return ( isNaN(valor) ) ?
               ( valor ==='A' ) ? 11 : 10
               : valor * 1; //algo * 1 lo vuelve numero
     
    }
    //Turno 0: primer jugador y el ultimo sera la computadora
    const acumularPuntos = ( carta,turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);   
        puntosHTML[turno].innerText =puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //crea cartas de forma dinamica
    const crearCarta = (carta, turno)=>{
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
       
    }
    const determinarGanador = ()=>{
        //suponiendo que tengo dos jugadores
        const [puntosMinimos,puntosComputadora] = puntosJugadores;//destructuracion de arreglos
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
    //turno computadora    
    const turnoComputadora =( puntosMinimos)=>{
        let puntosComputadora=0;
        do{
            const carta = pedircarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1 );
            
            
        //Si el jugador saco mas de 21 puntos ya no tiene caso seguir sacando cartas
            if( puntosMinimos > 21){
                break;
            }
    
        }while( (puntosComputadora < puntosMinimos) &&  (puntosMinimos<= 21));
    
        //Espera que termine el do-while y despues de un tiempo esto
        determinarGanador();
    }
    
    //Eventos
    btnPedir.addEventListener('click',()=>{
    
        const carta = pedircarta();
       
        const  puntosJugador= acumularPuntos(carta, 0);
        crearCarta(carta, 0 );
       
    
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
        turnoComputadora(puntosJugadores[0]);
    });
    
    btnNuevo.addEventListener('click',()=>{
        inicializarJuego();
       
    });
  //Lo  que retorno es publico , lo demas es privado
    return {
        nuevoJuego: inicializarJuego
    };
})();

