import {useEffect, useState} from 'react';

const Cursor = () => {
	const [blink, setBlink] = useState(false);

	useEffect(() => {
		const toggleBlink = () => {
			setBlink(!blink);
		};

		const blinkInterval = setInterval(toggleBlink, 250);

		return () => clearInterval(blinkInterval);
	}, [blink]);

	return (<>
		{blink ? (
			<span>&ensp;</span>
		) : (
			<span>_</span>
		)}
	</>);
};

export default Cursor;
