// Budger controller
var budgetController = (function() {
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value; 
    };

    var calculateTotal = function(type){
        var sum = 0
        data.allItems[type].forEach(function(cur){
            sum += cur.value
        })

        data.totals[type] = sum;
    };

// used to store our array of objects and data
 var data = {
    allItems : {
        exp : [],
        inc : []
    },
    totals : {
        exp : 0,
        inc : 0
    },
    budget : 0,
    percentage: -1
};

return{
    addItem: function(type, desc, val){
        var newItem;

        // Create new ID
        if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        // Create new item based on type
        if(type === 'exp'){
            newItem = new Expense(ID, desc, val)

        }else if(type === 'inc'){
            newItem = new Income(ID, desc, val)
        }

        // Push it into array
        data.allItems[type].push(newItem)

        // Return the new item
        return newItem;
    },


    calculateBudget: function() {
        // calculate total income and expenses
        calculateTotal('exp')
        calculateTotal('inc')
        // calculate income - expenses
        data.budget = data.totals.inc - data.totals.exp
        // calculate the percentage of income spent
        if(data.totals.inc > 0){
        data.percentage =  Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
    },

    getBudget: function() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    },

    testing: function(){
        console.log(data)
}

}

})()

//UI controller
var UIController = (function() {

    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__button',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    }

    return {
        getInput: function(){
            return {
                type : document.querySelector(DOMstring.inputType).value, // will be either inc or exp
                description : document.querySelector(DOMstring.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },

        addListItem: function(obj, type){
            var html, newHtml, element;
            // create html string
            if (type === 'inc') {
                element = DOMstring.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
            } else if (type === 'exp')  {
                element = DOMstring.expenseContainer
                html= '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>'
            }
           
           
           // replace text with actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)
            
            // Insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        // clears the field
        eraseField : function(){
            field = document.querySelectorAll(DOMstring.inputDescription + ', ' + 
            DOMstring.inputValue);

            var fieldArray = Array.prototype.slice.call(field)

            fieldArray.forEach(function(current, index, array){
                current.value = ""
            })

            fieldArray[0].focus()

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

    var updateBud = function(){
         // Calculate the budget
         budgetContr.calculateBudget();

         // return the budget
         var budget = budgetContr.getBudget();

        // Display budget on the UI
        console.log(budget)
    }

    var contrAddItem = function(){

        // Get input data
        var input = UIContr.getInput();

        if(input.description != "" && !isNaN(input.value) && input.value > 0){
        // Add item to budget controller
        var newItem = budgetContr.addItem(input.type, input.description, input.value);

        // Add item to UI
        UIContr.addListItem(newItem, input.type)

        // Clear the field
        UIContr.eraseField()

       // Calculate then update the budget
        updateBud()

        }
    }

    return {
        init: function() {
            console.log("app started")
            setupEventListeners()
        }
    };
   
})(budgetController, UIController);


controller.init()