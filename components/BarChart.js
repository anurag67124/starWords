// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { CSVLink } from 'react-csv';
// import { Chart, CategoryScale,LinearScale, BarElement } from 'chart.js'

// Chart.register(CategoryScale)
// Chart.register(LinearScale)
// Chart.register( BarElement)

// const BarGraph = () => {
//   const [wordsData, setWordsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('https://www.terriblytinytales.com/test.txt')
//       .then(response => {
//         const data = response.data;
//         const words = data.split(/\s+/); // split on whitespace
//         const wordCounts = words.reduce((acc, word) => {
//           if (word in acc) {
//             acc[word] += 1;
//           } else {
//             acc[word] = 1;
//           }
//           return acc;
//         }, {});
//         const sortedWordCounts = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
//         const topWords = sortedWordCounts.slice(0, 20);
//         setWordsData(topWords);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const data = {
//     labels: wordsData.map(word => word[0]),
//     datasets: [
//       {
//         label: 'Word Frequency',
//         data: wordsData.map(word => word[1]),
//         backgroundColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: 'y',
//     plugins: {
//       title: {
//         display: true,
//         text: 'Top 20 Words by Frequency',
//       },
//     },
//   };

//   const csvData = wordsData.map(word => ({
//     word: word[0],
//     frequency: word[1],
//   }));

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <Bar data={data} options={options} />
//           <CSVLink data={csvData}>Export CSV</CSVLink>
//         </>
//       )}
//     </div>
//   );
// };

// export default BarGraph;














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
