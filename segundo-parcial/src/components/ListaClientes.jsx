function ListaClientes({ clientes, total, busqueda, setBusqueda }) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Correo</th>
        </tr>
      </thead>
      <tbody>
        {clientes.length === 0 && (
          <tr>
            <td colSpan="5" className="sin-resultados">
              Ningún cliente coincide con la búsqueda
            </td>
          </tr>
        )}
        {clientes.map((cliente) => (
          <tr key={cliente.Id_Cliente}>
            <td className="id">{cliente.Id_Cliente}</td>
            <td>{cliente.Nombres}</td>
            <td>{cliente.Apellidos}</td>
            <td>{cliente.Telefono}</td>
            <td>{cliente.Correo ?? '-'}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">
            <div className="pie">
              <span>
                {clientes.length} de {total} clientes
              </span>
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar cliente..."
              />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ListaClientes
