import * as React from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect,useState } from "react";


const Export = ({handleExport}) => {
    const [xValue,setXValue]=useState(0)
  const x = useMotionValue(0);
  const xInput = [0, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)"
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  useMotionValueEvent(x, "change", (latest) => {
    // console.log("x changed to", latest)
    setXValue(latest)
  })

  useEffect(() => {
      console.log(xValue)
      if(Math.floor(xValue)==110){
          handleExport()
      }
  }, [xValue])

  return (
    <motion.div className="w-64 h-12 relative rounded-md " style={{ background }}>
      <motion.div
        className="bg-white rounded-md absolute top-1 left-1 cursor-grabbing flex "
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <svg className="h-10 w-10" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
        <div className="flex flex-col justify-center p-2">
<img src="/assets/magnet.png" className="w-6 h-6" alt="img" /></div>
       {/* {console.log(x)} */}
      </motion.div>
   
      <div className="flex flex-col justify-center p-2 absolute right-1 top-1 bg-white rounded-md cursor-not-allowed">
<img src="/assets/magnet.png" className="w-6 h-6 rotate-180" alt="img" /></div>
    </motion.div>
  );
};

export default Export
