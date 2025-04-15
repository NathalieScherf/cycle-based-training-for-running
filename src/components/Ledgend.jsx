// src/components/Legend.js

const Legend = () => {
    const legends = [
        { color: '#FFB6C1', label: 'Menstrual Phase' },
        { color: '#98FB98', label: 'Follicular Phase' },
        { color: '#FFD700', label: 'Ovulation Phase' },
        { color: '#87CEFA', label: 'Shit Phase' },
        { color: '#D3D3D3', label: 'Unknown Phase' },
        { color: '#000', label: 'Monthly Event' }, // Same color as Luteal Phase for consistency
    ];

    return (
        <div className="legend">
            <h3>Legend</h3>
            <ul>
                {legends.map((item, index) => (
                    <li key={index}>
                        <span
                            className="legend-color"
                            style={{
                                display: 'inline-block',
                                width: '15px',
                                height: '15px',
                                backgroundColor: item.color,
                                marginRight: '10px',
                                borderRadius: '3px',
                            }}
                        ></span>
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Legend;
