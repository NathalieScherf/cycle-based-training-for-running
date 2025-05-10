// src/hooks/usePeriodTracker.js

import { useState, useEffect } from 'react';
import { FOL_PHASE, MENS_PHASE, OV_PHASE, SHIT_PHASE } from '../assets/phases';

// Define the four phases with default durations (in days)
const DEFAULT_PHASES = [
    { name: MENS_PHASE, duration: 4 },
    { name: FOL_PHASE, duration: 9 },
    { name: OV_PHASE, duration: 9 },
    { name: SHIT_PHASE, duration: 5 },
];

// Storage key for persisting data
export const PERIOD_TRACKER_KEY = 'periodTrackerData';

const usePeriodTracker = (defaultCycleLength = 27) => {
    const [periodStartDate, setPeriodStartDate] = useState(new Date());
    const [cycleLength, setCycleLength] = useState(defaultCycleLength);
    const [phases, setPhases] = useState(DEFAULT_PHASES);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedData = localStorage.getItem(PERIOD_TRACKER_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            setPeriodStartDate(new Date(parsed.periodStartDate));
            setCycleLength(parsed.cycleLength);
            setPhases(parsed.phases || DEFAULT_PHASES);
        } else {
            // Initialize with default phases and current date
            const initialData = {
                periodStartDate: new Date().toISOString(),
                cycleLength: defaultCycleLength,
                phases: DEFAULT_PHASES,
            };
            localStorage.setItem(PERIOD_TRACKER_KEY, JSON.stringify(initialData));
        }
    }, [defaultCycleLength]);

    // Save data to localStorage whenever relevant state changes
    useEffect(() => {
        const data = {
            periodStartDate: periodStartDate.toISOString(),
            cycleLength,
            phases,
        };
        localStorage.setItem(PERIOD_TRACKER_KEY, JSON.stringify(data));
    }, [periodStartDate, cycleLength, phases]);

    // Calculate the current cycle day
    const getCurrentCycleDay = () => {
        const now = new Date();
        const diffTime = now - new Date(periodStartDate);
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
        setPeriodStartDate(new Date());
    };

    // Update cycle length and adjust phase durations proportionally
    const updateCycleLength = (newLength) => {
        if (newLength > 0) {
            // Calculate the ratio of new cycle length to old cycle length
            const ratio = newLength / cycleLength;
            // Adjust each phase duration
            const updatedPhases = phases.map(phase => ({
                ...phase,
                duration: Math.max(1, Math.round(phase.duration * ratio)), // Ensure at least 1 day
            }));
            setCycleLength(newLength);
            setPhases(updatedPhases);
        }
    };

    // Update start date
    const updateStartDate = (newStartDate) => {
        setPeriodStartDate(new Date(newStartDate));
    };

    // Determine the current phase based on the cycle day
    const getCurrentPhase = () => {
        const currentDay = getCurrentCycleDay();
        let dayCounter = 0;
        for (let phase of phases) {
            dayCounter += phase.duration;
            if (currentDay <= dayCounter) {
                return phase.name;
            }
        }
        return 'Unknown Phase'; // Fallback
    };

    // Get the phase for a specific cycle day
    const getPhaseByDay = (day) => {
        let dayCounter = 0;
        for (let phase of phases) {
            dayCounter += phase.duration;
            if (day <= dayCounter) {
                return phase.name;
            }
        }
        return 'Unknown Phase'; // Fallback
    };

    return {
        cycleLength,
        phases,
        getCurrentCycleDay,
        daysUntilNextCycle,
        resetCycle,
        updateCycleLength,
        updateStartDate,
        getCurrentPhase,
        getPhaseByDay,
    };
};

export default usePeriodTracker;
