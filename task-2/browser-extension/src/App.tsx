import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [colour, setColour] = useState('#ffffff') // Default to white
  const [colors, setColors] = useState<string[]>([])

  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [colour],
        func: (colour: string) => {
          document.body.style.backgroundColor = colour;
        },
      });
    }
  }

  const addColor = () => {
    if (!colors.includes(colour)) {
      setColors([...colors, colour]);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>
          Change Tab Background
        </button>
        <input
          type="color"
          value={colour}
          onChange={e => setColour(e.target.value)}
          style={{ marginLeft: '1em' }}
        />
        <button onClick={addColor} style={{ marginLeft: '1em' }}>
          Add Color
        </button>
        <div style={{ marginTop: '1em' }}>
          <strong>Added Colors:</strong>
          <div style={{ display: 'flex', gap: '0.5em', marginTop: '0.5em' }}>
            {colors.map((c, idx) => (
              <div key={idx} style={{
                width: '24px',
                height: '24px',
                backgroundColor: c,
                border: '1px solid #ccc'
              }} title={c}></div>
            ))}
          </div>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App