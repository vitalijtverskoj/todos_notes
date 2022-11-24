import React from "react";


const ProjectItem = ({project}) => {

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
        </tr>
    )
};


const ProjectList = ({projects}) => {

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
            {projects.map((project_) => <ProjectItem project={project_} />)}
        </table>
    )
};


export default ProjectList;