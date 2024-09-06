// import Image from "next/image";
import localFont from "next/font/local";
import IntroSlider from "./components/IntroSlider";

const geistSpaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Bold.ttf",
  variable: "--font-space-grotesk",
  weight: "600",
});

export default function Home() {
  return (
    <div>
      <IntroSlider geistSpaceGrotesk={geistSpaceGrotesk}></IntroSlider>
      <div className="top-screen h-screen left-0 bg-red-50 relative">

      </div>
    </div>
  );
}
