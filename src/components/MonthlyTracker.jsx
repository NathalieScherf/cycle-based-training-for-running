// src/components/MonthlyTracker.js

import React, { useState } from 'react';
import useMonthlyTracker from '../hooks/useMonthlyTracker';

const MonthlyTracker = () => {
    const {
        lastRun,
        eventName,
        shouldRun,
        runTask,
        updateEventName,
    } = useMonthlyTracker('Billing Cycle');

    const [newEventName, setNewEventName] = useState(eventName);

    const handleEventNameChange = (e) => {
        setNewEventName(e.target.value);
    };

    const handleUpdateEventName = () => {
        updateEventName(newEventName);
    };

    // Automatically run the task if needed
    React.useEffect(() => {
        if (shouldRun()) {
            runTask();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Calculate next run date
    const getNextRunDate = () => {
        if (!lastRun) return 'Never';
        const nextRun = new Date(lastRun);
        nextRun.setMonth(nextRun.getMonth() + 1);
        return nextRun.toLocaleDateString();
    };

    return (
        <div className="tracker monthly-tracker">
            <h2>Monthly Tracker</h2>
            <p><strong>Event Name:</strong> {eventName}</p>
            <p><strong>Last Run:</strong> {lastRun ? new Date(lastRun).toLocaleDateString() : 'Never'}</p>
            <p><strong>Next Run:</strong> {getNextRunDate()}</p>
            <div className="event-name-update">
                <label htmlFor="eventName">Update Event Name:</label>
                <input
                    type="text"
                    id="eventName"
                    value={newEventName}
                    onChange={handleEventNameChange}
                />
                <button onClick={handleUpdateEventName}>Update</button>
            </div>
        </div>
    );
};

export default MonthlyTracker;
