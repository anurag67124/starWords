import GraphPage from "@/components/GraphPage"
import dynamic from 'next/dynamic'
import Link from "next/link";

const MouseParticles = dynamic(
  () => import('react-mouse-particles'),
  { ssr: false }
)

const graph = () => {
    return (
        <div>
            <GraphPage/>
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

export default graph
