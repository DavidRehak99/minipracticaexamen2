import React, { Component } from 'react'
import { BrowserRouter, useParams } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import Equipos from './Equipos'
import Jugadores from './Jugadores'
import DetallesJugadores from './DetallesJugadores'
import Apuestas from './Apuestas'
import Apostar from './Apostar'
import Buscador from './Buscador'
import modificar from './modificar'

export default class Router extends Component { 

    render() { 

        

        return ( 

            <BrowserRouter> 

                <Menu/> 

                <Routes> 

                    <Route path="/" element={<Home/>}/>
                    
                    

                    <Route path="/series/:idSerie" element={<Equipos />} />

                    <Route path="/jugadores/jugadoresequipos/:idEquipo" element={<Jugadores />} />

                    <Route path="/series/:idSerie" element={<Jugadores />} />

                    <Route path="/modificar" element={<Apostar/>} />

                    <Route path="/jugadores/:idJugador" element={<DetallesJugadores />} />

                    <Route path="/apuestas" element={<Apuestas />} />

                    <Route path="/apostar" element={<Apostar />} />

                    <Route path="/buscador" element={<Buscador />} />


                   
                </Routes> 

            </BrowserRouter> 

        ) 

    } 

} 