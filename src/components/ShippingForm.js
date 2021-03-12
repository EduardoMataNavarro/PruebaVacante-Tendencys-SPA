import axios from 'axios';
import React, { useState, useEffect } from 'react'
import PackagesForm from './PackagesForm';
import ShippingInfo from './ShippingInfo';


export default function ShippingForm({ socketHandler }) {
    const [origin, setOrigin] = useState({});
    const [destiny, setDestiny] = useState({});
    const [packages, setPackages] = useState([]);
    const [country, setCountry] = useState('');
    const [provider, setProvider] = useState('');

    const [countries, setCountries] = useState([]);
    const [providers, setProviders] = useState([]);
    const [states, setStates] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log('Hello lets handle that socket')
        const payload = {
            origin: {
                ...origin
            },
            destiny: {
                ...destiny
            },
            packages: [...packages],
            settings: {
                printFormat: "PDF",
                printSize: "STOCK_4X6",
                comments: "comentarios de el envío"
            }
        };
        socketHandler(payload);
    };

    useEffect(() => {
        /* get countries */
        axios.get('https://queries.envia.com/country')
            .then(res => {
                const resData = res.data;
                setCountries([...resData.data]);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://queries.envia.com/carrier?country_code=${country}`)
            .then(res => {
                const resdata = res.data;
                setProviders(resdata.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [country]);

    return (
        <form onSubmit={submitForm}>
            <div className="accordion" id="main-accordion">
                <div className="accordion-item">
                    <h4 className="accordion-header" id="headingone">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#shippingInfo"
                            aria-expanded="true"
                            aria-controls="shippingInfo">
                            Información de envio:
                        </button>
                    </h4>
                    <div className="accordion-collapse collapse show"
                        id="shippingInfo"
                        aria-labelledby="headingone"
                        data-bs-parent="#main-accordion">
                        <div className="container-fluid accordion-body">
                            <div className="row">
                                <div className="col-6">
                                    <ShippingInfo
                                        setter={setOrigin}
                                        prev={origin}
                                        countries={[...countries]}
                                        selectCountry={setCountry}
                                        title="Origen:"
                                    />
                                </div>
                                <div className="col-6">
                                    <ShippingInfo
                                        setter={setDestiny}
                                        prev={destiny}
                                        countries={[...countries]}
                                        title="Destino:"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id="headingtwo">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#packagesInfo"
                            aria-expanded="true"
                            aria-controls="packagesInfo">
                            Paquetes:
                        </button>
                    </h4>
                    <div className="accordion-collapse collapse hide"
                        id="packagesInfo"
                        aria-labelledby="headingone"
                        data-bs-parent="#main-accordion">
                        <div className="container-fluid accordion-body">
                            <PackagesForm setter={setPackages} prev={packages} />
                            <div className="container">
                                <hr />
                                {
                                    packages && packages.length > 0 ?
                                        packages.map((pack, idx) => {
                                            return (
                                                <div className="container" key={idx}>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <strong>Contenido:</strong>
                                                            <span>{pack.content}</span>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong>Medidas:</strong>
                                                            {
                                                                pack.dimensions &&
                                                                <span>{pack.dimensions.height} X {pack.dimensions.width} X {pack.dimensions.lenght} </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <strong>Cantidad:</strong>
                                                            <span>{pack.amount}</span>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong>Peso:</strong>
                                                            <span>{pack.weight}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <strong>Seguro:</strong>
                                                            <span>{pack.insurance}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#shippingProviders"
                            aria-expanded="true"
                            aria-controls="shippingProviders">
                            Proveedor de servicios:
                        </button>
                    </h4>
                    <div className="accordion-collapse collapse hide"
                        id="shippingProviders"
                        aria-labelledby="headingone"
                        data-bs-parent="#main-accordion">
                        <div className="container-fluid accordion-body">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <select
                                            className="form-select"
                                            onChange={e => setProvider(e.target.value)}
                                        >
                                            {
                                                providers &&
                                                providers.map((provider, idx) => {
                                                    return <option key={idx} value={provider.id}>{provider.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={submitForm}
                                        >
                                            Generar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
