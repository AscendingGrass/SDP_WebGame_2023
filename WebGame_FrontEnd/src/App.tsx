import { useEffect, useState } from 'react'
import './App.css'
import {loadGame} from './loadGame';

// INI CUMAN BUAT NGETES AJA, APUS & GANTI2 AJA KALO MAU -Nichoasl, 18 Nov 23
function App() {
  const [mode, setMode] = useState(false)
  useEffect(() => {
    loadGame()
  }, [])

  return (
    <>
    <div style={{backgroundColor:'white'}}>
      <button onClick={()=> setMode(!mode)}>Toggle</button>
    </div>
    {
      mode &&
      <div className="top">NavBar or something </div>
    }
      <div className="left-side">
        <canvas id="view">

        </canvas>
      </div>
      <div className="right-side">
          <div className="UI">
              <button className="button-shop">button-shop</button>
              <div className="shop-html"></div>
          </div>

          <div className="UI">
              <textarea name="console" className="console" id="console" cols={30} rows={10} spellCheck="false">

              </textarea>
              <div className="buttonsection">
                  <button id="executeButton" className="button start">
                      Start
                  </button>
                  <button id="stopButton" className="button stop">
                      Stop
                  </button>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
