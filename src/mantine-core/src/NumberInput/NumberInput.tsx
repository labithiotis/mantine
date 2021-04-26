import React, { useState, useEffect, useRef } from 'react';
import cx from 'clsx';
import { useMergedRef } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/theme';
import { TextInput } from '../TextInput/TextInput';
import useStyles, { CONTROL_WIDTH } from './NumberInput.styles';

interface NumberInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextInput>,
    'rightSection' | 'rightSectionProps' | 'rightSectionWidth' | 'onChange' | 'value'
  > {
  onChange(value: number): void;
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  hideControls?: boolean;
  precision?: number;
}

export function NumberInput({
  disabled,
  themeOverride,
  elementRef,
  value,
  onChange,
  min,
  max,
  step = 1,
  onBlur,
  onFocus,
  hideControls = false,
  radius = 'sm',
  variant,
  precision = 0,
  ...others
}: NumberInputProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme, radius });
  const [focused, setFocused] = useState(false);
  const [tempValue, setTempValue] = useState(
    typeof value === 'number' ? value.toFixed(precision) : ''
  );
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (typeof value === 'number' && !focused) {
      setTempValue(value.toFixed(precision));
    }
  }, [value]);

  const rightSection = (
    <div className={classes.rightSection}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        data-mantine-increment
        onMouseDown={(event) => {
          event.preventDefault();
          const result = Math.min(value + step, max);
          onChange(result);
          setTempValue(result.toFixed(precision));
          inputRef.current.focus();
        }}
        disabled={value >= max}
        className={cx(classes.control, classes.controlUp)}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        data-mantine-decrement
        onMouseDown={(event) => {
          event.preventDefault();
          const result = Math.max(value - step, min);
          onChange(result);
          setTempValue(result.toFixed(precision));
          inputRef.current.focus();
        }}
        disabled={value <= min}
        className={cx(classes.control, classes.controlDown)}
      />
    </div>
  );

  const validate = (val: string) => {
    const parsed = Number(val);
    let isValid = !Number.isNaN(parsed);

    if (typeof min === 'number' && parsed < min) {
      isValid = false;
    }

    if (typeof max === 'number' && parsed > max) {
      isValid = false;
    }

    return { isValid, parsed };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setTempValue(val);

    const { isValid, parsed } = validate(val);

    if (isValid) {
      val.trim() !== '' && onChange(parsed);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTempValue(value.toFixed(precision));
    setFocused(false);
    typeof onBlur === 'function' && onBlur(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    typeof onFocus === 'function' && onBlur(event);
  };

  return (
    <TextInput
      {...others}
      variant={variant}
      value={tempValue}
      disabled={disabled}
      themeOverride={themeOverride}
      elementRef={useMergedRef(inputRef, elementRef)}
      type="number"
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      rightSection={disabled || hideControls || variant === 'unstyled' ? null : rightSection}
      rightSectionWidth={CONTROL_WIDTH + 1}
      radius={radius}
      max={max}
      min={min}
      step={step}
    />
  );
}

NumberInput.displayName = '@mantine/core/NumberInput';