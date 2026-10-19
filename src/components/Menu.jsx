import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Global from '../Global'

export default class Menu extends Component {
  urlSeries = Global.urlApiseries

  state = {
    equipos: [],
    isMenuOpen: false,      // Estado para abir/cerrar menú móvil
    isDropdownOpen: false   // Estado para abrir/cerrar desplegable
  }

  loadEquipos = () => {
    let request = "api/series"
    axios.get(this.urlSeries + request).then((response) => {
      this.setState({
        equipos: response.data
      })
    })
  }

  componentDidMount = () => {
    this.loadEquipos()
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
  }

  render() {
    // Clase dinámica para resaltar el enlace activo
    const navLinkClass = ({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-slate-900 text-white'
          : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
      }`

    return (
      <nav className="bg-slate-100 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Botón menú móvil (Hamburguesa) */}
            <div className="flex lg:hidden">
              
            </div>

            {/* Menú de Escritorio */}
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:w-full">
              <div className="flex items-center space-x-2">
                <NavLink className={navLinkClass} to="/">
                  Home
                </NavLink>

                <NavLink className={navLinkClass} to="/apostar">
                  Insertar Personaje
                </NavLink>

                <NavLink className={navLinkClass} to="/modificar">
                  Modificar Personaje
                </NavLink>

                

                {/* Dropdown de Equipos / Series */}
                <div className="relative inline-block text-left">
                  <button
                    onClick={this.toggleDropdown}
                    type="button"
                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:outline-none"
                  >
                    Desplegable series
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Menú desplegable */}
                  {this.state.isDropdownOpen && (
                    <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu">
                        {this.state.equipos.map((eq, index) => (
                          <NavLink
                            key={index}
                            to={"/series/" + eq.idSerie}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            onClick={() => this.setState({ isDropdownOpen: false })}
                          >
                            {eq.nombre}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Enlace deshabilitado */}
                <span className="px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
                  Disabled
                </span>
              </div>

              {/* Formulario de Búsqueda */}
              <form className="flex items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 border border-emerald-600 text-emerald-600 rounded-md text-sm font-medium hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Menú Móvil desplegable */}
        {this.state.isMenuOpen && (
          <div className="lg:hidden px-2 pt-2 pb-3 space-y-1 bg-slate-100 border-t border-slate-200">
            <NavLink
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
              to="/"
              onClick={this.toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
              to="/apuestas"
              onClick={this.toggleMenu}
            >
              Apuestas
            </NavLink>
            <NavLink
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
              to="/buscador"
              onClick={this.toggleMenu}
            >
              Buscador
            </NavLink>

            {/* Dropdown en móvil */}
            <div>
              <button
                onClick={this.toggleDropdown}
                className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
              >
                Desplegable Equipos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {this.state.isDropdownOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {this.state.equipos.map((eq, index) => (
                    <NavLink
                      key={index}
                      to={"/series/" + eq.idSerie}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-200"
                      onClick={() => {
                        this.setState({ isDropdownOpen: false, isMenuOpen: false })
                      }}
                    >
                      {eq.nombre}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <span className="block px-3 py-2 text-base font-medium text-slate-400 cursor-not-allowed">
              Disabled
            </span>

            {/* Formulario móvil */}
            <form className="mt-3 flex space-x-2 px-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                placeholder="Search"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 border border-emerald-600 text-emerald-600 rounded-md text-sm font-medium hover:bg-emerald-600 hover:text-white"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </nav>
    )
  }
}