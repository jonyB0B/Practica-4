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




});
