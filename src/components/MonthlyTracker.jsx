import React from 'react';
import useMonthlyTracker from '../hooks/useMonthlyTracker';

const MonthlyTracker = () => {
    const {
        lastRun,
        eventName,
        shouldRun,
        runTask,
    } = useMonthlyTracker('Period');
  

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
            <p><strong>Last Start:</strong> {lastRun ? new Date(lastRun).toLocaleDateString() : 'Never'}</p>
            <p><strong>Next Start:</strong> {getNextRunDate()}</p>
        </div>
    );
};

export default MonthlyTracker;
