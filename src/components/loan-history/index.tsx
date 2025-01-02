import Image from 'next/image';
import { FiMinus } from 'react-icons/fi';
import ClubLoan from '@/public/images/club-loan.png';

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
		<div className='space-y-1 rounded-lg bg-primary p-4 w-full lg:w-1/2'>
			{loanHistory.map((entry, index) => (
				<div
					key={index}
					className={`flex items-center justify-between px-4 py-3 hover:bg-white/5 ${
						index !== loanHistory.length - 1 ? 'border-b border-[#272a31]' : ''
					}`}
				>
					<div className='flex items-center gap-3'>
						<div className='relative h-8 w-8'>
							<Image src={ClubLoan} alt='Chelsea FC' width={32} height={32} className='rounded-full' />
						</div>
						<div className='flex flex-col gap-1'>
							<span className='text-sm font-medium text-white'>{entry.team}</span>
							<span className='text-xs text-second'>{entry.date}</span>
						</div>
					</div>
					<div className='flex flex-col items-end gap-2'>
						<button className='text-green-500'>
							<FiMinus className='h-5 w-3' />
						</button>
						<span className='text-sm font-medium text-green-500'>{entry.status}</span>
					</div>
				</div>
			))}
		</div>
	);
}
