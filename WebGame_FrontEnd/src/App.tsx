/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import {loadGame} from './loadGame';
import { grey } from '@mui/material/colors';

// INI CUMAN BUAT NGETES AJA, APUS & GANTI2 AJA KALO MAU -Nichoasl, 18 Nov 23
function App() {
  const [mode, setMode] = useState(false)
  useEffect(() => {
    loadGame()
  }, [])

  return (
    <div style={{display:"flex",height:"600px",margin:"0px"}}>
    {/* <div style={{backgroundColor:'white'}}>
      <button onClick={()=> setMode(!mode)}>Toggle</button>
    </div>
    {
      mode &&
      <div className="top">NavBar or something </div>
    } */}
      <div className="left-side" style={{width:"80%"}}>
        <div style={{fontSize:"30px"}}>Game Screen</div>
        <canvas id="view">
          
        </canvas>
      </div>
      <div className="right-side"style={{width:"20%"}}>
        <div className="UI">
        <div className="buttonsection">
                <button id="save" className="button save" style={{width:"30px",height:"30px" ,color:"black"}}>
                    Save
                </button>
                <button id="exit" className="button exit"  style={{width:"30px",height:"30px" ,color:"black"}}>
                    Exit
                </button>
            </div>
            <div className="Music">
              ini harusnya musik
            </div>
            <textarea name="console" style={{fontFamily:'monospace'}} className="console" id="console" cols={30} rows={10} spellCheck="false">

            </textarea>
            <div className="buttonsection">
                <button id="executeButton" className="button start" style={{width:"30px",height:"30px" ,color:"black"}}>
                    Start
                </button>
                <button id="stopButton" className="button stop"  style={{width:"30px",height:"30px" ,color:"black"}}>
                    Stop
                </button>
            </div>
            <div id="log" style={{color:"black", width:"200px", height:"200px"}}>

            </div>
            <div className="buttonsection">
                <button id="report" className="button report" style={{width:"30px",height:"30px" ,color:"black"}}>
                    Report Bug
                </button>
                <button id="help" className="button help"  style={{width:"30px",height:"30px" ,color:"black"}}>
                    Help
                </button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default App
