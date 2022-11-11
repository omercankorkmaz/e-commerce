import React from 'react';
import './assets/global.css';
import { Button } from 'primereact/button';

function App() {
    return (
        <div className="App">
            <Button label="INITIAL" loading loadingIcon="pi pi-spin pi-sun" />
        </div>
    );
}

export default App;
