declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}


// react-native-event-bus
declare module 'react-native-event-bus' {
  type Callback = (...args: any[]) => void;

  export default class EventBus {
    static getInstance(): EventBus;
    addListener(event: string, callback: Callback): any;
    removeListener(subscription: any): void;
    fireEvent(event: string, data?: any): void;
  }
}
