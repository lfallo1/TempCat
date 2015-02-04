define(['Scripts/knockout-2.3.0'],function(knockout){
    describe('Testing the test suite', function(){
        //Exposes ko variable to karma tests. This is a hack and should be fixed. Someone pls convert entire project to CommonJS modules
        ko = knockout;
        if(ko != null){
            console.log('Knockout now loaded');
        }
        it('should expose ko globally', function(){
            expect(ko).not.toEqual(null);
        });
    });
});