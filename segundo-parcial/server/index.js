import express from 'express'
import sql from 'mssql'

process.loadEnvFile()

const config = {
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

const app = express()

app.get('/api/clientes', async (req, res) => {
  try {
    const pool = await sql.connect(config)
    const resultado = await pool
      .request()
      .query('SELECT Id_Cliente, Nombres, Apellidos, Telefono, Correo FROM Clientes')
    res.json(resultado.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'No se pudo conectar con la base de datos' })
  }
})

app.listen(3001, () => {
  console.log('API corriendo en http://localhost:3001')
})
