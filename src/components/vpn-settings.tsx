
'use client';

import * as React from 'react';
import { Upload, ShieldAlert, Network, Route, User, KeyRound, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator'; // Import Separator

type VpnMode = 'bypass' | 'specific' | 'all';

export function VpnSettings() {
  const [vpnMode, setVpnMode] = React.useState<VpnMode>('all');
  const [bypassLocal, setBypassLocal] = React.useState(true);
  const [killSwitch, setKillSwitch] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [saveCredentials, setSaveCredentials] = React.useState(false);
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

  const handleSaveCredentials = () => {
    // In a real app, you would encrypt and store these securely.
    // For this example, we'll just log them and show a toast.
    console.log('Saving Credentials:', { username, password: '***', saveCredentials });
    toast({
      title: 'Credentials Saved',
      description: `Credentials have been ${saveCredentials ? 'saved' : 'updated (but not stored)'}.`,
    });
    // You might want to clear the password field after saving if not saving persistently
    // if (!saveCredentials) setPassword('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your VPN behavior and credentials.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

         {/* Authentication Section */}
         <div className="space-y-4">
           <Label className="flex items-center font-semibold">
             <User className="mr-2 h-5 w-5 text-primary" /> Authentication
           </Label>
           <div className="space-y-2 pl-1">
             <div className="space-y-1">
               <Label htmlFor="username">Username</Label>
               <Input
                 id="username"
                 type="text"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder="Enter your VPN username"
                 aria-label="VPN Username"
               />
             </div>
             <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your VPN password"
                    aria-label="VPN Password"
                    className="pr-10" // Add padding for the icon button
                    />
                    <Button
                    type="button" // Prevent form submission if inside a form
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 transform px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                    id="save-credentials"
                    checked={saveCredentials}
                    onCheckedChange={(checked) => setSaveCredentials(!!checked)} // Ensure boolean value
                />
                <Label htmlFor="save-credentials" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Save Credentials (insecurely for demo)
                </Label>
             </div>
             <Button onClick={handleSaveCredentials} size="sm" className="mt-2">
               <Save className="mr-2 h-4 w-4" /> Save Credentials
             </Button>
           </div>
         </div>

        <Separator />

        {/* Routing Section */}
        <div className="space-y-4">
          <Label className="flex items-center font-semibold">
            <Route className="mr-2 h-5 w-5 text-primary" /> VPN Routing Mode
          </Label>
           <RadioGroup defaultValue="all" value={vpnMode} onValueChange={(value: VpnMode) => setVpnMode(value)} className="space-y-2 pl-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="r-all" />
              <Label htmlFor="r-all" className="font-normal">VPN for all traffic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bypass" id="r-bypass" />
              <Label htmlFor="r-bypass" className="font-normal">Bypass VPN for specific apps</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="specific" id="r-specific" />
              <Label htmlFor="r-specific" className="font-normal">VPN only for specific apps</Label>
            </div>
          </RadioGroup>
           {/* Placeholder for app selection UI - conditionally rendered based on mode */}
          {(vpnMode === 'bypass' || vpnMode === 'specific') && (
            <div className="pl-8 pt-2 text-sm text-muted-foreground">
              {/* In a real app, this would be a list/selector for applications */}
              <p>(App selection UI would appear here)</p>
              <Button variant="outline" size="sm" className="mt-2">Manage Apps</Button>
            </div>
           )}
        </div>

        <Separator />

        {/* Other Options Section */}
        <div className="space-y-4">
             <Label className="flex items-center font-semibold">
                <Network className="mr-2 h-5 w-5 text-primary" /> Network Options
            </Label>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 shadow-sm">
                <Label htmlFor="bypass-local" className="flex items-center font-medium">
                    Bypass local network (LAN)
                </Label>
                <Switch
                    id="bypass-local"
                    checked={bypassLocal}
                    onCheckedChange={setBypassLocal}
                    aria-label="Toggle local network bypass"
                />
            </div>

            <Label className="flex items-center font-semibold pt-2">
                <ShieldAlert className="mr-2 h-5 w-5 text-primary" /> Security
            </Label>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 shadow-sm">
                <Label htmlFor="kill-switch" className="flex items-center font-medium">
                    Kill Switch
                </Label>
                <Switch
                    id="kill-switch"
                    checked={killSwitch}
                    onCheckedChange={setKillSwitch}
                    aria-label="Toggle kill switch"
                />
            </div>
        </div>

        <Separator />

        {/* Profile Import Section */}
        <div>
           <Label className="flex items-center font-semibold mb-2">
             <Upload className="mr-2 h-5 w-5 text-primary" /> VPN Profile
           </Label>
          <Button onClick={handleImportClick} variant="outline" className="w-full">
            Import OpenVPN Profile (.ovpn)
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".ovpn"
            className="hidden" // Hide the default file input
            id="vpn-profile-import"
            aria-labelledby="vpn-profile-import-label"
          />
          <p id="vpn-profile-import-label" className="sr-only">Import OpenVPN profile file input</p>
        </div>
      </CardContent>
    </Card>
  );
}
