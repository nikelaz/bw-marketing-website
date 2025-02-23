import stylex from '@stylexjs/stylex';
import { colors } from '../styles/theme.stylex';
import { Row, Col } from './grid';
import Heading from './heading';
import Stack from './stack';
import Button from './button';
import Paragaph from './paragraph';
import Section from './section';

import imgPrefooterIllustration from '../assets/prefooter-illustration.svg';
const md: MdMaxMediaQuery  = '@media (max-width: 768px)';

const styles = stylex.create({
  prefooter: {
    position: 'relative',
    backgroundColor: colors.ash300,
    borderRadius: '0.833rem',
    padding: {
      default: '2.5rem',
      [md]: '1rem 1.5rem',
    }
  },
  illustration: {
    display: {
      default: null,
      [md]: 'none',
    },
    position: 'absolute',
    bottom: 0,
    left: '50%',
  }
});

const Prefooter = () => (
  <Section>
    <div {...stylex.props(styles.prefooter)}>
      <Row>
        <Col span={6} break="md">
          <Stack gap="md">
            <Stack gap="sm">
              <Heading level="h2" size={40}>Get Started for Free!</Heading>
              <Paragaph fontSize={26}>Take control of your personal finances.</Paragaph>
            </Stack>
            <Button href="https://app.budgetwarden.com/sign-up" fontSize={20}>Sign Up</Button>
          </Stack>
        </Col>
        <img src={imgPrefooterIllustration.src} loading="lazy" alt="a male and female character shown as saving large coins in a cartoon piggy bank to demonstrate a couple saving money together" {...stylex.props(styles.illustration)} />
      </Row>
    </div>
  </Section>
);

export default Prefooter;
