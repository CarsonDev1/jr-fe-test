import PlayerProfile from '@/components/info-player';
import LoanHistory from '@/components/loan-history';
import TransferValue from '@/components/transfer-value';
import { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<div className='px-4 lg:px-8 pb-4 lg:pb-8 flex flex-col gap-6'>
				<PlayerProfile />
				<div className='flex gap-1'>
					<TransferValue />
					<LoanHistory />
				</div>
			</div>
		</Fragment>
	);
}
