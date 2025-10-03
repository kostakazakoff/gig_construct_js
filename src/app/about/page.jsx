import AboutComponent from "./about_client";

export const metadata = {
    title: 'About Us',
    description: 'Научете повече за GiG Construct, нашата мисия, визия и екип. Строителни услуги с качество и доверие.',
    tags: ['about us', 'GIG construct', 'mission', 'vision', 'team', 'quality construction', 'trusted builder'],
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <AboutComponent />
    </div>
  );
}