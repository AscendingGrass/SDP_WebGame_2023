/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import {loadGame} from './loadGame';
import { grey } from '@mui/material/colors';
import { Button } from '@material-tailwind/react';

// INI CUMAN BUAT NGETES AJA, APUS & GANTI2 AJA KALO MAU -Nichoasl, 18 Nov 23
function App() {
  const [mode, setMode] = useState(false)
  useEffect(() => {
    loadGame()
  }, [])

  return (
    <div style={{display:"flex",height:"100%",margin:"0px"}}>
    {/* <div style={{backgroundColor:'white'}}>
      <button onClick={()=> setMode(!mode)}>Toggle</button>
    </div>
    {
      mode &&
      <div className="top">NavBar or something </div>
    } */}
      <div className="left-side" style={{width:"80%", height:"100%"}}>
        <canvas id="view">
          
        </canvas>
      </div>
      <div className="right-side"style={{width:"20%"}}>
        <div className="UI">
        <div className="buttonsection">
                <Button color="blue" id="save"  className="button save ">
                    Save
                </Button>
                <Button color="red" id="exit" className="button exit" >
                    Exit
                </Button>
            </div>
            <div className="Music">
              ini harusnya musik
            </div>
            <textarea name="console" style={{fontFamily:'monospace', width:"100%"}} className="console" id="console" cols={30} rows={10} spellCheck="false">

            </textarea>
            <div className="buttonsection">
                <Button color="green" id="executeButton" className="button start" >
                    Start
                </Button>
                <Button color="red" id="stopButton" className="button stop" >
                    Stop
                </Button>
            </div>
            <div id="log" style={{color:"black", width:"200px", height:"200px"}}>

            </div>
            <div className="buttonsection">
                <Button id="report" className="button report" >
                    Report Bug
                </Button>
                <Button id="help" className="button help" >
                    Help
                </Button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default App
