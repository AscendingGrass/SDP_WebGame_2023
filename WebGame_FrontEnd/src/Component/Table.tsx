/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { UserPlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
 
const TABS = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Dead",
    value: "dead",
  },
];
 
const TABLE_HEAD = ["Member", "Gender", "Status", "Role", "Action"];
 

export function Table() {
    const [table, setTable] = useState([]);
    const [mode, setMode] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        const fetch = async ()=> {
            setIsLoading(true);
            const body = {
                page
            }
            const data = (await axios.get(`http://localhost:3000/allUser/${mode}?page=${page}`, body)).data;
            console.log(data);
            
            setTable(data.result);
            setTotalPage(data.totalPages);
            setIsLoading(false);
        };
        fetch();
    }, [page, mode])

    const incremetPage = ()=>{
        setPage(page + 1);
    }

    const decrementPage = ()=>{
        setPage(page - 1);
    }

    const deleteUser = async (id) => {
        const deletedUser = await axios.delete("http://localhost:3000/deleteUser/" + id);
        setPage(1);
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none h-1/6">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                    <Typography variant="h5" color="blue-gray">
                        Accounts list
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        See information about all members
                    </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Button variant="outlined" size="sm">
                        view all
                    </Button>
                    <Button className="flex items-center gap-3" size="sm">
                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                    </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max bg-gray-100 rounded-lg">
                    <TabsHeader>
                        {TABS.map(({ label, value }) => (
                        <Tab key={value} value={value} className="px-5"
                            onClick={()=>{
                                setMode(value);
                                setPage(1);
                            }}
                        >
                            {label}
                        </Tab>
                        ))}
                    </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                    <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll h-4/6 mt-4 px-0">
                {
                    isLoading && 
                    <Spinner/>
                }
                {
                    !isLoading &&
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        {
                            totalPage == 0 &&
                            <div className="grid place-content-center h-full text-4xl">
                                NO DATA
                            </div>
                        }
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                                >
                                {head}
                                </Typography>
                            </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody >
                        {table.map(
                            ({ _id, username, password, gender, role, status }, index) => {
                            const isLast = index === table.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                    <Avatar src={"https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"} size="sm" />
                                    <div className="flex flex-col">
                                        <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                        >
                                        {username}
                                        </Typography>
                                        <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal opacity-70"
                                        >
                                        {password}
                                        </Typography>
                                    </div>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="flex flex-col">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {gender}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal opacity-70"
                                    >
                                        {gender=="male"? "He" : "She"}
                                    </Typography>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                    <Chip
                                        variant="ghost"
                                        size="sm"
                                        value={status == "active" ? "active" : "dead"}
                                        color={status == "active" ? "green" : "red"}
                                    />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography
                                    variant="small"
                                    color={role == "admin"? "red" : "blue"}
                                    className="font-normal"
                                    >
                                    {role}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Tooltip content="View User">
                                        <IconButton variant="text" onClick={()=>{deleteUser(_id)}}>
                                            <MagnifyingGlassIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip content="Edit User">
                                    <IconButton variant="text">
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                    </Tooltip>

                                    <Tooltip content="Delete User">
                                    <IconButton variant="text">
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                </td>
                                </tr>
                            );
                            },
                        )}
                        </tbody>
                    </table>
                }
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {page} of {totalPage}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" disabled={page == 1? true: false} onClick={decrementPage}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" disabled={page == totalPage? true: false} onClick={incremetPage}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}