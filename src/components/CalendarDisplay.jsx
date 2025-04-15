// src/components/CalendarDisplay.js

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal'; // Import react-modal

import usePeriodTracker from '../hooks/usePeriodTracker';
import { FOL_PHASE, MENS_PHASE, OV_PHASE, SHIT_PHASE , getPhaseColor} from '../assets/phases';

Modal.setAppElement('#root'); // For accessibility

const CalendarDisplay = ({ startDate }) => {
  const { cycleLength, getPhaseByDay } = usePeriodTracker();

  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const generatedEvents = [];

    // Generate Period Cycle Events
    const generatePeriodEvents = (cycleStart = startDate) => {
      console.log(cycleStart)
      for (let i = 0; i < cycleLength; i++) {
        const eventDate = new Date(cycleStart);
        eventDate.setDate(cycleStart.getDate() + i);
        const dayInCycle = (i % cycleLength) + 1;
        const phaseName = getPhaseByDay(dayInCycle);
        const color = getPhaseColor(phaseName); // Function to determine color based on phase

        generatedEvents.push({
          title: phaseName,
          start: eventDate.toISOString().split('T')[0],
          color: color,
        });
      }
    }
    for (let i =0; i < 3; i++)
    {
      if (i ===1 ){
        let next = startDate
        let date = new Date(next.setDate(startDate.getDate() + 28));
        // adds days, but also mutates the state defined in dashboard! HOW???
        generatePeriodEvents(date)
      } else if (i === 2) {
        let next = startDate

        let date = new Date(next.setDate(startDate.getDate() + 28));
        generatePeriodEvents(date)
      } else {
    generatePeriodEvents(startDate)}
  }

    setEvents(generatedEvents);
  }, [startDate]);


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

  return (
    <div className="calendar-display">
      <h2>Tracker Calendar</h2>
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
