/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import Images from "./Image"; // Import Image component directly
import Button from "./button/Button";
import { useNavigate } from "react-router-dom";

interface IconProps {
  className?: string;
  buttonClassName?: string;
  size?: string;
  variant?: string;
  to?: string;
  auth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: (e: any) => void;
  loading?: boolean;
  attrIcon?: any;
  image?: boolean;
  style?: any;
  button?: boolean;
}

const Icon: React.FC<IconProps> = (props) => {
  const navigate = useNavigate();

  const onClick = (e: any) => {
    if (props?.onClick) {
      e.preventDefault();
      e.stopPropagation();
      props?.onClick(e);
    }
    if (props?.to) {
      e.preventDefault();
      e.stopPropagation();
      navigate(props?.to)
    }
  };
  const IconData = () => {
    if (props?.image) {
      return (
        <i
          onClick={onClick}
          className={`common_icon_image ${props?.className}`}
        >
          <Images src={props?.attrIcon || ""} auth={props?.auth} />
        </i>
      );
    }
    return (
      <i
        onClick={onClick}
        style={{ ...props?.style, "--icon-url": `url(${props?.attrIcon})` }}
        className={`common_icon ${props?.className}`}
        attr-icon={props?.attrIcon}
      />
    );
  };

  const ButtonView = () => {
    return (
      <Button
        disabled={props?.disabled}
        onClick={onClick}
        className={`btn-icon ${props?.buttonClassName} btn-${props?.size} `}
        label={IconData()}
      />
    );
  };

  if (props?.button) {
    return ButtonView();
  }
  return IconData();
};

Icon.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  auth: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  attrIcon: PropTypes.string,
  image: PropTypes.bool,
  style: PropTypes.object,
  button: PropTypes.bool,
};

export default Icon;
