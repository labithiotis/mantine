import React, { useState, forwardRef } from 'react';
import {
  useMantineTheme,
  DefaultProps,
  MantineNumberSize,
  MantineColor,
  ClassNames,
} from '@mantine/styles';
import { Transition, MantineTransition } from '../../Transition';
import useStyles from './Thumb.styles';

export type ThumbStylesNames = ClassNames<typeof useStyles>;

interface ThumbProps extends DefaultProps<ThumbStylesNames> {
  max: number;
  min: number;
  value: number;
  position: number;
  dragging: boolean;
  color: MantineColor;
  size: MantineNumberSize;
  label: React.ReactNode;
  onMouseDown(event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void;
  labelTransition?: MantineTransition;
  labelTransitionDuration?: number;
  labelTransitionTimingFunction?: string;
  labelAlwaysOn: boolean;
  thumbLabel: string;
  onFocus?(): void;
  onBlur?(): void;
  showLabelOnHover?: boolean;
}

export const Thumb = forwardRef<HTMLDivElement, ThumbProps>(
  (
    {
      max,
      min,
      value,
      position,
      label,
      dragging,
      onMouseDown,
      color,
      classNames,
      styles,
      size,
      labelTransition,
      labelTransitionDuration,
      labelTransitionTimingFunction,
      labelAlwaysOn,
      thumbLabel,
      onFocus,
      onBlur,
      showLabelOnHover,
    }: ThumbProps,
    ref
  ) => {
    const theme = useMantineTheme();
    const { classes, cx } = useStyles({ color, size }, { classNames, styles, name: 'Slider' });
    const [focused, setFocused] = useState(false);
    const isVisible = labelAlwaysOn || dragging || focused || showLabelOnHover;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        tabIndex={0}
        role="slider"
        aria-label={thumbLabel}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        ref={ref}
        className={cx(classes.thumb, { [classes.dragging]: dragging })}
        onFocus={() => {
          setFocused(true);
          typeof onFocus === 'function' && onFocus();
        }}
        onBlur={() => {
          setFocused(false);
          typeof onBlur === 'function' && onBlur();
        }}
        onTouchStart={onMouseDown}
        onMouseDown={onMouseDown}
        onClick={(event) => event.stopPropagation()}
        style={{ left: `${position}%` }}
      >
        <Transition
          mounted={label != null && isVisible}
          duration={labelTransitionDuration}
          transition={labelTransition}
          timingFunction={labelTransitionTimingFunction || theme.transitionTimingFunction}
        >
          {(transitionStyles) => (
            <div style={transitionStyles} className={classes.label}>
              {label}
            </div>
          )}
        </Transition>
      </div>
    );
  }
);

Thumb.displayName = '@mantine/core/SliderThumb';
