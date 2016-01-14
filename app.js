$(document).ready(function(){
  var thisNumber = '';
  var lastNumber = '';
  var operation;
  var calcDisplay = document.getElementById('calcDisplay');


  //build the calculator
  var firstRow =[['on/c','on'], ['ce', 'ce'], ['mrc', 'mrc'], ['m+', 'mplus'], ['m-', 'mminus']];
  var secondRow = [['7', '55'], ['8', '56'], ['9', '57'], ['&times', 'multiply'], ['&divide', 'divide']];
  var thirdRow = [['4', '52'], ['5', '53'],  ['6', '54'], ['-', 'subract'],  ['&#x0221A', 'sqrt']];
  var fourthRow = [['1', '49'], ['2', '50'],  ['3', '51'], ['+', 'add'],  ['%', 'percent']];
  var fifthRow = [['0','48'], ['.', 'decimal'], ['&plusmn', 'plusminus'], ['=', 'equals']];
  var buttonList = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];
  function setup(){
    //build the table for the buttons
    var buttonContainer = document.getElementById('buttonContainer');
    var buttonTable = document.createElement('table');
    buttonContainer.appendChild(buttonTable);

    //iterate through button rows
    for (var i = 0; i < buttonList.length; i++){
      var buttonRow = document.createElement('tr');
      buttonTable.appendChild(buttonRow);
      var thisRow = buttonList[i];
      //iterate through button columns
      //second element in each button is id of button, class of containing td
      for (var j = 0; j < thisRow.length; j++){
        var thisRowEl = document.createElement('td');
        thisRowEl.className = thisRow[j][1];
        buttonRow.appendChild(thisRowEl);
        var thisButton = document.createElement('button');
        thisButton.className = 'button';
        thisButton.id = thisRow[j][1];
        thisButton.innerHTML = thisRow[j][0];
        thisRowEl.appendChild(thisButton);
      }
      $('.add').attr('rowspan','2');
    }
  }
  setup();


  //build event listeners for keyboard and mouseclicks
  var calcContainer = document.getElementById('calcContainer');
  calcContainer.addEventListener('click', function(e){
    doButtonAction(e, false);
  })
  document.addEventListener('keydown', function(e){
    doButtonAction(e,true);
  })

  //functions for key functionality
  function doButtonAction(e, inputType){
    if (inputType){
      var keycodeId = e.keyCode;
      console.dir(e);
    } else {
      var keycodeId = e.target.id;
    }
    var shiftFlag = e.shiftKey;
    console.log('Shift was pressed: ' + shiftFlag);

    console.log('keycodeId is ' + keycodeId);
    //if a number key was pressed of if a number button was pushed
    //use switch? probably faster, more elegant
    switch (keycodeId){
      case 67:
        keycodeId='on';
        break;
      case 187:
        if (shiftFlag){
          keycodeId = 'plus';
        } else {
          keycodeId = 'equals';
        }
        break;
      case 189:
        keycodeId = 'subtract';
        break;
      case 56:
        if (shiftFlag){
          keycodeId = 'multiply';
        }
        break;
      case 191:
          keycodeId = 'divide';
          break;
    }


    if (Number(keycodeId) && Number(keycodeId) < 58 && Number(keycodeId) > 48){
      thisNumber += String.fromCharCode(keycodeId);
    }
    //on clear
    if (keycodeId === 'on'){
      thisNumber = '';
      lastNumber = '';
    }
    //on plus this doesn't work right now
    if (keycodeId === 'plus'){
      lastNumber = thisNumber;
    }

    //update display at finish
    calcDisplay.textContent = thisNumber;
  }

});
