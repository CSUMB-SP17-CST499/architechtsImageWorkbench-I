import { shallow } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-test-utils';

import ImageUpload from './ImageUpload';

describe('<ImageUpload /> shallow rendering', () => {

  let imageUpload;
  let url = '';

  beforeEach(() => {
    imageUpload = shallow(<ImageUpload imagePreviewUrl={url}/>);
  });

  test('ImageUpload is rendered as type div', () => {
    expect(imageUpload.type()).toBe('div');
  });

  test('ImageUpload is rendered with className "previewComponent"', () => {
    expect(imageUpload.hasClass('previewComponent')).toBe(true);
  });

  test('ImageUpload image URL is "" when initialized with ""', () => {
    expect(imageUpload.state().imagePreviewUrl).toBe('');
  })

  test('ImageUpload is initialized with undefined file', () => {
    expect(imageUpload.state().file).toBe(undefined);
  });

  test('ImageUpload has three children', () => {
    expect(imageUpload.children().length).toBe(5);
  });

  test('ImageUpload has one div child', () => {
    expect(imageUpload.children().find('div').length).toBe(3);
  });

  test('ImageUpload has one form cihld', () => {
    expect(imageUpload.find('form').length).toBe(1);
  });
});
