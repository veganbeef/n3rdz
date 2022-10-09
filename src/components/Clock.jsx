import { useEffect, useState } from 'react';
import { Panel } from 'react95';

function Clock() {
	const [timeString, setTimeString] = useState('12:00 AM');

	useEffect(() => {

		const updateTime = () => {
			const date = new Date();
			setTimeString(date.toLocaleTimeString([], { hour: 'numeric', minute:'2-digit', hour12: true }))
		};

		updateTime();

		const updateInterval = setInterval(() => {
			updateTime();
		}, 1000);

		return () => clearInterval(updateInterval);

	}, []);

	return (
		<Panel variant='well' style={{ padding: '0.1rem 0.5rem' }}>{timeString}</Panel>
	);
}

export default Clock;
