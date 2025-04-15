// src/components/Dashboard.js

import PeriodTracker from './PeriodTracker';
import MonthlyTracker from './MonthlyTracker';
import CalendarDisplay from './CalendarDisplay';
import Legend from './Ledgend';
import { useState } from 'react';


const Dashboard = () => {
    const [startDateX, setStartDateX] = useState(new Date());
    return (
        <div className="dashboard">
            <h1>Tracker Dashboard</h1>
            <div className="trackers">
                <PeriodTracker startDate={startDateX} setStartDate={setStartDateX}/>
                <MonthlyTracker />
            </div>
            <CalendarDisplay startDate={startDateX}/>
            <Legend />

        </div>
    );
};

export default Dashboard;
