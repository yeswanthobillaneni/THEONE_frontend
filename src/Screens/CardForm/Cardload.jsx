import React,{ useEffect, useState, useContext } from "react";
import {Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { getCookie } from "../../Utils/cookieHandling";
import moment from "moment";
import { URL } from "../../Utils/url";
import "./Cardload.scss";



const CardLoad = () => {

  const calculateDecimalFor8 = (value) => {
    if (value != undefined) {
      var num = value;
      var with5Decimals = num.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0];
      return with5Decimals;
    }
    return 0;
  };
  const [adminsList, setAdminsList] = useState(null);
  const [cardLoadData, setcardLoadData] = useState(0);
  const [balance, setBalance] = useState(null);
  const [labelClick, setLableClick] = useState(false);



  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 500,
    },
    cell_long: {
      fontSize: "10px",
      width: 600,
      minWidth: 1,
      backgroundColor: "#ee82ee",
    },
  });
  const calculateDecimal = (value) => {
    if (value != undefined) {
      var num = value;

      if (value.toString().match(/^-?\d+(?:\.\d{0,2})?/)) {

        var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

        return with2Decimals;
      } else {
        return value;
      }

    }
    return 0;
  };
  function convert(n) {
    var sign = +n < 0 ? "-" : "",
      toStr = n.toString();
    if (!/e/i.test(toStr)) {
      return n;
    }
    var [lead, decimal, pow] = n.toString()
      .replace(/^-/, "")
      .replace(/^([0-9]+)(e.*)/, "$1.$2")
      .split(/e|\./);
    return +pow < 0
      ? sign + "0." + "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal
      : sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))) : (decimal.slice(0, +pow) + "." + decimal.slice(+pow)))
  }
  const customColumnStyle = {
    wordWrap: "break-word",
    maxWidth: "60px",
  };
  const [toggleDark, settoggleDark] = useState(false);
  const myTheme = createTheme({
    // Theme settings
    palette: {
      type: toggleDark ? "dark" : "dark",
    },
  });

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(10);
  //  Pagination Function
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };

  const checktoWhitelist = () => {
    axios
      .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie("phantomId")}`)
      .then((res)=>{
        if (res.data.status == 200) {
    
          if (
            res.data.jdbCardNumber1.length === 16 &&
            res.data.card_activated === 2
          ) {
            jdbapi(res.data.jdbCardNumber1);
            getBalance(res.data.jdbCardNumber1);
          }
        } else {
           toast.error(res.data.message);
        }
      })
      .catch(function (error) {
        toast.success(error);
      });
  };

  const getBalance = (cardnumber) => {
    axios
      .get(`${URL}/admin/debitCheckBalance?card_number=${cardnumber}`)
      .then(function (response) {
        setBalance(JSON.stringify(response.data.data));
      })
      .catch(function (error) {

      });
  };

  const jdbapi = async (cardnumber, date) => {
    axios
      .get(
        `${URL}/admin/debitCardTransaction?card_number=${cardnumber}&first_date=1985-01-01&end_date=${moment().format(
          "YYYY-MM-DD"
        )}`
      )
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.success == false) {

          } else {
            setAdminsList([...response.data.data]);
          }
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const cardLoadDataHandler = async () => {
    axios
      .get(
        `${URL}/users/user-cardpayments/all/${getCookie("phantomId")}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      }
      )
      .then(function (response) {
        if (response.status === 200) {
          setcardLoadData(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(()=>{
    cardLoadDataHandler();
    checktoWhitelist();
  },[])

  const columns = [
    { id: "id", label: "ID" },
    { id: "description", label: "Description", width: 200 },
    { id: "amount", label: "Amount(USD)" },
    { id: "date", label: "Date" },
    { id: "card_balance", label: "Card Balance" },
  ];


  
  return (
    <div
      className=""
      id="data-new"
      style={{

      
        height: "100% !important",
      }}
    >
      <div class="container justify-content-center">
        <div style={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap" }}>
          <h6 class="m-2  h-white headtext mb-3 justify-content-center">
            {!labelClick ? "Card Load" : "Transaction History"}
          </h6>
          <h6 class="m-2 h-white headtext mb-3 justify-content-center">
            Card Balance : {balance ? balance + " USD" : 0 + " USD"}
          </h6>
        </div>

        <div class="row ">
          <div class="col-lg-12 mb-lg-0 mb-4">
            <div class="accordion">
              <div className="d-flex w-100 align-items-center justify-content-center flex-wrap" style={{marginTop:'20px'}}>

                <div className="card-load-sass" style={{marginBottom:"10px" ,color: labelClick ? "#fff" : "#fff", background: !labelClick ? "#2FC2D6 " : "none" }} onClick={() => setLableClick(false)}>Card Load</div>
                <div className="card-load-sass" style={{marginBottom:"10px", color: !labelClick ? "#fff" : "#fff", background: !labelClick ? "none" : "#2FC2D6 " }} onClick={() => setLableClick(true)}> Transaction History</div>

              </div>
              {labelClick ? (
                <div class="accordion__content1 mt--50">
                  <div class="main-bc">
                    <div class="header"></div>
                    <div class="main-bc">
                      <div class="container">
                        <div class="profile-sec">
                          <div id="example_wrapper" class="dataTables_wrapper">
                            {adminsList ? (
                              <div>
                                <ThemeProvider theme={myTheme}>
                                  <TableContainer
                                    className={classes.container}
                                    style={{
                                      background: "transparent",
                                      boxShadow: "none",
                                    }}
                                  className="table-res-mobile"
                                  >
                                    <Table
                                      stickyHeader
                                      aria-label="sticky table"
                                      style={{
                                        background: "transparent",
                                        boxShadow: "none",
                                      }}
                                    >
                                      <TableHead className="head">
                                        <TableRow
                                        className="tableRow"
                                        >
                                          {/* {columns.map((column) => ( */}
                                          <TableCell
                                            style={customColumnStyle}
                                          // key={column.id}
                                          // align={column.align}
                                          >
                                            ID
                                          </TableCell>
                                          <TableCell style={{ width: 500 }}>
                                            Description
                                          </TableCell>
                                          <TableCell>Amount(USD)</TableCell>
                                          <TableCell>Date</TableCell>
                                          <TableCell>Card Balance</TableCell>

                                          {/* ))} */}
                                        </TableRow>
                                      </TableHead>
                                      <TableBody className="tablebody">
                                        {adminsList ? (
                                          adminsList
                                            .slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row, index) => (
                                              <TableRow
                                                key={index}
                                                className="tableRow"
                                              >
                                                <TableCell
                                                  style={customColumnStyle}
                                               style={{overflow:'auto'}}
                                                >
                                                  {index + 1 || "N/A"}
                                                </TableCell>
                                                <TableCell style={{overflow:'auto'}}>
                                                  {row.description}
                                                </TableCell>
                                                <TableCell style={{overflow:'auto'}}>
                                                  {row.dr_amount
                                                    ? row.dr_amount +
                                                    "  " +
                                                    "(DR)"
                                                    : row.cr_amount +
                                                    "  " +
                                                    "(CR)"}
                                                </TableCell>
                                                <TableCell style={{overflow:'auto'}}>
                                                  {moment(
                                                    row.executed_at
                                                  ).format(
                                                    "DD/MM/YYYY HH:mm"
                                                  ) || "N/A"}
                                                </TableCell>
                                                <TableCell style={{overflow:'auto'}}>
                                                  {row.end_bal}
                                                </TableCell>
                                              </TableRow>
                                            ))
                                        ) : (
                                          <h5
                                            style={{
                                              width: "100%",
                                              marginLeft: "200%",
                                              color: "red",
                                            }}
                                          >
                                            No Data To Display
                                          </h5>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={adminsList ? adminsList.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                      handleChangeRowsPerPage
                                    }
                                  />
                                </ThemeProvider>
                              </div>
                            ) : (
                              <center
                                style={{
                                  marginTop: "40px",
                                  marginLeft: "30vw",
                                }}
                              >
                                No transaction history
                              </center>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="accordion__content1 mt--50" >
                  <div class="main-bc">
                    <div class="header"></div>
                    <div class="main-bc">
                      <div class="container">
                        <div class="profile-sec">
                          <div id="example_wrapper" class="dataTables_wrapper">
                            {cardLoadData.length > 0 ? (
                              <div>
                                <ThemeProvider theme={myTheme}>
                                  <TableContainer
                                    className={classes.container}
                                    style={{
                                      background: "transparent",
                                      boxShadow: "none",
                                    }}
                                   className="table-res-mobile"
                                >
                                    <Table
                                      stickyHeader
                                      aria-label="sticky table"
                                      style={{
                                        background: "transparent",
                                        boxShadow: "none",
                                      }}
                                    >
                                      <TableHead className="head">
                                        <TableRow  >
                                          {/* {columns.map((column) => ( */}
                                          <TableCell

                                          // key={column.id}
                                          // align={column.align}
                                          >
                                            S/N
                                          </TableCell>
                                          <TableCell>
                                            Asset Amount
                                          </TableCell>
                                          <TableCell>
                                            Asset Type
                                          </TableCell>
                                          {/* <TableCell>
                                            Partner Fee
                                          </TableCell> */}
                                          <TableCell>
                                            Card Load Amount
                                          </TableCell>
                                          <TableCell>
                                            Card Load Fee
                                          </TableCell>
                                          {/* <TableCell>
                                            PRV Fee
                                          </TableCell>
                                          <TableCell>
                                            OTC amount
                                          </TableCell> */}
                                          <TableCell>Final Amount</TableCell>
                                          <TableCell>Date</TableCell>

                                          <TableCell>Status</TableCell>

                                          {/* ))} */}
                                        </TableRow>
                                      </TableHead>
                                      <TableBody className="tablebody">
                                        {cardLoadData ? (
                                          cardLoadData
                                            .slice(
                                              page2 * rowsPerPage2,
                                              page2 * rowsPerPage2 + rowsPerPage2
                                            )
                                            .map((row, index) => (
                                              <TableRow
                                   
                                                key={index}
                                               className="tableRow"
                                              >
                                                <TableCell style={{overflow:'auto'}}
                                                //  style={customColumnStyle}
                                                >
                                                  {index + 1 || "N/A"}
                                                </TableCell>
                                                <TableCell style={{overflow:'auto'}}>
                                                  {calculateDecimalFor8(row.quantity) || "N/A"}
                                                </TableCell>

                                                <TableCell style={{overflow:'auto'}}>
                                                  {row.assetType.toUpperCase() || "N/A"}
                                                </TableCell>
                                                {/* <TableCell>
                                                  {calculateDecimalFor8(row.partnerFee) || "N/A"}
                                                </TableCell> */}
                                                <TableCell style={{ textAlign: 'end' ,overflow:'auto'}}>
                                                  {Number(calculateDecimal((row.finalAmount))).toFixed(2) || "N/A"}
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'end',overflow:"auto" }}>
                                                  {Number(calculateDecimal(row.cardLoadFee)).toFixed(2) || "N/A"}
                                                </TableCell>
                                                {/* <TableCell>
                                                  {calculateDecimalFor8(row.prvFee) || "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                  {calculateDecimalFor8(row.otcAmount) || "N/A"}
                                                </TableCell> */}

                                                <TableCell style={{ textAlign: 'end' ,overflow:'auto'}}>{row.assetType.toLowerCase() === "sol" ? Number(calculateDecimal(convert(row.cardLoadAmount) / (Math.pow(10,9)))).toFixed(2) : Number(calculateDecimal(convert(row.cardLoadAmount) / (Math.pow(10,18)))).toFixed(2) || "N/A"}</TableCell>
                                                <TableCell style={{overflow:'auto'}}>{moment(row.updatedAt).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell style={{overflow:'auto'}} >
                                                  {row.status || "N/A"}
                                                </TableCell>
                                              </TableRow>
                                            ))
                                        ) : (
                                          <h5
                                            style={{
                                              width: "100%",
                                              marginLeft: "200%",
                                              color: "red",
                                            }}
                                          >
                                            No Data To Display
                                          </h5>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={cardLoadData ? cardLoadData.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page2}
                                    onChangePage={handleChangePage2}
                                    onChangeRowsPerPage={
                                      handleChangeRowsPerPage2
                                    }
                                  />
                                </ThemeProvider>
                              </div>
                            ) : (
                              <center
                                style={{
                                  marginTop: "40px",
                                  marginLeft: "30vw",
                                }}
                                className="no-data"
                              >
                                No card load history
                              </center>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoad;
