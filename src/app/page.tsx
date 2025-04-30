
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
              {/* Define reusable font style */}
              <defs>
                  <style>
                  {`
                      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
                      .logo-font { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 30px; }
                  `}
                  </style>
              </defs>
              {/* Background (optional, if needed for contrast on different themes) */}
              {/* <rect width="100%" height="100%" fill="transparent"/> */}

              {/* "Arka" part - Red */}
              <text x="0" y="30" className="logo-font" fill="#DC2626"> {/* Using Tailwind's red-600 hex */}
                {/* Stylized 'A' with lock */}
                <tspan>
                    <tspan dx="-3" dy="-1">A</tspan> {/* Slight adjustment for lock */}
                    {/* Lock Path on top of 'A' - Simplified */}
                    <tspan>
                        <svg x="1" y="-2" width="28" height="15" >
                            <path d="M 5 15 C 5 7 23 7 23 15" stroke="#DC2626" strokeWidth="4" fill="none"/>
                             {/* Lock body part - visually integrated */}
                             {/* <rect x="9" y="10" width="10" height="5" fill="#DC2626" stroke="#DC2626" stroke-width="1"/> */}
                        </svg>
                    </tspan>
                </tspan>
                <tspan dx="-18">rka</tspan> {/* Adjust dx to position rest of "Arka" */}
              </text>

              {/* "Net" part - Foreground color */}
              <text x="95" y="30" className="logo-font" fill="currentColor"> {/* Use current text color */}
                Net
              </text>
            </svg>

          {/* Removed original h1 and p tags that duplicated the logo */}
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
