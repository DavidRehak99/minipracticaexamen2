import React, { Component } from 'react'
import ServiceFutbol from '../services/serviceFutbol';
import { NavLink } from 'react-router-dom'; // Solo si quieres poner un enlace para volver

export default class Apostar extends Component {

    cajaUsu = React.createRef();
    cajaResultado = React.createRef();
    cajaLFecha = React.createRef();

    service = new ServiceFutbol();

    state = {
        mensaje: "",
        status: false
    }

    insertApuesta = (event) => {
        event.preventDefault();
        
        let apues = {
            idPersonaje: 0,
            nombre: this.cajaUsu.current.value,
            imagen: this.cajaResultado.current.value,
            idSerie: this.cajaSerie.current.value
            
        }

        console.log("Enviando apuesta:", apues);

        this.service.insertApuesta(apues).then((result) => {
            this.setState({
                mensaje: "¡Personaje Insertado con éxito!",
                status: true
            });
        }).catch((error) => {
            console.log("Error detallado:", error);
            this.setState({
                mensaje: "Error insertando apuesta",
                status: false
            });
        })
    };

    render() {
        return (
            <div style={{ margin: "auto", width: "50%", marginTop: "30px" }}>
                <h1>NUEVO PERSONAJE</h1>
                
                {/* Opcional: Enlace para volver a Home */}
                <div style={{ marginBottom: "20px" }}>
                    <NavLink to="/" className="btn btn-secondary btn-sm">
                        Volver a Home
                    </NavLink>
                </div>

                <form onSubmit={this.insertApuesta}>
                    <div className="form-group mb-3">
                        <label>Nombre:</label>
                        <input type="text" className="form-control" ref={this.cajaUsu}  />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Imagen :</label>
                        <input type="text" className="form-control" ref={this.cajaResultado}  />
                    </div>

                    <div className="form-group mb-3">
                        <label>Serie :</label>
                        <input type="text" className="form-control" ref={this.cajaSerie}  />
                    </div>

                    <button type="submit" className="btn btn-primary">Create</button>
                </form>

                {/* Mensaje de estado en pantalla */}
                {
                    this.state.status === true && (
                        <div className="alert alert-success mt-3" role="alert">
                            {this.state.mensaje}
                        </div>
                    )
                }
            </div>
        )
    }
}