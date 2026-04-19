import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("SupplyChain", function () {
  async function deploySupplyChainFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();
    return { supplyChain, owner, otherAccount };
  }

  describe("Donations", function () {
    it("Should record a donation", async function () {
      const { supplyChain, owner } = await deploySupplyChainFixture();
      const donationId = "DON-123";
      const amount = ethers.parseEther("0.1");
      const purpose = "Renovasi Masjid";

      await expect(supplyChain.recordDonation(donationId, amount, purpose))
        .to.emit(supplyChain, "DonationRecorded")
        .withArgs(donationId, owner.address, amount);

      const donation = await supplyChain.donations(donationId);
      expect(donation.donationId).to.equal(donationId);
      expect(donation.amount).to.equal(amount);
    });
  });

  describe("Items", function () {
    it("Should allow admin to create an item", async function () {
      const { supplyChain, owner } = await deploySupplyChainFixture();
      const name = "Semen";
      const desc = "Semen Tiga Roda";
      const qty = 100;

      await expect(supplyChain.createItem(name, desc, qty))
        .to.emit(supplyChain, "ItemCreated")
        .withArgs(1, name, owner.address);

      const item = await supplyChain.items(1);
      expect(item.name).to.equal(name);
      expect(item.quantity).to.equal(qty);
    });

    it("Should fail if non-admin tries to create an item", async function () {
      const { supplyChain, otherAccount } = await deploySupplyChainFixture();
      await expect(supplyChain.connect(otherAccount).createItem("X", "Y", 1))
        .to.be.revertedWith("Only admin can call this");
    });
  });
});
