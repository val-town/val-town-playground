import React from 'react';
import {createComponent} from '@lit/react';
import {Playground} from './vt-playground.js';

export const ValTownPlayground = createComponent({
  tagName: 'vt-playground',
  elementClass: Playground,
  react: React,
  events: {
    onactivate: 'activate',
    onchange: 'change'
  }
});
