
$(document).ready(function(){
  //Initial DOM setup
  var calcContainerEl = document.getElementById('calcContainer');
  var calcDisplayEl = document.getElementById('calcDisplay');
  var buttonContainerEl = document.getElementById('buttonContainer');
  
  //initial variable setup
  var thisNumber = '0';
  var lastNumber = '0';
  var idObjPairs = {}; //this is what we will call to find the objects by name later on
  var operator = addTwo;
  var operatorFlag = false;
  var equalsFlag = false;
  var decimalFlag = false;
  var memory = '';
  var histString = '';
  var thisNumberLength = 0;
  
  
  // button information
  var firstRow    = [
    ['on/c','on', '67', 'other'], 
    ['ce', 'ce', '',], 
    ['mrc', 'mrc','', 'other'], 
    ['m+', 'mplus','', 'other'], 
    ['m-', 'mminus', '', 'other']
  ];
  var secondRow   = [
    ['7', 'seven' ,'55', 'numberInput'], 
    ['8', 'eight','56', 'numberInput'], 
    ['9', 'nine', '57', 'numberInput'], 
    ['&times', 'multiply', '', 'operator'], 
    ['&divide', 'divide', '191', 'operator']
  ];
  var thirdRow    = [
    ['4', 'four', '52', 'numberInput'], 
    ['5','five', '53', 'numberInput'],  
    ['6','six', '54', 'numberInput'], 
    ['-', 'subtract', '189', 'operator'],  
    ['&#x0221A', 'sqrt', '', 'operator']
  ];
  var fourthRow   = [
    ['1','one', '49', 'numberInput'], 
    ['2', 'two', '50', 'numberInput'],  
    ['3', 'three', '51', 'numberInput'], 
    ['+', 'add', '', 'operator'],  
    ['%', 'percent', '', 'operator']
  ];
  var fifthRow    = [
    ['0', 'zero', '48', 'numberInput'], 
    ['.', 'decimal','190', 'operator'], 
    ['&plusmn', 'plusminus', '', 'operator'], 
    ['=', 'equals', '', 'operator']
  ];
  var buttonList  = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];
  
  // constructor function for the button objects
  function calcButtonConstructor (inputArray, domElToAppendTo){
    this.butText          = inputArray[0];
    this.name             = inputArray[1];
    this.buttonId         = inputArray[1];
    this.keyCode          = inputArray[2];
    this.buttonType       = inputArray[3];
    this.doButtonAction   = null;
    this.domElToAppendTo  = domElToAppendTo;
    this.renderButton     = function (){ //obsolete?
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
      thisButtonObj['doButtonAction'] = numButton;
    }
    idObjPairs[buttonList[i][j][1]] = thisButtonObj; //slap the button in the caller object
    // thisButtonObj.renderButton(); // actually draw the button
  }
}
$('.add').attr('rowspan', '2');
console.dir(idObjPairs);




//attached to all number buttons 
function numButton(){ //need to add functionality to handle zero?
  if (operatorFlag){
    lastNumber = thisNumber;
    thisNumber = '';
    operatorFlag = false;
    thisNumberLength = 0;
  }
  if (equalsFlag){
    thisNumber = '0';
    thisNumberLength = 0;
  }
  if (thisNumberLength < 10){
    thisNumberLength++;
    if(thisNumber === '0'){
      thisNumber = (+this.butText).toString();
    } else {
      thisNumber += (+this.butText).toString();
    }
    // thisNumber =  (+(thisNumber + (+this.butText).toString())).toString();
    updateDisplay();
  }
};

idObjPairs['decimal'].doButtonAction = function(){
  
  if (!decimalFlag){
    thisNumber += this.butText;
    decimalFlag = true;
    updateDisplay();
    console.log('insideidObjPairs, decimalFlag is ' + decimalFlag);
  }
}
idObjPairs['on'].doButtonAction = function(){
  thisNumber = '0';
  lastNumber = '0';
  operatorFlag = false;
  equalsFlag = false;
  decimalFlag = false;
  updateDisplay('clear');
}
idObjPairs['ce'].doButtonAction = function(){
  thisNumber = '0';
  updateDisplay();
}
idObjPairs['mrc'].doButtonAction = function(){
  equalsFlag = true;
  thisNumber = memory;
  updateDisplay();
}
idObjPairs['mplus'].doButtonAction = function(){
  equals();
  equalsFlag = true;
  memory = (+memory + +thisNumber).toString();
  console.log(memory + ' is in memory.')
}
idObjPairs['mminus'].doButtonAction = function(){
  equals();
  equalsFlag = true;
  memory = (+memory - +thisNumber).toString();
  console.log(memory + 'is in to memory.')
}
idObjPairs['plusminus'].doButtonAction = function(){
  thisNumber = (+thisNumber * -1).toString();
  updateDisplay();
}


idObjPairs['add'].doButtonAction = function(){
  equals();
  operatorFlag = true;
  equalsFlag=false;
  operator = addTwo;
}
idObjPairs['subtract'].doButtonAction = function(){
  equals();
  operatorFlag = true;
  equalsFlag=false;
  operator = subtractTwo;
}
idObjPairs['multiply'].doButtonAction = function(){
  equals();
  operatorFlag = true;
  equalsFlag=false;
  operator = multiplyTwo;
}
idObjPairs['divide'].doButtonAction = function(){
  equals();
  operatorFlag = true;
  equalsFlag=false;
  operator = divideTwo;
}
idObjPairs['sqrt'].doButtonAction = function(){
  equalsFlag=true;
  equals();
  operator = squareRoot;
  equals();
}
idObjPairs['percent'].doButtonAction = function(){
  equalsFlag = true;
  if (operator === divideTwo){
    equals();
    thisNumber = (+thisNumber*100).toString();
    updateDisplay();
  } else if (operator === multiplyTwo){
    equals();
    thisNumber = (+thisNumber/100).toString();
    updateDisplay();
  } else {
    thisNumber =  (+lastNumber * +thisNumber/100).toString();
    equals();
    updateDisplay();
  }
}

idObjPairs['equals'].doButtonAction = function(){
  equals();
  equalsFlag = true;
}
function equals(){
  thisNumber = operator(lastNumber, thisNumber);
  if (Math.floor(+thisNumber) === +thisNumber){
    decimalFlag = false;
  }
  lastNumber = '0';
  operator = addTwo;
  updateDisplay(' = ' + thisNumber);
}


//operator functions
function addTwo (a, b){
  return (+a + +b).toString();
}
function subtractTwo (a,b){
  return (a - b).toString();
}
function multiplyTwo (a,b){
  return (a * b).toString();
}
function divideTwo (a,b){
  return (a / b).toString();
}
function squareRoot (a,b){
  return (Math.sqrt(b)).toString();
}






function updateDisplay(entry){ //draws the content to the display window
  calcDisplayEl.textContent = thisNumber;
  drawToDisplay();
}
function clearDisplay(){ //redraws the display window
  $('.displayDigit').css('background-position', '50px 0px');
}

//this takes the current number and adjusts the background positions of the digit spritesheets accordingly
function drawToDisplay(){ 
  console.log('_______________________________');
  console.log('thisNumber is ' + thisNumber);
  console.log('thisNumber is of type ' + typeof(thisNumber));
  if (! +thisNumber){
    clearDisplay();
  }
  var numArray = thisNumber.split('');
  var negFlag = false;
  if (+thisNumber < 0){
    console.log('was a negative number');
    negFlag = true;
    numArray.shift();
  }
  var length = numArray.length;
  var decimalPosition = 0;
  if (decimalFlag){
    length -= 1;
    decimalPosition = numArray.join('').indexOf('.');
    numArray.splice(decimalPosition, 1);
  }
  for (var i = 0; i < length; i++){
    $('#digit' + i).css('background-position', function(){
      var position = 0;
      var thisNo = Number(numArray[length - 1 - i]);
      if (thisNo){
        position = (thisNo - 1) * -54;
      } else if (thisNo === 0){
        position = -486;
      } else {
        console.log('Error in recognizing number in drawToDisplay');
      }
      if(decimalPosition !== -1){
        if (decimalPosition === length - i){
          position -= 27;
        }
      }
      return position + 'px 0px';
    });
  }
  for (var i = length; i < 10; i++){
    $('#digit' + i).css('background-position', '50px 0px');
  }
}


function drawInitialDisplay(){
  $imageCalcDisplayContainer = $('#imageCalcDisplayContainer');
  for (var i = 0; i < 9; i++){
    $imageCalcDisplayContainer.append('<div class="displayDigit" id="digit' + i +'"></div>');
    $('#digit' + i).css('left', function(){
      return (202 - 25*i).toString() + 'px';
    });
  }
}
drawInitialDisplay();


//set up event listeners
$('.buttonSpriteHolder').on('mousedown', function(event){
  idObjPairs[event.target.id].doButtonAction();
  var $eventTargetId = $('#' + event.target.id);
  $eventTargetId.removeClass('unclicked');
  $eventTargetId.css('top', '+=1');
  $eventTargetId.css('background-position', function(){
    var backgndPos = $eventTargetId.css('background-position').split(' ');
    backgndPos[0] = Number(backgndPos[0].replace('px', ''));
    backgndPos[0] -=47;
    backgndPos = backgndPos[0]+ 'px ' + backgndPos[1];
    return backgndPos;
  });
  $(window).one('mouseup', function(){
    $eventTargetId.addClass('unclicked');
    $eventTargetId.css('top', '-=1');
    $eventTargetId.css('background-position', function(){
      var backgndPos = $eventTargetId.css('background-position').split(' ');
      backgndPos[0] = Number(backgndPos[0].replace('px', ''));
      backgndPos[0] +=47;
      backgndPos = backgndPos[0]+ 'px ' + backgndPos[1];
      return backgndPos;
    });
  })
});

updateDisplay();
});



//if first number entered = 0, can display 00005 which is dumb
//need to fix leading zeros
//weird error when trying to multiply numbers, 560000.233 * 3, 3 doesn't show up, doesn't happen without the decimal
//update conditions at beginning of decimal
//fix clear display conditions -- not sure what this means anymore, might have been solved
//prevent repeating operator flags when you press 1 +-x/ 2
//fix order of operations with negative and decimals, that really got fucked up
//add maximum number of digits










//build tickerTape
//build error, memory, minus flags
//make it possible to type with keyboard

//build app more ways -- strings, arrays
