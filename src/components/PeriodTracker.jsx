// src/components/PeriodTracker.js

import { useState } from 'react';
import usePeriodTracker from '../hooks/usePeriodTracker';

const PeriodTracker = () => {
    const {
        startDate,
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
            <p><strong>Cycle Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
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
