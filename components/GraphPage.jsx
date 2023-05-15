import Lottie from "lottie-react";
import astronot from "../anim/astronot.json";
import space from "../anim/space.json";
import moon from "../anim/moon.json";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Tabs from "./Tabs";
import Image from 'next/image';
import Link from "next/link"
import LowBarGraph from "./LowBarGraph";
// import {} from "@heroicons/react/solid"

const GraphPage = () => {
    return ( 
        <div className="relative overflow-hidden">
            <Link href="/">
            <div className="border-b-2   h-14 fixed top-0 left-0 px-3 flex">
                <div>
            <Image
      src="/assets/rocket.png"
      width={50}
      height={50}
      alt="Picture of the author"
      className="transform -scale-x-100 "
    /></div>
    <div className="flex flex-col text-end justify-end">HOME</div>
            </div></Link>
            <Lottie className="absolute w-full -z-10  "  animationData={space} loop={true} />
            <Lottie className="absolute -bottom-44 -left-52 w-1/2 -z-10  "  animationData={moon} loop={true} />
            <section className="text-gray-400  body-font min-h-screen flex flex-col justify-center">
  <div className="container mx-auto flex px-5  md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
    <Lottie className="   "  animationData={astronot} loop={true} />
    </div>
    <div className="lg:flex-grow md:w-1/2 mx-10 flex flex-col md:items-start md:text-left items-center text-center backdrop-blur-md bg-black/20 rounded-md ">
     

<Tabs/>
{/* <BarChart/> */}

{/* <PieChart/> */}
{/* <LowBarGraph/> */}
     
    </div>
  </div>
</section>
        </div>
    )
}

export default GraphPage
