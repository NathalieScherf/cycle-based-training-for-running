// src/components/CalendarDisplay.js

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal'; 

import usePeriodTracker, {PERIOD_TRACKER_KEY} from '../hooks/usePeriodTracker';
import { getPhaseColor, getPhaseTraining } from '../assets/phases';

Modal.setAppElement('#root'); 

const CalendarDisplay = () => {
  const { cycleLength, getPhaseByDay } = usePeriodTracker();

  const [periodStartDate, setPeriodStartDate] = useState(() => {
    const storedData = localStorage.getItem(PERIOD_TRACKER_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.periodStartDate) {
        return new Date(parsedData.periodStartDate);
      }
    }
    return new Date(); // Default to current date if no data is found
  });

  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {console.log(periodStartDate);
  },[])

  useEffect(() => {
    const generatedEvents = [];

    // Generate Period Cycle Events for 6 months
    const generatePeriodEvents = (cycleStart) => {
      for (let i = 0; i < 6 * cycleLength; i++) { // 6 months worth of days
        const eventDate = new Date(cycleStart);
        eventDate.setDate(cycleStart.getDate() + i);
        const dayInCycle = (i % cycleLength) + 1;
        const phaseName = getPhaseByDay(dayInCycle);
        const color = getPhaseColor(phaseName); // Function to determine color based on phase
        const training = getPhaseTraining(phaseName);

        generatedEvents.push({
          title: training,
          start: eventDate.toISOString().split('T')[0],
          color: color,
        });
      }
    };

    generatePeriodEvents(periodStartDate);

    setEvents(generatedEvents);
  }, [periodStartDate, cycleLength]);

  // Handle date clicks with modal
  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const clickedEvents = events.filter(event => event.start === clickedDate);
    setSelectedDate(clickedDate);
    setSelectedEvents(clickedEvents);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate('');
    setSelectedEvents([]);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);
    setPeriodStartDate(newStartDate);
    localStorage.setItem(PERIOD_TRACKER_KEY, JSON.stringify({
      periodStartDate: newStartDate.toISOString(),
      cycleLength,
    }));
  };

  return (
    <div className="calendar-display">
      <h2>Tracker Calendar</h2>
      <label htmlFor="start-date">Set Starting Date: </label>
      <input
        type="date"
        id="start-date"
        value={periodStartDate instanceof Date && !isNaN(periodStartDate) ? periodStartDate.toISOString().split('T')[0] : ''}
        onChange={handleStartDateChange}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto"
        firstDay={1}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Details"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Events on {selectedDate}</h2>
        <ul>
          {selectedEvents.map((event, index) => (
            <li key={index} style={{ color: event.color }}>
              {event.title}
            </li>
          ))}
        </ul>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CalendarDisplay;
