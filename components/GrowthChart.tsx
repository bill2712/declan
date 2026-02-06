import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend
} from 'recharts';
import { whoWeightBoys, whoLengthBoys } from '../src/data/whoStandards';
import { motion } from 'framer-motion';

// Mock data for Declan (Empty for now)
const declanWeightData: { month: number; val: number }[] = [
    // { month: 0, val: 3.5 } // Example
];

const declanLengthData: { month: number; val: number }[] = [
    // { month: 0, val: 50 } // Example
];

// Merge data for plotting
const mergeData = (standards: any[], declan: any[]) => {
  return standards.map(std => {
    const declanPoint = declan.find(d => d.month === std.month);
    return {
      ...std,
      declan: declanPoint ? declanPoint.val : null
    };
  });
};

const GrowthChart: React.FC = () => {
  const [metric, setMetric] = useState<'weight' | 'length'>('weight');

  const standardData = metric === 'weight' ? whoWeightBoys : whoLengthBoys;
  const declanData = metric === 'weight' ? declanWeightData : declanLengthData;
  const chartData = mergeData(standardData, declanData);
  const unit = metric === 'weight' ? 'kg' : 'cm';
  const label = metric === 'weight' ? 'Weight' : 'Length';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-5xl mx-auto my-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
           <h3 className="text-2xl font-serif font-bold text-slate-900">Growth Tracker</h3>
           <p className="text-slate-500 text-sm mt-1">Comparing against WHO Child Growth Standards (Boys)</p>
        </div>
        
        {/* Metric Toggle */}
        <div className="bg-slate-100 p-1 rounded-lg flex gap-1 mt-4 md:mt-0">
          <button
            onClick={() => setMetric('weight')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              metric === 'weight' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Weight
          </button>
          <button
            onClick={() => setMetric('length')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              metric === 'length' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Length
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Age (Months)', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12 }} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              type="number"
              domain={[0, 24]}
              tickCount={13}
            />
            <YAxis 
              label={{ value: `${label} (${unit})`, angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelFormatter={(val) => `${val} Months`}
            />
            <Legend verticalAlign="top" height={36} iconType="plainline" />

            {/* WHO Percentiles */}
            <Line type="monotone" dataKey="p3" stroke="#e2e8f0" strokeDasharray="5 5" strokeWidth={1} dot={false} name="P3 (3rd)" activeDot={false} />
            <Line type="monotone" dataKey="p15" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={1} dot={false} name="P15" activeDot={false} />
            <Line type="monotone" dataKey="p50" stroke="#94a3b8" strokeWidth={2} dot={false} name="WHO Mean (P50)" />
            <Line type="monotone" dataKey="p85" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={1} dot={false} name="P85" activeDot={false} />
            <Line type="monotone" dataKey="p97" stroke="#e2e8f0" strokeDasharray="5 5" strokeWidth={1} dot={false} name="P97 (97th)" activeDot={false} />

            {/* Declan's Data */}
            <Line 
              type="monotone" 
              dataKey="declan" 
              stroke="#b08d42" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#b08d42" }} 
              activeDot={{ r: 6, strokeWidth: 0, fill: "#b08d42" }}
              name="Declan"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-center text-slate-400 text-xs mt-4 italic">
        * Data source based on standard WHO growth charts for boys. Declan's data will be updated regularly.
      </p>
    </div>
  );
};

export default GrowthChart;
