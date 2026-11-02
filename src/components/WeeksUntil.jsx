import { useState } from 'react';

const WeeksUntil = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const storedData = localStorage.getItem('WEEKS_UNTIL_DATA');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.selectedDate || '';
    }
    return '';
  });

  const [weeksUntil, setWeeksUntil] = useState(() => {
    const storedData = localStorage.getItem('WEEKS_UNTIL_DATA');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.weeksUntil || null;
    }
    return null;
  });

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

    // Save the selected date and weeksUntil data to local storage
    localStorage.setItem('WEEKS_UNTIL_DATA', JSON.stringify({
      selectedDate: e.target.value,
      weeksUntil: { weeks, days },
    }));
  };

  return (
    <div className="weeks-until">
      <h3> Weeks Until the marathon</h3>
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