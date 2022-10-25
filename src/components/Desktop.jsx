import styled from 'styled-components';
import { StarField } from 'starfield-react';

const Desktop = ({ children, loading, showStarField }) => {

	const Wrapper = styled.main`
		background: ${({ theme }) => theme.desktopBackground};
	  	height: 100%;
	  	display: flex;
	  	flex-direction: column;
	`;

	return (
		<Wrapper>
			{(!loading && showStarField) ? (
				<StarField
					width={window.innerWidth}
					height={window.innerHeight - 48}
					speed={6}
					fps={24}
				/>
			) : (<></>)}
			{children}
			{(!loading && showStarField) ? (
				<div className='fixed-center' style={{ color: 'white', fontSize: 'x-large' }}>The journey has just begun...</div>
			) : (<div className='fixed-center flex-center' style={{ flexDirection: 'column'}}>
				<div style={{ color: 'white', fontSize: 'x-large' }}>Mae g'ovannen, fellow N3RDS 🖖</div>
				<div style={{ color: 'white', fontSize: 'large' }}>Click Start to begin.</div>
			</div>)}
		</Wrapper>
	);
}

export default Desktop;
