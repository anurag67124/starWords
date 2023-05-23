import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import * as FileSaver from 'file-saver'
import Export from './Export'
import { Chart, CategoryScale,LinearScale, BarElement } from 'chart.js'

Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register( BarElement)

export default function BarGraph() {
  const [frequency, setFrequency] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://www.terriblytinytales.com/test.txt')
      const text = await res.text()
      const words = text.split(/\s+/)
      const frequency = {}
      words.forEach(word => {
        if (word in frequency) {
          frequency[word] += 1
        } else {
          frequency[word] = 1
        }
      })
      setFrequency(frequency)
    }
    fetchData()
  }, [])

  function handleExport() {
    const csvData = Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([word, count]) => `${word},${count}`)
      .join('\n')
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' })
    FileSaver.saveAs(blob, 'histogram.csv')
  }

  if (!frequency) {
    return <div>Loading...</div>
  }

  const data = {
    labels: Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]).slice(0, 20),
    datasets: [
      {
        label: 'Word Frequency',
        data: Object.values(frequency).sort((a, b) => b - a).slice(0, 20),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }, 
  }

  return (
    <div className="w-full">
      <div className="p-6">
      <Bar data={data} options={options} />
      </div>
      {/* <button onClick={handleExport}>Export</button> */}

      <div className="border-2 w-full p-4 rounded-lg flex mt-6">
      <Export handleExport={handleExport}/>
      <div className="px-8 text-left text-gray-800">
        Meet the two magnets to<br/> download <span className="font-bold"> CSV file</span> 😉
      </div>
      </div>
    </div>
  )
}
