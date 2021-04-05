import React from 'react';
import cx from 'clsx';
import { DefaultProps, useMantineTheme } from '@mantine/theme';
import { Text } from '../../Text/Text';
import { MenuItemProps } from '../MenuItem/MenuItem';
import useStyles from './MenuButton.styles';

interface MenuButtonProps extends DefaultProps, MenuItemProps {
  children: React.ReactNode;
  hovered: boolean;
  onHover(): void;
  elementRef(node: HTMLButtonElement): void;
}

export function MenuButton({
  children,
  onHover,
  hovered,
  themeOverride,
  elementRef,
  icon,
  color,
  disabled,
  cmd,
  className,
  ...others
}: MenuButtonProps) {
  const classes = useStyles({ color, theme: useMantineTheme(themeOverride) });

  return (
    <button
      type="button"
      role="menuitem"
      className={cx(classes.item, { [classes.hovered]: hovered }, className)}
      onMouseEnter={() => !disabled && onHover()}
      ref={elementRef}
      disabled={disabled}
      {...others}
    >
      <div className={classes.inner}>
        {icon && (
          <div data-mantine-icon className={classes.icon}>
            {icon}
          </div>
        )}

        <div className={classes.body}>
          <div className={classes.label}>{children}</div>

          {cmd && (
            <Text data-mantine-cmd className={classes.cmd} color="gray" size="sm">
              {cmd}
            </Text>
          )}
        </div>
      </div>
    </button>
  );
}

MenuButton.displayName = '@mantine/core/MenuButton';