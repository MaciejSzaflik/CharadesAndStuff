import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

const WEBSOCKET_URL = "ws://localhost:9000/ws/lobby";
var socket = new WebSocket(WEBSOCKET_URL);

export class Lobby extends React.Component {
	constructor(props) {
		super(props);

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
				height: '500px',
				lastColumnValue: "",
				text: {
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
					lastUpdade: "Ostatnia aktualizacja: ?"
				},
				styles: {
					button: {
						margin: 12,
					}
				},
				lobby: {
					gameType: "checkers",
					lastUpdate: new Date(),
					isValid: false,
					maxPlayer: 2,
					rooms: 
					{
						id: 1,
	 -					dateCreation: new Date(),
	 -					dateUpdate: new Date(),
	 -					players: ['dupa'],
	 -					isRunning: false
					},
					{
	 -					id: 2,
	 -					dateCreation: new Date(),
	 -					dateUpdate: new Date(),
	 -					players: ['dupa', 'dupa'],
	 -					isRunning: false
	 -				}
					],

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
				},
				pollInterval: 1000,
				tableColumns: []
		};	    

		this.state.tableColumns = [
		                           this.state.text.columns.id, 
		                           this.state.text.columns.dateCreation, 
		                           this.state.text.columns.dateUpdate, 
		                           this.state.text.columns.status, 
		                           this.state.text.columns.playersLength, 
		                           this.state.lastColumnValue];
	}
	componentWillMount() {
		//this.loadDataFromServer();
		var pollInterval = this.props.pollInterval;
		//window.setInterval(this.loadDataFromServer, pollInterval);
	}
	loadDataFromServer() {
		var lobbyDto = {
				gameType: "checkers",
				lastUpdate: new Date(),
				isValid: false,
				maxPlayer: 2,
				rooms: [],

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

				setDate(data) {
					this.gameType = data.gameType;
					this.lastUpdate = new Date(data.lastUpdate.replace("2016", "2014"));
					this.isValid = data.isValid;
					this.maxPlayer = data.maxPlayer;
					this.rooms = data.rooms;
				}
		};

		socket.onopen = function(event) {
			if (socket.readyState === 1) {
				socket.send('checkers');
				console.log("send");
			}
		};

		socket.onerror = function (evt) {
			console.log(evt);
		};
	}
	waitForSocketConnection(socket, callback) {
		setTimeout(
				function () {
					if (socket.readyState === 1) {
						console.log("Connection is made")
						if(callback != null){
							callback();
						}
						return;

					} 
					else {
						console.log("wait for connection...")
						waitForSocketConnection(socket, callback);
					}

				}, 5);
	}
	render() {
		console.log(this.state.lobby);
		return (
				<div>
					<div>
						<div>
							<ButtonLobbyCreateRoom 
							text={this.state.text.button.create} 
							styles={this.state.styles.button} />
						</div>
						<div>
							<RoomList 
							state={this.state} 
							tableColumns={this.state.tableColumns} 
							lobby={this.state.lobby} 
							text={this.state.text} 
							styles={this.state.styles} />
						</div>
					</div>
					<ChatApp />
				</div>
		)
	}
}

var ButtonLobbyCreateRoom = React.createClass({
	render() {
		return (	    
				<RaisedButton
				label={this.props.text}
				style={this.props.styles}/>
		)
	}
});


var RoomList = React.createClass({
	render() {
		return (
				<div>
				<Table
				height={this.props.state.height}
				fixedHeader={this.props.state.fixedHeader}
				fixedFooter={this.props.state.fixedFooter}
				selectable={this.props.state.selectable}
				multiSelectable={this.props.state.multiSelectable}>

				<TableHeader
				displaySelectAll={this.props.state.showCheckboxes}
				adjustForCheckbox={this.props.state.showCheckboxes}
				enableSelectAll={this.props.state.enableSelectAll}>

				<TableRow
				displayRowCheckbox={false}>
				{this.props.tableColumns.map( (row, index) => (
						<TableHeaderColumn key={index} tooltip={row}>{row}</TableHeaderColumn>
				))}
				</TableRow>
				</TableHeader>

				<TableBody
				displayRowCheckbox={this.props.state.showCheckboxes}
				deselectOnClickaway={this.props.state.deselectOnClickaway}
				showRowHover={this.props.state.showRowHover}
				stripedRows={this.props.state.stripedRows}>

				{this.props.lobby.rooms.map( (row, index) => (
						<TableRow key={index}>
						<TableRowColumn>{row.id}</TableRowColumn>
						<TableRowColumn>{this.props.lobby.dateFormat(row.dateCreation)}</TableRowColumn>
						<TableRowColumn>{this.props.lobby.dateFormat(row.dateUpdate)}</TableRowColumn>
						{row.isRunning ? 
								<TableRowColumn>{this.props.text.status.isRunning}</TableRowColumn> :
									<TableRowColumn>{this.props.text.status.notRunning}</TableRowColumn>
						}
						<TableRowColumn>{row.players.length} / {this.props.lobby.maxPlayer}</TableRowColumn>
						<TableRowColumn>		                	
						<RaisedButton
						label={this.props.text.button.join}
						style={this.props.styles.button}/>
						</TableRowColumn>
						</TableRow>
				))}

				</TableBody>

				</Table>
				</div>
		)
	}
});

var ChatApp = React.createClass({
	render: function() {
		return (
				<div className="chat">
				Hello, world! I am a CommentForm.
				</div>
		);
	}
});
