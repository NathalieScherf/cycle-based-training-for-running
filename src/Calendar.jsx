import { useEffect, useState } from 'react';
import './Calendar.css'
import { ArrowLeftSquare, ArrowRightSquare } from 'react-bootstrap-icons';



const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MyCalendar = () => {
  let today = new Date()
  const year = today.getFullYear();

  const [date, setDate] = useState(today);
  const [monthNR, setMonthNR] = useState(today.getMonth())
  const [monthName, setMonthName] = useState(monthNames[today.getMonth()])
  const [nextMonth, setNextMonth  ] = useState(monthNames[today.getMonth()+1])
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(0)
  const [lastDateOfMonth, setLastDateOfMonth] = useState(0)
  const [daysInMonth] = useState(lastDateOfMonth)


  const getFirstDayOfMonth= (monthName, year) =>{
    const firstDay = new Date(`${monthName} 1, ${year}`);   
    setFirstDayOfMonth(firstDay.getDay()-1)
  }
  const getLastDateOfMonth = () => {
    const nextMonthFirstDay = new Date(year, monthNR+1, 1);   
    setLastDateOfMonth(new Date(nextMonthFirstDay - 1).getDate())
  };


  useEffect(() => {
    getFirstDayOfMonth(monthName, year)
    getLastDateOfMonth()
  }, [])


  const handleDateClick = (day) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), day));
  };


    const calendarDays = [];

    // Add empty cells for the days before the 1st day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }


    // Add cells for each day in the month
    for (let day = 1; day <= lastDateOfMonth; day++) {
      const classNames = ['calendar-day'];
      if (day === date.getDate()) {
        classNames.push('selected');
      }
      calendarDays.push(
        <div key={day} className={classNames.join(' ')} onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );
    }
    // Add empty cells for the days after the last day of the month
    for (let x = 35; x > lastDateOfMonth ; x--) {
      calendarDays.push(<div key={`empty-${x}`} className="empty-cell">end</div>);
    }

  const getMonthName = (monthNR) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let name = ''
    if (monthNR) {
      name = month[monthNR];
    } else {

      const d = new Date();
      name = month[d.getMonth()];
    }
    return name
  }

  const getPreviousMonth = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    // Calculate the previous month
    const previousMonth = new Date(currentYear, currentMonth - 1, 1);
    console.log(previousMonth);
    // setDisplayMonth(previousMonth)
  };
  return (
    <div>
      <h1>React Calendar Component</h1>
      <div className="calendar">
        <div className='month'> <ArrowLeftSquare size={32} onClick={() => getPreviousMonth(date)} /><span> {getMonthName(monthNR)} </span> <ArrowRightSquare size={32} /> </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className='calendar-days'>
          {calendarDays}
        </div>
      </div>
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default MyCalendar;
