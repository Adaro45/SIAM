import React from 'react'

const Identificador = () => {

    return (
        <div className='identificador'>
            <div className="identificador_logo_acron">
            <img src="./public/IconCEAC.png" className="logo_identificador" />
            <h1 className="identificador_title">CEAC</h1>
            </div>
            <div className="identificador_name_phrase">
                <h2 className="identificador_name">Centro de Estudios Ambientales de Cienfuegos</h2>
                <h2 className="identificador_phrase">...Un puente al desarrollo sostenible</h2>
            </div>
        </div>
    );
};

export default Identificador;