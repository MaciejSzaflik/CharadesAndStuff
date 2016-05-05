var numberOfRows = 8;
var checkers = null;
var checkersLogic = null;
var gameHistory = [];
var gameIdVal = "";
function initializeBoard(initGameID){

  gameIdVal = initGameID;
  var val = JSON.stringify({"gameIdInfo" : gameIdVal});
  sendSomething(
    "POST",
    "/initCheckersGame",
    val,
    function(data){createCheckers(data);},
    function(request,error) {console.log(error);});

  canvas = document.getElementById('checkers');
  ctx = canvas.getContext('2d');


}


function parseBoardState(data)
{
  var parsed = JSON.parse("[" + data + "]")
  return parsed[0];
}

function createCheckers(data)
{
  data = JSON.parse(data);
  boardState = parseBoardState(data["gameState"]);

  canvas = document.getElementById('checkers');

  var parent = document.getElementById("canvasParent");
  canvas.width = 600;
  canvas.height = 600;
  checkers = new CheckerBoard("aaa",parent.offsetWidth / numberOfRows,ctx);
  checkersLogic = new CheckerLogicKeeper();
  state = boardState;
  checkers.setState(state);
  checkers.onMovePerfomed = addStringInHistoryDiv;
  redraw();
  redrawPieces(-100,-100);

  canvas.addEventListener('click', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  ctx = canvas.getContext('2d');

  var val = JSON.stringify({"gameIdInfo" : gameIdVal});
  window.setInterval(function(){
    sendSomething(
      "POST",
      "/getGameState",
      val,
      function(data){
        data = JSON.parse(data);
        boardState = parseBoardState(data["gameState"]);
        checkers.setState(boardState);
      },
      function(request,error) {console.log(error);});
  }, 200);

}

function sendSomething(type,where,what,onSuccess,onError)
{
  $.ajax({
    type :  type,
    contentType : "application/json",
    dataType:  "text",
    data: what,
    url  :  where,
    success: function(data)
    {
      onSuccess(data);
    },
    error: onError
  });
}

function addStringInHistoryDiv(move)
{
  gameHistory.push( "Client: " + JSON.stringify(move));
  sendSomething("POST","/move",
    JSON.stringify({"gameIdInfo" : gameIdVal ,"move" : move}),
    function(data){
      //data = JSON.parse(data);
      //gameHistory.push("Server: " + JSON.stringify(move));
      refreshGameHistory();
    },
    function(request,error) {
      console.log(error);
    });
}
function refreshGameHistory()
{
  document.getElementById('history').innerHTML = "Game Log:";
  for(var i = 0; i<gameHistory.length;i++)
  {
    document.getElementById('history').innerHTML += '<br>'+ gameHistory[i];
  }
}


function handleMouseDown(e) {

  if(checkers==null)
    return;

  var element = document.getElementById('checkers');
  var offsets = element.getBoundingClientRect();
  mouseX = parseInt(e.clientX) - offsets.left;
  mouseY = parseInt(e.clientY) - offsets.top;


  var clicked = null;
  for (var i = 0; i < checkers.pieces.length; i++) {
    if (checkers.pieces[i].isPointInside(mouseX, mouseY)) {
      clicked = checkers.pieces[i];
    }
  }
  if (clicked != null) {
	
	if(checkers.canIMoveThis(clicked))
	{
		result = checkersLogic.generateMoveListForChecker(clicked.logicX,clicked.logicY,checkers.state);
		var fullmoveList = checkersLogic.generateMoveListFull(checkers.whosTurnIsIt,checkers.state);
		result = filterNotContainingItems(result,fullmoveList);
		checkers.highlights = result;
		checkers.selectPiece = clicked;
		redraw(mouseX,mouseY);
	}
    
  }
  else
  {
    logicP = checkers.getLogicPoint(mouseX,mouseY);
    checkers.tryToPerformMove(logicP["x"],logicP["y"]);
    redraw(mouseX,mouseY);
  }
}

function filterNotContainingItems(toCheck,container) {
	var toReturn = [];
	for(var  i = 0;i<toCheck.length;i++)
	{
		for(var  j = 0;j<container.length;j++)
		{
			if(compareMoves(toCheck[i],container[j]))
			{
				toReturn.push(toCheck[i]);
				continue;
			}
		}
	}
	return toReturn;
}

function compareMoves(m1,m2) {
		return m1["x"] == m2["x"] && m1["y"] == m2["y"] && m1["t"] == m2["t"] && m1["xs"] == m2["xs"] && m1["ys"] == m2["ys"] && m1["fx"] == m2["fx"]  && m1["fy"] == m2["fy"]  && m1["p"] == m2["p"];
}


function handleMouseMove(e) {

  if(checkers==null)
    return;

  var element = document.getElementById('checkers');
  var offsets = element.getBoundingClientRect();
  mouseX = parseInt(e.clientX) - offsets.left;
  mouseY = parseInt(e.clientY) - offsets.top;

  redraw(mouseX,mouseY);
}
function redraw(mouseX,mouseY)
{
  redrawBoard(mouseX,mouseY);
  redrawPieces(mouseX,mouseY);
  redrawHighlights()
}
function redrawBoard()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  checkers.drawBoard( canvas.width / numberOfRows);
}
function redrawPieces(mouseX,mouseY)
{
  checkers.drawCurrent(mouseX,mouseY);
}
function redrawHighlights()
{
  checkers.drawHighLights();
}
function drawBoard(){

}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function CheckerBoard (type,sizeOfBlock,ctxVal) {
  this.type = type;
  this.size = sizeOfBlock;

  this.colorDark = "#000000";
  this.colorLight = "#FFFFFF";

  this.highlightColor = 'rgba(225,60,60,0.7)';

  this.colorDarkPiece = "#080900";
  this.colorLightPiece = "#FCCAF0";

  this.numberOfRows = 8;
  this.numberOfColumns =8;
  this.ctx = ctxVal;
  this.pieces = [];
  this.state = null;
  this.pieces = null;
  this.highlights = null;
  this.selectPiece = null;
  this.onMovePerfomed = null;
  
  this.whosTurnIsIt = "white";
  this.lastCheckerMoved = null;

  this.getInfo = function() {

  };
  
  this.canIMoveThis = function(clicked)
  {
	  if(this.lastCheckerMoved == null)
		  return true;
	  return (clicked.logicX == this.lastCheckerMoved["x"] && clicked.logicY == this.lastCheckerMoved["y"]);  
  }

  this.clicked = function(piece,moves)
  {
    this.selectPiece = piece;
    this.highlights = move;
  }

  this.tryToPerformMove = function(x,y)
  {
    var move = null;
    if(this.selectPiece== null)
      return;
    for(var i = 0;i<this.highlights.length;i++)
    {
      if(this.highlights[i]["x"] == x && this.highlights[i]["y"] == y)
      {
        move = this.highlights[i];
        break;
      }
    }
    if(move == null)
    {
      this.clearHighlights();
      return;
    }
    else
    {
      if(this.performMove(move) && this.onMovePerfomed!=null)
		this.onMovePerfomed(move);
    }
  }
  
  this.checkTurn = function(move)
  {
		var white = this.isThisWhitePiece(move["fx"],move["fy"]) && this.whosTurnIsIt == "white";
		var black = this.isThisBlackPiece(move["fx"],move["fy"]) && this.whosTurnIsIt == "black";
		return white || black;
  }

  this.performMove = function(move)
  {
	if(!this.checkTurn(move))
	{
		alert("bad turn!!!");
		this.setState(this.state);
		this.clearHighlights();
		return false;
	}
	
	this.lastCheckerMoved = null;
    if(move["t"] == "m")
    {
      this.state[this.selectPiece.logicX][this.selectPiece.logicY] = 0;
      this.state[move["x"]][move["y"]] = this.selectPiece.type;
    }
    else if(move["t"] == "s")
    {
      this.state[this.selectPiece.logicX][this.selectPiece.logicY] = 0;
      this.state[move["x"]][move["y"]] = this.selectPiece.type
      this.state[move["xs"]][move["ys"]] = 0;
    }
	
	if(this.selectPiece.type == 1 && move["x"] == this.numberOfColumns-1)
	{
		this.state[move["x"]][move["y"]]  =  move["p"]  = 3;
		console.log("crowning");
	}
	
	if(this.selectPiece.type == 2 && move["x"] == 0)
	{
		this.state[move["x"]][move["y"]]  = move["p"]  = 4;
		console.log("crowning");
	}
	
	this.lastCheckerMoved = move["t"] == "m'"? null :{"x":move["x"], "y":move["y"], "p":this.whosTurnIsIt};
	this.setState(this.state);
    this.clearHighlights();
	
	if(!checkersLogic.canThisCheckerStrike(move["x"],move["y"],this.state) || move["t"] == "m")
	{
		
		this.lastCheckerMoved = null;
		this.whosTurnIsIt = this.whosTurnIsIt == "black"? "white" : "black";
		console.log("now turn : "+ this.whosTurnIsIt);
	}
	
	
    return true;
  }
  
  this.isThisWhitePiece = function(x,y)
  {
	  return this.state[x][y] == 1 || this.state[x][y] == 3;
  }
   this.isThisBlackPiece = function(x,y)
  {
	  return this.state[x][y] == 2 || this.state[x][y] == 4;
  }


  this.clearHighlights = function()
  {
    this.highlights = null;
    this.selectPiece = null;
  }

  this.setState = function(state)
  {
    this.pieces = [];
    this.state = state;
    for(var i = 0;i<this.numberOfRows;i++)
    {
      for(var j = 0;j<this.numberOfRows;j++)
      {
        if(!this.state[i][j] == 0)
          this.pieces.push(new CheckersPiece(
            this.state[i][j],
            this.state[i][j]+"."+i+"."+j,
            i,
            j,
            this.size,
            this.size*0.30,
            (this.state[i][j] == 1 || this.state[i][j] == 3)?this.colorLightPiece:this.colorDarkPiece, (this.state[i][j] == 1 || this.state[i][j] == 3)?this.colorDarkPiece:this.colorLightPiece, 5));
      }
    }
  }
  this.getLogicPoint = function(rawX,rawY)
  {
    var x = Math.ceil(rawX/this.size);
    var y = Math.ceil(rawY/this.size);
    return {"x":--x,"y":--y};
  }


  this.drawCurrent = function(mouseX, mouseY) {
    for (var i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].isPointInside(mouseX, mouseY)) {
        this.pieces[i].highlight();
      } else {
        this.pieces[i].redraw();
      }
    }
  };

  this.drawBoard = function(blockSize) {

    this.size = blockSize;
    for(var i = 0; i < this.numberOfRows; i++)
    {
      this.drawRow(i);
    }

    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(0, 0, 8 * this.size, 8 * this.size);
  }
  this.drawRow = function (rowIndex)
  {
    for(var j = 0; j < this.numberOfColumns; j++)
    {
      this.drawBlock(rowIndex, j);
    }
  }

  this.drawHighLights = function (array)
  {
    if(array!=null)
      this.highlight = array;
    if(this.highlights==null)
      return;
    for(var i = 0;i<this.highlights.length;i++)
      this.drawHighLight(this.highlights[i]["x"],this.highlights[i]["y"]);
  }

  this.drawHighLight = function (rowIndex, columnIndex)
  {
    this.ctx.fillStyle = this.highlightColor;
    this.ctx.fillRect(rowIndex * this.size, columnIndex * this.size, this.size, this.size);
    this.ctx.stroke();
  }

  this.drawBlock = function (rowIndex, columnIndex)
  {
    this.ctx.fillStyle = this.getBlockColor(rowIndex, columnIndex);
    this.ctx.fillRect(rowIndex * this.size, columnIndex * this.size, this.size, this.size);
    this.ctx.stroke();
  }
  this.getBlockColor = function (rowIndex, columnIndex)
  {
    if(rowIndex % 2)
      return (columnIndex % 2?this.colorDark:this.colorLight);
    else
      return (columnIndex % 2?this.colorLight:this.colorDark);
  }
}


function CheckersPiece(type, id, logicX, logicY, sizeOfBlock, size, fill, stroke, strokewidth) {
  this.x = logicX*sizeOfBlock + sizeOfBlock*0.5;
  this.y = logicY*sizeOfBlock + sizeOfBlock*0.5;
  this.logicX = logicX;
  this.logicY = logicY;
  this.id = id;
  this.size = size;
  this.fill = fill || "gray";
  this.stroke = stroke || "red";
  this.strokewidth = strokewidth || 1;
  this.sizeOfBlock = sizeOfBlock;
  this.type = type;

  this.redraw = function (x, y) {
	this.type = checkers.state[this.logicX][this.logicY];	
    this.x = x || this.x
    this.y = y || this.y;
    this.draw(this.stroke);
    return (this);
  }

  this.highlight = function (x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.draw("skyblue");
    return (this);
  }

  this.calculateX = function()
  {
    this.x = this.logicX*this.sizeOfBlock + this.sizeOfBlock*0.5;
    return this.x;
  }
  this.calculateY = function()
  {
    this.y = this.logicY*this.sizeOfBlock + this.sizeOfBlock*0.5;
    return this.y;
  }

  this.draw = function (stroke) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = this.strokewidth;
    ctx.arc( this.calculateX(), this.calculateY() , this.size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
	if(this.type == 3 || this.type == 4)
	{
		ctx.arc( this.calculateX(), this.calculateY(), this.size*0.5, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.stroke();
	}
	
    ctx.restore();
  }

  this.isPointInside = function (x, y) {
    return (x >= this.x -this.size && x <= this.x + this.size && y >= this.y - this.size && y <= this.y + this.size);
  }
}

function CheckerLogicKeeper()
{
  this.generateMoveListForChecker = function(x,y,currentState) {
    switch(currentState[x][y])
    {
      case 0:
        return null;
      case 1:
        return this.generateWhiteSimpleMove(x,y,currentState);
      case 2:
        return this.generateBlackSimpleMove(x,y,currentState);
      case 3:
        return this.generateKingMove(x,y,currentState);
      case 4:
        return this.generateKingMove(x,y,currentState);

    }
  }
  
  this.canThisCheckerStrike = function(x,y,currentState)
  {
	var list = this.generateMoveListForChecker(x,y,currentState);
	if(list == null)
		return false;
	
	for(var i = 0;i<list.length;i++)
	{
		if(list[i]["t"] == "s")
			return true;
	}
	return false;
  }
  
  this.generateMoveListFull = function(player,currentState)
  {
	  var moveList = [];
	  var normalChecker = player == "white"?1:2;
	  var specialChecker = player == "white"?3:4;
	  
	  var wasStrike = false;
	  for(var i = 0;i<currentState.length;i++)
	  {
		  for(var j= 0;j<currentState.length;j++)
		  {
			  if(currentState[i][j] == normalChecker || currentState[i][j] == specialChecker)
			  {
				  var list = this.generateMoveListForChecker(i,j,currentState);
				  if(list == null)
					  continue;
				  
				  for(var k = 0;k<list.length;k++)
				  {
					  if(list[k]["t"] == "s")
							wasStrike = true;
						moveList.push(list[k]);
				  }
			  }
		  }
	  }
	  if(wasStrike)
		  return moveList.filter(function (move) {return move["t"] == "s"});
	  return moveList;
  }
  

  this.generateBlackSimpleMove = function(x,y,currentState) {
    var list = [];
	var strikes = []
    if(this.getFromArray(x-1,y+1,currentState) == 0)
      list.push(this.moveDefinition(x-1,y+1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
    if(this.getFromArray(x-1,y-1,currentState) == 0)
      list.push(this.moveDefinition(x-1,y-1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
	strikes = this.checkStrike(x,y,currentState,1);
    
    return  strikes.length == 0? list : strikes;
  }
  
  
  this.generateKingMove = function(x,y,currentState) {
    var list = [];
	var strikes = []
	list = this.generateKingsMove(x,y,currentState)
	strikes = this.generateKingsStrikes(x,y,currentState);
    return  strikes.length == 0? list : strikes;
  }
  
  this.generateKingsMove = function(x,y,currentState)
  {
	  var list = [];
	  if(this.getFromArray(x-1,y+1,currentState) == 0)
		list.push(this.moveDefinition(x-1,y+1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
	  if(this.getFromArray(x-1,y-1,currentState) == 0)
		list.push(this.moveDefinition(x-1,y-1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
	  if(this.getFromArray(x+1,y+1,currentState) == 0)
		list.push(this.moveDefinition(x+1,y+1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
	  if(this.getFromArray(x+1,y-1,currentState) == 0)
		list.push(this.moveDefinition(x+1,y-1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
	  return list;
  }
  this.generateKingsStrikes = function(x,y,currentState)
  {
	  var list = [];
	  var move = this.checkDirectionForKingStrike(x,y,currentState,1,1);
	  if(move!=null)
		  list.push(move);
	  move = this.checkDirectionForKingStrike(x,y,currentState,-1,1);
	  if(move!=null)
		  list.push(move);
	   move = this.checkDirectionForKingStrike(x,y,currentState,-1,-1);
	  if(move!=null)
		  list.push(move);
	   move = this.checkDirectionForKingStrike(x,y,currentState,1,-1);
	  if(move!=null)
		  list.push(move);
	  
	  return list;
  }
  
  this.checkDirectionForKingStrike = function(kingX,kingY,currentState,dirXDiff,dirYDiff)
  {
		var me = this.getFromArray(kingX,kingY,currentState);
		var eValNr = this.checkOR(me,1,3)  ? 2 : 1;
		var eValSp = this.checkOR(me,1,3)  ? 4 : 3;
		
		var checking = -1;
		var counter = 1;
		do{
			checking = this.getFromArray(kingX + dirXDiff*counter, kingY + dirYDiff*counter,currentState);
			if(checking > 0)
			{
				counter++;
				if(this.checkOR(checking,eValNr,eValSp) && this.getFromArray(kingX + dirXDiff*counter, kingY + dirYDiff*counter,currentState) == 0)
				{
					return this.moveDefinition(
						kingX + dirXDiff*counter,
						kingY + dirYDiff*counter,
						"s",
						kingX + dirXDiff*(counter-1),
						kingY + dirYDiff*(counter-1),
						kingX,kingY,this.getFromArray(kingX,kingY,currentState));
				}
				else
					return null;
			}
			else
				counter++;
		}while (checking>=0)
		return null;
  }

  this.generateWhiteSimpleMove = function(x,y,currentState) {
    var list = [];
	var strikes = []
    if(this.getFromArray(x+1,y+1,currentState) == 0)
      list.push(this.moveDefinition(x+1,y+1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
    if(this.getFromArray(x+1,y-1,currentState) == 0)
      list.push(this.moveDefinition(x+1,y-1,"m",0,0,x,y,this.getFromArray(x,y,currentState)));
	strikes = this.checkStrike(x,y,currentState,2);
    
    return  strikes.length == 0? list : strikes;
  }

  this.checkStrike = function(x,y,currentState)
  {
    var list = [];
	var me = this.getFromArray(x,y,currentState);
	var eValNr = this.checkOR(me,1,3)  ? 2 : 1;
	var eValSp = this.checkOR(me,1,3)  ? 4 : 3;
	
    if(this.checkOR(this.getFromArray(x+1,y+1,currentState),eValNr,eValSp) && this.getFromArray(x+2,y+2,currentState) == 0)
      list.push(this.moveDefinition(x+2,y+2,"s",x+1,y+1,x,y,this.getFromArray(x,y,currentState)));
    if(this.checkOR(this.getFromArray(x+1,y-1,currentState),eValNr,eValSp) && this.getFromArray(x+2,y-2,currentState) == 0)
      list.push(this.moveDefinition(x+2,y-2,"s",x+1,y-1,x,y,this.getFromArray(x,y,currentState)));
    if(this.checkOR(this.getFromArray(x-1,y-1,currentState),eValNr,eValSp) && this.getFromArray(x-2,y-2,currentState) == 0)
      list.push(this.moveDefinition(x-2,y-2,"s",x-1,y-1,x,y,this.getFromArray(x,y,currentState)));
    if(this.checkOR(this.getFromArray(x-1,y+1,currentState),eValNr,eValSp) && this.getFromArray(x-2,y+2,currentState) == 0)
      list.push(this.moveDefinition(x-2,y+2,"s",x-1,y+1,x,y,this.getFromArray(x,y,currentState)));
    return list;
  }
  this.checkOR = function(value,one,two)
  {
	  return value == one || value == two;
  }

  this.getFromArray = function(x,y,currentState)
  {
    if(x<0 || x >= currentState.length)
      return -1;
    else if(y<0 || y >= currentState[x].length)
      return -1;
    else
      return currentState[x][y];
  }
  this.moveDefinition = function(x,y,t,xs,ys,fx,fy,p)
  {
    return {"x":x,"y":y,"t":t,"xs":xs,"ys":ys,"fx":fx,"fy":fy,"p":p};
  }

}







