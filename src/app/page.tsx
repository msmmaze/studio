

import { VpnStatus } from '@/components/vpn-status';
import { VpnSettings } from '@/components/vpn-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; // Keep Image import if needed elsewhere, though not used for logo now

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
           {/* SVG Representation of the ArkaNet Logo */}
           <svg
            viewBox="0 0 200 40" // Adjust viewBox based on desired aspect ratio and detail
            className="h-12 w-auto text-foreground" // Adjust height as needed, width auto maintains aspect ratio
            aria-label="ArkaNet Logo"
           >
              {/* Define reusable font style - Using Poppins Bold as a close match */}
              <defs>
                  <style>
                  {`
                      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
                      .logo-font { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 30px; }
                  `}
                  </style>
              </defs>

              {/* "Arka" part - Red */}
              {/* Using Tailwind's red-600 hex: #DC2626 */}
              <text x="0" y="30" className="logo-font" fill="#DC2626">
                {/* Stylized 'A' with lock */}
                <tspan>
                    <tspan dx="-3" dy="-1">A</tspan> {/* Slight adjustment for lock positioning relative to A */}
                    {/* Lock Path on top of 'A' - Simplified U-shape */}
                     <tspan>
                         {/* Adjusted SVG coordinates and path for the lock */}
                        <svg x="1" y="-3" width="28" height="15" >
                            <path d="M 5 14 C 5 6 23 6 23 14" stroke="#DC2626" strokeWidth="4" fill="none"/>
                        </svg>
                    </tspan>
                </tspan>
                <tspan dx="-18">rka</tspan> {/* Adjust dx to position rest of "Arka" */}
              </text>

              {/* "Net" part - Foreground color */}
              <text x="95" y="30" className="logo-font" fill="currentColor"> {/* Use current text color (foreground) */}
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
