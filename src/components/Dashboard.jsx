import PeriodTracker from './PeriodTracker';
import MonthlyTracker from './MonthlyTracker';
import CalendarDisplay from './CalendarDisplay';
import Legend from './Ledgend';
import { useState, useEffect } from 'react';
import { PERIOD_TRACKER_KEY } from '../hooks/usePeriodTracker';
import WeeksUntil from './WeeksUntil';

const Dashboard = () => {
    const [periodStartDate, setPeriodStartDate] = useState(new Date());


    useEffect(() => {
        const storedData = localStorage.getItem(PERIOD_TRACKER_KEY);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log(parsedData);
            
            setPeriodStartDate(new Date(parsedData.periodStartDate));
        }
    }, []);

    const handleStartDateChange = (newStartDate) => {
        setPeriodStartDate(newStartDate);
        localStorage.setItem(PERIOD_TRACKER_KEY, JSON.stringify({
            periodStartDate: newStartDate.toISOString(),
        }));
    };

    return (
        <div className="dashboard">
            <h1>Tracker Dashboard</h1>
            <div className="trackers">
                {/* <PeriodTracker periodStartDate={periodStartDate} setPeriodStartDate={handleStartDateChange}/> */}
                <MonthlyTracker />
                <WeeksUntil />
            </div>
            <CalendarDisplay periodStartDate={periodStartDate} setPeriodStartDate={handleStartDateChange}/>
            <Legend />

        </div>
    );
};

export default Dashboard;
