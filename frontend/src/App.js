import React from "react";
// import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import LoginForm from "./components/Auth";

import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation,} from "react-router-dom";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


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
            'token': '',
        };
    }

    create_todo(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers}).then(response => {
            let new_todo = response.data
            const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
            new_todo.user = user
            this.setState({todos: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error))
    }

    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    create_project(name, link, users) {
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    logout() {
        this.set_token('')
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {

            this.setState(
                {'users': response.data}
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {

            this.setState(
                {'projects': response.data}
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then(response => {

            this.setState(
                {'todos': response.data}
            )
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_storage()
    }

    render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>Todos</Link>
                            </li>
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/>}/>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}
                                                                              delete_project={(id) => this.delete_project(id)}/>}/>
                        <Route exact path='/projects/create'
                               element={<ProjectForm users={this.state.users}
                                                     create_project={(name, link, users) => this.create_project(name, link, users)}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}
                                                                        delete_todo={(id) => this.delete_todo(id)}/>}/>
                        <Route exact path='/todos/create'
                               element={<TodoForm project={this.state.project}
                                                  user={this.state.user}
                                                  create_todo={(text, project, user) => this.create_todo(text, project, user)}/>}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route path={'*'} element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
