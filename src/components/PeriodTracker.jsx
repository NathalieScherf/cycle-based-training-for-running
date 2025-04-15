// src/components/PeriodTracker.js

import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import usePeriodTracker from '../hooks/usePeriodTracker';

const PeriodTracker = ({startDate, setStartDate}) => {
    const {
        cycleLength,
        getCurrentCycleDay,
        daysUntilNextCycle,
        resetCycle,
        updateCycleLength,
    } = usePeriodTracker();

    const [newCycleLength, setNewCycleLength] = useState(cycleLength);

    const handleCycleLengthChange = (e) => {
        setNewCycleLength(Number(e.target.value));
    };

    const handleUpdateCycleLength = () => {
        updateCycleLength(newCycleLength);
    };

    return (
        <div className="tracker period-tracker">
            <h2>Period Tracker</h2>
            <div><strong>Cycle Start Date:</strong> 
            <DatePicker selected={startDate}  onSelect={(date) => setStartDate(date)} /></div>

            <p><strong>Cycle Length:</strong> {cycleLength} days</p>
            <p><strong>Current Cycle Day:</strong> {getCurrentCycleDay()}</p>
            <p><strong>Days Until Next Cycle:</strong> {daysUntilNextCycle()}</p>
            <button onClick={resetCycle}>Reset Cycle</button>
            <div className="cycle-length-update">
                <label htmlFor="cycleLength">Update Cycle Length:</label>
                <input
                    type="number"
                    id="cycleLength"
                    value={newCycleLength}
                    onChange={handleCycleLengthChange}
                    min="1"
                />
                <button onClick={handleUpdateCycleLength}>Update</button>
            </div>
        </div>
    );
};

export default PeriodTracker;
