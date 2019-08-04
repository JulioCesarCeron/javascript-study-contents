import React, { useState } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

const NewGenero = () => {
  const [name, setName] = useState("")
  const [success, setSuccess] = useState(false)

  const onChange = e => {
    setName(e.target.value)
  }

  const save = () => {
    axios
      .post("/api/genres", {
        name,
      })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to="/generos" />
  }

  return (
    <div className="container">
      <h1>Novo Genêro</h1>

      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nome do Genêro"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={save}>
          Salvar
        </button>
      </form>
    </div>
  )
}

export default NewGenero
