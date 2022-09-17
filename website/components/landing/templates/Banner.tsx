import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="Have a taste of our amazing document management services at a 
      single touch."
      subtitle="Get started now!"
      button={
        // sign in reference here
        <Link href="https://github.com/MAD-HAP/website/tree/main/website/pages">
          <a>
            <Button>Get Started</Button>
          </a>
        </Link>
      }
    />
  </Section>
);

export { Banner };
