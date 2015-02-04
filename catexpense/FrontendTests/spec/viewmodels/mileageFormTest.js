define(['App/viewmodels/mileageForm'], function(mileageForm){
    describe('Mileage Form viewmodel tests', function(){
        it("should have the correct title", function(){
            expect(mileageForm.title).toEqual("Submission");
        });
        it("should have an array of days", function(){
            expect(mileageForm.days.length).toEqual(7);
            for(var i=0; i<7; i++){
                expect(mileageForm.days[i].dayOfWeek).toEqual(i);
            }
        });
    });
});
////