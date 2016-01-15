$(document).ready(function(){
  //Initial DOM setup
  var calcContainerEl = document.getElementById('calcContainer');
  var calcDisplayEl = document.getElementById('calcDisplay');
  var buttonContainerEl = document.getElementById('buttonContainer');
  //initial variable setup
  var thisNumber = '';
  var lastNumber = '';
  var numToDisplay = '0';
  var idObjPairs = {};
  var operator;

  //array for building the buttons
  var firstRow =[['on/c','on', '67', 'other'], ['ce', 'ce', '',], ['mrc', 'mrc','', 'other'], ['m+', 'mplus','', 'other'], ['m-', 'mminus','', 'other']];
  var secondRow = [['7', 'seven' ,'55', 'numberInput'], ['8', 'eight','56', 'numberInput'], ['9', 'nine', '57', 'numberInput'], ['&times', 'multiply', '', 'operator'], ['&divide', 'divide', '191', 'operator']];
  var thirdRow = [['4', 'four', '52', 'numberInput'], ['5','five', '53', 'numberInput'],  ['6','six', '54', 'numberInput'], ['-', 'subtract', '189', 'operator'],  ['&#x0221A', 'sqrt', '', 'operator']];
  var fourthRow = [['1','one', '49', 'numberInput'], ['2', 'two', '50', 'numberInput'],  ['3', 'three', '51', 'numberInput'], ['+', 'add', '', 'operator'],  ['%', 'percent', '', 'operator']];
  var fifthRow = [['0', 'zero', '48', 'numberInput'], ['.', 'decimal','190', 'operator'], ['&plusmn', 'plusminus', '', 'operator'], ['=', 'equals', '', 'operator']];
  var buttonList = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];

  //constructor function for the button objects
  function calcButtonConstructor (inputArray, domElToAppendTo){
    this.butText = inputArray[0];
    this.name = inputArray[1];
    this.buttonId = inputArray[1];
    this.keyCode = inputArray[2];
    this.buttonType = inputArray[3];
    this.domElToAppendTo = domElToAppendTo;
    this.renderButton = function (){
      var thisTdEl = document.createElement('td');
      domElToAppendTo.appendChild(thisTdEl);
      thisTdEl.className = this.buttonId;
      var thisButton = document.createElement('button');
      thisButton.className = 'calcButton '+ this.buttonType;
      thisButton.id = this.buttonId;
      thisButton.innerHTML = this.butText;
      thisTdEl.appendChild(thisButton);
    }
  }

  //Build the buttons
  var buttonTableEl = document.createElement('table');
  buttonContainerEl.appendChild(buttonTableEl);
  //iterate through the button rows
  for (var i = 0; i < buttonList.length; i++){
    thisRowArray = buttonList[i];
    thisRowEl = document.createElement('tr');
    calcContainerEl.appendChild(thisRowEl);
    //iterate through the buttons
    for (var j = 0; j < thisRowArray.length; j++ ){
      thisButtonObj = new calcButtonConstructor(thisRowArray[j], thisRowEl);
      if (thisRowArray[j][3] === 'numberInput'){ // if it's a number function,
        thisButtonObj['doButtonAction'] = function(){
          console.log('fuck!');
          // if (operator){
          //   equals();
          // }
          // thisNumber += this.butText;
          // numToDisplay = (+thisNumber).toString();
          // updateDisplay();
        };
      }
      idObjPairs[buttonList[i][j][1]] = thisButtonObj; //slap the button in the caller object
      thisButtonObj.renderButton(); // actually draw the button
    }
  }
  $('.add').attr('rowspan', '2');
  console.dir(idObjPairs);




  //add button methods
  idObjPairs['decimal'].doButtonAction = function(){
    thisNumber += this.butText;
    numToDisplay = (+thisNumber).toString() +'.';
    updateDisplay();
  }
  idObjPairs['on'].doButtonAction = function(){
    thisNumber = '';
    lastNumber = '';
    numToDisplay = '0';
    updateDisplay();
  }


  // idObjPairs['add'].doButtonAction = function(){
  //   console.log('fuckadd');
  //   operator = addTwo;
  //   lastNumber = thisNumber;
  //   thisNumber = '';
  //   numToDisplay = lastNumber;
  //   updateDisplay();
  // }
  // idObjPairs['equals'].doButtonAction = function(){
  //   numToDisplay = equals();
  // }
  // function equals () {
  //   tNumber = operator(lastNumber, thisNumber);
  //   console.log('equals function sets lastNumber to '+ tNumber);
  //   lastNumber = tNumber;
  //   thisNumber = '';
  //   operator = '';
  //   return lastNumber;
  // }


  // idObjPairs['subtract'].doButtonAction = function(){
  //   console.log('fucksubtract');
  //   lastNumber = subtractTwo(lastNumber, thisNumber);
  //   thisNumber = '';
  //   numToDisplay = lastNumber;
  //   updateDisplay();
  // }
  // idObjPairs['multiply'].doButtonAction = function(){
  //   console.log('fuckmultiply');
  //   lastNumber = multiplyTwo(lastNumber, thisNumber);
  //   thisNumber = '';
  //   numToDisplay = lastNumber;
  //   updateDisplay();
  // }
  // idObjPairs['divide'].doButtonAction = function(){
  //   console.log('fuckdivide');
  //   lastNumber = divideTwo(lastNumber, thisNumber);
  //   thisNumber = '';
  //   numToDisplay = lastNumber;
  //   updateDisplay();
  // }
  // idObjPairs['on'].doButtonAction = function(){
  //   updateDisplay();
  // }


  //operator functions
  function addTwo (a, b){
    return +a + +b;
  }
  function subtractTwo (a,b){
    return a - b;
  }
  function multiplyTwo (a,b){
    return a * b;
  }
  function divideTwo (a,b){
    return a / b;
  }

  //build event listeners for keyboard and mouseclicks
  calcContainer.addEventListener('click', function(e){
    onButtonClick(e);
  })
  // document.addEventListener('keydown', function(e){
  //   doButtonAction(e,true);
  // }
  function onButtonClick(e){
    //console.log("the event e is " + e);
    //console.log("the event targets id is " + e.target.id);
    //console.dir(idObjPairs[e.target.id]);
    idObjPairs[e.target.id].doButtonAction();
    //console.log("thisNumber is " + thisNumber);
  }
  function updateDisplay(){
    calcDisplayEl.textContent = numToDisplay;
  }

});
