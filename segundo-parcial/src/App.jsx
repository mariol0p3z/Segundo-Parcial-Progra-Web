import { useState, useEffect } from 'react'
import ListaClientes from './components/ListaClientes'
import './App.css'

function App() {
  const [clientes, setClientes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/clientes')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error()
        return respuesta.json()
      })
      .then((datos) => setClientes(datos))
      .catch(() => setError('No se pudieron cargar los clientes'))
      .finally(() => setCargando(false))
  }, [])

  const texto = busqueda.toLowerCase()
  const clientesFiltrados = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.Nombres} ${cliente.Apellidos}`.toLowerCase()
    return (
      nombreCompleto.includes(texto) ||
      (cliente.Correo ?? '').toLowerCase().includes(texto) ||
      String(cliente.Telefono).includes(texto)
    )
  })

  return (
    <main className="contenedor">
      <h1>Listado de Clientes</h1>

      {cargando && <p className="mensaje">Cargando clientes...</p>}
      {error && <p className="mensaje">{error}</p>}
      {!cargando && !error && (
        <ListaClientes
          clientes={clientesFiltrados}
          total={clientes.length}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      )}
    </main>
  )
}

export default App
