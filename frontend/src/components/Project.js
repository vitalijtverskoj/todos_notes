import React from "react";


const ProjectItem = ({project, delete_project}) => {

    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={()=> delete_project(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
};


const ProjectList = ({projects, delete_project}) => {

    return (
        <table>
            <th>
                ID
            </th>
            <th>
                NAME
            </th>
            <th>
                LINK
            </th>
            <th>
                USERS
            </th>
            <td>
            </td>
            {projects.map((project_) => <ProjectItem project={project_} delete_project={delete_project}/>)}
        </table>
    )
};


export default ProjectList;