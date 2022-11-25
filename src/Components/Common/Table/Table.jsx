import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './table.scss';
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

const TableComponent = (props) => {
  

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={props.data}
      className="table-style"
    />
  );
}

export default TableComponent;