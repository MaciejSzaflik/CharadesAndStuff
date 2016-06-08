import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Snackbar from 'material-ui/Snackbar';

export class InProgress extends React.Component {
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
	      height: '300px',
		  autoHideDuration: 4000,
		  message: 'Event added to your calendar',
		  open: false,
	    };
	    
	    this.styles = {
	    	button: {
	    		margin: 12,
	    	}
	    };
	    
	    this.text = {
	    		button: {
	    			create: "Wróć",
	    			join: "Wróć"
	    		},
	    		textWait: {
	    			text: 'Ta podstrona jest w trakcie przygotowania.'
	    		}
	    };

	  

	  }

  render() {
	 
    return (
    		<div>
    			<div>
				<Link to={"/"}>
    			<RaisedButton
    				label={this.text.button.create}
    				style={this.styles.button}/>
					</Link>
				
    			</div>
				<Snackbar
					  open={true}
					  message={this.text.textWait.text}
					  autoHideDuration={this.state.autoHideDuration}
					/>
      		</div>
    )
  }
}
