import axios from "axios";
import Global from "../Global";


export default class ServiceFutbol {

getEquipos() {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiseries;
        let request = "api/series";
        axios.get(url + request).then((response) => {
            console.log("leyendo equipos");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}
getPersonajes() {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiseries;
        let request = "api/personajes";
        axios.get(url + request).then((response) => {
            console.log("leyendo personajes");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}
// 1. Para obtener TODOS los jugadores (útil para búsquedas por nombre o general)
    getJugadores() {
        return new Promise(function(resolve, reject){
            let url = Global.urlApiseries;
            let request = "api/series";
            axios.get(url + request).then((response) => {
                console.log("leyendo todos las series");
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject([error]);
            });
        })
    }

    // 2. Método específico exclusivo para el ID de equipo
    getJugadoresEquipo(idSerie) {
        return new Promise(function(resolve, reject){
            let url = Global.urlApiFutbol;
            let request = "api/series/" + idSerie;
            axios.get(url + request).then((response) => {
                console.log("leyendo series ");
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject([error]);
            });
        })
    }
getDetallesJugadores(idSerie) {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiseries;
        let request = "api/series/" +idSerie;
        axios.get(url + request).then((response) => {
            console.log("leyendo series");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}
getDetallesApostadores() {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiFutbol;
        let request = "api/apuestas/" ;
        axios.get(url + request).then((response) => {
            console.log("leyendo apostadores");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}

insertApuesta(apues) {
    return new Promise(function(resolve,reject){
    let url = Global.urlApiseries;
    let request = "api/personajes";
    axios.post(url + request, apues).then((response) => {
        console.log("insertando personaje");
        resolve(response.data);
    })
    .catch((error) => {
        console.log("Error insertando" + error);
        reject([error]);
    });

})
}



     async findJugadores(nombre) {
    let url = "https://apiejemplos.azurewebsites.net/api/Jugadores/FindJugadores/" + nombre;
    
    const response = await axios.get(url);
    return response.data; // axios devuelve la respuesta en .data
}


// insertDepartamento(departamento) {
//     return new Promise(function(resolve,reject){
//     let url = Global.urlApiDepartamentos;
//     let request = "api/departamentos";
//     axios.post(url + request, departamento).then((response) => {
//         console.log("insertando departamento");
//         resolve(response.data);
//     })
//     .catch((error) => {
//         console.log("Error insertando" + error);
//         reject([error]);
//     });

// })
// }



// updateDepartamento(departamento) {
//     return new Promise(function(resolve,reject){
//         let url = Global.urlApiDepartamentos;
//         let request = "api/departamentos";
//         axios.put(url + request, departamento).then((response) => {
//             console.log("Update departamento");
//             resolve(response.data);
//         })
//         .catch((error) => {
//             console.log("Error actualizando" + error);
//             reject([error]);
//         });

//     })

// }

// deleteDepartamento(iddepartamento) {

      

    
//     return new Promise(function(resolve,reject){
//         let url = Global.urlApiDepartamentos;
//         let request = "api/departamentos/" + iddepartamento;
//         axios.delete(url + request).then((response) => {
//             console.log("Delete departamento");
//             resolve(response.data);
//         })
//         .catch((error) => {
//             console.log("Error eliminando" + error);
//             reject([error]);
//         });

//     })
// }


}