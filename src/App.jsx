import '../src/App.css'
import { useState } from 'react'

export default function App() {

  const [inputCiudad, setInputCiudad] = useState('')
  const [data, setData] = useState(null)

  const kelvin = 273.15

  const api_key = 'd4d507f61d04d76f9d6404de1156a99b'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad}&appid=${api_key}`

  function handleInputCiudad(event) {
    setInputCiudad(event.target.value)
  }

  function handleSubmitForm(event) {
    event.preventDefault()
    if (inputCiudad.length > 0) {
      fetchCiudad()
      setInputCiudad('')
    }
  }

  async function fetchCiudad() {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log("Hubo un error: ", error)
    }
  }

  return (
    <div className='contenedor d-flex flex-column justify-content-center align-center mt-5 gap-3 text-center'>
      <h1 className='titulo'>Buscador de clima</h1>
      <div className="contenido">
        
        <form onSubmit={handleSubmitForm} className='d-flex justify-content-center mt-3 gap-3' autoComplete='off'>
          <input className='w-auto' value={inputCiudad} type="text" placeholder="Ingrese una ciudad" onChange={handleInputCiudad} />
          <input className="btn btn-warning" type="submit" value="Buscar" />
        </form>

        {data && (
          <section className='datosClima mt-4'>
            <div className="cartaDeClima d-flex flex-column align-center justify-content-center">
              <h1 className='text-light'>País: {data.sys.country}</h1>
              <h2 className='text-light'>Ciudad: {data.name}</h2>
              <h2 className='text-light'>Clima: {parseInt(data.main.temp - kelvin)}°C</h2>
              <h2 className='text-light'>Condición climática: {data.weather[0].description}</h2>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="fotoClima" />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

