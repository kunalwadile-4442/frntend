/* eslint-disable */
import React from "react";
import AnchorLink from "./AnchorLink";
import Icon from "./Icon";
import { App_url } from "../../utils/constants/static";

interface PaginationProps {
  onChange: (page: number) => void;
  pagination: {
    current_page: number;
    total_records: number;
    record_limit: number;
  };
}

const PaginationPage: React.FC<PaginationProps> = (props) => {
  const active = props?.pagination?.current_page;
  const length = Math.ceil(props?.pagination?.total_records / props?.pagination?.record_limit);
  const items: JSX.Element[] = [];

  const Pagination: React.FC<{ onClick: () => void; data: string | React.ReactNode }> = ({ onClick, data }) => (
    <li className="page-item">
      <AnchorLink onClick={onClick} className="page-link">
        <span aria-hidden="true">{data}</span>
      </AnchorLink>
    </li>
  );

  const PaginationItem: React.FC<{ number: number; onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | any) => void; children: React.ReactNode }> = ({ number, onClick, children }) => (
    <li className={`page-item ${number === active ? "active" : ""}`}>
      <AnchorLink onClick={onClick} className="page-link">
        {children}
      </AnchorLink>
    </li>
  );

  const startPage = Math.max(1, active - 2);
  const endPage = Math.min(length, active + 2);

  if (startPage > 1) {
    items.push(
      <PaginationItem
        number={1}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (1 === active) {
            return null;
          } else {
            props?.onChange(1);
          }
        }}
        key={1}
      >
        {1}
      </PaginationItem>
    );

    if (startPage > 2) {
      items.push(
        <li className="page-item" key="start-dots">
          <span className="page-link">...</span>
        </li>
      );
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <PaginationItem
        number={number}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (number === active) {
            return null;
          } else {
            props?.onChange(number);
          }
        }}
        key={number}
      >
        {number}
      </PaginationItem>
    );
  }

  if (endPage < length) {
    if (endPage < length - 1) {
      items.push(
        <li className="page-item" key="end-dots">
          <span className="page-link">...</span>
        </li>
      );
    }

    items.push(
      <PaginationItem
        number={length}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (length === active) {
            return null;
          } else {
            props?.onChange(length);
          }
        }}
        key={length}
      >
        {length}
      </PaginationItem>
    );
  }

  if (props?.pagination?.total_records <= 0 || props?.pagination?.total_records === undefined) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <div className="CommonPagination">
        <div className="pagination">
          <Pagination
            onClick={() => {
              if (active === 1) {
                return null;
              } else {
                props?.onChange(active - 1);
              }
            }}
            data={<Icon attrIcon={App_url.image.AngleDown} className="sm rotate-[90deg]" />}
          />
          {items}
          <Pagination
            onClick={() => {
              if (active === length) {
                return null;
              } else {
                props?.onChange(active + 1);
              }
            }}
            data={<Icon attrIcon={App_url.image.AngleDown} className="sm rotate-[-90deg]" />}
          />
        </div>
      </div>
    );
  }
};

export default PaginationPage;
