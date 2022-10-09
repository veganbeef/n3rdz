import styled from 'styled-components';
import React from 'react';

const Main = ({ children }) => {

	const Wrapper = styled.main`
		background: ${({ theme }) => theme.desktopBackground};
	  	height: 100%;
	  	display: flex;
	  	flex-direction: column;
	`;

	return (
		<Wrapper>
			{children}
		</Wrapper>
	);
}

export default Main;
