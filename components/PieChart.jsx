









import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import fileSaver from "file-saver";

import { Chart, CategoryScale,LinearScale, BarElement, ArcElement } from 'chart.js'

Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register( BarElement)
Chart.register( ArcElement)

export default function PieChart() {
  const [wordCounts, setWordCounts] = useState(null);

  useEffect(() => {
    const fetchTextFile = async () => {
      const response = await fetch(
        "https://www.terriblytinytales.com/test.txt"
      );
      const text = await response.text();
      const words = text.match(/\b\w+\b/g);
      const wordCounts = words.reduce((counts, word) => {
        counts[word] = (counts[word] || 0) + 1;
        return counts;
      }, {});
      const sortedWordCounts = Object.entries(wordCounts).sort(
        ([, a], [, b]) => b - a
      );
      setWordCounts(sortedWordCounts.slice(0, 20));
    };

    fetchTextFile();
  }, []);

  const handleExport = () => {
    const csv = wordCounts
      .map(([word, count]) => `${word},${count}`)
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    fileSaver.saveAs(blob, "word-counts.csv");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {wordCounts && (
        <>
    
          <div className="w-full  z-30 cursor-pointer">
            <Pie
              data={{
                labels: wordCounts.map(([word]) => word),
                datasets: [
                  {
                    data: wordCounts.map(([, count]) => count),
                    backgroundColor: [
                      "#EF4444",
                      "#F87171",
                      "#FBBF24",
                      "#10B981",
                      "#22C55E",
                      "#6EE7B7",
                      "#1D4ED8",
                      "#3B82F6",
                      "#A78BFA",
                      "#F472B6",
                      "#EC4899",
                      "#F97316",
                      "#EA580C",
                      "#D97706",
                      "#6B7280",
                      "#4B5563",
                      "#374151",
                      "#1F2937",
                      "#111827",
                      "#1E293B",
                    ],
                  },
                ],
              }}
              options={{
                legend: {
                  position: "right",
                  labels: {
                    fontSize: 12,
                  },
                },
              }}
            />
          </div>
          <button
            className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={handleExport}
          >
            Export
          </button>
        </>
      )}
    </div>
  );
}
