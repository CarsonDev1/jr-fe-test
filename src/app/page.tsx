import PlayerProfile from '@/components/info-player';
import LoanHistory from '@/components/loan-history';
import MatchesList from '@/components/match-list';
import TransferValue from '@/components/transfer-value';
import { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<div className='px-4 lg:px-8 pb-4 lg:pb-8 flex flex-col gap-3 md:gap-6 bg-[#01040d]'>
				<PlayerProfile />
				<div className='flex gap-1 flex-col lg:flex-row items-stretch'>
					<TransferValue />
					<LoanHistory />
				</div>
				<MatchesList />
			</div>
		</Fragment>
	);
}
