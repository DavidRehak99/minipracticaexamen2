import React, { Component } from 'react'
import serviceFutbol from '../services/serviceFutbol';
import { NavLink } from 'react-router-dom';

export default class Home extends Component {
    service = new serviceFutbol();

    loadDepartamentos = () => {
        
        this.service.getEquipos().then((result) => {


            this.setState({
                departamentos: result,
                status: true
            })
        })


    }

    deletedepartamento = (iddepartamento) => {
        if (window.confirm("De verdad quieres borrar este departamento?")) {
            this.service.deleteDepartamento(iddepartamento).then((result) => {
                this.loadDepartamentos();
            })
        }
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

    state = {
        departamentos: [],
        status: false

    }
    render() {

        if (this.state.status == true) {

            return (
                <div style={{ margin: "auto", width: "50%" }}>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.departamentos.map((dept, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{dept.nombre}</td>
                                        <td>
                    <img 
                        src={dept.imagen} 
                        alt={dept.nombre} 
                        style={{ width: "50%", height: "50%", objectFit: "cover" }} 
                    />
                </td>
                                        
                                        
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>


                </div>
            )

        } else {

           
        }

    }
}
