import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español para Moment.js
import AxiosInstance from './axiosInstance';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css';

moment.locale('es'); // Configura Moment.js para usar el idioma español

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Controlar la fecha actual
  const [open, setOpen] = useState(false); // Controlar apertura del modal
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado

  const fetchTournaments = async () => {
    try {
      const response = await AxiosInstance.get('api/tournaments/');
      const tournaments = response.data;

      const formattedEvents = tournaments.map((tournament) => ({
        title: tournament.name,
        start: new Date(tournament.start_date),
        end: new Date(tournament.end_date),
        description: tournament.description || 'No hay descripción disponible.',
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // Funciones para navegación de fechas
  const goToToday = () => setCurrentDate(new Date());
  const goToPrevious = () =>
    setCurrentDate((prevDate) =>
      moment(prevDate).subtract(1, 'month').toDate()
    );
  const goToNext = () =>
    setCurrentDate((prevDate) =>
      moment(prevDate).add(1, 'month').toDate()
    );

  // Manejar apertura y cierre del modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-page">
      {/* Barra personalizada */}
      <div className="calendar-header">
        <h1 className="calendar-title">Calendario de Torneos</h1>
        <div className="calendar-buttons">
          <button className="calendar-btn today-btn" onClick={goToToday}>
            Hoy
          </button>
          <button className="calendar-btn nav-btn" onClick={goToPrevious}>
            Anterior
          </button>
          <button className="calendar-btn nav-btn" onClick={goToNext}>
            Siguiente
          </button>
        </div>
        {/* Mostrar el mes y año actual en español */}
        <div className="calendar-month">
          <Typography variant="h6" style={{ color: '#729C68', marginTop: '10px' }}>
            {moment(currentDate).format('MMMM YYYY')}
          </Typography>
        </div>
      </div>

      {/* Contenedor del calendario */}
      <div className="calendar-container">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate} // Controlar la fecha actual desde el estado
          onNavigate={(date) => setCurrentDate(date)} // Actualizar la fecha al navegar
          style={{ height: '70vh' }}
          views={['month']} // Solo vista de mes
          popup
          onSelectEvent={handleEventClick} // Abrir modal al hacer clic en un evento
          messages={{
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            today: 'Hoy',
            previous: 'Anterior',
            next: 'Siguiente',
            showMore: (total) => `+ Ver ${total} más`,
          }}
          components={{
            toolbar: () => null, // Elimina la barra predeterminada del calendario
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#729C68',
              color: 'black',
              borderRadius: '5px',
              padding: '2px 4px',
            },
          })}
        />
      </div>

      {/* Modal para detalles del evento */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ color: '#729C68', fontWeight: 'bold' }}>
          {selectedEvent?.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedEvent?.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Fecha de inicio: {moment(selectedEvent?.start).format('LL')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Fecha de fin: {moment(selectedEvent?.end).format('LL')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#EC5A76' }}>
            Cerrar
          </Button>
          <Button
            style={{
              backgroundColor: '#729C68',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            Inscribirse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendar;