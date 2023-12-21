import { useEffect, useState } from "react"

const Tracker = () => {
  let km = 10

  let [weeksDifference, setWeekDifference] = useState(0)
  let [weeks, setWeeksToRun] = useState([])
  // let [startingDistance ] =  useState(km)

  const calculateWeeksDifference = () => {
    const currentDate = new Date();
    const targetDate = new Date(2024, 4, 25);
    const timeDifference = targetDate - currentDate;
    // Calculate the number of weeks
    const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    setWeekDifference(weeksDifference)
  };

  useEffect(() => {
    calculateWeeksDifference()
    setWeeksToRun(createArray(weeksDifference))

  }, [])

  // Example usage
  // 
  function createArray(length) {
    const newArray = [];
    for (let i = 1; i <= length; i++) {
      newArray.push(i); // You can initialize with any value
    }
    return newArray;
  }


  return (
    <div>
      {/* Pause alle 3 wochen */}
      <p>Current date: {new Date().toDateString()}</p>
      <p>Weeks until May 25, 2024: {weeksDifference} weeks</p>
      {weeks.map((week, index) => {
        if (week % 4 == 0) {
          return <p key={week}>Run {Math.round(km) - 3} km in week {index +1 } </p>
        } else {
          km = km + km * 0.1
          return (<p key={week}>Run {Math.round(km)} km in week {index + 1} </p>)
        }
      })}


    </div>
  )
}
export default Tracker