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
        icon: "/gig_logo_white_48px.svg",
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
                        <main className="isolate min-h-screen bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm sm:text-base flex justify-center py-16 lg:py-20">

                            <div
                                aria-hidden="true"
                                className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                            >
                                <div
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                    className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
                                />
                            </div>
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
