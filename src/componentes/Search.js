import React, { useEffect, useState} from "react";
import '../estilos/Estilos-search.css'



function Search({onChange, onSubmit}){
    
        const [fixed, setFixed] = useState(false)
        useEffect(()=>{
            const handleScroll = () =>{
              const isScrolled = window.scrollY > 0
                setFixed(isScrolled)
            }
            window.addEventListener('scroll', handleScroll)
            return () =>{
                window.removeEventListener('scroll',handleScroll)
            }
        }, [])
    
    const [mostrarInput, setMostrarInput] = useState(false)   
    const salirInput = () =>{
            setMostrarInput(!mostrarInput)
    }
    return(
        <form  onSubmit={onSubmit}>
            <header className={`menu${fixed ? ' fixed' : ''}`}>
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