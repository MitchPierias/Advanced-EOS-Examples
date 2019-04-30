import { ContractDeployer, assertRowsEqualStrict } from 'lamington';
import { Singletons } from './singletons';

describe('singletons', function() {
	let contract: Singletons;

	beforeEach(async function() {
		contract = await ContractDeployer.deploy<Singletons>('02_Singletons/singletons');
		await contract.init();
	});

	it('should have correct defaults', async function() {
		// Should default to false after init.
		await assertRowsEqualStrict(contract.settings(), [{ closed: false, char_count: 144 }]);
	});

	it('should allow setting of closed', async function() {
		// If we set closed to true it should be true.
		await contract.setclosed(true);
		await assertRowsEqualStrict(contract.settings(), [{ closed: true, char_count: 144 }]);

		// And setting it to false should go back to false.
		await contract.setclosed(false);
		await assertRowsEqualStrict(contract.settings(), [{ closed: false, char_count: 144 }]);
	});

	it('should allow setting of chars', async function() {
		await contract.setchars(500);
		await assertRowsEqualStrict(contract.settings(), [{ closed: false, char_count: 500 }]);
	});
});
