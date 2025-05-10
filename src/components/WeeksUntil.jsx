import { useState } from 'react';

const WeeksUntil = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [weeksUntil, setWeeksUntil] = useState(null);

  const handleDateChange = (e) => {
    const targetDate = new Date(e.target.value);
    const currentDate = new Date();

    // Calculate the difference in time
    const timeDifference = targetDate - currentDate;
    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    setSelectedDate(e.target.value);
    setWeeksUntil({ weeks, days });
  };

  return (
    <div className="weeks-until">
      <h3>Calculate Weeks Until a Date</h3>
      <label htmlFor="target-date">Select a Date: </label>
      <input
        type="date"
        id="target-date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {weeksUntil !== null && (
        <p>
          There are {weeksUntil.weeks} week(s) and {weeksUntil.days} day(s) until {selectedDate}.
        </p>
      )}
    </div>
  );
};

export default WeeksUntil;