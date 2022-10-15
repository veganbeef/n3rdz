import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { styleReset } from 'react95';
// pick a theme of your choice
import original from 'react95/dist/themes/original';
// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import TaskBar from './components/TaskBar';
import Desktop from './components/Desktop';
import Store from './Store';
import ProjectInfoModal from './components/ProjectInfoModal';
import MembersOnlyModal from './components/MembersOnlyModal';
import WalletConnectorModal from './components/WalletConnectorModal';
import BootLoader from './components/BootLoader';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  html, body, #root {
    font-family: 'ms_sans_serif';
    height: 100%;
  }
`;

const App = () => {
    const [bootLoader, setBootLoader] = React.useState(true);

    return (<Store>
        <GlobalStyles/>
        <ThemeProvider theme={original}>
            <div style={bootLoader ? {height: '100%', display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
                <BootLoader setBootLoader={setBootLoader} />
            </div>
            <div style={bootLoader ? {display: 'none'} : {height: '100%', display: 'flex', flexDirection: 'column'}}>
                <TaskBar/>
                <Desktop>
                    <ProjectInfoModal/>
                    <MembersOnlyModal/>
                    <WalletConnectorModal/>
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        color: 'white',
                        fontSize: 'x-large'
                    }}>Hello, fellow N3RDS 🖖
                    </div>
                </Desktop>
            </div>
        </ThemeProvider>
    </Store>);
};

export default App;
