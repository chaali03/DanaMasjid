import { ethers } from 'ethers';

const SUPPLY_CHAIN_ABI = [
  "function recordDonation(string memory _donationId, uint256 _amount, string memory _purpose) public",
  "function createItem(string memory _name, string memory _description, uint256 _quantity) public",
  "function updateItemStatus(uint256 _id, uint8 _status) public",
  "function getDonation(string memory _donationId) public view returns (tuple(string donationId, address donor, uint256 amount, string purpose, uint256 timestamp, bool isUsed))",
  "function items(uint256) public view returns (uint256 id, string name, string description, uint256 quantity, uint8 status, address currentOwner, uint256 timestamp)",
  "function itemCount() public view returns (uint256)",
  "event DonationRecorded(string donationId, address donor, uint256 amount)",
  "event ItemCreated(uint256 id, string name, address owner)",
  "event ItemStatusChanged(uint256 id, uint8 status, address owner)"
];

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;
  private contract: ethers.Contract | null = null;
  private transactionQueue: Promise<any> = Promise.resolve();

  constructor() {
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || 'http://127.0.0.1:8545';
    const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
    const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      if (contractAddress) {
        this.contract = new ethers.Contract(contractAddress, SUPPLY_CHAIN_ABI, this.wallet);
      }
    }

    if (!this.wallet || !this.contract) {
      console.warn('Blockchain credentials not fully configured. Service will run in limited mode.');
    }
  }

  private async enqueueTransaction<T>(fn: () => Promise<T>): Promise<T> {
    const nextTask = this.transactionQueue.then(async () => {
      try {
        return await fn();
      } catch (error) {
        throw error;
      }
    });
    this.transactionQueue = nextTask.catch(() => {});
    return nextTask;
  }

  async recordDonation(donationId: string, amount: string, purpose: string) {
    if (!this.contract || !this.wallet) throw new Error('Blockchain contract not initialized');
    
    return this.enqueueTransaction(async () => {
      const amountWei = ethers.parseEther(amount);
      const nonce = await this.wallet!.getNonce();
      const tx = await this.contract!.recordDonation(donationId, amountWei, purpose, { nonce });
      return await tx.wait();
    });
  }

  async createItem(name: string, description: string, quantity: number) {
    if (!this.contract || !this.wallet) throw new Error('Blockchain contract not initialized');
    
    return this.enqueueTransaction(async () => {
      const nonce = await this.wallet!.getNonce();
      const tx = await this.contract!.createItem(name, description, quantity, { nonce });
      return await tx.wait();
    });
  }

  async updateItemStatus(id: number, status: number) {
    if (!this.contract || !this.wallet) throw new Error('Blockchain contract not initialized');
    
    return this.enqueueTransaction(async () => {
      const nonce = await this.wallet!.getNonce();
      const tx = await this.contract!.updateItemStatus(id, status, { nonce });
      return await tx.wait();
    });
  }

  async getDonation(donationId: string) {
    if (!this.contract) throw new Error('Blockchain contract not initialized');
    return await this.contract.getDonation(donationId);
  }

  async getItem(id: number) {
    if (!this.contract) throw new Error('Blockchain contract not initialized');
    return await this.contract.items(id);
  }
}

export const blockchainService = new BlockchainService();
