import React, { useState } from 'react'

export default function PackagesForm({ setter, prev }) {
    const [info, setInfo] = useState({});
    const [dimensions, setDimensions] = useState({});

    const setPackagesInfo = (e) => {
        e.preventDefault();

        info.dimensions = { ...dimensions };
        info.weightUnit = 'KG';
        info.lenghtUnit = 'CM';

        setter([...prev, info]);
    }

    return (
        <div className="container">
            <div className="row mb-2">
                <div className="col-4">
                    <label htmlFor="" className="form-label">Contenido del envío:</label>
                    <input type="text" className="form-control"
                        onChange={e => setInfo({ ...info, content: e.target.value })} />
                </div>
                <div className="col-4">
                    <label htmlFor="" className="form-label">Seguro:</label>
                    <input type="text" className="form-control"
                        onChange={e => setInfo({ ...info, insurance: e.target.value })} />
                </div>
                <div className="col-4">
                    <label htmlFor="" className="form-label">Tipo de envío:</label>
                    <input type="text" className="form-control"
                        onChange={e => setInfo({ ...info, type: e.target.value })} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <label htmlFor="" className="form-label">Alto:</label>
                    <input type="text" className="form-control"
                        onChange={e => setDimensions({ ...dimensions, height: e.target.value })} />
                </div>
                <div className="col-4">
                    <label htmlFor="" className="form-label">Ancho:</label>
                    <input type="text" className="form-control"
                        onChange={e => setDimensions({ ...dimensions, width: e.target.value })} />
                </div>
                <div className="col-4">
                    <label htmlFor="" className="form-label">Largo:</label>
                    <input type="text" className="form-control"
                        onChange={e => setDimensions({ ...dimensions, lenght: e.target.value })} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <label htmlFor="" className="form-label">Peso:</label>
                    <input type="text" className="form-control"
                        onChange={e => setInfo({ ...info, weight: e.target.value })} />
                </div>
                <div className="col-4">
                    <label htmlFor="" className="form-label">Cantidad:</label>
                    <input type="text" className="form-control"
                        onChange={e => setInfo({ ...info, amount: e.target.value })} />
                </div>
                <div className="col-4">
                    <div className="d-grid gap-2 mt-1">
                        <button type="button" className="btn btn-primary mt-4" onClick={setPackagesInfo}>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
