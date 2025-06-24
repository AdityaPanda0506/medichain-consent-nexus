import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CreditCard, 
  Wallet, 
  DollarSign, 
  CheckCircle,
  AlertTriangle,
  Loader2,
  Receipt
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'crypto' | 'card' | 'bank';
  name: string;
  icon: React.ReactNode;
  description: string;
  fees: string;
}

interface PaymentDetails {
  amount: string;
  currency: string;
  description: string;
  recipient: string;
  paymentMethod: string;
}

const PaymentIntegration = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: '',
    currency: 'ETH',
    description: '',
    recipient: '',
    paymentMethod: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'ethereum',
      type: 'crypto',
      name: 'Ethereum (ETH)',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Pay with Ethereum directly from your wallet',
      fees: '~$2-10 gas fees'
    },
    {
      id: 'polygon',
      type: 'crypto',
      name: 'Polygon (MATIC)',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Low-cost payments on Polygon network',
      fees: '~$0.01-0.10 gas fees'
    },
    {
      id: 'stripe',
      type: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Pay with Visa, Mastercard, or American Express',
      fees: '2.9% + $0.30'
    },
    {
      id: 'bank',
      type: 'bank',
      name: 'Bank Transfer',
      icon: <DollarSign className="w-5 h-5" />,
      description: 'Direct bank transfer (ACH)',
      fees: '$0.80 per transfer'
    }
  ];

  const currencies = [
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'MATIC', label: 'Polygon (MATIC)' },
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' }
  ];

  const handlePayment = async () => {
    if (!selectedMethod || !paymentDetails.amount || !paymentDetails.recipient) {
      setError('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    setError('');
    setPaymentStatus('idle');

    try {
      if (selectedMethod === 'ethereum' || selectedMethod === 'polygon') {
        await processCryptoPayment();
      } else if (selectedMethod === 'stripe') {
        await processStripePayment();
      } else if (selectedMethod === 'bank') {
        await processBankTransfer();
      }
    } catch (error: any) {
      setError(error.message || 'Payment failed');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const processCryptoPayment = async () => {
    // Mock crypto payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate transaction hash
    const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
    setTransactionHash(mockTxHash);
    setPaymentStatus('success');
  };

  const processStripePayment = async () => {
    // Mock Stripe payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment intent ID
    const mockPaymentId = 'pi_' + Math.random().toString(36).substr(2, 24);
    setTransactionHash(mockPaymentId);
    setPaymentStatus('success');
  };

  const processBankTransfer = async () => {
    // Mock bank transfer processing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Simulate transfer ID
    const mockTransferId = 'ACH_' + Math.random().toString(36).substr(2, 16);
    setTransactionHash(mockTransferId);
    setPaymentStatus('success');
  };

  const getMethodIcon = (method: PaymentMethod) => {
    const baseClasses = "w-12 h-12 rounded-lg flex items-center justify-center";
    
    switch (method.type) {
      case 'crypto':
        return <div className={`${baseClasses} bg-blue-100 text-blue-600`}>{method.icon}</div>;
      case 'card':
        return <div className={`${baseClasses} bg-green-100 text-green-600`}>{method.icon}</div>;
      case 'bank':
        return <div className={`${baseClasses} bg-purple-100 text-purple-600`}>{method.icon}</div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-600`}>{method.icon}</div>;
    }
  };

  if (paymentStatus === 'success') {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-slate-600 mb-4">Your payment has been processed successfully.</p>
          
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">{paymentDetails.amount} {paymentDetails.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Recipient:</span>
                <span className="font-semibold">{paymentDetails.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono text-xs">{transactionHash}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setPaymentStatus('idle');
                setPaymentDetails({
                  amount: '',
                  currency: 'ETH',
                  description: '',
                  recipient: '',
                  paymentMethod: ''
                });
                setSelectedMethod('');
                setTransactionHash('');
              }}
            >
              Make Another Payment
            </Button>
            <Button>
              <Receipt className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start gap-3">
                  {getMethodIcon(method)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{method.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{method.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {method.fees}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      {selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                <Input
                  type="number"
                  step="0.001"
                  placeholder="0.00"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                <Select 
                  value={paymentDetails.currency} 
                  onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Recipient</label>
              <Input
                placeholder="Doctor ID, wallet address, or email"
                value={paymentDetails.recipient}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, recipient: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description (Optional)</label>
              <Input
                placeholder="Consultation fee, appointment booking, etc."
                value={paymentDetails.description}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Payment Method Specific Fields */}
            {selectedMethod === 'stripe' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold">Card Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                    <Input placeholder="123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ZIP Code</label>
                    <Input placeholder="12345" />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'bank' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold">Bank Account Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Account Number</label>
                    <Input placeholder="Account number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Routing Number</label>
                    <Input placeholder="Routing number" />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Payment Summary</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>{paymentDetails.amount || '0.00'} {paymentDetails.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span>{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fees:</span>
                  <span>{paymentMethods.find(m => m.id === selectedMethod)?.fees}</span>
                </div>
                {paymentDetails.recipient && (
                  <div className="flex justify-between">
                    <span>To:</span>
                    <span className="truncate max-w-32">{paymentDetails.recipient}</span>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={isProcessing || !paymentDetails.amount || !paymentDetails.recipient}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {paymentDetails.amount || '0.00'} {paymentDetails.currency}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PaymentIntegration;