import { ethers } from 'ethers';
import MedChainRegistryABI from '../contracts/MedChainRegistry.json';
import contractAddresses from '../contracts/contract-address.json';

export interface BlockchainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  contractAddress: string;
}

export const SUPPORTED_NETWORKS: Record<string, BlockchainConfig> = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
    contractAddress: contractAddresses.MedChainRegistry || ''
  },
  polygon: {
    chainId: 137,
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY',
    contractAddress: contractAddresses.MedChainRegistry || ''
  },
  mumbai: {
    chainId: 80001,
    name: 'Mumbai Testnet',
    rpcUrl: 'https://polygon-mumbai.infura.io/v3/YOUR_INFURA_KEY',
    contractAddress: contractAddresses.MedChainRegistry || ''
  },
  localhost: {
    chainId: 1337,
    name: 'Localhost',
    rpcUrl: 'http://127.0.0.1:8545',
    contractAddress: contractAddresses.MedChainRegistry || ''
  }
};

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private currentNetwork: string = 'localhost';

  async connectWallet(): Promise<{ address: string; network: string }> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      
      // Set current network based on chainId
      this.currentNetwork = this.getNetworkName(Number(network.chainId));
      
      // Initialize contract
      this.initializeContract();
      
      return { address, network: this.currentNetwork };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  private getNetworkName(chainId: number): string {
    for (const [name, config] of Object.entries(SUPPORTED_NETWORKS)) {
      if (config.chainId === chainId) {
        return name;
      }
    }
    return 'unknown';
  }

  private initializeContract() {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const networkConfig = SUPPORTED_NETWORKS[this.currentNetwork];
    if (!networkConfig.contractAddress) {
      throw new Error(`Contract not deployed on ${this.currentNetwork}`);
    }

    this.contract = new ethers.Contract(
      networkConfig.contractAddress,
      MedChainRegistryABI.abi,
      this.signer
    );
  }

  async switchNetwork(networkName: string): Promise<void> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const networkConfig = SUPPORTED_NETWORKS[networkName];
    if (!networkConfig) {
      throw new Error(`Unsupported network: ${networkName}`);
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${networkConfig.chainId.toString(16)}` }],
      });
      
      this.currentNetwork = networkName;
      this.initializeContract();
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        await this.addNetwork(networkName);
      } else {
        throw error;
      }
    }
  }

  private async addNetwork(networkName: string): Promise<void> {
    const networkConfig = SUPPORTED_NETWORKS[networkName];
    
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${networkConfig.chainId.toString(16)}`,
        chainName: networkConfig.name,
        rpcUrls: [networkConfig.rpcUrl],
        nativeCurrency: {
          name: networkName === 'polygon' ? 'MATIC' : 'ETH',
          symbol: networkName === 'polygon' ? 'MATIC' : 'ETH',
          decimals: 18
        }
      }]
    });
  }

  // Patient Registration
  async registerPatient(encryptedData: string, country: string, state: string): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.contract.registerPatient(encryptedData, country, state);
      const receipt = await tx.wait();
      
      // Extract patient ID from events
      const event = receipt.events?.find((e: any) => e.event === 'PatientRegistered');
      return event?.args?.patientId || '';
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  }

  // Doctor Registration
  async registerDoctor(
    licenseNumber: string,
    specialization: string,
    hospitalName: string,
    country: string,
    state: string,
    consultationFee: string
  ): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const feeInWei = ethers.parseEther(consultationFee);
      const tx = await this.contract.registerDoctor(
        licenseNumber,
        specialization,
        hospitalName,
        country,
        state,
        feeInWei
      );
      const receipt = await tx.wait();
      
      // Extract doctor ID from events
      const event = receipt.events?.find((e: any) => e.event === 'DoctorRegistered');
      return event?.args?.doctorId || '';
    } catch (error) {
      console.error('Error registering doctor:', error);
      throw error;
    }
  }

  // Grant Consent
  async grantConsent(
    doctorId: string,
    dataTypes: string[],
    expiryDate: number,
    purpose: string
  ): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.contract.grantConsent(doctorId, dataTypes, expiryDate, purpose);
      const receipt = await tx.wait();
      
      const event = receipt.events?.find((e: any) => e.event === 'ConsentGranted');
      return event?.args?.consentHash || '';
    } catch (error) {
      console.error('Error granting consent:', error);
      throw error;
    }
  }

  // Book Appointment
  async bookAppointment(
    doctorId: string,
    scheduledTime: number,
    notes: string,
    fee: string
  ): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const feeInWei = ethers.parseEther(fee);
      const tx = await this.contract.bookAppointment(doctorId, scheduledTime, notes, {
        value: feeInWei
      });
      const receipt = await tx.wait();
      
      const event = receipt.events?.find((e: any) => e.event === 'AppointmentBooked');
      return event?.args?.appointmentId || 0;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }

  // Get Doctors by Specialization
  async getDoctorsBySpecialization(specialization: string): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.getDoctorsBySpecialization(specialization);
    } catch (error) {
      console.error('Error getting doctors by specialization:', error);
      throw error;
    }
  }

  // Get Doctors by Location
  async getDoctorsByLocation(country: string, state: string): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.getDoctorsByLocation(country, state);
    } catch (error) {
      console.error('Error getting doctors by location:', error);
      throw error;
    }
  }

  // Get Doctor Details
  async getDoctor(doctorId: string): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.doctors(doctorId);
    } catch (error) {
      console.error('Error getting doctor details:', error);
      throw error;
    }
  }

  // Get Patient Details
  async getPatient(patientId: string): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.patients(patientId);
    } catch (error) {
      console.error('Error getting patient details:', error);
      throw error;
    }
  }

  // Get Current Network
  getCurrentNetwork(): string {
    return this.currentNetwork;
  }

  // Check if wallet is connected
  isConnected(): boolean {
    return this.signer !== null;
  }
}

export const blockchainService = new BlockchainService();