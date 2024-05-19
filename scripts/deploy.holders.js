const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    try {
        const Holders = await ethers.getContractFactory("Holders");
        const signature = process.env.SIGNATURE;

        const title = process.env.TITLE;
        const levels = JSON.parse(process.env.LEVELS);
        const tokens = JSON.parse(process.env.TOKENS);
        const startsAt = process.env.STARTS_AT * 1;
        const endsAt = process.env.ENDS_AT * 1;

        const msg = {
            title,
            levels,
            tokens,
            startsAt,
            endsAt,
        }

        const owner = await ethers.verifyMessage(JSON.stringify(msg), signature);

        const holders = await upgrades.deployProxy(
            Holders, [title, levels, tokens, startsAt, endsAt],
            { initializer: 'initialize', kind: 'uups' }
        );

        if (process.env.NODE_ENV === 'development') {
            await holders.deploymentTransaction().wait(2);
        }

        console.log(JSON.stringify({ owner: owner, collaborations: holders.target }));
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