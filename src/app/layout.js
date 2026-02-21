import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "NEXUS Gaming Studio | Web3 Digital Reality",
  description:
    "Forging immersive blockchain gaming experiences. High-fidelity 3D assets meet sustainable tokenomics in a seamless metaverse. Game design, Web3 integration, and XR experiences.",
  keywords: "Web3, Gaming, Blockchain, NFT, Metaverse, Game Design, XR",
  openGraph: {
    title: "NEXUS Gaming Studio | Web3 Digital Reality",
    description:
      "Forging immersive blockchain gaming experiences beyond imagination.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
