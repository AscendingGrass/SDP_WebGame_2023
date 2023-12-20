import { Navbar } from "@material-tailwind/react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import React from "react";

   
   
const Footer = ()=> {

    const [open, setOpen] = React.useState(false);
   
    const handleOpen = () => setOpen(!open);

    return (
        


    <div className="w-full flex justify-evenly py-2 bg-black text-white rounded-none ">
      <>
        <Button onClick={handleOpen} className="bg-neutral-750">
        Privacy Policy
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Privacy Policy.</DialogHeader>
          <DialogBody>
          We at Wasai LLC respect the privacy of your personal information and, as such,
          make every effort to ensure your information is protected and remains private.
            As the owner and operator of loremipsum.
            io (the "Website") hereafter referred to in this Privacy Policy as "Lorem Ipsum", "us", "our" or "we", we
            have provided this Privacy Policy to explain how we collect, use, share and protect information about the users
              of our Website (hereafter referred to as “user”, “you” or "your"). For the purposes of this Agreement, any use
              of the terms "Lorem Ipsum", "us", "our" or "we" includes Wasai LLC, without limitation. We will not use or share
                your personal information with anyone except as described in this Privacy Policy.
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
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>


      <>
        <Button onClick={handleOpen} className="bg-neutral-750">
        Term & Condition
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Term & Condition.</DialogHeader>
          <DialogBody>
          Welcome to WEB GAME SDP. This site is provided as a service to our visitors and may be used for informational purposes only. Because the Terms and Conditions contain legal obligations, please read them carefully.

  1. YOUR AGREEMENT
  By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

  PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately.
  Please review these Terms and Conditions periodically.
    Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information,
  this page was last updated as of the date at the top of these terms and conditions.
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
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </div>
  );
       
}

export default Footer