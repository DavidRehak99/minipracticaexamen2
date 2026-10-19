import React, { Component } from 'react';
import ServiceFutbol from '../services/serviceFutbol';

export default class Buscador extends Component {
    service = new ServiceFutbol();

    selectEquipo = React.createRef();
    cajaNombre = React.createRef();

    state = {
        equipos: [],
        jugadores: [], // Guardamos aquí los resultados directamente
        cargando: false
    }

    componentDidMount = () => {
        // Cargar desplegable de equipos
        this.service.getEquipos().then((result) => {
            this.setState({ equipos: result });
        });
    }

    // Petición 1: Buscar por ID de equipo
    buscarPorEquipo = (e) => {
        e.preventDefault();
        let id = this.selectEquipo.current.value;
        
        if (!id) return;

        this.setState({ cargando: true });
        this.service.getJugadoresEquipo(id).then(response => {
            this.setState({ 
                jugadores: response,
                cargando: false 
            });
        }).catch(() => this.setState({ jugadores: [], cargando: false }));
    }

    // Petición 2: Buscar por nombre
    buscarPorNombre = (e) => {
        e.preventDefault();
        let texto = this.cajaNombre.current.value;

        if (!texto.trim()) return;

        this.setState({ cargando: true });
        this.service.findJugadores(texto).then(response => {
            this.setState({ 
                jugadores: response,
                cargando: false 
            });
        }).catch(() => this.setState({ jugadores: [], cargando: false }));
    }

    render() {
        return (
            <div style={{ margin: "auto", width: "60%", textAlign: "center", marginTop: "30px" }}>
                <h1>Buscador de Jugadores</h1>

                <div className="row mb-4">
                    {/* Formulario Equipo */}
                    <div className="col-md-6">
                        <form onSubmit={this.buscarPorEquipo}>
                            <label className="form-label">Selecciona un Equipo:</label>
                            <select className="form-control mb-2" ref={this.selectEquipo}>
                                <option value="">-- Todos los equipos --</option>
                                {this.state.equipos.map((eq, index) => (
                                    <option key={index} value={eq.idEquipo}>{eq.nombre}</option>
                                ))}
                            </select>
                            <button type="submit" className="btn btn-primary btn-sm">Buscar por Equipo</button>
                        </form>
                    </div>

                    {/* Formulario Nombre */}
                    <div className="col-md-6">
                        <form onSubmit={this.buscarPorNombre}>
                            <label className="form-label">Buscar por Nombre:</label>
                            <input type="text" className="form-control mb-2" ref={this.cajaNombre} placeholder="Nombre del jugador..." />
                            <button type="submit" className="btn btn-success btn-sm">Buscar por Nombre</button>
                        </form>
                    </div>
                </div>

                <hr />

                {/* VISTA DE RESULTADOS */}
                <h3>Resultados:</h3>
                {this.state.cargando ? (
                    <p>Cargando jugadores...</p>
                ) : this.state.jugadores.length === 0 ? (
                    <p>No se encontraron jugadores.</p>
                ) : (
                    <ul className="list-group">
                        {this.state.jugadores.map((jugador, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{jugador.nombre}</strong> - {jugador.posicion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}