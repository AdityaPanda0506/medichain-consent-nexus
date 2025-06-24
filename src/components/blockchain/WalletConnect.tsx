import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet, 
  Network, 
  CheckCircle, 
  AlertTriangle,
  Loader2
} from "lucide-react";
import { blockchainService, SUPPORTED_NETWORKS } from '@/lib/blockchain';

interface WalletConnectProps {
  onConnectionChange?: (connected: boolean, address?: string, network?: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [currentNetwork, setCurrentNetwork] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum && blockchainService.isConnected()) {
      setIsConnected(true);
      setCurrentNetwork(blockchainService.getCurrentNetwork());
      // Get address from provider
      try {
        const provider = new (window as any).ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();
        setAddress(addr);
      } catch (error) {
        console.error('Error getting address:', error);
      }
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      const { address: walletAddress, network } = await blockchainService.connectWallet();
      setIsConnected(true);
      setAddress(walletAddress);
      setCurrentNetwork(network);
      onConnectionChange?.(true, walletAddress, network);
    } catch (error: any) {
      setError(error.message || 'Failed to connect wallet');
      onConnectionChange?.(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const switchNetwork = async (networkName: string) => {
    try {
      await blockchainService.switchNetwork(networkName);
      setCurrentNetwork(networkName);
      onConnectionChange?.(true, address, networkName);
    } catch (error: any) {
      setError(error.message || 'Failed to switch network');
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getNetworkStatus = (networkName: string) => {
    const config = SUPPORTED_NETWORKS[networkName];
    if (!config) return { color: 'bg-red-100 text-red-800', label: 'Unknown' };
    
    if (networkName === 'localhost') return { color: 'bg-blue-100 text-blue-800', label: 'Local' };
    if (networkName.includes('test') || networkName === 'sepolia' || networkName === 'mumbai') {
      return { color: 'bg-yellow-100 text-yellow-800', label: 'Testnet' };
    }
    return { color: 'bg-green-100 text-green-800', label: 'Mainnet' };
  };

  if (!window.ethereum) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          MetaMask is required to use blockchain features. Please install MetaMask and refresh the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Blockchain Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center space-y-4">
            <p className="text-slate-600">Connect your wallet to access blockchain features</p>
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Connected</span>
              </div>
              <Badge variant="outline">{formatAddress(address)}</Badge>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Network</label>
              <div className="flex items-center gap-2">
                <Select value={currentNetwork} onValueChange={switchNetwork}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SUPPORTED_NETWORKS).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Network className="w-4 h-4" />
                          {config.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {currentNetwork && (
                  <Badge className={getNetworkStatus(currentNetwork).color}>
                    {getNetworkStatus(currentNetwork).label}
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Chain ID: {SUPPORTED_NETWORKS[currentNetwork]?.chainId}</p>
              <p>Contract: {SUPPORTED_NETWORKS[currentNetwork]?.contractAddress ? 'Deployed' : 'Not deployed'}</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect;