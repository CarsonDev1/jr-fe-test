'use client';

import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';
import Argentina from '@/public/images/Argentina.png';

const data = [
	{ year: "'10", value: 11 },
	{ year: "'13", value: 35 },
	{ year: "'14", value: 38 },
	{ year: "'16", value: 42 },
	{ year: "'17", value: 42 },
	{ year: "'19", value: 25 },
	{ year: "'20", value: 66 },
	{ year: "'22", value: 15 },
];

export default function TransferValue() {
	return (
		<div className='bg-primary p-4 w-full lg:w-1/2'>
			<h2 className='text-lg font-semibold text-white mb-4'>TRANSFER VALUE</h2>

			<div className='w-full'>
				<div className='w-full lg:w-1/2 bg-gradient-to-r from-[#09379447] via-[#09379447] to-[#09379447] rounded-lg p-3'>
					<div className='mb-8 flex items-center gap-5'>
						{Array(8)
							.fill(null)
							.map((_, i) => (
								<div key={i} className='h-6 w-6 overflow-hidden rounded-full'>
									<div className='relative size-6 overflow-hidden rounded-full'>
										<Image src={Argentina} width={30} height={30} alt='argentina' />
									</div>
								</div>
							))}
					</div>

					<div className='relative h-[180px] w-full'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={data} margin={{ top: 5, right: 45, left: 10, bottom: 5 }}>
								<CartesianGrid
									strokeDasharray='3 3'
									horizontal={true}
									vertical={false}
									stroke='rgba(255,255,255,0.05)'
								/>
								<XAxis
									dataKey='year'
									axisLine={false}
									tickLine={false}
									tick={{ fill: '#9CA3AF', fontSize: 12 }}
									dy={10}
									padding={{ left: 10, right: 10 }}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{
										fill: '#fff',
										fontSize: 12,
									}}
									ticks={[22, 44, 66]}
									tickFormatter={(value) => `${value}M`}
									domain={[0, 70]}
									orientation='right'
								/>
								<ReferenceLine y={22} stroke='#FB923C' strokeDasharray='3 3' strokeOpacity={0.5} />
								<Line
									type='linear'
									dataKey='value'
									stroke='#3B82F6'
									strokeWidth={2}
									dot={{
										fill: '#fff',
										r: 4,
										strokeWidth: 0,
									}}
									activeDot={{
										r: 6,
										fill: '#fff',
										stroke: '#3B82F6',
										strokeWidth: 2,
									}}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='flex flex-col gap-2 mt-4'>
					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-3'>
							<div className='flex gap-1'>
								<span className='h-1 w-2 bg-[#533c32]'></span>
								<span className='h-1 w-2 bg-[#533c32]'></span>
								<span className='h-1 w-2 bg-[#533c32]'></span>
							</div>
							<span className='text-second'>Current player value</span>
						</div>
						<span className='text-second'>11.6M $</span>
					</div>
					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-3'>
							<span className='h-1 w-8 bg-blue-500'></span>
							<span className='text-second'>Transfer fee</span>
						</div>
						<span className='text-second'>(Highest) 66M</span>
					</div>
				</div>
			</div>
		</div>
	);
}
