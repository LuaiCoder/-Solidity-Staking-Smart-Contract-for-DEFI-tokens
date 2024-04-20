const ether = require("@openzeppelin/test-helpers/src/ether");

const DEFIToken = artifacts.require('DEFIToken');
const StakingContract = artifacts.require('StakingContract');

contract('StakingContract', ([owner, user]) => {
    let defiToken;
    let stakingContract;

    async function payReward(user, reward, owner, defiToken) {
        if (reward >= 1) {
            await defiToken.transfer(user, reward, { from: owner });
            console.log("Reward has been paid to the user");
        } else {
            console.log("No rewards");
        }
    }
    
    beforeEach(async () => {
        defiToken = await DEFIToken.new({ from: owner });
        stakingContract = await StakingContract.new(defiToken.address, { from: owner });

        // Mint tokens to user for testing
        console.log("User now has 10,000 tokens for testing")
        await defiToken.mint(user, web3.utils.toWei('10000', 'ether'), { from: owner });

    });
    
    it('First Scenario: User A stakes 1000 DEFI and receive reward for 10 days', async () => {
        
        const numberOfDays = 10; // Or any other number of days
        const amount = web3.utils.toWei('1000', 'ether');

        console.log("User balance before Staking should be 10,000")
        const balanceBeforeWithdraw = await defiToken.balanceOf(user);
        console.log("User Balance Before Staking :", balanceBeforeWithdraw.toString());
        expect(balanceBeforeWithdraw.toString()).to.be.equal(web3.utils.toWei('10000', 'ether'));


        // Stake 1000 DEFI tokens
        console.log("After Staking 1,000, User Balance should be 9,000")

        await defiToken.approve(stakingContract.address, amount, { from: user });
        await stakingContract.stake(amount, { from: user });

        const balanceAfterStake = await defiToken.balanceOf(user);
        console.log("User Balance After Staking 1000 tokens:", balanceAfterStake.toString());
        expect(balanceAfterStake.toString()).to.be.equal(web3.utils.toWei('9000', 'ether'));


        // Get the staked amount for the user
        console.log("Staked amount should be 1,000")
        
        // const stakedAmount = await stakingContract.stakes(user);
        // console.log("Staked Amount:", stakedAmount.toString());

        const currentstakedAmount = (await defiToken.balanceOf(stakingContract.address)).toString();
        console.log("Current Staked Amount:", currentstakedAmount);
        expect(currentstakedAmount.toString()).to.be.equal(web3.utils.toWei('1000', 'ether'));

        
        // Calculate reward
        console.log("should calculate the correct reward for 10 days = 10 (1 DEFI per day) and pay the reward to the user")

        const reward = await stakingContract.calculateReward(currentstakedAmount, numberOfDays);
        payReward(user, reward, owner, defiToken)
        
        console.log("Calculated Reward:", reward.toString());
        expect(reward.toString()).to.be.equal(web3.utils.toWei('10', 'ether'));


        // Unstake the tokens
        await stakingContract.unstake({ from: user });

        console.log("Unstaked amount should be Zero")

        const currentstakedAmountAfterUnstake = (await defiToken.balanceOf(stakingContract.address)).toString();
        console.log("Current Staked Amount After Unstake:", currentstakedAmountAfterUnstake);
        expect(currentstakedAmountAfterUnstake.toString()).to.be.equal(web3.utils.toWei('0', 'ether'));
        
        console.log("User account should be 10,000 + 10")
        const balanceAfterUnstake = await defiToken.balanceOf(user);
        console.log("Calculated balanceAfterUnstake:", balanceAfterUnstake.toString());
        expect(balanceAfterUnstake.toString()).to.be.equal(web3.utils.toWei('10010', 'ether'));

    });

    it('Second Scenario: User A stakes 100 DEFI tokens for 10 days, and stakes 900 DEFI tokens for 10 days later', async () => {
        var numberOfDays = 10; // Or any other number of days
        var extraDays = 10;
        const amount1 = web3.utils.toWei('100', 'ether');
        const amount2 = web3.utils.toWei('900', 'ether');

        const balanceBeforeWithdraw = await defiToken.balanceOf(user);
        expect(balanceBeforeWithdraw.toString()).to.be.equal(web3.utils.toWei('10000', 'ether'));
        console.log("User balance before Staking should be 10,000")
        console.log("Calculated BalnaceBeforeST:", balanceBeforeWithdraw.toString());

        // Stake 100 DEFI tokens
        await defiToken.approve(stakingContract.address, amount1, { from: user });
        await stakingContract.stake(amount1, { from: user });
        const balanceAfterStake = await defiToken.balanceOf(user);
        expect(balanceAfterStake.toString()).to.be.equal(web3.utils.toWei('9900', 'ether'));
        console.log("After Staking 100, user balance should be 9,900")
        console.log("Calculated Balance After STaking First 100 tokens:", balanceAfterStake.toString());

        console.log("Staked amount should be 100")
        const currentstakedAmount = (await defiToken.balanceOf(stakingContract.address)).toString();
        expect(currentstakedAmount.toString()).to.be.equal(web3.utils.toWei('100', 'ether'));
        console.log("Current Staked Amount:", currentstakedAmount);
        

        // Calculate reward for 100 tokens
        console.log("No reward because Staked Amount is less than 100")
        const reward1 = await stakingContract.calculateReward(currentstakedAmount, numberOfDays);
        expect(reward1.toString()).to.be.equal(web3.utils.toWei('0', 'ether'));
        console.log("Calculated Reward:", reward1.toString());
        payReward(user, reward1, owner, defiToken)

        // Stake 900 DEFI tokens
        await defiToken.approve(stakingContract.address, amount2, { from: user });
        await stakingContract.stake(amount2, { from: user });

        const balanceAfterStake2 = await defiToken.balanceOf(user);
        expect(balanceAfterStake2.toString()).to.be.equal(web3.utils.toWei('9000', 'ether'));
        console.log("After Staking another 900, user balance should be 9,000")
        console.log("Calculated Balance After Staking Second Time:", balanceAfterStake2.toString());
        
        
        //expect(balanceAfterStake2.toString()).to.be.equal(web3.utils.toWei('1000', 'ether'));
        console.log("Staking another 900 tokens to be added to same Staked account, Staked amount should now be 1,000")
        const currentstakedAmount2 = (await defiToken.balanceOf(stakingContract.address)).toString();
        console.log("Current Staked Amount :", currentstakedAmount2);
        expect(currentstakedAmount2.toString()).to.be.equal(web3.utils.toWei('1000', 'ether'));

        // Calculate reward
        console.log("should calculate the correct reward for 10 days = 10 (1 DEFI per day) and pay the reward to the user")
        const reward2 = await stakingContract.calculateReward(currentstakedAmount2, extraDays);
        expect(reward2.toString()).to.be.equal(web3.utils.toWei('10', 'ether'));
        console.log("Calculated Reward:", reward2.toString());
        payReward(user, reward2, owner, defiToken)
 
        // Unstake the tokens
        await stakingContract.unstake({ from: user });

        console.log("Unstaked amount should be Zero")
        const currentstakedAmountAfterUnstake = (await defiToken.balanceOf(stakingContract.address)).toString();
        console.log("Current Staked Amount After Unstake:", currentstakedAmountAfterUnstake);
        expect(currentstakedAmountAfterUnstake.toString()).to.be.equal(web3.utils.toWei('0', 'ether'));
        
        const balanceAfterUnstake = await defiToken.balanceOf(user);
        expect(balanceAfterUnstake.toString()).to.be.equal(web3.utils.toWei('10010', 'ether'));
        console.log("Final User account should have 1000 tokens plus 10 tokens");
        console.log("Calculated balanceAfterWithdraw2:", balanceAfterUnstake.toString());



    });

  });
