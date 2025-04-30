import { VpnStatus } from '@/components/vpn-status';
import { VpnSettings } from '@/components/vpn-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
           {/* Using an inline SVG for the logo */}
           <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-primary" // Use primary color from theme
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path> {/* Checkmark inside shield */}
          </svg>
          <h1 className="text-3xl font-bold text-foreground">ArkaNet</h1>
          <p className="text-muted-foreground">Securely manage your VPN connection.</p>
        </div>

        <VpnStatus />
        <VpnSettings />

        <footer className="text-center text-xs text-muted-foreground pt-4">
           Built with Next.js & ShadCN UI. Platform compatibility requires native implementations.
        </footer>
      </div>
    </main>
  );
}
