/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import axios from 'axios';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';

const News = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { state, dispatch } = useData();
  const [updateMode, setUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
 
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: state.user.username,
      email: state.user.email,
      password: state.user.password,
    },
  });

  const handleSaveChanges = async (data) => {
    const body = { id: state.user._id, ...data };
    console.log(body);

    setIsLoading(true);
    const result = (await axios.put(`${backendURL}/updateUser`, body)).data;
    console.log(result);

    dispatch({ type: 'SET_USER', user: result.result, access_token: state.access_token });
    setIsLoading(false);
    setUpdateMode(false);
  };

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT_USER' });
    navigate('/');
  };

  const handleDeleteAcc = async ()=> {
    handleOpen(); 
    await axios.delete(`${backendURL}/deleteUser/${state.user._id}`);
    handleLogOut();
  }

  return (
    <div className="flex flex-row w-full h-full px-5">
      <form className="mt-8 mb-2 w-1/2" onSubmit={handleSubmit(handleSaveChanges)}>
        <div className="mb-1 flex flex-row items-center">
          <Typography variant="h6" color="blue-gray" className="-mb-3 basis-3/12">
            Username
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-blue-gray-200 focus:!border-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            disabled={!updateMode}
            {...register('username')}
          />
        </div>
        <div className="mb-1 flex flex-row items-center">
          <Typography variant="h6" color="blue-gray" className="-mb-3 basis-3/12">
            Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-blue-gray-200 focus:!border-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            disabled={!updateMode}
            {...register('email')}
          />
        </div>
        <div className="mb-1 flex flex-row items-center">
          <Typography variant="h6" color="blue-gray" className="-mb-3 basis-3/12">
            Password
          </Typography>
          <Input
            type="text"
            size="lg"
            placeholder="********"
            className=" !border-blue-gray-200 focus:!border-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            disabled={!updateMode}
            {...register('password')}
          />
        </div>
        <div className="mt-2 flex gap-4 justify-center">
          {!updateMode && (
            <Button
              type="button"
              className="focus:!border-red-500"
              color="blue"
              onClick={() => {
                setUpdateMode(true);
              }}
            >
              Edit Account
            </Button>
          )}
          {updateMode && (
            <Button type="submit" size='sm' className="focus:!border-green-500" color="green" disabled={isLoading}>
              Save Changes
            </Button>
          )}
          <Button type="button" variant='filled' className="focus:!border-red-500" color="red" onClick={handleOpen}>
            Delete Account
          </Button>
          <Dialog size='xs' open={open} handler={handleOpen}>
            <DialogHeader >Alert!</DialogHeader>
            <DialogBody>
             Are you sure want to delete your account?
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
              <Button variant="gradient" color="green" onClick={handleDeleteAcc}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </form>
      <div className="mt-8 mb-2 w-1/2">
        <Button className="focus:!border-red-500 float-right" color="red" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default News;
