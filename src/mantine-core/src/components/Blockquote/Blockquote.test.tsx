import React from 'react';
import { mount, shallow } from 'enzyme';
import {
  checkAccessibility,
  itRendersChildren,
  itSupportsClassName,
  itSupportsOthers,
  itSupportsStyle,
  itSupportsStylesApi,
  itSupportsMargins,
  itSupportsRef,
} from '@mantine/tests';
import { Blockquote } from './Blockquote';
import { Blockquote as BlockquoteStylesApi } from './styles.api';

describe('@mantine/core/Blockquote', () => {
  itRendersChildren(Blockquote, {});
  itSupportsClassName(Blockquote, {});
  itSupportsOthers(Blockquote, {});
  itSupportsStyle(Blockquote, {});
  itSupportsMargins(Blockquote, {});
  itSupportsRef(Blockquote, {}, HTMLQuoteElement);
  itSupportsStylesApi(
    Blockquote,
    { cite: 'test-cite', children: 'test-quote' },
    Object.keys(BlockquoteStylesApi),
    'Blockquote'
  );

  checkAccessibility([
    mount(<Blockquote>test-quote</Blockquote>),
    mount(<Blockquote cite="test-cite">test-quote</Blockquote>),
  ]);

  it('renders given icon based on icon prop', () => {
    const withIcon = shallow(<Blockquote icon="$" />);
    const withoutIcon = shallow(<Blockquote icon={null} />);

    expect(withIcon.render().find('.mantine-Blockquote-icon').text()).toBe('$');
    expect(withoutIcon.render().find('.mantine-Blockquote-icon')).toHaveLength(0);
  });

  it('renders given cite based on cite prop', () => {
    const withCite = shallow(<Blockquote cite="test-cite" />);
    const withoutCite = shallow(<Blockquote />);

    expect(withCite.render().find('cite').text()).toBe('test-cite');
    expect(withoutCite.render().find('cite')).toHaveLength(0);
  });

  it('has correct displayName', () => {
    expect(Blockquote.displayName).toEqual('@mantine/core/Blockquote');
  });
});
