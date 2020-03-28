import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import API from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    API.get("profile", {
      headers: {
        Authorization: ongId
      }
    })
      .then(response => {
        setIncidents(response.data);
      })
      .catch(error => alert("erro ao recuperar os dados"));
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await API.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Logo Be the Hero" />

        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => {
          return (
            <li key={incident.id}>
              <strong>CASO:</strong>

              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>

              <p>{incident.description}</p>

              <strong>VALOR:</strong>

              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(incident.value)}
              </p>

              <button
                type="button"
                onClick={() => handleDeleteIncident(incident.id)}
              >
                <FiTrash2 size={20} color="#A8A8B3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
