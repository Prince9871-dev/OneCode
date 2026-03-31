import { Header } from "@/modules/home/header";
import Footer from "@/modules/home/footer";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="relative w-full flex-1">
        {/* Grid background */}
        <div
          className={cn(
            "fixed inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        {/* Radial fade overlay */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        {/* Page content */}
        <main className="relative z-20 w-full flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}