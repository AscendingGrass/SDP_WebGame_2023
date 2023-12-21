// @ts-nocheck


/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import {loadGame} from './loadGame';
import { grey } from '@mui/material/colors';
import { 
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
 } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { useData } from './DataContext';
import { Link, useBeforeUnload } from 'react-router-dom';
import { GameManager } from './Classes/GameManager';
import axios from 'axios';
import { useForm } from 'react-hook-form';


function App() {
  const [mode, setMode] = useState(false);
  const {state, dispatch} = useData();
  console.log(state);
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const submitData = async (data) => {
    const body = {...data, user_id : state.user._id};
    const result = (await axios.post("http://localhost:3000/postBug", body)).data;
    
    reset();
  };
  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    if(!state.user) {
      navigate("/login");
      return
    }

    let game = null;

    axios.get(`http://localhost:3000/load/${state.user._id}`).then(res => {
      console.log(res.data);

      game = loadGame(res.data.result, state.user._id)
    })

    return () => {
      if(game) game.pause()
    }
  }, [])


  return (
    <div className='flex h-full w-full'>
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
      <div className="right-side"style={{width:"20%", height:"100%"}}>
        <div className="UI flex flex-col h-full">
          <div className="flex gap-4 justify-end">
            <Button color="blue" id="save"  className="button save w-1/2">
                Save
            </Button>
            <Button color="red" id="exit" className="button exit w-1/2" onClick={()=>{navigate("/login")}} >
                Exit
            </Button>
          </div>
          <div className="Music">
            
          </div>
          <textarea name="console" style={{fontFamily:'monospace', width:"100%"}} className="console h-2/6" id="console" cols={30} spellCheck="false">

          </textarea>
          <div className="buttonsection flex gap-4 justify-end">
              <Button color="green" id="executeButton" className="button start w-1/2" >
                  Start
              </Button>
              <Button color="red" id="stopButton" className="button stop w-1/2" >
                  Stop
              </Button>
          </div>
          <div id="log" className="flex-grow basis-1" style={{color:"black", overflow:"scroll", padding:"5px"}}>

          </div>
          <div className="buttonsection flex gap-4">
              <Button id="report" onClick={handleOpen} className="button report w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-center" >
                  Report Bug
              </Button>
              <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Report Bug</DialogHeader>
                <form onSubmit={handleSubmit(submitData)}>
                  <DialogBody>
                    <div className="flex mb-3">
                      <Input label='Title' {...register("title")}/>
                    </div>
                    <div className="flex mb-3">
                      <Textarea label='Description' rows={10} {...register("description")}/>
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpen}
                      className="mr-1"
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" type='submit'>
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </form>
              </Dialog>

              <Link to="/game/help" className="button help w-1/2 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-center">
                Help
              </Link>

          </div>
        </div>
      </div>

    </div>
  )
}

export default App
