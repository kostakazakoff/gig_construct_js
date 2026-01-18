import AboutComponent from "./aboutClient";

export const metadata = {
    title: 'About Us',
    description: 'Научете повече за GiG Construct, нашата мисия, визия и екип. Строителни услуги с качество и доверие.',
    tags: ['about us', 'GIG construct', 'mission', 'vision', 'team', 'quality construction', 'trusted builder', 'за нас', 'мисия', 'визия', 'екип', 'качествено строителство', 'доверен строител', 'ремонтни услуги'],
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start w-full py-12">
      <AboutComponent />
    </div>
  );
}