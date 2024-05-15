const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    try {
        const Holders = await ethers.getContractFactory("Holders");
        const levels = JSON.parse(process.env.LEVELS);
        const tokens = JSON.parse(process.env.TOKENS);
        const startsAt = process.env.STARTS_AT * 1;
        const endsAt = process.env.ENDS_AT * 1;

        const holders = await upgrades.deployProxy(
            Holders, [levels, tokens, startsAt, endsAt],
            { initializer: 'initialize', kind: 'uups' }
        );

        if (process.env.NODE_ENV === 'development') {
            await holders.deploymentTransaction().wait(2);
        }

        console.log(holders.target);
        return holders;
    }
    catch (e) {
        console.error(e);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });