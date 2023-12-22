/* eslint-disable @typescript-eslint/no-unused-vars */
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Button, Input, Option, Select } from '@material-tailwind/react';
import { TableBugReport } from "./Component/TableBugReport";
import { TableDateBug } from "./Component/TableDateBug";

import React from 'react';

const Report = () => {
  return (
    // <TableBugReport/>
    <TableDateBug/>
    // <div className="flex flex-col w-full py-5">
    //   <div className="flex w-full mb-5">
    //     <div className="basis-2/12">
    //       Sort By
    //     </div>
    //     <div className="basis-2/12">
    //       Filter By
    //     </div>
    //     <div className="basis-8/12">
    //       <div className="flex w-full justify-end">
    //         <div className="basis-5/12">
    //           <Input
    //             label="Search"
    //             icon={<MagnifyingGlassIcon className="h-5 w-5" />}
    //           />
    //         </div>
    //         <div className="basis-2/12 flex justify-between">
    //           <Button variant="filled" className="flex items-center gap-4">
    //               Search{" "}
    //               <MagnifyingGlassIcon className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* Displaying Report Data */}
    //   <div className="flex flex-col py-2">
    //     {reportData.map((report) => (
    //       <div className="flex py-2 justify-center gap-4" key={report.id}>
    //         <div className="basis-2/12">
    //           <div className="text-black bg-gray-500 border-2 border-gray-600 rounded-md">{report.name}</div>
    //         </div>
    //         <div className="basis-2/12">
    //           <div className="text-black bg-zinc-400 border-2 border-gray-600 rounded-md">{report.date}</div>
    //         </div>
    //         <div className="basis-4/12">
    //           <div className="text-black bg-zinc-400 border-2 border-gray-600 rounded-md">{report.title}</div>
    //         </div>
    //         <div className="basis-2/12">
    //           <Select label="Select Version" color='blue' animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
    //             <Option value='report'>Material Tailwind React</Option>
    //             <Option value='vue'>Material Tailwind Vue</Option>
    //             <Option value='angular'>Material Tailwind Angular</Option>
    //             <Option value='svelte'>Material Tailwind Svelte</Option>
    //           </Select>

    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default Report;
