import React from 'react'

class TodoForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {text: '', project: props.project[0]?.id, user: props.user[0]?.id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                <label for="text">text</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                    </div>

                <div className="form-group">
                    <label for="project">project</label>
                    <select name="project" className="form-control" onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) => <option value={item.id}>{item.name}</option> )}
                    </select>
                </div>

                <div className="form-group">
                    <label for="user">user</label>
                    <select name="user" className="form-control" onChange={(event) => this.handleChange(event)}>
                        {this.props.user.map((item) => <option value={item.id}>{item.last_name}</option> )}
                    </select>
                </div>
                <input type="submit" value="Save"/>
            </form>
        );
    }

}

export default TodoForm
