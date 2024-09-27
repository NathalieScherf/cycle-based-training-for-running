// src/hooks/useMonthlyTracker.js

import { useState, useEffect } from 'react';

const MONTHLY_TRACKER_KEY = 'monthlyTrackerData';

const useMonthlyTracker = (defaultEventName = 'Monthly Event') => {
    const [lastRun, setLastRun] = useState(null);
    const [eventName, setEventName] = useState(defaultEventName);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedData = localStorage.getItem(MONTHLY_TRACKER_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            setLastRun(parsed.lastRun ? new Date(parsed.lastRun) : null);
            setEventName(parsed.eventName || defaultEventName);
        }
    }, [defaultEventName]);

    // Save data to localStorage whenever lastRun or eventName changes
    useEffect(() => {
        const data = {
            lastRun: lastRun ? lastRun.toISOString() : null,
            eventName,
        };
        localStorage.setItem(MONTHLY_TRACKER_KEY, JSON.stringify(data));
    }, [lastRun, eventName]);

    // Determine if the task should run
    const shouldRun = () => {
        if (!lastRun) return true;
        const now = new Date();
        const nextRun = new Date(lastRun);
        nextRun.setMonth(nextRun.getMonth() + 1);
        return now >= nextRun;
    };

    // Run the monthly task
    const runTask = () => {
        console.log(`${eventName} is running.`);
        // Insert your task logic here (e.g., send notification)

        setLastRun(new Date());
    };

    // Update event name
    const updateEventName = (newName) => {
        setEventName(newName);
    };

    return {
        lastRun,
        eventName,
        shouldRun,
        runTask,
        updateEventName,
    };
};

export default useMonthlyTracker;
