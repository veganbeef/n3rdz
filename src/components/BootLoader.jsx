import {useEffect, useState} from 'react';
import Cursor from './Cursor';

const BootLoader = ({setBootLoader}) => {
	const [bootPhase, setBootPhase] = useState(0);
	const [nerdCount, setNerdCount] = useState(0);

	const handleKeyPress = (event) => {
		console.log('key press');
		if (event.key === 'Enter' && bootPhase > 2) {
			window.removeEventListener('keypress', handleKeyPress);
			setBootLoader(false);
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
		let bootLoaderInterval;

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

		if (bootPhase >= 2) {
			clearInterval(bootLoaderInterval);
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
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between'
		}}>
			<div>
				<div style={{lineHeight: '2'}}>
					<div>N3RDBIOS C(2022) Road To Z Inc. All rights reserved.</div>
					<br />
					<div>{nerdCount.toString().padStart(6, '0')} N3RDS OK{bootPhase === 0 ? (<Cursor />) : (<></>)}</div>
					{/*<div>Hit &lt;DEL&gt;, If you want to run SETUP</div>*/}
				</div>
				<br />
				{bootPhase > 0 ? (<>
					<div>Preparing to start your computer.</div>
					<div>This may take a few minutes...{bootPhase > 1 ? '(lol jk)' : (<Cursor />)}</div>
				</>) : (<></>)}
				<br />
				{bootPhase > 2 ? (<>
					<div>N3RDEX Version 2.0</div>
					<div>Copyright (C) Road To Z Corp. 1995-2022. All rights reserved.</div>
					<div>Drive N3RDZ: = Driver N3RD2001 unit 0</div>
					<br />
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
