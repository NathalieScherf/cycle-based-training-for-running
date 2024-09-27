import { useState, useEffect } from 'react';

const PeriodTrackingCalendar = () => {
  const [date ] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [days, setDays] = useState([]);
  const [periodDays, setPeriodDays] = useState([]);
  const [ovulationDays, setOvulationDays] = useState([]);
  const [periodStartDay, setPeriodStartDay] = useState(1);
  const [periodLength, setPeriodLength] = useState(5);
  const [ovulationStartDay, setOvulationStartDay] = useState(14);
  const [ovulationLength, setOvulationLength] = useState(3);

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

    const periodArray = [];
    const ovulationArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayNumber = day.getDate();

      if (dayNumber >= periodStartDay && dayNumber <= periodStartDay + periodLength - 1) {
        periodArray.push(dayNumber);
      }

      if (dayNumber >= ovulationStartDay && dayNumber <= ovulationStartDay + ovulationLength - 1) {
        ovulationArray.push(dayNumber);
      }
    }

    setPeriodDays(periodArray);
    setOvulationDays(ovulationArray);
  }, [month, year, periodStartDay, periodLength, ovulationStartDay, ovulationLength]);

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

  const handlePeriodStartDayChange = (event) => {
    setPeriodStartDay(parseInt(event.target.value));
  };

  const handlePeriodLengthChange = (event) => {
    setPeriodLength(parseInt(event.target.value));
  };

  const handleOvulationStartDayChange = (event) => {
    setOvulationStartDay(parseInt(event.target.value));
  };

  const handleOvulationLengthChange = (event) => {
    setOvulationLength(parseInt(event.target.value));
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
                  : periodDays.includes(day)
                ? 'bg-red-500 text-white'
                : ovulationDays.includes(day)
                ? 'bg-green-500 text-white'
                : 'text-gray-900' 
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-gray-500 font-bold mb-2">
          Period Start Day:
        </label>
        <input
          type="number"
          value={periodStartDay}
          onChange={handlePeriodStartDayChange}
          className="block w-full p-2 mb-4 border border-gray-500 rounded-lg"
        />
        <label className="block text-gray-500 font-bold mb-2">
          Period Length:
        </label>
        <input
          type="number"
          value={periodLength}
          onChange={handlePeriodLengthChange}
          className="block w-full p-2 mb-4 border border-gray-500 rounded-lg"
        />
        <label className="block text-gray-500 font-bold mb-2">
          Ovulation Start Day:
        </label>
        <input
          type="number"
          value={ovulationStartDay}
          onChange={handleOvulationStartDayChange}
          className="block w-full p-2 mb-4 border border-gray-500 rounded-lg"
        />
        <label className="block text-gray-500 font-bold mb-2">
          Ovulation Length:
        </label>
        <input
          type="number"
          value={ovulationLength}
          onChange={handleOvulationLengthChange}
          className="block w-full p-2 mb-4 border border-gray-500 rounded-lg"
        />
      </div>
    </div>
  );
};

export default PeriodTrackingCalendar;