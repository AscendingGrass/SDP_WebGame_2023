/* eslint-disable @typescript-eslint/no-unused-vars */
import { CogIcon, HomeIcon, PlusIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";

const News = () => {
  const {state, dispatch} = useData();

  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleOpen = () => setOpen(!open);
  const submitData = async (data) => {
    const body = {...data, user_id : state.user._id};
    const result = (await axios.post(`${import.meta.env.VITE_BACKEND_URL}/insertAnnoucement`, body)).data;
    
    reset();
  };

  useEffect(()=>{
    const fetchNews = async () => {
      setNews((await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetchAnnouncement`)).data.result);
    }

    fetchNews();
  }, [open]);

  return (
    <div className="container  mt-20 "  style=  {{ overflowX: 'auto'}}>
      <div className="absolute top-0 right-0 mt-20">
        <SpeedDial placement="left">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction onClick={handleOpen}>
              <HomeIcon className="h-5 w-5" />
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <div className="row mb-3 flex flex-wrap  w-full ">
        {news.map((item, index) => (
          <div className="col-lg-4 mb-3 justify-content-evenly justify-center flex " key={index}>
            <div className="card rounded-md table w-3/4 border-solid border-8 border-gray-400 bg-gray-400 ">
              <div className="card-header">
                <div className="card-title text-2xl font-bold">{item.title}</div>
              </div>
              <div className="card-body mt-6">
                {item.description}
              </div>
              <div className="card-footer mt-6">
                {item.created_at}
              </div>
              <div className="card-footer mt-2">
                {item.by}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>News</DialogHeader>
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
    </div>
  );
}
  
  export default News;
  