pragma solidity 0.8.17;

import "./DEFIToken.sol";
import "./SafeMath.sol";

contract StakingContract {

    using SafeMath for uint256;

    DEFIToken public DEFI_TOKEN;

    mapping(address => uint256) public stakes;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    
    constructor(address _DEFI_TOKEN) {
        DEFI_TOKEN = DEFIToken(_DEFI_TOKEN);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        DEFI_TOKEN.transferFrom(msg.sender, address(this), amount);
        
        stakes[msg.sender] = stakes[msg.sender].add(amount);

        emit Staked(msg.sender, amount);
    }

    function unstake() external {
        uint256 amount = stakes[msg.sender];
        require(amount > 0, "No stakes to unstake");

        stakes[msg.sender] = 0;

        DEFI_TOKEN.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }


    function calculateReward(uint256 stakedAmount, uint256 numberOfDays) public view returns (uint256) {
    
    // Check if stakedAmount is more than 1000 and numberOfDays is more than 1
    //require(stakedAmount >= 1000 ether, "Staked amount should be more than 1000");
    require(numberOfDays >= 1, "Number of days should be more than 1");

    uint256 rewardPerDay = 0;

    if (stakedAmount >= 1000 ether) {
         rewardPerDay = stakedAmount.div(1000);
         
    }

    //uint256 rewardPerDay = stakedAmount.div(1000);
    
    return rewardPerDay.mul(numberOfDays);
}
}