// src/components/Legend.js

const Legend = () => {
    const legends = [
        { color: '#FFB6C1', label: 'Menstrual Phase', training: 'koordiation and light' },
        { color: '#98FB98', label: 'Follicular Phase', training: 'speed and power' },
        { color: '#FFD700', label: 'Ovulation Phase', training: 'ausdauer' },
        { color: '#87CEFA', label: 'Shit Phase', training: 'moderat ausdauer ' },
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
                        {item.label},{item.training}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Legend;
