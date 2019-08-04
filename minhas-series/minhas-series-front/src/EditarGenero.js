import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditarGenero = props => {
  const { id } = props.match.params;
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`/api/genres/${id}`).then(res => {
      setName(res.data.name);
    });
  }, [id]);

  const onChange = e => {
    setName(e.target.value);
  };

  const save = () => {
    axios
      .put(`/api/genres/${id}`, {
        name,
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/generos" />;
  }

  return (
    <div className="container">
      <h1>Editar Genêro</h1>

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
  );
};

export default EditarGenero;
