import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
  const { id } = match.params;
  const [form, setForm] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});
  const [mode, setMode] = useState({});
  const [genres, setGenres] = useState([]);
  const [genre_id, setGenreId] = useState('');
  
  useEffect(() => {
    axios.get(`/api/series/${id}`).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [id]);
  
  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find(value => form.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data ]);

  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  }

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value,
    });
  }

  const masterHeader = {
    height: "50vh",
    mingHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const save = () => {
    axios
      .put(`/api/series/${id}`, {
        ...form,
        genre_id,
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color="warning">Para assistir</Badge>}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button className="btn btn-primary" onClick={() => setMode("EDIT")}>Editar</button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Editar Série</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nome do Genêro"
                value={form.name}
                onChange={onChange("name")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comentários</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nome do Genêro"
                value={form.comments}
                onChange={onChange("comments")}
              />
            </div>

            <label htmlFor="genres">Gêneros</label>
            <select className="form-control" onChange={onChangeGenre} value={genre_id ? genre_id : data.genre_id}>
            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
            </select>

            <div className="form-check">
              <input type="radio" checked={form.status === 'ASSISTIDO'} className="form-check-input" name="status" id="assistido" value="ASSISTIDO" onClick={seleciona('ASSISTIDO')} />
              <label htmlFor="assistido" className="form-check-label">
              Assistido</label>
            </div>

            <div className="form-check">
              <input type="radio" checked={form.status === 'PARA_ASSISTIR'} className="form-check-input" name="status" id="paraAssistir" value="PARA_ASSISTIR" onClick={seleciona('PARA_ASSISTIR')} />
              <label htmlFor="exampleRadios1" className="form-check-label">
              Para assistir</label>
            </div>

            <button
              type="button"
              className="btn btn-secondary mr-3"
              onClick={() => setMode("CANCELAR")}
            >
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={save}>
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
