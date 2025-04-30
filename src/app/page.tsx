

import { VpnStatus } from '@/components/vpn-status';
import { VpnSettings } from '@/components/vpn-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; // Keep Image import if needed elsewhere, though not used for logo now

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
           {/* SVG Representation of the ArkaNet Logo - Revised */}
           <svg
            viewBox="0 0 160 45" // Adjusted viewBox for better fit
            className="h-12 w-auto text-foreground" // Adjust height as needed
            aria-label="ArkaNet Logo"
           >
              <defs>
                  <style>
                  {`
                      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
                      .logo-font { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 30px; fill: currentColor; }
                      .arka-color { fill: #DC2626; } /* Red for Arka */
                  `}
                  </style>
              </defs>

              {/* "Arka" part - Red */}
              <text x="10" y="35" className="logo-font arka-color">
                A<tspan dx="-2">rka</tspan>
              </text>

              {/* Lock Path on top of 'A' - Positioned absolutely */}
              {/* Coordinates adjusted by trial & error relative to 'A' position and font size */}
              <path
                d="M 17 18 C 17 8 37 8 37 18" // U-shape path (M x1 y1 C cx1 cy1, cx2 cy2, x2 y2)
                stroke="#DC2626" // Red stroke
                strokeWidth="4"
                fill="none"
                strokeLinecap="round" // Rounded ends for the lock handle
              />
               {/* Optional: Small rectangle for lock body part below handle */}
               {/* <rect x="19" y="18" width="16" height="8" fill="#DC2626" rx="1" /> */}


              {/* "Net" part - Foreground color */}
              <text x="85" y="35" className="logo-font"> {/* Adjusted x position */}
                Net
              </text>
            </svg>

           <p className="text-center text-muted-foreground">Securely manage your VPN connection.</p>
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
