$(function(){
	var eventCatcher = [];
	var canvas = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	 
	var painting = document.getElementById('paint');
	var paint_style = getComputedStyle(painting);
	canvas.width = document.body.clientWidth; //document.width is obsolete
	canvas.height = document.body.clientWidth;


	var WS = window['MozWebSocket'] ? window['MozWebSocket'] : WebSocket;
		
	var socket = new WS('@routes.Application.wsPaintInterface().webSocketURL(request)');

	var drawALine = function()
	{

		var values = [];
		for(var i = 0;i<eventCatcher.length;i++)
			values.push(eventCatcher[i].split(";"));

		var pathHaveBegun = false;
		for(var i = 0;i<values.length;i++)
		{
			if(values[i][2] == "'x")
			{
				pathHaveBegun = false;
				continue;
			}
			
			if(!pathHaveBegun)
			{
				pathHaveBegun = true;
				ctx.beginPath();
				ctx.moveTo(values[i][0], values[i][1]);
				ctx.strokeStyle = values[i][2];
				continue;
			}
			else
			{
				ctx.strokeStyle = values[i][2];
				ctx.lineTo(values[i][0], values[i][1]);
				ctx.stroke();
			}
		}
		eventCatcher = [];
	}
	socket.onmessage = function (event) {
			
			eventCatcher.push(event.data);
			if(eventCatcher.length>20)
			{
				drawALine();
				eventCatcher = [];
			}
	}
	
	
	window.onbeforeunload = function() {
		socket.onclose = function () {}; // disable onclose handler first
		socket.close()
	};
	
	var mouse = {x: 0, y: 0};
	 
	canvas.addEventListener('mousemove', function(e) {
	  mouse.x = e.pageX - this.offsetLeft;
	  mouse.y = e.pageY - this.offsetTop;	
	}, false);

	ctx.lineWidth = 3;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	var myColor = '#' + (Math.random().toString(16) + "000000").substring(2,8);
	ctx.strokeStyle = myColor;
	 
	canvas.addEventListener('mousedown', function(e) {
		
		socket.send(mouse.x+";"+mouse.y+";" + myColor);
		ctx.strokeStyle = myColor;
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
		socket.send(mouse.x+";"+mouse.y+";x");
		canvas.removeEventListener('mousemove', onPaint, false);
	}, false);
	 
	var onPaint = function() {
		socket.send(mouse.x+";"+mouse.y+";"+myColor);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
	};

});

