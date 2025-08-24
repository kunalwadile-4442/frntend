/* eslint-disable */
import React, { forwardRef, Ref } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

export interface positionValues {
  top: number;
  left: number;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
}

interface IScrollbar {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  autoHide?: boolean;
  autoHideTimeout?: number;
  autoHideDuration?: number;
  className?: string;
  containerClassName?: string;
  onScrollFrame?: (values?: positionValues) => void;
  onScrollCapture?: any;
}

const Scrollbar = forwardRef<Scrollbars, IScrollbar>((props: IScrollbar, ref: Ref<Scrollbars>) => {
  const renderTrack = ({ style, ...props }) => {
    const trackStyle = {
      display: 'none',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  return (
    <Scrollbars
      style={props?.style}
      renderView={(viewProps) => (
        <div {...viewProps} style={{ ...viewProps?.style, paddingRight: 1, marginRight: -18, }} className={`view ${props?.className}`} />
      )}
      renderThumbVertical={(thumbProps) => <div {...thumbProps} className="thumb-view" />}
      className={`ScrollbarsSidebar ${props?.containerClassName}`}
      ref={ref}  // Use forwarded ref for Scrollbars here
      autoHide={props?.autoHide}
      autoHideTimeout={props?.autoHideTimeout}
      autoHideDuration={props?.autoHideDuration}
      onScrollFrame={props?.onScrollFrame}
      onScrollCapture={props?.onScrollCapture}

    >
      {props?.children}
    </Scrollbars>
  );
});

export default Scrollbar;
