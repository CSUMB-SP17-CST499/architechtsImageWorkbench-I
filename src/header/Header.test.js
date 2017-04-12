import { shallow } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Header from './Header';
import logo from '../../img/pan-logo.png';

describe('<Header /> shallow rendering', () => {

  let header;

  beforeAll(() => {
    header = shallow(<Header logo={logo} text="Designers' Image Engine" />)
  });

  test('<Header /> is rendered as type "div"', () => {
    expect(header.type()).toBe('div');
  });

  test('<Header /> is rendered with className "header"', () => {
    expect(header.hasClass('header')).toBe(true);
  });

  test('<Header /> contains an "img" and a "h2"', () => {
    var nChildren = header.children().length;
    var nImg = header.children().find('img').length;
    var nH2 = header.children().find('h2').length;

    var nElements = nImg + nH2;

    expect(nChildren).toBe(nElements);
  });

  test('<Header /> props are empty when none are passed', () => {
    expect(header.props.logo).toBeUndefined();
    expect(header.props.text).toBeUndefined();
  })

  test('<Header /> props are passed successfully', () => {
    header = shallow(<Header logo={logo} text="text"/>);

    var img = header.children().find('img');
    var h2 = header.children().find('h2');

    expect(img.prop('src')).toBe('pan-logo.png');
    expect(h2.text()).toBe('text');
  });
});
