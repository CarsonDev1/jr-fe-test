import Image from 'next/image';
import { FiMinus } from 'react-icons/fi';

interface LoanEntry {
	team: string;
	date: string;
	status: string;
}

const loanHistory: LoanEntry[] = Array(5).fill({
	team: 'Chelsea',
	date: '30 Jun 2020',
	status: 'End of loan',
});

export default function LoanHistory() {
	return (
		<div className='space-y-1 rounded-lg bg-[#0a0e1c] p-4 w-1/2'>
			{loanHistory.map((entry, index) => (
				<div key={index} className='flex items-center justify-between rounded px-4 py-3 hover:bg-white/5'>
					<div className='flex items-center gap-3'>
						<div className='relative h-8 w-8'>
							<Image
								src='/placeholder.svg?height=32&width=32'
								alt='Chelsea FC'
								width={32}
								height={32}
								className='rounded-full'
							/>
						</div>
						<div className='flex flex-col'>
							<span className='text-sm font-medium text-white'>{entry.team}</span>
							<span className='text-xs text-gray-400'>{entry.date}</span>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<span className='text-sm font-medium text-green-500'>{entry.status}</span>
						<button className='text-gray-400 hover:text-white'>
							<FiMinus className='h-5 w-5' />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
