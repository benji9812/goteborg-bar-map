import React, { useState } from 'react';
import GoteborgMap from './components/GoteborgMap';
import StartPage from './components/StartPage';

function App() {
    const [started, setStarted] = useState(false);
    return (
        <>
            {!started ? (
                <StartPage onStart={() => setStarted(true)} />
            ) : (
                <GoteborgMap />
            )}
        </>
    );
}
export default App;
