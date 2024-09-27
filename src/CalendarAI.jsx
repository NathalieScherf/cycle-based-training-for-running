import { useState, useEffect } from 'react';

const Calendar = () => {
  const [date ] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [days, setDays] = useState([]);
  const [statuses, setStatuses] = useState(['period', 'period', 'period', 'period'])
  useEffect(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const daysArray = [];

    for (let i = 0; i < (startDay + 6) % 7; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setDays(daysArray);
  }, [month, year]);

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const getStatus = (day) => {
    if (day === null) return '';
    return statuses[(day - 1) % 28];
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <button
          className="text-gray-500 hover:text-gray-900 transition duration-300"
          onClick={handlePrevMonth}
        >
          Prev
        </button>
        <h2 className="text-lg font-bold text-gray-900">
        {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}

        </h2>
        <button
          className="text-gray-500 hover:text-gray-900 transition duration-300"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <div
            key={index}
            className="text-center text-gray-500 font-bold py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`text-center py-2 ${
              day === date.getDate() && month === date.getMonth()
                ? 'bg-blue-500 text-white'
                : 'text-gray-900'
            }`}
          >
            {day}
            <div className="text-sm text-gray-500">{getStatus(day)}</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;