import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';


export default class Departamentos extends Component {

    cajaOficioRef = React.createRef();
    cajaIncrementRef = React.createRef();

    state = {
        departamentos: [],
        empleados: [],
        statusDept: false,
        statusEmp: false,
        statusPut: false
    }

    loadDepartamentos = () => {
        var request = "api/Empleados/GetOficios/oficios";
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                departamentos: response.data,
                statusDept: true
            });
        });
    }

    loadEmpleados = (oficio) => {
        var request = "api/Empleados/GetEmpleadosOficio/empleadosoficio/" + oficio;
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                empleados: response.data,
                statusEmp: true
            });
        });
    }

    putIncrement = (e) => {
        e.preventDefault();
        var request = "api/Empleados/IncrementarSalarioOficios/" + this.cajaOficioRef.current.value + "/" + this.cajaIncrementRef.current.value;
        var url = Global.url + request;
        var cargo = this.cajaOficioRef.current.value;

        axios.put(url).then(response => {
            this.setState({
                statusPut: true
            });
            this.loadEmpleados(cargo);
        })
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

    render() {
        return (
            <div>
                <h1>Incremento salarial oficios empleados</h1>
                <form onSubmit={this.putIncrement}>
                    <label>Seleccione un oficio: </label>
                    <select ref={this.cajaOficioRef}>
                        {
                            this.state.statusDept == true && (
                                this.state.departamentos.map((departamento, index) => {
                                    return (
                                        <option key={index} value={departamento}>{departamento}</option>
                                    );
                                })
                            )
                        }
                    </select>
                    <hr />
                    <label>Incremento salarial: </label>
                    <input type="text" ref={this.cajaIncrementRef} />
                    <button style={{ marginLeft: "5px" }}>Incrementar salarios</button>
                </form>
                <hr />

                {
                    this.state.statusEmp == true && (
                        <table border={1} style={{ margin: "25px auto" }}>
                            <thead>
                                <tr>
                                    <th>Apellido</th>
                                    <th>Oficio</th>
                                    <th>Salario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.empleados.map((empleado, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{empleado.apellido}</th>
                                                <th>{empleado.oficio}</th>
                                                <th style={{ color: "red" }}>{empleado.salario}</th>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        )
    }
}
