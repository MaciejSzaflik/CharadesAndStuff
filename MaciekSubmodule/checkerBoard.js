var numberOfRows = 8;
var checkers = null;
var checkersLogic = null;
function initializeBoard(realState){
	
	
	canvas = document.getElementById('checkers');
	canvas.addEventListener('click', handleMouseDown, false);
	canvas.addEventListener('mousemove', handleMouseMove, false);
	ctx = canvas.getContext('2d');
	
	checkers = new CheckerBoard("aaa",canvas.height / numberOfRows,ctx);
	checkersLogic = new CheckerLogicKeeper();
	state = checkersLogic.generateStartingState();
	checkers.setState(state);
	redraw();
	redrawPieces(-100,-100);
}


function handleMouseDown(e) {
	mouseX = parseInt(e.clientX);
	mouseY = parseInt(e.clientY);
		
	var clicked = null;
	for (var i = 0; i < checkers.pieces.length; i++) {
		if (checkers.pieces[i].isPointInside(mouseX, mouseY)) {
			clicked = checkers.pieces[i];
		}
	}
	if (clicked != null) {
		var result = checkersLogic.generateMoveListForChecker(clicked.logicX,clicked.logicY,checkers.state);
		checkers.highlights = result;
		checkers.selectPiece = clicked;
		redraw(mouseX,mouseY);
	}
	else
	{
		logicP = checkers.getLogicPoint(mouseX,mouseY);
		checkers.tryToPerformMove(logicP["x"],logicP["y"]);
		redraw(mouseX,mouseY);
	}
}


function handleMouseMove(e) {
	mouseX = parseInt(e.clientX);
	mouseY = parseInt(e.clientY);

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
	checkers.drawBoard( canvas.height / numberOfRows);   
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
	
    this.getInfo = function() {
       
    };
    
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
			this.performMove(move)
	}
	
	this.performMove = function(move)
	{
		if(move["t"] == "m")
		{
			this.state[this.selectPiece.logicX][this.selectPiece.logicY] = 0;
			this.state[move["x"]][move["y"]] = this.selectPiece.type;
			this.setState(this.state);
		}
	}
	
	this.clearHighlights = function()
	{
		this.highlights = null;
		this.selectPiece = null;
	}
	
	this.setState = function(state)
	{
		this.clearHighlights();
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
					this.state[i][j] == 1?this.colorLightPiece:this.colorDarkPiece, this.state[i][j] == 1?this.colorDarkPiece:this.colorLightPiece, 5));
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
		ctx.restore();
	}

	this.isPointInside = function (x, y) {
		return (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size);
	}
}

function CheckerLogicKeeper()
{
	this.generateStartingState = function() {
		var newState = new Array(numberOfRows);
		for(var i = 0;i<numberOfRows;i++)
		{
			newState[i] = new Array(numberOfRows);
			for(var j = 0;j<numberOfRows;j++)
			{
				var val = (i<5)?1:2;
				val = (i == 3 || i == 4)?0:val;
					if(i%2)
						newState[i][j] =  j%2==1?val:0;
					else 
						newState[i][j] =  j%2==1?0:val;

			} 
		}
		return newState;
	}
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
				return null;
			case 4: 
				return null;
				
		}
	}
	
	this.generateBlackSimpleMove = function(x,y,currentState) {
		var list = [];
		
		if(this.gA(x-1,y+1,currentState) == 0)
			list.push(this.cE(x-1,y+1,"m"));
		if(this.gA(x-1,y-1,currentState) == 0)
			list.push(this.cE(x-1,y-1,"m"));
		
		return list;
	}	
	
	this.generateWhiteSimpleMove = function(x,y,currentState) {
		var list = [];
		
		if(this.gA(x+1,y+1,currentState) == 0)
			list.push(this.cE(x+1,y+1,"m"));
		if(this.gA(x+1,y-1,currentState) == 0)
			list.push(this.cE(x+1,y-1,"m"));
		
		return list;
	}
	this.gA = function(x,y,currentState)
	{
		if(x<0 || x >= currentState.length)
			return -1;
		else if(y<0 || y >= currentState[x].length)
			return -1;
		else
			return currentState[x][y];
	}
	this.cE = function(x,y,t)
	{
		return {"x":x,"y":y,"t":t};
	}
	
}




















