import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <>
      <Navbar />
      <Banner />
      <main className="max-w-screen-2xl w-full mx-auto xl:px-20 px-4 py-4">
        {children}
      </main>
    </>
  );
};

export default PlatformLayout;
