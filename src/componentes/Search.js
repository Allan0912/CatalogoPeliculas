import React, { useState} from "react";
import '../estilos/Estilos-search.css'



function Search({onChange, onSubmit}){
    const [mostrarInput, setMostrarInput] = useState(false)   
    const salirInput = () =>{
            setMostrarInput(!mostrarInput)
    }
    return(
        <form  onSubmit={onSubmit}>
            <header className="header flex items-center justify-center flex-col">
            <nav className="navegation" >
                <div className="search">
                    <li className="list-none mt-5 mb-6"><i  onClick={salirInput}  className='icon-search bx bx-search text-6xl text-orange-50 cursor-pointer'></i></li>                
                </div>
            </nav>
            {mostrarInput &&  (        
                <input  className="input-search text-gray-50" onChange={onChange} autoFocus type="text" placeholder="Busca tu pelicula favorita"/>
            )}
        </header>
        </form>
        
        )
}

export default Search;