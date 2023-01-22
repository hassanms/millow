const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let buyer, seller, inspector, lender;
    let realEstate, escrow;

    beforeEach(async () => {
        // Setup Accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners();

        // Deploy Real Estate
        const RealEstate = await ethers.getContractFactory("RealEstate");
        realEstate = await RealEstate.deploy();

        // Mint
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS");
        await transaction.wait();

        // Deploy Escrow
        const Escrow = await ethers.getContractFactory("Escrow");
        escrow = await Escrow.deploy(
            realEstate.address,
            seller.address,
            inspector.address,
            lender.address
        );
    })

    describe('Deployment', () => {
        it('Returns NFT Address', async () => {   
            let result = await escrow.nftAddress();
            expect(result).to.be.equal(realEstate.address);
        })
        it('Returns seller', async () => {  
            let result = await escrow.seller();
            expect(result).to.be.equal(seller.address);
        })
        it('Returns inspector', async () => {
            let result = await escrow.inspector();
            expect(result).to.be.equal(inspector.address);
            
        })
        it('Returns lender', async () => {
            let result = await escrow.lender();
            expect(result).to.be.equal(lender.address);
        })
    });

    it('saves the addresses', async () => {


    })
})
