import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

const WEBSOCKET_URL = "ws://localhost:9000/pingWs";

export class Lobby extends React.Component {
	constructor(props) {
	    super(props);

	    this.styles = {
	    	button: {
	    		margin: 12,
	    	}
	    };

		this.text = {
			columns: {
				id: 'ID',
				dateCreation: 'Data utworzenia',
				dateUpdate: 'Ostatnia aktualizacja',
				status: 'Status',
				playersLength: 'Ilość graczy',
				joinToRoom: ''
			},
			status: {
				isRunning: 'W trakcje rozgrywki',
				notRunning: 'Oczekiwanie na graczy'
			},
			button: {
				create: "Utwórz pokój",
				join: "Dołącz"
			},
			lastUptade: "Ostatnia aktualizacja: ?"
		};

		this.lobby = {
			gameType: "checkers",
			lastUpdate: new Date(),
			isValid: true,
			maxPlayer: 2,
			rooms: [
				{
					id: 1,
					dateCreation: new Date(),
					dateUpdate: new Date(),
					players: ['dupa'],
					isRunning: true
				},
				{
					id: 2,
					dateCreation: new Date(),
					dateUpdate: new Date(),
					players: ['dupa', 'dupa'],
					isRunning: false
				}],

			getLastUpdate: function() {
				var hour = this.lastUpdate.getHours();
				var minutes = this.lastUpdate.getMinutes();
				var seconds = this.lastUpdate.getSeconds();

				hour = hour < 9 ? "0" + hour : hour;
				minutes = minutes < 9 ? "0" + minutes : minutes;
				seconds = seconds < 9 ? "0" + seconds : seconds;

				return hour + ":" + minutes + ":" + seconds;

			},
			
			dateFormat: function(date) {
				var hour = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();

				hour = hour < 9 ? "0" + hour : hour;
				minutes = minutes < 9 ? "0" + minutes : minutes;
				seconds = seconds < 9 ? "0" + seconds : seconds;

				return hour + ":" + minutes + ":" + seconds;
			},

			refresh: function() {

			},

			createRoom: function() {

			},

			join: function(room) {

			}
		};

		this.lastColumnValue = this.text.lastUptade.replace("?", this.lobby.getLastUpdate());

		this.tableColumns = [ 
		                      this.text.columns.id, 
		                      this.text.columns.dateCreation, 
		                      this.text.columns.dateUpdate, 
		                      this.text.columns.status, 
		                      this.text.columns.playersLength, 
		                      this.lastColumnValue
		                      ];
		
		this.lobbyWebSocket = {
			ws: new WebSocket(WEBSOCKET_URL),
			init: function() {
				console.log(this.ws);
				
				this.ws.onmessage = function (event) {
					console.log(JSON.parse(event.data));
				};
				
				this.ws.onopen = function(ws) {
					ws.send("aa");
					ws.close();
				};
			},
			send: function() {
				this.ws.oopen();
			}
		};
		
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
	  	    };
	    
	    this.lobbyWebSocket.init();
	}

  render() {
    return (
    		<div>
    			<div>
    			<RaisedButton
    				label={this.text.button.create}
    				style={this.styles.button}/>
    			</div>
    			
            <Table
	            height={this.state.height}
	            fixedHeader={this.state.fixedHeader}
	            fixedFooter={this.state.fixedFooter}
	            selectable={this.state.selectable}
	            multiSelectable={this.state.multiSelectable}>
            
              <TableHeader
	              displaySelectAll={this.state.showCheckboxes}
	              adjustForCheckbox={this.state.showCheckboxes}
	              enableSelectAll={this.state.enableSelectAll}>
                
	              <TableRow
	                displayRowCheckbox={false}>
		                {this.tableColumns.map( (row, index) => (
		                        <TableHeaderColumn tooltip={row}>{row}</TableHeaderColumn>
		                        ))}
	              </TableRow>
              </TableHeader>
              
              <TableBody
              	displayRowCheckbox={this.state.showCheckboxes}
              	deselectOnClickaway={this.state.deselectOnClickaway}
	          	showRowHover={this.state.showRowHover}
	      		stripedRows={this.state.stripedRows}>
              
              	{this.lobby.rooms.map( (row, index) => (
              			<TableRow key={index}>
	                        <TableRowColumn>{row.id}</TableRowColumn>
	                        <TableRowColumn>{this.lobby.dateFormat(row.dateCreation)}</TableRowColumn>
	                        <TableRowColumn>{this.lobby.dateFormat(row.dateUpdate)}</TableRowColumn>
	                        {row.isRunning ? 
	                        		<TableRowColumn>{this.text.status.isRunning}</TableRowColumn> :
	                        		<TableRowColumn>{this.text.status.notRunning}</TableRowColumn>
	                        }
	                        <TableRowColumn>{row.players.length} / {this.lobby.maxPlayer}</TableRowColumn>
	                        <TableRowColumn>		                	
	                        	<RaisedButton
	                        	label={this.text.button.join}
			        			style={this.styles.button}/>
			        		</TableRowColumn>
                      </TableRow>
                      ))}
              
              </TableBody>
              
              </Table>
      		</div>
    )
  }
}
