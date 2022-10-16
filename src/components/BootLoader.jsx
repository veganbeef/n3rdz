import {useEffect, useState} from 'react';
import Cursor from './Cursor';

const BootLoader = ({switchLoaders, hidden}) => {
	const [bootPhase, setBootPhase] = useState(0);
	const [nerdCount, setNerdCount] = useState(0);

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && bootPhase > 2) {
			window.removeEventListener('keypress', handleKeyPress);
			switchLoaders();
		}
	};

	window.addEventListener('keydown', handleKeyPress);

	useEffect(() => {
		const nerdCountInterval = setTimeout(() => {
			setNerdCount(nerdCount + 1);
		}, 1);

		if (nerdCount > 2000) {
			clearInterval(nerdCountInterval);
			setBootPhase(1);
		}
	}, [nerdCount]);

	useEffect(() => {
		if (bootPhase === 1) {
			setTimeout(() => {
				setBootPhase(2);
				console.log(`set bootPhase to 2`);
				setTimeout(() => {
					setBootPhase(3);
					console.log(`set bootPhase to 3`);
				}, 600);
			}, 1000);
		}
	}, [bootPhase]);

	return (
		<div style={{
			height: '100%',
			background: 'black',
			color: 'white',
			padding: '20px',
			fontFamily: 'november',
			fontSize: '18px',
			display: `${hidden ? 'none' : 'flex'}`,
			flexDirection: 'column',
			justifyContent: 'space-between'
		}}>
			<div>
				<div style={{lineHeight: '2'}}>
					<div>N3RDBIOS C(2022) Road To Z Inc. All rights reserved.</div>
					<br />
					<div>{nerdCount.toString().padStart(6, '0')} N3RDS OK{bootPhase === 0 ? (<Cursor />) : (<></>)}</div>
				</div>
				<br />
				{bootPhase > 0 ? (<>
					<div>N3RDEX Version 2.0</div>
					<div>Copyright (C) Road To Z Corp. 1995-2022. All rights reserved.</div>
					<div>Drive N3RDZ: = Driver N3RD2001 unit 0</div>
					<br />
					<div>Preparing to start your computer.</div>
					<div>This may take a few minutes...{bootPhase > 1 ? '(lol jk)' : (<Cursor />)}</div>
				</>) : (<></>)}
				<br />
				{bootPhase > 2 ? (<>
					<div>N3RDZ:\&gt; GM_GN<Cursor /></div>
					<br />
					<br />
					<br />
					<div>To continue, press ENTER.</div>
				</>) : (<></>)}
			</div>
			<div>
				<div>with love &lt;3 <a href='https://twitter.com/_veganbeef'>veganbeef</a></div>
				<div>{window.navigator.userAgent}</div>
			</div>
		</div>
	);
};

export default BootLoader;
