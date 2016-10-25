(function(){

  var matrix = [["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"]];

  onSubmit = function () {

    var name = document.getElementById("teamname").value;
    var data = { "team" : name, "solution" : matrix };
    console.log(name);

    $.post("server.php",
          data,
        function(data){
            alert(data + "\nYour Answer is Submitted");
        });

    document.getElementById("btn").style.visibility="hidden";
    document.getElementById("submit").innerHTML = "<h3>Done!<h3>";
  }

  //each droppable element needs this for its dragover event
  var allowDragover = function (event) {
    //prevent the browser from any default behavior
    event.preventDefault();
  },
  //each dragable element needs this for its dragstart event
  dragStartHandler = function (event) {
    var dragIcon = null;

    //set a reference to the element that is currenly being dragged
    event.originalEvent.dataTransfer.setData("id",event.target.id);
    //console.log("dragged "+event.target.id);
  },
  //each of the four light-brown boxes at top have this bound to their drop event
  dropHandlerSingle = function (event) {
    var id = '';

    //prevent the browser from any default behavior
    event.preventDefault();

    //only allow one child element at a time
    if($(this).children().length){return;}

    //get a reference to the element that is being dropped
    id = event.originalEvent.dataTransfer.getData("id");
    
    //add the hasChild class so that the UI can update
    $(event.target).addClass('hasChild');

    //trigger the custom event so that we can update the UI
    $(document).trigger('custom:dropEvent');

    //move the dragged element into the drop target
    event.target.appendChild(document.getElementById(id));
    //console.log("dropped "+id+" at "+event.target.id);
    
    var index = parseInt(event.target.id.substring(1));
    //console.log(event.target.id);
    matrixModify(Math.floor(index/10),index%10,id);
    
  }

  matrixModify = function (row,column,id) {
    for (var i = 0; i < 4; i++) 
    {
      for (var j = 0; j < 4; j++) 
      {
        if(matrix[i][j]==id)
          matrix[i][j]="0";
      }  
    }
    if(row==4&&column==4)
        return;
    matrix[row][column]=id;
    //console.log(matrix);
  }

  $(document).ready(function(){
    //cache a reference to all four blue draggable boxes
    var $dragElements = $('.dragElement');

    //make each dragElement draggable
    $dragElements.attr('draggable','true');

    //bind the dragStartHandler function to all dragElements
    $dragElements.bind('dragstart',dragStartHandler);

    //bind the dropHandlerSingle function to all of the droppable elements (omit the original container)
    $('.droppable').not('.multipleChildren').bind('drop',dropHandlerSingle);
      

    //after something is dropped
    $(document).on('custom:dropEvent',function(){
      //make sure the DOM has been updated
      setTimeout(function(){
        //check each droppable element to see if it has a child
        $('.droppable').each(function(){
          //if this element has no children
          if (!$(this).children().length){
            //remove the hasChild class
            $(this).removeClass('hasChild');
          }
        });
      },50);
    });

    //bind the appropriate handlers for the dragover, dragenter and dragleave events
    $('.droppable').bind({
      dragover: allowDragover,
      dragenter: function() {
        $(this).addClass('dragEnter');
      },
      dragleave: function() {
        $(this).removeClass('dragEnter');
      }
    });
  })
})();