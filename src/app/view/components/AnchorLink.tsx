/* eslint-disable */
import React, { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributeAnchorTarget, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface AnchorLinkProps {
    to?: string;
    slash?: boolean;
    onClick?: (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    target?: HTMLAttributeAnchorTarget;
    style?: React.CSSProperties;
    id?: string;
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
    const { to = "", slash, onClick, target, style, id, title, className = "", children } = props;
    const currentPath = window.location.pathname;

    let To = to;
    if (slash) {
        To = `${To}/`;
    }

    const handleClick = (e: any) => {
        if (onClick && !to) {
            e.preventDefault();
            onClick(e);
        }
    }

    const isActive = To === currentPath;

    return (
        <Link
            to={To}
            style={style}
            id={id}
            onClick={handleClick}
            title={title}
            className={`${className} ${isActive ? 'active-link' : ''}`}
        >
            {children}
        </Link>
    );
}

export default AnchorLink;
