import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Snackbar from 'material-ui/Snackbar';

var logicStateTicTac = [0,0,0,0,0,0,0,0,0];
var self = null;
export class InProgress extends React.Component {
	constructor(props) {
	    super(props);
		self = this;
	    this.state = {
	      fixedHeader: true,
	      fixedFooter: true,
	      stripedRows: false,
	      showRowHover: false,
	      selectable: false,
	      multiSelectable: false,
	      enableSelectAll: false,
	      deselectOnClickaway: true,
	      showCheckboxes: false,
	      height: '300px',
		  autoHideDuration: 3000,
		  message: 'Hello',
		  open: false,
		  logicBoardState : 0,
	    };
	    
	    this.styles = {
	    	button: {
	    		margin: 12,
	    	}
	    };
	    
	    this.text = {
	    		button: {
	    			returnBut: "Powrót na strone główna",
	    		},
	    		textWait: {
	    			text: 'Good Luck, Have Fun!'
	    		}
	    };
	  }

	  handleRequestClose()  {
			self.setState({
			  open: false,
			});
		}
  
	  componentDidMount() {
		
		self.setState({
			  open: true,
			});
		
		self.drawBoard();
		var canvas = document.getElementById("tictactoe");
		canvas.addEventListener("click", this.onClick, false);
  }
  
	onClick(e) {
		var xClicked = Math.floor(e.pageX/100);
		var yClicked =  Math.floor((e.pageY-150)/100);
		if(xClicked<3 && yClicked<3 && logicStateTicTac[xClicked + yClicked*3] == 0)
		{
			self.makeCross(xClicked,yClicked);
			logicStateTicTac[xClicked + yClicked*3] = 1;
			self.makeMove();
		}
	}	
	
	drawBoard()
	{
		logicStateTicTac = [0,0,0,0,0,0,0,0,0];
		var canvas = document.getElementById("tictactoe");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle="#795548";
		ctx.fillStyle="#795548";
		ctx.lineWidth = 1;
		
		self.roundRect(ctx, 100, 5, 12, 300,5,true);
		self.roundRect(ctx, 200, 5, 12, 300,5,true);
		self.roundRect(ctx, 5, 100, 300, 12,5,true);
		self.roundRect(ctx, 5, 200, 300, 12,5,true);
	
	}
	
	makeMove()
	{
		var possibleMoves = self.getPossibleMoves();
		
		var randomMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
		self.makeCircle(randomMove%3,Math.floor(randomMove/3));
		logicStateTicTac[randomMove] = 2;
		var whoWon = self.checkWin();
		if(self.checkWin()!=0)
		{
			self.text.textWait.text = "Wygrał gracz: "  + (whoWon==1? "Krzyżyk":"Kółko");
			self.setState({
			  open: true,
			});
			setTimeout(self.drawBoard, 1500);
		}
		else if(self.getPossibleMoves().length == 0)
		{
			self.text.textWait.text = "Nikt nie wygrał";
			self.setState({
			  open: true,
			});
			setTimeout(self.drawBoard, 1500);
		}
	
	}
	
	getPossibleMoves()
	{
		var possibleMoves = [];
		for(var i = 0;i<logicStateTicTac.length;i++)
		{
			if(logicStateTicTac[i]==0)
				possibleMoves.push(i);
		}
		return possibleMoves;
	}
	
	checkWin(){
		if(self.checkPlayerWin(1))
			return 1;
		if(self.checkPlayerWin(2))
			return 2;
		return 0;
	}
	
	checkPlayerWin(player)
	{
		var win1 = logicStateTicTac[0] == player &&  logicStateTicTac[1] == player  &&  logicStateTicTac[2] == player;
		var win2 = logicStateTicTac[3] == player &&  logicStateTicTac[4] == player  &&  logicStateTicTac[5] == player;
		var win3 = logicStateTicTac[6] == player &&  logicStateTicTac[7] == player  &&  logicStateTicTac[8] == player;
		
		var win4 = logicStateTicTac[0] == player &&  logicStateTicTac[3] == player  &&  logicStateTicTac[6] == player;
		var win5 = logicStateTicTac[1] == player &&  logicStateTicTac[4] == player  &&  logicStateTicTac[7] == player;
		var win6 = logicStateTicTac[2] == player &&  logicStateTicTac[5] == player  &&  logicStateTicTac[8] == player;
		
		var win7 = logicStateTicTac[0] == player &&  logicStateTicTac[4] == player  &&  logicStateTicTac[8] == player;
		var win8 = logicStateTicTac[2] == player &&  logicStateTicTac[4] == player  &&  logicStateTicTac[6] == player;
		return win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8;
	}
	
	
	makeCross(x,y) {
		var canvas = document.getElementById("tictactoe");
		var ctx = canvas.getContext("2d");
		
		ctx.strokeStyle="#98EBDD";
		ctx.fillStyle="#98EBDD";
		
		ctx.beginPath();
		ctx.lineWidth=10;
		ctx.moveTo(26 + x*100, 25 + y*100);
		ctx.lineTo(x*100 + 86, y*100+ 85);
		
		ctx.moveTo(26 + x*100, 85 + y*100);
		ctx.lineTo(x*100 + 86, y*100+ 25);
		ctx.stroke();
	}
	
	makeCircle(x,y) {
		var canvas = document.getElementById("tictactoe");
		var ctx = canvas.getContext("2d");
		
		ctx.strokeStyle="#E0ADDC";
		ctx.fillStyle="#E0ADDC";
		
		ctx.beginPath();
		ctx.lineWidth=10;
		ctx.arc(x*100+56,y*100+56,35,0,2*Math.PI);
		ctx.stroke();
	}
	
	roundRect(ctx, x, y, width, height, radius, fill, stroke) {
		if (typeof stroke == 'undefined') {
			stroke = true;
		}
		if (typeof radius === 'undefined') {
			radius = 5;
		}
		if (typeof radius === 'number') {
			radius = {tl: radius, tr: radius, br: radius, bl: radius};
		} 
		else {
			var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
			for (var side in defaultRadius) {
			  radius[side] = radius[side] || defaultRadius[side];
			}
		}
		
		ctx.beginPath();
		ctx.moveTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + height - radius.br);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctx.lineTo(x + radius.bl, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.closePath();
		
		if (fill) {
			ctx.fill();
		}
		if (stroke) {
			ctx.stroke();
		}
	}
  render() {
	 
    return (
    		<div>
    			<div>
				<Link to={"/"}>
    			<RaisedButton
    				label={this.text.button.returnBut}
    				style={this.styles.button}/>
					</Link>
				</div>
				<canvas id="tictactoe" width="400" height="400"></canvas>
				<Snackbar	
					  open={this.state.open}
					  message={this.text.textWait.text}
					  autoHideDuration={this.state.autoHideDuration}
					  onRequestClose={this.handleRequestClose}
					/>
      		</div>
			
    )
  }
}
