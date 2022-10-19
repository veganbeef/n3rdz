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
import NerdcaveModal from './components/NerdcaveModal';
import WalletConnectorModal from './components/WalletConnectorModal';
import BootLoader from './components/BootLoader';
import NerdLoader from './components/NerdLoader';
import ProjectInfoWizard from './components/ProjectInfoWizard';
import LinksModal from './components/LinksModal';

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
    const [nerdLoader, setNerdLoader] = React.useState(false);
    const [showStarField, toggleStarField] = React.useState(false);

    const switchLoaders = () => {
        setBootLoader(false);
        setNerdLoader(true);
        setTimeout(() => setNerdLoader(false), 1000);
    };

    return (<Store>
        <GlobalStyles/>
        <ThemeProvider theme={original}>
            <BootLoader hidden={!bootLoader} switchLoaders={switchLoaders} />
            <div style={bootLoader ? {display: 'none'} : {height: '100%', display: 'flex', flexDirection: 'column'}}>
                <TaskBar loading={bootLoader || nerdLoader}/>
                <Desktop loading={bootLoader || nerdLoader} showStarField={showStarField}>
                    <ProjectInfoWizard />
                    <LinksModal />
                    <NerdcaveModal loading={bootLoader || nerdLoader} toggleStarField={toggleStarField} />
                    <WalletConnectorModal />
                    <NerdLoader nerdLoader={nerdLoader}  />
                </Desktop>
            </div>
        </ThemeProvider>
    </Store>);
};

export default App;
