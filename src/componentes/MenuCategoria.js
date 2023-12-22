

function Categoria({onSubmit,onChange}){
    return(
        <form onSubmit={onSubmit} >
            <div className="row">
                <div className="container-menu" ></div>
                <select onChange={onChange}>
                    <option value="">Categoria</option>
                    <option value="28">Accion</option>
                    <option value="12">Aventura</option>
                    <option value="35">Comedia</option>
                    <option value="878">Ciencia ficcion</option>
                    <option value="18">Drama</option>
                    <option value="14">Fantacia</option>
                    <option value="53">Suspenso</option>
                    <option value="27">Terror</option>
                </select>       
            </div>
        </form>
    )
}
export default Categoria