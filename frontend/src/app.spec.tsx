import React from 'react';
import App from './app';

import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import { format } from 'util';







describe('app',()=>{
  let requests;
  let xhr : sinon.SinonFakeXMLHttpRequestStatic;
  let errorMock : any;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = req => requests.push(req);

    const originalConsoleError = global.console.error;
    errorMock = jest.spyOn(global.console, 'error');
    errorMock.mockImplementation((message : any, ...otherParams : any) => {
      originalConsoleError(message, ...otherParams);
      throw new Error(format(message, ...otherParams));
    });
  });
  afterEach(() => {
    xhr.restore();
    errorMock.mockRestore();
  });
  const files = [
    {
      name: 'success.png',
      toString() {
        return this.name;
      },
    },
  ];
  it('Init state',() => {
    const component = renderer.create(
      <App/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  // it('should set background to proper color on error', () => {
  //   const app = mount(<App />);
  //   app.find('input').simulate('change',files);
  //   expect(app.find('.wrapper').getElement().props.style.background).toEqual('#ff4d4f')
  // });

  it('should reset background color after transition end', () => {
    const app = mount(<App />);
    app.find('input').simulate('change',files);
    app.find('input').simulate('transitionEnd');
    app.find('input').simulate('transitionEnd');
    expect(app.find('.wrapper').getElement().props.style.background).toEqual('#ffffff')
  });
})