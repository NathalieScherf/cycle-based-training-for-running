// src/hooks/usePeriodTracker.js

import { useState, useEffect } from 'react';

const PERIOD_TRACKER_KEY = 'periodTrackerData';

const usePeriodTracker = (defaultCycleLength = 28) => {
    const [startDate, setStartDate] = useState(new Date());
    const [cycleLength, setCycleLength] = useState(defaultCycleLength);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedData = localStorage.getItem(PERIOD_TRACKER_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            setStartDate(new Date(parsed.startDate));
            setCycleLength(parsed.cycleLength);
        }
    }, []);

    // Save data to localStorage whenever startDate or cycleLength changes
    useEffect(() => {
        const data = {
            startDate: startDate.toISOString(),
            cycleLength,
        };
        localStorage.setItem(PERIOD_TRACKER_KEY, JSON.stringify(data));
    }, [startDate, cycleLength]);

    // Calculate the current cycle day
    const getCurrentCycleDay = () => {
        const now = new Date();
        const diffTime = now - new Date(startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays % cycleLength) + 1; // Day 1 to cycleLength
    };

    // Calculate days until next cycle
    const daysUntilNextCycle = () => {
        const currentDay = getCurrentCycleDay();
        return cycleLength - currentDay + 1;
    };

    // Reset cycle to current date
    const resetCycle = () => {
        setStartDate(new Date());
    };

    // Update cycle length
    const updateCycleLength = (newLength) => {
        if (newLength > 0) {
            setCycleLength(newLength);
        }
    };

    return {
        startDate,
        cycleLength,
        getCurrentCycleDay,
        daysUntilNextCycle,
        resetCycle,
        updateCycleLength,
    };
};

export default usePeriodTracker;
