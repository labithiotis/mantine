import { createStyles, getSizeValue, MantineNumberSize, getFontStyles } from '@mantine/styles';

interface DialogStyles {
  size: MantineNumberSize;
}

const sizes = {
  xs: 160,
  sm: 200,
  md: 340,
  lg: 400,
  xl: 500,
};

export default createStyles((theme, { size }: DialogStyles) => ({
  root: {
    ...getFontStyles(theme),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    position: 'relative',
    width: getSizeValue({ size, sizes }),
    maxWidth: '100%',
    minHeight: 50,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  closeButton: {
    position: 'absolute',
    top: theme.spacing.md / 2,
    right: theme.spacing.md / 2,
  },
}));
