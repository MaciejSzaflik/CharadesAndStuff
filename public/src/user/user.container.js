import React from 'react';

const USER_CREATE = "";

var UserCreator = React.createClass({
	render: function() {
		return (
				<div className="chat">
				Hello, world! I am a CommentForm.
				</div>
		);
	}
});


export class User extends React.Component {
  render() {
    return (
      <UserCreator />
    )
  }
}