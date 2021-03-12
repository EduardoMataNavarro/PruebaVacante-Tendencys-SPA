import axios from 'axios';
import React, { useState } from 'react'

export default function ShippingInfo({ setter, prev, countries, title, selectCountry }) {
    const [states, setStates] = useState([]);

    const getStates = (country) => {
        axios.get(`https://queries.envia.com/state?country_code=${country}`)
            .then(res => {
                const resdata = res.data;
                setStates(resdata.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="container-fluid">
            <h4 className="blue mb-2">{ title ? title : '' }</h4>
            <hr/>
            <div className="mb-1 row">
                <div className="col-6">
                    <label htmlFor="" className="form-label">Nombre:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, name: e.target.value })} />
                </div>
                <div className="col-6">
                    <label htmlFor="" className="form-label">Empresa:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => { setter({ ...prev, company: e.target.value }); console.log(prev) }} />
                </div>
            </div>
            <div className="mb-1 row">
                <div className="col-6">
                    <label htmlFor="" className="form-label">Correo:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, email: e.target.value })} />
                </div>
                <div className="col-6">
                    <label htmlFor="" className="form-label">Telefono:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, phone: e.target.value })} />
                </div>
            </div>
            <div className="mb-1 row">
                <div className="col-12">
                    <label htmlFor="" className="form-label">País:</label>
                    <select className="form-select"
                        onChange={e => { 
                            setter({ ...prev, country: e.target.value }); 
                            getStates(e.target.value) 
                            if (selectCountry) {
                                selectCountry(e.target.value);
                            }
                        }}>
                        <option value="0">-- Seleccione un país --</option>
                        {
                            countries &&
                            countries.map((country, idx) => {
                                return <option key={idx} value={country.code}>{country.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="mb-1 row">
                <div className="col-6">
                    <label htmlFor="" className="form-label">Calle:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, street: e.target.value })} />
                </div>
                <div className="col-6">
                    <label htmlFor="" className="form-label">Número:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, number: e.target.value })} />
                </div>
            </div>
            <div className="mb-1 row">
                <div className="col-6">
                    <label htmlFor="" className="form-label">Código postal:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, postalCode: e.target.value })} />
                </div>
                <div className="col-6">
                    <label htmlFor="" className="form-label">Colonia:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, district: e.target.value })} />
                </div>
            </div>
            <div className="mb-1 row">
                <div className="col-6">
                    <label htmlFor="" className="form-label">Ciudad:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, city: e.target.value })} />
                </div>
                <div className="col-6">
                    <label htmlFor="" className="form-label">Estado:</label>
                    <select
                        className="form-select"
                        onChange={e => setter({ ...prev, city: e.target.value })}>
                        <option value="0">-- Seleccione una opción --</option>
                        {
                            states &&
                            states.map((state, idx) => {
                                return <option key={idx} value={state.code_3_digits}>{state.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="mb-1 row">
                <div className="col-12">
                    <label htmlFor="" className="form-label">Referencia:</label>
                    <input type="text" name="name" id="" className="form-control"
                        onChange={e => setter({ ...prev, reference: e.target.value })} />
                </div>
            </div>
        </div>
    )
}
