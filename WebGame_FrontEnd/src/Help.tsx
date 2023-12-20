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
      <MaterialTailwindTypography variant="h1" className="mb-4"> Player actions </MaterialTailwindTypography>
      <div className="bg-gray-200 text-left mr-28">
        <MaterialTailwindTypography variant="h4" className="mb-2">
          METHODS
        </MaterialTailwindTypography>
        <MaterialTailwindTypography variant="paragraph" className="mb-6">
          <MaterialTailwindTypography variant="h6" className="font-mono">
            self.moveUp();
            <br />
            self.moveUp(distance);
          </MaterialTailwindTypography>
          <MaterialTailwindTypography variant="small" className="mb-2">
            move upwards 1 tile if distance is not provided or move upwards according to the distance if provided
            <br />
            returns nothing
            <br />
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              distance
              <br />
              <span className="ml-2">- the number of distance to travel</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveUp();
              </MaterialTailwindTypography>
              <span className="ml-2">- move up 1 tile</span>
              <br />
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveUp(5);
              </MaterialTailwindTypography>
              <span className="ml-2">- move up 5 tiles</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.moveDown();
              <br />
              self.moveDown(distance);
            </MaterialTailwindTypography>
            move downwards 1 tile if distance is not provided or move downwards according to the distance if provided
            <br />
            returns nothing
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              distance
              <br />
              <span className="ml-2">- the number of distance to travel</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveDown();
              </MaterialTailwindTypography>
              
              <span className="ml-2">- move down 1 tile</span>
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveDown(5);
              </MaterialTailwindTypography>
              
              <span className="ml-2">- move down 5 tiles</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.moveLeft();
              <br />
              self.moveLeft(distance);
            </MaterialTailwindTypography>
            move left 1 tile if distance is not provided or move left according to the distance if provided
            <br />
            returns nothing
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              distance
              <br />
              <span className="ml-2">- the number of distance to travel</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveLeft();
              </MaterialTailwindTypography>   
              <span className="ml-2">- move left 1 tile</span>
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveLeft(5);
              </MaterialTailwindTypography>
              
              <span className="ml-2">- move left 5 tiles</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.moveRight();
              <br />
              self.moveRight(distance);
            </MaterialTailwindTypography>
            move right 1 tile if distance is not provided or move right according to the distance if provided
            <br />
            returns nothing
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              distance
              <br />
              <span className="ml-2">- the number of distance to travel</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveRight();
              </MaterialTailwindTypography>
              
              <span className="ml-2">- move right 1 tile</span>
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.moveRight(5);
              </MaterialTailwindTypography>
              
              <span className="ml-2">- move right 5 tiles</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.interact();
              <br />
              self.interact(direction);
            </MaterialTailwindTypography>
            interact with the object in front of the direction the player is facing if a direction is not specified, interact with the object in the direction specified otherwise. examples of interactable objects: doors.
            <br />
            returns nothing
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <div className="pl-10">
              direction
              <br />
              <span className="ml-2">- a string specifying the direction to interact ("up", "down", "left", "right")</span>
            </div>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.interact();
              </MaterialTailwindTypography>
              
              <span className="ml-2">- interact with the object above if the player is facing upwards</span>
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.interact("right");
              </MaterialTailwindTypography>
              
              <span className="ml-2">- turn right and interact with the object to the right of the player</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.talk();
            </MaterialTailwindTypography>
              talk with the NPC in front of the direction the player is facing
            <br />
            returns nothing
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.talk();
              </MaterialTailwindTypography>              
              <span className="ml-2">- interact with the NPC above if the player is facing upwards</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.up;
            </MaterialTailwindTypography>
              make the player look upwards
            <br />
              returns the name of the object above the player
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.up;
              </MaterialTailwindTypography>            
              <span className="ml-2">- make the player look upwards if not already</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.down;
            </MaterialTailwindTypography>
              make the player look downwards
            <br />
              returns the name of the object below the player
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.down;
              </MaterialTailwindTypography>            
              <span className="ml-2">-- make the player look downwards if not already</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.left;
            </MaterialTailwindTypography>
              make the player look left 
            <br />
              returns the name of the object to the left of the player
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.down;
              </MaterialTailwindTypography>              
              <span className="ml-2">- make the player look left if not already</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.right;
            </MaterialTailwindTypography>
              make the player look right
            <br />
              returns the name of the object to the right of the player
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.down;
              </MaterialTailwindTypography>
              <span className="ml-2">- make the player look right if not already</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.ground;
            </MaterialTailwindTypography>
              returns the name of the tile the player is stepping on
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.ground;
              </MaterialTailwindTypography>      
              <span className="ml-2">- returns "floor" if the player is standing on a floor</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.x;
            </MaterialTailwindTypography>
              returns the x coordinate the player is currently on
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.x;
              </MaterialTailwindTypography>
              <span className="ml-2">- returns 3 if the player is standing on coordinate 3,5</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="paragraph" className="mb-6">
            <MaterialTailwindTypography variant="h6" className="font-mono">
              self.y;
            </MaterialTailwindTypography>
              returns the y coordinate the player is currently on
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                self.y;
              </MaterialTailwindTypography>
              <span className="ml-2">- returns 5 if the player is standing on coordinate 3,5</span>
            </div>
          </MaterialTailwindTypography>
        </MaterialTailwindTypography>
        <hr />
      </div>
      <MaterialTailwindTypography variant="h1" className="mb-4"> Number actions </MaterialTailwindTypography>
      <div className="bg-gray-200 text-left mr-28">
        <MaterialTailwindTypography variant="h4" className="mb-2">
          METHODS
        </MaterialTailwindTypography>
        <MaterialTailwindTypography variant="paragraph" className="mb-6">
          <MaterialTailwindTypography variant="h6" className="font-mono">
            {"<number>.toString();"}
          </MaterialTailwindTypography>
          <MaterialTailwindTypography variant="small" className="mb-2">
            returns a string version of the number
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                5.toString();
              </MaterialTailwindTypography>
              <span className="ml-2">- returns "5", the string version of the number 5</span>
              <br />
              <MaterialTailwindTypography variant="h6" className="font-mono">
                num = 5;
                <br />
                num.toString();
              </MaterialTailwindTypography>
              <span className="ml-2">- returns "5", the string version of the number 5 which is stored in the variable num</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="h6" className="font-mono">
            {"<number> + <number>"}<br />
            {"<number> + <string>"}<br />
            {"<number> - <number>"}<br />
            {"<number> * <number>"}<br />
            {"<number> / <number>"}<br />
            {"<number> % <number>"}<br />
            {"<number> == <number>"}<br />
            {"<number> != <number>"}<br />
            {"<number> < <number>"}<br />
            {"<number> > <number>"}<br />
            {"<number> <= <number>"}<br />
            {"<number> >= <number>"}<br />
            {"-<number>"}<br />
          </MaterialTailwindTypography>
        </MaterialTailwindTypography>
        <hr />
      </div>
      <MaterialTailwindTypography variant="h1" className="mb-4"> String actions </MaterialTailwindTypography>
      <div className="bg-gray-200 text-left mr-28">
        <MaterialTailwindTypography variant="h4" className="mb-2">
          METHODS
        </MaterialTailwindTypography>
        <MaterialTailwindTypography variant="paragraph" className="mb-6">
          <MaterialTailwindTypography variant="h6" className="font-mono">
            {"<string>.toNumber();"}
          </MaterialTailwindTypography>
          <MaterialTailwindTypography variant="small" className="mb-2">
            returns a number version of the string
            <MaterialTailwindTypography variant="h5" className="">
              parameters:
            </MaterialTailwindTypography>
            <MaterialTailwindTypography variant="h5" className="">
              examples:
            </MaterialTailwindTypography>
            <div className="pl-10">
              <MaterialTailwindTypography variant="h6" className="font-mono">
                "123".toString();
              </MaterialTailwindTypography>
              <span className="ml-2">- returns 123, the number version of the string "123"</span>
              <br />
              <MaterialTailwindTypography variant="h6" className="font-mono">
                str = "123";
                <br />
                str.toNumber();
              </MaterialTailwindTypography>
              <span className="ml-2">- returns 123, the number version of the string "123" which is stored in the variable str</span>
            </div>
          </MaterialTailwindTypography>
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="h6" className="font-mono">
            {"<string> + <string>"}<br />
            {"<string> + <number>"}<br />
            {"<string> == <string>"}<br />
            {"<string> != <string>"}<br />
          </MaterialTailwindTypography>
        </MaterialTailwindTypography>
        <hr />
      </div>
      <MaterialTailwindTypography variant="h1" className="mb-4"> Boolean actions </MaterialTailwindTypography>
      <div className="bg-gray-200 text-left mr-28">
        <MaterialTailwindTypography variant="h4" className="mb-2">
           NO METHODS
        </MaterialTailwindTypography>
        <MaterialTailwindTypography variant="paragraph" className="mb-6">
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <MaterialTailwindTypography variant="h6" className="font-mono">
            {"<boolean> == <boolean>"}<br />
            {"<boolean> != <boolean>"}<br />
            {"<boolean> && <boolean>"}<br />
            {"<boolean> || <boolean>"}<br />
          </MaterialTailwindTypography>
        </MaterialTailwindTypography>
        <hr />
      </div>
    </div>
  );
}

export default Help;
