$(document).ready(function(){

  var firstRow =[['on/c','on'], ['ce', 'ce'], ['mrc', 'mrc'], ['m+', 'mplus'], ['m-', 'mminus']];
  var secondRow = [['7', 'seven'], ['8', 'eight'], ['9', 'nine'], ['&times', 'multiply'], ['&divide', 'divide']];
  var thirdRow = [['4', 'four'], ['5', 'five'],  ['6', 'six'], ['-', 'subract'],  ['&radic', 'sqrt']];
  var fourthRow = [['1', 'one'], ['2', 'two'],  ['3', 'three'], ['+', 'add'],  ['%', 'percent']];
  var fifthRow = [['0','zero'], ['.', 'decimal'], ['&plusmn', 'plusminus'], ['=', 'equals']];
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
        thisButton.id = thisRow[j][1];
        thisButton.innerHTML = thisRow[j][0];
        thisRowEl.appendChild(thisButton);
      }
      $('.add').attr('rowspan','2');
    }
  }
  setup();

  function getEventTarget(e){
    console.dir(e);
    console.log(e.target);
    return e.target;
  }

  var calcContainer = document.getElementById('calcContainer');
  calcContainer.addEventListener('click', function(e){
    getEventTarget(e);
  })



});
