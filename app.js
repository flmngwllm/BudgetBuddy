// Budger controller
var budgetController = (function() {
    

})()

//UI controller
var UIController = (function() {

    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__button'
    }

    return {
        getInput: function(){
            return {
                type : document.querySelector(DOMstring.inputType).value, // will be either inc or exp
                description : document.querySelector(DOMstring.inputDescription).value,
                value : document.querySelector(DOMstring.inputValue).value
            }
        },

        getDOMstrings: function(){
            return DOMstring;
        }

    }

})();


//Main controller
var controller = (function(budgetContr, UIContr) {

    var setupEventListeners = function()  {
        
        var DOM = UIContr.getDOMstrings()

        document.querySelector(DOM.inputBtn).addEventListener('click', contrAddItem);

        // event listener for enter key
        document.addEventListener('keypress', function(event){
        if('keypress' === 13 || event.which === 13) {
        contrAddItem()
        }
    })
}


    var contrAddItem = function(){
        // Get input data
        var input = UIContr.getInput();
        console.log(input);

        // Add item to budget controller

        // Add item to UI

        // Calculate the budget

        // Display budget on the UI
    }

    return {
        init: function() {
            console.log("app started")
            setupEventListeners()
        }
    };
   
})(budgetController, UIController);


controller.init()