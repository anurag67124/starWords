import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Bar } from 'react-chartjs-2';
import Export from './Export';

const fetchTextFile = async () => {
  const response = await fetch(
    'https://www.terriblytinytales.com/test.txt'
  );
  const data = await response.text();
  return data;
};

const countWords = (text) => {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  const frequency = {};
  for (let word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }
  return frequency;
};

const sortWordsByFrequency = (wordCounts) => {
  const entries = Object.entries(wordCounts);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  return sortedEntries;
};

const getLeastFrequentWords = (sortedWords, count) => {
  return sortedWords.slice(-count).reverse();
};

const getChartData = (wordCounts, count) => {
  const sortedWords = sortWordsByFrequency(wordCounts);
  const leastFrequentWords = getLeastFrequentWords(sortedWords, count);
  const chartData = {
    labels: leastFrequentWords.map((entry) => entry[0]),
    datasets: [
      {
        label: 'Word Frequency',
        data: leastFrequentWords.map((entry) => entry[1]),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  return chartData;
};

const LowBarGraph = () => {
  const [wordCounts, setWordCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTextFile().then((text) => {
      const counts = countWords(text);
      setWordCounts(counts);
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    const sortedWords = sortWordsByFrequency(wordCounts);
    const csvData = sortedWords.map((entry) => {
      return `${entry[0]},${entry[1]}`;
    });
    const blob = new Blob([csvData.join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'histogram_data.csv');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const chartData = getChartData(wordCounts, 20);

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center">
        
        {/* <button
          onClick={handleExport}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export
        </button> */}
      </div>
      <div className="p-6">
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Word',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Count',
              },
              ticks: {
                precision: 0,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      </div>

<div className="border-2 w-full p-4 rounded-lg flex mt-6">
      <Export handleExport={handleExport}/>
      <div className="px-8 text-left text-gray-800">
        Meet the two magnets to<br/> download <span className="font-bold"> CSV file</span> 😉
      </div>
      </div>
    </div>
  );
};

export default LowBarGraph




