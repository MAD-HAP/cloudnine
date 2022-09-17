import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Our services"
    description= "We aim to provide the best solutions for managing your resources. "
  >
    <VerticalFeatureRow
      title="Team Groups"
      description="Now you can have group collaborations without worrying about
      access rights. "
      image="/assets/images/Team.svg"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="Quick Transfer"
      description="Large files can be transferred smoothly and quickly over our channel."
      image="/assets/images/Transfer.svg"
      imageAlt="Second feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="Support"
      description="We provide large support over a range of files, quick draw or drop anything,
      we got you!"
      image="/assets/images/Support.svg"
      imageAlt="Alt"
    />
  </Section>
);

export { VerticalFeatures };
