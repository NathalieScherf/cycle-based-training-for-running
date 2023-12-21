import { useEffect, useState } from 'react';
import './Calendar.css'
import { ArrowLeftSquare, ArrowRightSquare } from 'react-bootstrap-icons';



const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MyCalendar = () => {
  let today = new Date()
  const year = today.getFullYear();

  const [date, setDate] = useState(today);
  const [monthNR, setMonthNR] = useState(date.getMonth())
  const [monthName, setMonthName] = useState(monthNames[date.getMonth()])
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(0)
  const [lastDateOfMonth, setLastDateOfMonth] = useState(0)


  const getFirstDayOfMonth= (monthName, year) =>{
    const firstDay = new Date(`${monthName} 1, ${year}`);   
    setFirstDayOfMonth(firstDay.getDay()-1)
  }
  const getLastDateOfMonth = () => {
    const nextMonthFirstDay = new Date(year, monthNR+1, 1);   
    setLastDateOfMonth(new Date(nextMonthFirstDay - 1).getDate())
  };


  // useEffect(() => {
  //   getFirstDayOfMonth(monthName, year)
  //   getLastDateOfMonth()
  // }, [])

  useEffect(() => {
    console.log('date changes', date);
    getFirstDayOfMonth(monthName, year)
    getLastDateOfMonth()
    setMonthNR(date.getMonth())
    setMonthName(monthNames[date.getMonth()])
  }, [date])


  const handleDateClick = (day) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), day));
  };

  const generateMonth = () => {
    // Kanlender wirh nicht korrekt gerendert bei Monatswechsel
    
    let calendarDays = []
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
    for (let x = 37; x > lastDateOfMonth ; x--) {
      calendarDays.push(<div key={`empty-${x}`} className="empty-cell">end</div>);
    }
    return calendarDays
  }
  const getMonthName = (monthNR) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let name = month[monthNR];
    return name
  }

  const getPreviousMonth = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const previousMonth = new Date(currentYear, currentMonth - 1, 1);
    console.log(previousMonth);
    setDate(previousMonth)
  };


  const getNextMonth = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    console.log(nextMonth);
    setDate(nextMonth)
  };
  return (
    <div>
      <h1>React Calendar Component</h1>
      <div className="calendar">
        <div className='month'> <ArrowLeftSquare size={32} onClick={() => getPreviousMonth(date)} /><span> {getMonthName(monthNR)} </span> <ArrowRightSquare size={32} onClick={() => getNextMonth(date)} /> </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className='calendar-days'>
          {generateMonth()}
        </div>
      </div>
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default MyCalendar;
