import { useState } from 'react'
import { Tab } from '@headlessui/react'
import BarChart from './BarChart'
import LowBarGraph from './LowBarGraph'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
    let [categories] = useState({
        Most: [
          {
            id: 1,
            component:"BarChart"
          },
      
        ],
       
        Least: [
          {
            id: 2,
      
            component:"LowBarGraph"
          }
        ]
    
      })

  return (
    <div className="w-full  px-2  sm:px-0">
   <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-white hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((tabs, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white  p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                { tabs[0].component=="BarChart"&&  <BarChart/>}
                { tabs[0].component=="LowBarGraph"&&  <LowBarGraph/>}
               
                <div className="w-96"></div>
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
 
    </div>
  )
}
