var numberOfRows = 8;
var checkers = null;
function initializeBoard(realState){
	
	
	canvas = document.getElementById('checkers');
	canvas.addEventListener('click', handleMouseDown, false);
	canvas.addEventListener('mousemove', handleMouseMove, false);
	ctx = canvas.getContext('2d');
	
	checkers = new CheckerBoard("aaa",canvas.height / numberOfRows,ctx);
	if(realState==null)
	{
		state = new Array(numberOfRows);
		for(var i = 0;i<numberOfRows;i++)
		{
			state[i] = new Array(numberOfRows);
			for(var j = 0;j<numberOfRows;j++)
			{
				state[i][j] = getRandomInt(0,2);
			} 
		}
	}
	else
		state = realState;
	
	checkers.setState(state);
	redraw();
	redrawPieces(-100,-100);
}


function handleMouseDown(e) {
	mouseX = parseInt(e.clientX);
	mouseY = parseInt(e.clientY);

	var clicked = "";
	for (var i = 0; i < checkers.pieces.length; i++) {
		if (checkers.pieces[i].isPointInside(mouseX, mouseY)) {
			clicked += checkers.pieces[i].x + " " +checkers.pieces[i].y;
		}
	}
	if (clicked.length > 0) {
		alert("Clicked piece: " + clicked);
	}
}


function handleMouseMove(e) {
	mouseX = parseInt(e.clientX);
	mouseY = parseInt(e.clientY);

	redraw(mouseX,mouseY);
	redrawPieces(mouseX,mouseY);
}
function redraw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	checkers.drawBoard( canvas.height / numberOfRows);   
}
function redrawPieces(mouseX,mouseY)
{
	checkers.drawCurrent(mouseX,mouseY);
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
	
	this.colorDarkPiece = "#080900";
    this.colorLightPiece = "#FCCAF0";
	
    this.numberOfRows = 8;
    this.numberOfColumns =8;	
    this.ctx = ctxVal;
    this.pieces = [];
    this.state = null;
	this.pieces = null;
    
    this.getInfo = function() {
       
    };
    
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
					"a1",
					i*this.size + this.size*0.5,
					j*this.size + this.size*0.5, 
					this.size*0.30, 
					this.state[i][j] == 1?this.colorLightPiece:this.colorDarkPiece, this.state[i][j] == 1?this.colorDarkPiece:this.colorLightPiece, 5));
            } 
        }	
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


function CheckersPiece(id, x, y, size, fill, stroke, strokewidth) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.size = size;
	this.fill = fill || "gray";
	this.stroke = stroke || "red";
	this.strokewidth = strokewidth || 1;
	
	this.redraw = function (x, y) {
		this.x = x || this.x;
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
	
	this.draw = function (stroke) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = this.strokewidth;
		
		ctx.arc( x, y , this.size, 0, Math.PI*2, true); 
		ctx.closePath();
		
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}

	this.isPointInside = function (x, y) {
		return (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size);
	}
}