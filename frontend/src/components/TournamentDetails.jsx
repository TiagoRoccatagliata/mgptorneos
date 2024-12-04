// src/components/TournamentDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './axiosInstance';

const TournamentDetails = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    AxiosInstance.get(`api/tournaments/${id}/`)
      .then((res) => {
        setTournament(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tournament details:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleEnrollment = () => {
    AxiosInstance.post(`tournaments/${id}/enroll/`)
      .then(() => {
        setIsEnrolled(true);
        alert("Inscripción exitosa");
      })
      .catch((error) => {
        console.error("Error al inscribirse en el torneo:", error);
        alert("Error en la inscripción");
      });
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      {tournament ? (
        <>
          <h2>{tournament.name}</h2>
          <p>{tournament.description}</p>
          <p>Fecha: {tournament.start_date} - {tournament.end_date}</p>
          {!isEnrolled && <button onClick={handleEnrollment}>Inscribirse</button>}
          {isEnrolled && <p>Ya estás inscrito en este torneo.</p>}
        </>
      ) : (
        <p>Detalles del torneo no disponibles.</p>
      )}
    </div>
  );
};

export default TournamentDetails;