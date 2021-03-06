describe("Clase FireballSpec", function(){

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

it("draw",function(){
		spyOn(SpriteSheet,"draw");
		var FireB = new FireballLeft(5,123);
		FireB.draw()
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("fireball");
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(FireB.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(FireB.y);
	});

it("step",function(){
		var FireB = new FireballLeft(61,120);
		var dt = 0.01;
		FireB.board = {remove: function(){}, collide: function() {}};
		FireB.step(dt);// da error en esta spec
		expect (FireB.x).toBe(45.11); // No sabia igualar con componentes
		expect (FireB.y).toBe(83);

		var FireB2 = new FireballLeft(61,120);
		FireB2.w = -81;
		FireB2.x= 21;
		FireB2.board = {remove: function(){}, collide: function() {}};
		spyOn(FireB2.board,"remove");
		FireB2.step(dt);
		expect(FireB2.board.remove).toHaveBeenCalled();


		

	});


});
