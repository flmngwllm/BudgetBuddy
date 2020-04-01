
var budgetController = (function() {
    

})()


var UIController = (function() {

})();



var controller = (function(budgetContr, UIContr) {

    var contrAddItem = function(){
        // Get input data

        // Add item to budget controller

        // Add item to UI

        // Calculate the budget

        // Display budget on the UI
    }

document.querySelector(".add__button").addEventListener('click', contrAddItem)


// event listener for enter key
document.addEventListener('keypress', function(event){
    if('keypress' === 13 || event.which === 13) {
        contrAddItem()
    }
})
   
})(budgetController, UIController);