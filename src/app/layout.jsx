import { Comfortaa } from "next/font/google";
import "./globals.css";
import "@tailwindplus/elements";
import Navbar from "@/app/_components/mainComponents/navbar.jsx";
import Footer from "@/app/_components/mainComponents/footer.jsx";
import { LanguageProvider } from "./_hooks/useLanguageContext.jsx";
import { ThemeProvider } from "./_hooks/useTheme.jsx";

const comfortaa = Comfortaa({
    variable: "--font-comfortaa",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: {
        default: "GIG Construct",
        template: "%s | GIG Construct",
    },
    icons: {
        icon: "/gig_logo_white.svg",
    },
    description:
        "Строителнини услуги, ремонтни дейности, електро услуги, ВиК услуги, гипсокартон, боядисване, изолации, шпакловка, плочки, гранитогрес, извозване на строителни отпадъци.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${comfortaa.variable} antialiased font-sans`}>
                <ThemeProvider>
                    <LanguageProvider>
                        <header>
                            <Navbar />
                        </header>
                        <main className="min-h-screen bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm sm:text-base flex items-start justify-center py-20 lg:py-24">
                            {children}
                        </main>
                        <footer>
                            <Footer />
                        </footer>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
