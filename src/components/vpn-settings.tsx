'use client';

import * as React from 'react';
import { Upload, ShieldAlert, Network, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input'; // Import Input component

type VpnMode = 'bypass' | 'specific' | 'all';

export function VpnSettings() {
  const [vpnMode, setVpnMode] = React.useState<VpnMode>('all');
  const [bypassLocal, setBypassLocal] = React.useState(true);
  const [killSwitch, setKillSwitch] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.ovpn')) {
      // Simulate profile import
      console.log('Importing profile:', file.name);
      toast({
        title: 'Profile Imported',
        description: `${file.name} has been successfully imported.`,
      });
      // Reset file input value to allow importing the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      toast({
        title: 'Import Failed',
        description: 'Please select a valid .ovpn file.',
        variant: 'destructive',
      });
       // Reset file input value if invalid file selected
       if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your VPN behavior.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="flex items-center font-semibold">
            <Route className="mr-2 h-5 w-5 text-primary" /> VPN Routing Mode
          </Label>
           <RadioGroup defaultValue="all" value={vpnMode} onValueChange={(value: VpnMode) => setVpnMode(value)} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="r-all" />
              <Label htmlFor="r-all">VPN for all traffic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bypass" id="r-bypass" />
              <Label htmlFor="r-bypass">Bypass VPN for specific apps</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="specific" id="r-specific" />
              <Label htmlFor="r-specific">VPN only for specific apps</Label>
            </div>
          </RadioGroup>
           {/* Placeholder for app selection UI - conditionally rendered based on mode */}
          {(vpnMode === 'bypass' || vpnMode === 'specific') && (
            <div className="pl-6 pt-2 text-sm text-muted-foreground">
              {/* In a real app, this would be a list/selector for applications */}
              <p>(App selection UI would appear here)</p>
              <Button variant="outline" size="sm" className="mt-2">Manage Apps</Button>
            </div>
           )}
        </div>

        <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 shadow-sm">
          <Label htmlFor="bypass-local" className="flex items-center font-medium">
            <Network className="mr-2 h-5 w-5 text-primary" />
            Bypass local network (LAN)
          </Label>
          <Switch
            id="bypass-local"
            checked={bypassLocal}
            onCheckedChange={setBypassLocal}
            aria-label="Toggle local network bypass"
          />
        </div>

        <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 shadow-sm">
          <Label htmlFor="kill-switch" className="flex items-center font-medium">
             <ShieldAlert className="mr-2 h-5 w-5 text-primary" />
             Kill Switch
          </Label>
          <Switch
            id="kill-switch"
            checked={killSwitch}
            onCheckedChange={setKillSwitch}
            aria-label="Toggle kill switch"
          />
        </div>

        <div>
          <Button onClick={handleImportClick} variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Import OpenVPN Profile (.ovpn)
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".ovpn"
            className="hidden" // Hide the default file input
            id="vpn-profile-import"
          />
        </div>
      </CardContent>
    </Card>
  );
}
