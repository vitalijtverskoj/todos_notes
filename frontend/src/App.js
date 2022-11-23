import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";

import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation,} from "react-router-dom";


const NotFound404 = () => {
    let {pathname} = useLocation()
    return (
        <div>
            <h1>Страница по адресу '{pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {

            this.setState(
                {'users': response.data}
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(response => {

            this.setState(
                {'projects': response.data}
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/').then(response => {

            this.setState(
                {'todos': response.data}
            )
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li>
                            <Link to={'/'}>Users</Link>
                        </li>
                        <li>
                            <Link to={'/projects'}>Projects</Link>
                        </li>
                        <li>
                            <Link to={'/todos'}>Todos</Link>
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path={'/'} element={<UserList users={this.state.users}/>}/>
                        <Route exact path={'/projects'} element={<ProjectList projects={this.state.projects}/>}/>
                        <Route exact path={'/todos'} element={<TodoList todos={this.state.todos}/>}/>

                        <Route path={'*'} element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
