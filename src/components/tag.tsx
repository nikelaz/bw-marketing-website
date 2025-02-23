import stylex from '@stylexjs/stylex';
import { fontSizes, fontWeights, colors } from '../styles/theme.stylex';
import type React from 'react';

const styles = stylex.create({
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.833rem',
  },
  icon: {
    width: '0.833rem',
    height: '0.833rem',
    color: colors.ash900,
  },
  label: {
    fontSize: fontSizes['20'],
    lineHeight: 1,
    fontWeight: fontWeights.medium,
    color: colors.ash900,
  },
  fs24: {
    fontSize: fontSizes['24'],
  }
});

export const Tag = (props: GenericChildrenProps) => (
  <div {...stylex.props(styles.tag)}>
    {props.children}
  </div>
);

export const TagIcon = (props: GenericChildrenProps) => (
  <div {...stylex.props(styles.icon)}>{props.children}</div>
);

interface TagLabelProps {
  children: React.ReactNode;
  fontSize?: 24;
}

export const TagLabel = (props: TagLabelProps) => (
  <div {...stylex.props(styles.label, props.fontSize && styles[`fs${props.fontSize}`])}>{props.children}</div>
);
