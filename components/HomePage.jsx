import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroRocket from "../anim/heroRocket.json";
// import MouseParticles from 'react-mouse-particles'
import dynamic from 'next/dynamic'
import Link from "next/link";

const MouseParticles = dynamic(
  () => import('react-mouse-particles'),
  { ssr: false }
)
const HomePage = () => {
  return (
    <div className="relative h-screen overflow-hidden  ">
    <div className="w-full flex justify-center py-16 lg:py-20 z-20 relative">
      <Link href="/graph">
    <motion.button  whileHover={{ scale: 1.2 }}
           whileTap={{ scale: 0.9 }}
           transition={{ type: "spring", stiffness: 400, damping: 15 }} class="inline-flex text-white border-white border border-b-4 border-r-4 py-2 px-6 focus:outline-none bg-purple-500 hover:bg-purple-800 rounded-lg text-lg font-bold">Click to Explore</motion.button>
    </Link>
    </div>
      <Lottie className="z-0 absolute top-0 left-0 w-full  "  animationData={heroRocket} loop={true} />

      <MouseParticles
          g={2.3}
          // num={1}
          radius={3}
          life={0.8}
          v={1.2}
          // color="random"
          // alpha={0.16}
          level={6}
        />
    </div>
  )
}

export default HomePage
