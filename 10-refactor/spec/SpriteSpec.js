describe("Clase Sprite", function(){
    // Se deberá mostrar una pantalla de inicio o title screen que muestre
    // el nombre del juego e indicaciones para como comenzar a jugar

    // Estando en la pantalla de inicio, cuando se pulse la tecla
    // espacio comenzara el juego. No comenzara si la tecla espacio
    // estaba pulsada. En ese caso, hay que soltarla y pulsar de
    // nuevo.


    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
	
	oldGame = Game;
    });

    afterEach(function(){
	Game = oldGame;
    }); 


	it("draw", function(){
		spyOn(SpriteSheet,"draw");
		var Esprait = new Sprite();
		Esprait.draw()
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual(Esprait.sprite);
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(Esprait.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(Esprait.y);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(Esprait.frame);

	});

	it("setup", function(){
		var Esprait = new Enemy(5,132);
		spyOn(SpriteSheet,"merge");
		Esprait.setup(Esprait.sprite,{x:100});
		expect(SpriteSheet.merge).toHaveBeenCalled();

	});
});
