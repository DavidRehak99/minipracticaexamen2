import React, { Component } from 'react';
import ServiceFutbol from '../services/serviceFutbol';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// 1. Wrapper funcional para capturar el parámetro idEquipo de la URL (Requerido en clases para v6)
export function EquiposWrapper() {
    const { idSerie } = useParams();
    return <Equipos idSerie={idSerie} />;
}

class Equipos extends Component {
    service = new ServiceFutbol();

    state = {
        equipo: null,
        status: false
    }

    // Método para cargar un solo equipo según su ID que viene de la URL
    loadEquipo = () => {
        let id = this.props.idSerie;
        
        // Si tu servicio tiene un método para buscar por ID (ej: getEquipo(id)) úsalo.
        // Si no, puedes pedir todos los equipos y hacer un .find() como veíamos antes:
        this.service.getEquipos().then((result) => {
            let equipoEncontrado = result.find(eq => eq.idSerie == id);
            this.setState({
                equipo: equipoEncontrado,
                status: true
            });
        });
    }

    componentDidMount = () => {
        this.loadEquipo();
    }

    // Se ejecuta cuando el usuario hace clic en otro equipo del menú sin salir de la página
    componentDidUpdate = (prevProps) => {
        if (prevProps.idSerie !== this.props.idSerie) {
            this.loadEquipo();
        }
    }

    render() {
        if (this.state.status === true) {
            return (
                <div style={{ margin: "auto", width: "50%", textAlign: "center", marginTop: "40px" }}>
                    {
                        this.state.equipo ? (
                            <div className="card text-white bg-dark mb-4" style={{ padding: "20px", borderRadius: "10px" }}>
                                <h2>{this.state.equipo.nombre}</h2>
                                {this.state.equipo.imagen && (
                                    <img 
                                        src={this.state.equipo.imagen} 
                                        alt={this.state.equipo.nombre} 
                                        style={{ width: "40%", height: "auto", margin: "20px auto", objectFit: "cover", borderRadius: "5px" }} 
                                    />
                                )}
                                
                                <NavLink 
                                    to={"/series/" + this.state.equipo.idSerie} 
                                    className="btn btn-success mt-3"
                                >
                                    Personajes
                                </NavLink>
                                <li className="nav-item">
                <NavLink className="nav-link" to="/">Volver</NavLink>
              </li>
                                
                            </div>
                        ) : (
                            <p>No se ha encontrado el equipo seleccionado.</p>
                        )
                    }
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <p>Cargando detalles del equipo...</p>
                </div>
            );
        }
    }
}

// 2. Exportamos el Wrapper para que el Router lo reconozca
export default EquiposWrapper;