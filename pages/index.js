import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePage from '@/components/HomePage'
// import Button from '@/components/Button'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`bg-white min-h-screen ${inter.className}`}
    >
<HomePage/>
{/* <Button/> */}

       </main>
  )
}
