import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/user";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': []
    };
  }

  componentDidMount() {
    const users = [
        {
            "username": "admin",
            "first_name": "Vitalij",
            "last_name": "Tverskoj",
            "email": "vitalijtverskoj@gmail.com"
        },
        {
            "username": "test_user_1",
            "first_name": "Victor",
            "last_name": "Vasilev",
            "email": "victorvasilev@gmail.com"
        },
        {
            "username": "test_user_2",
            "first_name": "Svetlana",
            "last_name": "Zilkina",
            "email": "svetlanazilkina@gmail.com"
        },
    ]
    this.setState(
        {
          'users':users
        }
    )
  }

  render() {
    return (
        <div>
          <UserList users={this.state.users} />
        </div>
    )
  }
}

export default App;
