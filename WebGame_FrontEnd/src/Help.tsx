import React from 'react';
import { Typography as MaterialTailwindTypography } from '@material-tailwind/react';

const Help = () => {
  return (
    <div className="bg-gray-200 text-center px-28" style={{width:"100%"}}>
      <MaterialTailwindTypography variant="h1" className="mb-4"> Global actions </MaterialTailwindTypography>
      <div className="bg-gray-200 text-left mr-28">
        <MaterialTailwindTypography variant="h4" className="mb-2">
          METHODS
        </MaterialTailwindTypography>
        <MaterialTailwindTypography variant="paragraph" className="mb-6">
          <MaterialTailwindTypography variant="h6" className="font-mono">
            alert();
            <br />
            alert(message);
          </MaterialTailwindTypography>
          <MaterialTailwindTypography variant="small" className="mb-2">
            print a message in red to the logs, print "ALERT!" instead if message is not specified. 
            <br />
            returns the printed message
            <br />
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              message
              <br />
              <span className="ml-2">- a string that you want to print out</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                alert(); 
              </MaterialTailwindTypography>
              <span className="ml-2">- prints "ALERT!" in red to the logs and returns "ALERT!"</span>
              <br />
              <MaterialTailwindTypography variant="h6" className="font-mono">
                alert(message);
              </MaterialTailwindTypography>
              <span className="ml-2">- prints the contents of message in red to the logs and returns the message</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              random(start, end);
            </MaterialTailwindTypography>
            returns a random number from a range between start and end, start is implicit and end is explicit
            <br />
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              start
              <br />
              <span className="ml-2">- the starting range, is implicit</span>
              <br />
              end
              <br />
              <span className="ml-2">- the end of the range, is explicit</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                alert(2, 5);
              </MaterialTailwindTypography>
              
              <span className="ml-2">- returns a number randomly selected between 2, 3, and 4. the number 5 cannot be selected because the end range is explicit.</span>
            </div>
          </MaterialTailwindTypography>
        </MaterialTailwindTypography>
        <hr />
      </div>
    </div>
  );
}

export default Help;
