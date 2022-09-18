import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';
import {signIn} from "next-auth/react";
import ButtOn from "../../common/ButtOn/ButtOn";

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="https://github.com/MAD-HAP/website/tree/main/website/pages">
            <a>GitHub</a>
          </Link>
        </li>
        <li>
          <ButtOn onClick={()=>signIn()}>
            Sign in
          </ButtOn>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'The modern way to manage your data.\n'}
            <span className="text-primary-500">Cloud Nine</span>
          </>
        }
        description="Boost your workflow"
        button={
          <Link href="https://github.com/MAD-HAP/">
            <a>
              <Button xl>Try now!</Button>
            </a>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
