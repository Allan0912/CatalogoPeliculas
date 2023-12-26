import '../estilos/Estilos-menu.css'

function OpcionMenu({onSubmit, onChange}){
    const max = new Date().getFullYear()
    const min = max-23
    const option = [];
    function optionYear(){
        for (let i = max; i >= min; i--){    
            option.push (<option  key={i} onChange={onChange}>{i}</option>)
        }
        return option   
    }
    return(
        <form onSubmit={onSubmit} >
            <div className="row">
                <div className="container-fechas">
                    <label>Año: </label>
                    <select onChange={onChange}>
                        <option value="" >Seleccionar</option>
                        {optionYear()}
                    </select>
                </div>         
            </div>
        </form>
    )
}

export default OpcionMenu;