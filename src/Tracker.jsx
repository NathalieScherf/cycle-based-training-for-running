import { useEffect, useState } from "react"

const Tracker = () => {
  let km = 15


  let [weeksDiffFromNow, setWeekDifferenceFromNow] = useState(0)
  let [weeksDiffFromStart, setWeekDifferenceFromStart] = useState(0)
  let [weeks, setWeeksToRun] = useState([])
  let [startingWeek, setStartingWeek] = useState(new Date('Jan 1, 2024 08:15:30'))
  let [goalWeek, setGoalWeek] = useState()
  let [currentWeek, setCurrentWeek] =useState()
  // let [startingDistance ] =  useState(km)

  const calculateWeeksDifference = (startDate = new Date()) => {
    const currentDate = startDate;
    const targetDate = new Date(2024, 4, 25);
    const timeDifference = targetDate - currentDate;
    // Calculate the number of weeks
    const weeksDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7));
    return weeksDifference
  };
  const getWeekNr = (date) =>{

  let currentDate = new Date(date);
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
   
  let weekNumber = Math.ceil(days / 7);
    // Display the calculated result       
    console.log("Week number of " + currentDate +
    " is :   " + weekNumber);
  return weekNumber

  }
  useEffect(() => {
    let weeksDiffFromNow = calculateWeeksDifference()
    setWeekDifferenceFromNow(weeksDiffFromNow)
    let weeksDiffFromStart = calculateWeeksDifference(startingWeek)
    setWeekDifferenceFromStart(weeksDiffFromStart)

    let weeks = createArray(weeksDiffFromStart)
    setWeeksToRun(weeks)

    let currentWeek = getWeekNr(new Date())
    let goalWeek = getWeekNr(new Date(2024, 4, 25))

    setCurrentWeek(currentWeek)
    setGoalWeek(goalWeek)
  }, [])


  function createArray(length) {
    const newArray = [];
    for (let i = 1; i <= length; i++) {
      newArray.push(i); // You can initialize with any value
    }
    return newArray;
  }


  return (
    <div>
      <p>Starting Date: {startingWeek.toDateString()}</p>

      <p className="fw-bold">Current date: {new Date().toDateString()}</p>
      <p>Weeks until May 25, 2024: {goalWeek - currentWeek} weeks</p>
      <ul className="divide-y divide-gray-100" role='list'>
        {weeks.map((week, index) => {
          console.log(week, index);
          if (((weeksDiffFromStart - week) < 2 && (week % 4 == 0)) || (weeksDiffFromStart - week) < 2) {
            km = km - km * 0.3
            return <li className='list-group-item bg-emerald-200' key={week}>Run {Math.floor(Math.round(km))} km in week {week} </li>
          }
          else if (week % 4 == 0) {
            
            return <li className='list-group-item bg-emerald-100' key={week}>Run {Math.floor(Math.round(km) - (km * 0.15))} km in week {week} </li>
          }
          else {
            km = km + km * 0.1
            // current week is red
            return (<li className={week == (weeksDiffFromStart - weeksDiffFromNow) ? 'list-group-item bg-primary text-red-500' : 'list-group-item'} key={week}>Run {Math.round(km)} km in week {week} </li>)
          }
        })}
      </ul>

    </div>
  )
}
export default Tracker