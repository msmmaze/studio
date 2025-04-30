
'use client';

import * as React from 'react';
import { ShieldCheck, ShieldOff, Signal } from 'lucide-react'; // Added Signal icon
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Import CardDescription
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'disconnecting';

export function VpnStatus() {
  const [status, setStatus] = React.useState<ConnectionStatus>('disconnected');
  const [pingLatency, setPingLatency] = React.useState<number | null | 'pinging'>('pinging'); // Added state for ping
  const { toast } = useToast();
  const pingIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Simulate pinging Google DNS (8.8.8.8)
  const checkPing = React.useCallback(() => {
    if (status !== 'connected') {
      setPingLatency(null); // No ping if not connected
      return;
    }

    setPingLatency('pinging'); // Set to pinging state
    // Simulate network request delay
    setTimeout(() => {
      if (status === 'connected') { // Double check status after delay
        // Simulate latency (e.g., 20ms to 150ms)
        const latency = Math.floor(Math.random() * 131) + 20;
        setPingLatency(latency);
      } else {
         setPingLatency(null); // Set to null if disconnected during ping
      }
    }, 1000); // 1 second delay for simulation
  }, [status]); // Depend on status

  React.useEffect(() => {
    // Clear existing interval if status changes
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }

    if (status === 'connected') {
      checkPing(); // Initial ping check on connect
      // Set up interval to check ping every 10 seconds when connected
      pingIntervalRef.current = setInterval(checkPing, 10000);
    } else {
      setPingLatency(null); // Reset ping latency when not connected
    }

    // Cleanup interval on component unmount or status change
    return () => {
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [status, checkPing]); // Rerun effect when status or checkPing changes

  const handleConnectToggle = () => {
    if (status === 'connected') {
      setStatus('disconnecting');
      setPingLatency(null); // Reset ping on disconnect
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current); // Clear interval immediately
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
      setPingLatency('pinging'); // Show pinging state immediately
      // Simulate connect delay
      setTimeout(() => {
        setStatus('connected');
        toast({
          title: 'VPN Connected',
          description: 'Successfully connected to the VPN server.',
        });
        // checkPing() will be called by the useEffect
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
         <CardDescription>
            Current VPN connection state and latency to Google DNS.
         </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="flex justify-between w-full items-center">
             <p className={`text-lg font-semibold ${status === 'connected' ? 'text-green-600' : status === 'disconnected' ? 'text-destructive' : 'text-muted-foreground'}`}>
              {getStatusText()}
            </p>
             <div className="flex items-center text-sm text-muted-foreground">
                <Signal className="mr-1 h-4 w-4" />
                <span>Ping:</span>
                {status === 'connected' ? (
                    pingLatency === 'pinging' ? (
                        <Skeleton className="h-4 w-12 ml-1" /> // Show skeleton while pinging
                    ) : pingLatency !== null ? (
                        <span className="font-semibold text-foreground ml-1">{pingLatency} ms</span>
                    ) : (
                         <span className="ml-1">N/A</span> // Should not happen if connected, but fallback
                    )
                ) : (
                    <span className="ml-1">N/A</span>
                )}
            </div>
        </div>

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
