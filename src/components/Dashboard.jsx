// src/components/Dashboard.js

import PeriodTracker from './PeriodTracker';
import MonthlyTracker from './MonthlyTracker';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Tracker Dashboard</h1>
            <div className="trackers">
                <PeriodTracker />
                <MonthlyTracker />
            </div>
        </div>
    );
};

export default Dashboard;
