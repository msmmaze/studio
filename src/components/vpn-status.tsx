
'use client';

import * as React from 'react';
import { ShieldCheck, ShieldOff } from 'lucide-react'; // Changed icons
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'disconnecting';

export function VpnStatus() {
  const [status, setStatus] = React.useState<ConnectionStatus>('disconnected');
  const { toast } = useToast();

  const handleConnectToggle = () => {
    if (status === 'connected') {
      setStatus('disconnecting');
      // Simulate disconnect delay
      setTimeout(() => {
        setStatus('disconnected');
        toast({
          title: 'VPN Disconnected',
          description: 'You are no longer connected to the VPN.',
        });
      }, 1500);
    } else if (status === 'disconnected') {
      setStatus('connecting');
      // Simulate connect delay
      setTimeout(() => {
        setStatus('connected');
        toast({
          title: 'VPN Connected',
          description: 'Successfully connected to the VPN server.',
        });
      }, 2000);
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnecting':
        return 'Disconnecting...';
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'connected':
        return 'Disconnect';
      case 'disconnected':
        return 'Connect';
      case 'connecting':
        return 'Connecting...';
      case 'disconnecting':
        return 'Disconnecting...';
    }
  };

  const isConnectingOrDisconnecting = status === 'connecting' || status === 'disconnecting';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Connection Status</span>
          {status === 'connected' ? (
            <ShieldCheck className="text-green-600" /> // Changed icon
          ) : status === 'disconnected' ? (
             <ShieldOff className="text-destructive" /> // Changed icon
          ) : (
             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div> // Loading spinner remains
          )
         }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <p className={`text-lg font-semibold ${status === 'connected' ? 'text-green-600' : status === 'disconnected' ? 'text-destructive' : 'text-muted-foreground'}`}>
          {getStatusText()}
        </p>
        <Button
          onClick={handleConnectToggle}
          disabled={isConnectingOrDisconnecting}
          className={`w-full ${status === 'connected' ? 'bg-destructive hover:bg-destructive/90' : ''}`}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
}
