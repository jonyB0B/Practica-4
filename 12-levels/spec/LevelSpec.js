
/*

  Requisitos:

    El objetivo de este prototipo es a�adir niveles al juego. En cada
    nivel deber�n ir apareciendo bater�as de enemigos seg�n avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificaci�n:

    El constructor Level() recibir� como argumentos la definici�n del
    nivel y la funci�n callback a la que llamar cuando termine el
    nivel.

    La definici�n del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los par�metros de cada bater�a de enemigos son estos:
           Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
 Ejemplo:
         [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al m�todo step() del nivel �ste comprobar�:

      - si ha llegado ya el momento de a�adir nuevos sprites de alguna
        de las bater�as de enemigos.
    
      - si hay que eliminar alguna bater�a del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan bater�as de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/

describe("LevelSpec", function() {
        
	var canvas, ctx;

   	beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

	oldGame = Game;
	SpriteSheet.load (sprites,function(){});
    });

    afterEach(function(){
        Game = oldGame;
    });
        
        
it("Generar nivel", function(){
		var callback = function() {};
		var level = [
  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
	[ 0,        4000,  200,         'serpient'                 ],
    [ 0,        4000,  500,         'step'                 ],
    [ 6000,     13000, 800,         'ltr'                  ],
    [ 10000,    16000, 400,         'circle'               ],
    [ 22000,    25000, 400,         'wiggle',   { x: 150 } ],
    [ 22000,    25000, 400,         'wiggle',   { x: 100 } ]
];
        	var nivel = new Level(level, callback);
        	expect(nivel.callback).toBe(callback);
        	expect(nivel.levelData.length).toBe(level.length);
        	expect(nivel).toBeDefined();
        });

it("Level step", function(){

	var callback = function() {};
	var level = [
	  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
		[ 0, 4000, 500, 'step' ],
		[ 6000, 13000, 800, 'ltr' ],
		[ 10000, 16000, 400, 'circle' ],
		[ 17800, 20000, 500, 'straight', { x: 50 } ],
		[ 18200, 20000, 500, 'straight', { x: 90 } ],
		[ 18200, 20000, 500, 'straight', { x: 10 } ],
		[ 22000, 25000, 400, 'wiggle', { x: 150 } ],
		[ 22000, 25000, 400, 'wiggle', { x: 100 } ]
			];
	var nivel = new Level(level, callback);
	var board = new GameBoard();
	board.add(nivel);
	var dt = 1;
	spyOn(nivel.board, "add");
	spyOn(nivel, "callback");
            
        nivel.step(dt);
   	// Actualizamos el tiempo que ha pasado 
	expect(nivel.t).toBe(dt*1000);
	expect(nivel.levelData.length).toBe(level.length);
	expect(nivel.callback).not.toHaveBeenCalled();                       

	//comprobamos si pasando el tiempo el nivel cambia 
	nivel.board.add.reset();
	nivel.t = 11000;
	nivel.step(dt);
	expect(nivel.t).toBe(11000 + dt*1000);
	expect(nivel.levelData.length).toBe(level.length-1);
	expect(nivel.callback).not.toHaveBeenCalled();

        });  
        
});

