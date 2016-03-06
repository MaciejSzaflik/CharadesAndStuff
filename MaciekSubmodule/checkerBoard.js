function draw()
{
    // Main entry point got the HTML5 chess board example
    canvas = document.getElementById('checkers');
 
    // Canvas supported?
    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');
        var checkers = new CheckerBoard("aaa",canvas.height / 8,ctx);
        checkers.drawBoard( canvas.height / 8);
        
        var randomizedState = new Array(8);
        for(var i = 0;i<8;i++)
        {
            randomizedState[i] = new Array(8);
            for(var j = 0;j<8;j++)
            {
                randomizedState[i][j] = getRandomInt(0,2);
            } 
        }
        checkers.drawState(randomizedState);
        
        
        // Draw the background
        //drawBoard( canvas.height / 8);
 
       // defaultPositions();
        
        // Draw pieces
      //  pieces = new Image();
       // pieces.src = 'pieces.png';
       // pieces.onload = drawPieces;
 
        //canvas.addEventListener('click', board_click, false);
    }
    else
    {
        alert("Canvas not supported!");
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function CheckerBoard (type,sizeOfBlock,ctxVal) {
    this.type = type;
    this.size = sizeOfBlock;
    this.colorDark = "black";
    this.colorLight = "white";
    this.numberOfRows = 8;
    this.numberOfColumns =8;
    this.ctx = ctxVal;
    
    this.state = null;
    
    this.getInfo = function() {
       
    };
    
    this.drawState = function(state) {
        this.state = state;
        for(var i = 0;i<this.numberOfRows;i++)
        {
            for(var j = 0;j<this.numberOfRows;j++)
            {
                if(!this.state[i][j] == 0)
                    this.drawCircle(i,j,this.state[i][j]);
            } 
        }
    };
    this.drawCircle = function (rowIndex, columnIndex, color)
    {  
        this.ctx.beginPath();
        this.ctx.arc(rowIndex * this.size + this.size*0.5, columnIndex * this.size + this.size*0.5, this.size*0.35, 0, Math.PI*2, true); 
        this.ctx.closePath();
        this.ctx.fillStyle = color == 1 ? this.colorDark : this.colorLight;
        this.ctx.fill(); 
    }
    
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

