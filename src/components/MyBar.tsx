import { Bar } from 'react-chartjs-2';
import { Items } from 'utils/schemes';
import './chart.css'
import { ChartColors, shuffle } from 'utils';
import { useState } from 'react';


type Props = {
    items: Items
    title: string
}

export default function MyPie({items, title}: Props) {
    const [loaded, setLoaded] = useState<boolean | null>(null); // null: didnt start, false: currently loading, true: finished loading
  
    const data = {
        labels: Object.keys(items).sort((a,b) => items[a] - items[b]).reverse()
        , // list of the names of the items
        datasets: [
          {
            data: Object.values(items).sort((a, b) => a-b).reverse(), // list of the count for each item
            tooltip: {
              callbacks: {
                // a callback function that returns the string to show in the tooltip for each item.
                // tooltip string will contain the name of the item, the count, and the percentage in the total items count
                label: (context: { label: string; parsed: { y: number}; dataset: { data: number[]; }; }) => {
                  const label = context.label;
                  const value = context.parsed.y;
                  // item count divided by sum of all items count, times 100
                  const percentage = Math.round((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
            backgroundColor: shuffle(ChartColors),
          },
        ],
      };
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      animation: {
          onComplete: function(context: any) {
              if (context.initial) {
                  if (context.currentStep <= 1)
                      setLoaded(false);
                  else
                      setLoaded(true);
              }
            }
      }
    }
      
    return (
        <div className='chartContainer'>
          {loaded? <h1>{title}</h1>: <h1>Loading...</h1>}
          <Bar data={data} options={options}/>
        </div>
    )
}