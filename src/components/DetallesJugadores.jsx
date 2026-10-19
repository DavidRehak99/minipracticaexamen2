import React, { Component } from 'react';
import ServiceFutbol from '../services/serviceFutbol';
import { useParams, NavLink } from 'react-router-dom';

// 1. Wrapper para capturar el idJugador de la URL
export function DetalleJugadorWrapper() {
    const { idJugador } = useParams();
    return <DetallesJugadores idJugador={idJugador} />;
}

class DetallesJugadores extends Component {
    service = new ServiceFutbol();

    state = {
        jugador: null,
        status: false
    }

    loadJugador = () => {
        let id = this.props.idJugador;
        
        // Llamamos al método que acabas de escribir en tu servicio
        this.service.getDetallesJugadores(id).then((result) => {
            this.setState({
                jugador: result,
                status: true
            });
        }).catch((error) => {
            console.log("Error al cargar el jugador:", error);
            this.setState({ status: true, jugador: null });
        });
    }

    componentDidMount = () => {
        this.loadJugador();
    }

    render() {
        if (this.state.status === true) {
            return (
                <div style={{ margin: "auto", width: "50%", textAlign: "center", marginTop: "40px" }}>
                    {
                        this.state.jugador ? (
                            <div className="card text-white bg-dark mb-4" style={{ padding: "20px", borderRadius: "10px" }}>
                                <h2>{this.state.jugador.nombre}</h2>
                                {this.state.jugador.imagen && (
                                    <img 
                                        src={this.state.jugador.imagen} 
                                        alt={this.state.jugador.nombre} 
                                        style={{ width: "40%", height: "auto", margin: "20px auto", objectFit: "cover", borderRadius: "5px" }} 
                                    />
                                )}
                                <p><strong>Posición:</strong> {this.state.jugador.posicion}</p>
                                {/* Añade aquí el resto de propiedades que te devuelva tu API para el jugador */}

                                {/* Botón para volver a la lista de jugadores de ese equipo */}
                                <NavLink 
    to={"/jugadores/jugadoresequipos/" + this.state.jugador.idEquipo} 
    className="btn btn-success mt-3"
>
    Ver Jugadores

</NavLink>
                            </div>
                        ) : (
                            <p>No se ha encontrado el jugador seleccionado.</p>
                        )
                    }
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <p>Cargando detalles del jugador...</p>
                </div>
            );
        }
    }
}

export default DetalleJugadorWrapper;