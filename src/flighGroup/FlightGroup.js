import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import ReactSelect from 'react-select'
import AsyncSelect from "react-select/async";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteModal from "../../DeleteModal";
import {
  asyncGetFlightGroupData,
  asyncGetOriganListData,
  asyncGetDestinationListData,
  asyncDeleteFlightGroupData,
  asyncPostFlightGroupData,
  asyncEditFlightGroupData,
  makeOriginNull,
} from "../../../redux/features/promotion/FlightGroupsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import BtnLoader from "../../AppForm/BtnLoader";

const FlightsGroup = () => {
  const [startDate, setStartDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalDate, setArrivalDate] = useState();
  const [arrivalTime, setArrivalTime] = useState();

  const [inputValue, setInputValue] = useState("");
  const [destinationInput, setDestinationInput] = useState("");

  const dispatch = useDispatch();
  const {
    flightGroup,
    isLoading,
    origanList,
    destinationList,
    editFLightData,
  } = useSelector((state) => state.flightGroup);

  const supplierData1 = flightGroup?.supplier_cat
    ?.filter((it) => it.name === "Flights")
    .map((data) => data.supplier?.map((data) => data));
  const newArry = supplierData1?.flat();

  useEffect(() => {
    dispatch(asyncGetFlightGroupData());
  }, [editFLightData?.id]);

  const dropDownOption = [
    { key: "Umrah", value: "Umrah" },
    { key: "Regular", value: "Regular" },
  ];
  const dropDownPassanger = [
    { key: "Adult", value: "Adult" },
    { key: "Child", value: "Child" },
    { key: "Infant", value: "Infant" },
  ];

  const initialValues = {
    groupType: editFLightData?.GroupType || "",
    totalSeats: editFLightData?.total_seats || "",
    selectSupplier: "",
    pnr: editFLightData?.pnr || "",
    //addpassanger states
    addPassangers: [
      {
        passangerType: "Adult",
        PricePerPassenger: "",
        // PricePerPassenger:editFLightData?.group_promotions_customer[0].price || "",
        SupplierPayable: "",
      },
    ],
    // addsegments states
    addSegments: [
      {
        flight: "",
        flightNo: "",
        origin: "",
        destination: "",
        depDate: new Date()
          ?.toISOString()
          ?.split("T")[0]
          ?.split("-")
          .reverse()
          .join("-"),
        depTime: "",
        arrivalDate: new Date()
          .toISOString()
          ?.split("T")[0]
          ?.split("-")
          ?.reverse()
          ?.join("-"),
        arrivalTime: "",
        baggageInfo: "",
      },
    ],
  };

  const groupTypeLists = [
    { key: "Umrah", value: "Umrah" },
    { key: "Regular", value: "Regular" },
  ];

  const selectPassangerTypeLists = [
    { key: "Adult", value: "Adult" },
    { key: "Child", value: "Child" },
    { key: "Infant", value: "Infant" },
  ];

  const columns = [
    {
      label: "Airline Logo",
      name: "airline_logo",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <img src={`${value}`} className="table-row-image" />;
        },
      },
    },
    {
      label: "PDF File",
      name: "pdf_file",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <a href={`${value.link}`} className="table-anchor">
              {value.name}
            </a>
          );
        },
      },
    },
    {
      name: "remarks",
      label: "Remarks",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Action",
      name: "delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="">
              <button
                className="btn-success rounded edit-delete-icon-button me-1"
                onClick={() => console.log(value, tableMeta)}
              >
                <i className="fa fa-thin fa-pencil"></i>
              </button>
              <button
                className="btn-danger rounded edit-delete-icon-button"
                onClick={() => console.log(value, tableMeta)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          );
        },
      },
    },
  ];

  const data = [
    {
      id: 1,
      airline_logo: "/zairaa.jpeg",
      pdf_file: {
        name: "abc.pdf",
        link: "abc.com",
      },
      remarks: "Test Circular 01",
      action: 1,
    },
  ];
  const options = {
    filter: false,
    Selection: false,
    print: false,
    download: false,
    viewColumns: false,
    displayRowCheckbox: false,
    selectableRows: "none",
    // onRowClick: (rowData) => {
    //   navigate(`/booking-details/${rowData[3]}/active`)
    // },
  };
  return (
    <div className="col-12 mx-auto rounded-2 shadow mt-5 pb-5 flash-news">
      <p className="h4 otawix-heading">Add Flight Group</p>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          // console.log("object", values)
          const GroupType = values?.groupType;
          const seats = values?.totalSeats;
          const supplier = values?.selectSupplier;
          const pnr = values?.pnr;
          ///////////////////////////////////////////////////////////
          const passenger_type = values?.addPassangers?.map(
            (passanger) => passanger?.passangerType
          );
          const pp_price = values?.addPassangers?.map(
            (passanger) => passanger?.PricePerPassenger
          );
          const supplier_pay_bill = values?.addPassangers?.map(
            (passanger) => passanger?.SupplierPayable
          );
          ////////////////////////////////////////////////////////////
          const flight = values.addSegments?.map((segment) =>
            segment.flight.toLowerCase()
          );
          const flight_number = values.addSegments?.map(
            (segment) => segment.flightNo
          );
          const origion = values.addSegments?.map((segment) => segment.origin
          );
          const destination = values.addSegments?.map((segment) => segment.destination
          );
          const departure_date = values.addSegments?.map((segment) =>
            segment.depDate?.split("-")?.join("/")
          );
          const departure_time = values.addSegments?.map((segment) => {
            const hour = segment.depTime.getHours();
            const minutes = segment.depTime.getMinutes();
            return `${hour}:${minutes}`;
          });
          const arrival_date = values.addSegments?.map((segment) =>
            segment.arrivalDate?.split("-")?.join("/")
          );
          const arrival_time = values.addSegments?.map((segment) => {
            const hour = segment.arrivalTime.getHours();
            const minutes = segment.arrivalTime.getMinutes();
            return `${hour}:${minutes}`;
          });
          const Baggage_Info = values.addSegments?.map(
            (segment) => segment.baggageInfo + "kg"
          );

          const obj = {
            GroupType,
            seats,
            supplier,
            pnr,
            ///////////////////////////////////
            passenger_type,
            pp_price,
            supplier_pay_bill,
            ///////////////////////////////////
            flight,
            flight_number,
            origion,
            destination,
            departure_date,
            departure_time,
            arrival_date,
            arrival_time,
            Baggage_Info,
          };
          // console.log("object",obj);
          dispatch(asyncPostFlightGroupData(obj));
          // resetForm({ initialValues });
        }}
      >
        {({ values, setFieldValue }) => {

          return (
            <Form>
              <div className="col-12 px-4 d-flex flex-column justify-content-center">
                <div className="col-12 d-flex mt-5">
                  <div className="col-sm-2 px-3">
                    <FormControl variant="standard" className="w-100 " sx={{}}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Group Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={(e) =>
                          setFieldValue("groupType", e.target.value)
                        }
                        label={"Select Group Type"}
                        name="groupType"
                      >
                        {groupTypeLists.map((groupTypeList) => (
                          <MenuItem
                            value={groupTypeList?.value}
                            sx={{ m: 1, bgcolor: "#fff" }}
                            key={groupTypeList?.key}
                          >
                            {groupTypeList?.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-sm-1 px-3">
                    <TextField
                      id="standard-basic"
                      label="Total Seates"
                      variant="standard"
                      name="totalSeats"
                      type={"number"}
                      className="w-100"
                      value={values.totalSeats}
                      onChange={(e) =>
                        setFieldValue("totalSeats", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-sm-2 px-3">
                    <FormControl variant="standard" className="w-100 " sx={{}}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Supplier
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={(e) =>
                          setFieldValue("selectSupplier", e.target.value)
                        }
                        label={"Select Supplier"}
                      >
                        {newArry &&
                          newArry?.map((option) => (
                            <MenuItem
                              value={option?.id}
                              sx={{ m: 1, bgcolor: "#fff" }}
                              key={option?.id}
                            >
                              {option?.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-sm-2 px-3">
                    <TextField
                      id="standard-basic"
                      label="PNR"
                      variant="standard"
                      value={values.pnr}
                      className="w-100"
                      onChange={(e) =>
                        setFieldValue("pnr", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                </div>

                <div className="col-12 mt-5">
                  {/* <AddPassanger /> */}
                  <>
                    <FieldArray
                      name="addPassangers"
                      render={(arrayHelpers) => (
                        <div>
                          {values?.addPassangers?.map((addPassanger, index) => (
                            <div key={index} className="col-12 mt-5 d-flex">
                              <div className="col-sm-2 px-3">
                                <FormControl
                                  variant="standard"
                                  className="w-100 "
                                  sx={{}}
                                >
                                  <InputLabel id="demo-simple-select-standard-label">
                                    Passanger Type
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={
                                      values.addPassangers[index]?.passangerType
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `addPassangers.${index}.passangerType`,
                                        e.target.value
                                      )
                                    }
                                    label={"Select Passanger Type"}
                                  >
                                    {selectPassangerTypeLists.map(
                                      (selectPassangerTypeList) => (
                                        <MenuItem
                                          value={selectPassangerTypeList?.value}
                                          sx={{ m: 1, bgcolor: "#fff" }}
                                          key={selectPassangerTypeList?.key}
                                        >
                                          {selectPassangerTypeList?.value}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="col-sm-1 px-3">
                                <TextField
                                  id="standard-basic"
                                  label="Price Per Passenger"
                                  variant="standard"
                                  type={"number"}
                                  // value={
                                  //   values?.addPassangers[index]?.PricePerPassenger
                                  // }
                                  className="w-100"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `addPassangers.${index}.PricePerPassenger`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-sm-1 px-3">
                                <TextField
                                  id="standard-basic"
                                  label="Supplier Payable (P/P)"
                                  variant="standard"
                                  type={"number"}
                                  className="w-100"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `addPassangers.${index}.SupplierPayable`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-sm-2 px-3">
                                {index === 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-primary px-4 fs-5 "
                                    onClick={() => arrayHelpers.push()}
                                    disabled={values.addPassangers.length === 3}
                                  >
                                    + PAX
                                  </button>
                                )}
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger px-5 fs-5 "
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </>
                </div>

                {/* <AddSegment /> */}
                <div className="col-12 mt-5">
                  <>
                    <FieldArray
                      name="addSegments"
                      render={(arrayHelpers) => (
                        <div>
                          {values?.addSegments?.map((addSegment, index) => (
                            <div
                              key={index}
                              className="col-12 d-flex align-items-end mt-5"
                            >
                              <div className="col-sm-1 ps-3 pe-5 ">
                                <TextField
                                  id="standard-basic"
                                  name="flight"
                                  label="Flight"
                                  variant="standard"
                                  value={values.addSegments[index]?.flight}
                                  className="w-100"
                                  inputProps={{ maxLength: 2 }}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `addSegments.${index}.flight`,
                                      e.target.value
                                        .toUpperCase()
                                        .replace(/[^a-z]/gi, "")
                                    )
                                  }
                                />
                              </div>
                              <div className="col-sm-1 ps-3 pe-5 ">
                                <TextField
                                  id="standard-basic"
                                  label="Flight"
                                  variant="standard"
                                  type={"number"}
                                  className="w-100"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `addSegments.${index}.flightNo`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-sm-2 px-3 ">
                                <Autocomplete
                                  id="combo-box-demo"
                                  value={values.addSegments[index]?.origin}
                                  onChange={(e, originValue) =>
                                    setFieldValue(
                                      `addSegments.${index}?.origin`,
                                      originValue?.code +
                                        " - " +
                                        originValue?.airport_name
                                    )
                                  }
                                  name={`addSegments.${index}?.origin`}
                                  // inputValue={inputValue}
                                  // onInputChange={(e, newValue) => setInputValue(newValue)}
                                  options={[...origanList]}
                                  getOptionLabel={(option) =>
                                    option?.code
                                      ? option?.code +
                                        " - " +
                                        option?.airport_name
                                      : ""
                                  }
                                  freeSolo
                                  selectOnFocus
                                  handleHomeEndKeys
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      onChange={(e) =>
                                        e.target.value?.length >= 2 &&
                                        setTimeout(
                                          () =>
                                            dispatch(
                                              asyncGetOriganListData(
                                                e.target.value
                                              )
                                            ),
                                          1500
                                        )
                                      }
                                      label="Origin"
                                      variant="standard"
                                    />
                                  )}
                                />
                              </div>
                              <div className="col-sm-2 px-3 ">
                                <Autocomplete
                                  id="combo-box-demo"
                                  value={values.addSegments[index]?.destination}
                                  name={`addSegments.${index}?.destination`}
                                  onChange={(e, value) =>
                                    setFieldValue(
                                      `addSegments.${index}?.destination`,
                                      value?.code + " - " + value?.airport_name
                                    )
                                  }
                                  // inputValue={destinationInput}
                                  // onInputChange={(e, newValue) => setFieldValue(`addSegments.${index}.destination`,newValue)}
                                  options={[...destinationList]}
                                  getOptionLabel={(option) =>
                                    option?.code
                                      ? option?.code +
                                        " - " +
                                        option?.airport_name
                                      : ""
                                  }
                                  freeSolo
                                  selectOnFocus
                                  handleHomeEndKeys
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      onChange={(e) =>
                                        e.target.value?.length >= 2 &&
                                        setTimeout(
                                          () =>
                                            dispatch(
                                              asyncGetDestinationListData(
                                                e.target.value
                                              )
                                            ),
                                          1500
                                        )
                                      }
                                      label="Destination"
                                      variant="standard"
                                    />
                                  )}
                                />
                              </div>
                              <div className="col-sm-1 px-2">
                                <p style={{ lineHeight: "0px" }}>
                                  Departure Date
                                </p>
                                <DatePicker
                                  dateFormat={"dd-MM-yyyy"}
                                  selected={
                                    new Date(
                                      values.addSegments[index]?.depDate
                                        ?.split("-")
                                        ?.reverse()
                                        ?.join("-")
                                    )
                                  }
                                  className="border border-0 border-bottom py-1"
                                  minDate={new Date()}
                                  placeholderText="Dep Date"
                                  onChange={(e) => {
                                    // setStartDate(e);
                                    const date = `${e.getDate()}-${
                                      e.getMonth() + 1
                                    }-${e.getFullYear()}`;
                                    setFieldValue(
                                      `addSegments.${index}.depDate`,
                                      date
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-sm-1 px-3">
                                <p style={{ lineHeight: "0px" }}>
                                  Departure Time
                                </p>
                                <DatePicker
                                  selected={values.addSegments[index]?.depTime}
                                  className="border border-0 border-bottom py-1"
                                  onChange={(e) => {
                                    // setDepartureTime(e);
                                    setFieldValue(
                                      `addSegments.${index}.depTime`,
                                      e
                                    );
                                  }}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={5}
                                  placeholderText="Dep Time"
                                  timeCaption="Time"
                                  dateFormat="h:mm aa"
                                />
                              </div>
                              <div className="col-sm-1 px-2 ">
                                <p style={{ lineHeight: "0px" }}>
                                  Arrival Date
                                </p>
                                <DatePicker
                                  dateFormat={"dd-MM-yyyy"}
                                  selected={
                                    new Date(
                                      values.addSegments[index].arrivalDate
                                        ?.split("-")
                                        ?.reverse()
                                        ?.join("-")
                                    )
                                  }
                                  className="border border-0 border-bottom py-1"
                                  placeholderText="Arrival Date"
                                  minDate={
                                    new Date(
                                      values.addSegments[index]?.depDate
                                      ?.split("-")
                                      ?.reverse()
                                      ?.join("-")
                                    )
                                  }
                                  onChange={(e) => {
                                    // setArrivalDate(e);
                                    const date = `${e.getDate()}-${
                                      e.getMonth() + 1
                                    }-${e.getFullYear()}`;
                                    setFieldValue(
                                      `addSegments.${index}.arrivalDate`,
                                      date
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-sm-1 px-3 ">
                                <p style={{ lineHeight: "0px" }}>
                                  Arrival Time
                                </p>
                                <DatePicker
                                  selected={values.addSegments[index]?.arrivalTime}
                                  className="border border-0 border-bottom py-1"
                                  onChange={(e) => {
                                    setArrivalTime(e);
                                    setFieldValue(
                                      `addSegments.${index}.arrivalTime`,
                                      e
                                    );
                                  }}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={5}
                                  placeholderText="Arrival Time"
                                  timeCaption="Time"
                                  dateFormat="h:mm aa"
                                />
                              </div>
                              <div className="col-sm-1 px-3 ">
                                <TextField
                                  id="standard-basic"
                                  label="Baggage Info"
                                  variant="standard"
                                  className="w-100"
                                  type={"text"}
                                  value={values.addSegments[index]?.baggageInfo}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `addSegments.${index}.baggageInfo`,
                                      e.target.value
                                        .replace(/[^a-z,^0-9 ]/gi, "")
                                        .toUpperCase()
                                    )
                                  }
                                />
                              </div>
                              <div className="col-sm-1 ">
                                <div className="col-12 ms-2">
                                  {index === 0 && (
                                    <button
                                      // type="submit"
                                      className="btn btn-primary px-4 fs-5 "
                                      onClick={() =>
                                        arrayHelpers.push({
                                          ...initialValues.addSegments[0],
                                        })
                                      }
                                      disabled={values.addSegments.length === 5}
                                    >
                                      + FLIGHT
                                    </button>
                                  )}
                                  {index > 0 && (
                                    <button
                                      // type="submit"
                                      className="btn btn-danger px-5 fs-5 "
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </>
                </div>
                <button
                  className="btn setup-btn mt-5"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? (
                    <BtnLoader />
                  ) : editFLightData?.id ? (
                    "Update"
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="col-12 mt-5 px-4">
        <table className="table datatable-basic table-bordered dataTable no-footer">
          <thead>
            <tr className="table-row">
              <th style={{ width: "1%" }}>Group Name | Type</th>
              <th style={{ width: "1%" }}>Total | Booked | Reaming Seats</th>
              <th style={{ width: "1%" }}>Supplier</th>
              <th style={{ width: "1%" }}>PNR</th>
              <th style={{ width: "1%" }}>PAX Type</th>
              <th style={{ width: "1%" }}>Payable | Receivable</th>
              <th style={{ width: "1%" }}>Flight Code | Number</th>
              <th style={{ width: "1%" }}>Origin | Destination</th>
              <th style={{ width: "1%" }}>Departure Date</th>
              <th style={{ width: "1%" }}>Departure Time</th>
              <th style={{ width: "1%" }}>Arrival Date</th>
              <th style={{ width: "1%" }}>Arrival Time</th>
              <th style={{ width: "1%" }}>Baggage</th>
              <th style={{ width: "1%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = (rowdata) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const dispatch = useDispatch();
  const { flightGroup, isLoading } = useSelector((state) => state.flightGroup);

  return (
    <>
      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onClick={(e) => {
          dispatch(asyncDeleteFlightGroupData({ id: modalData }));
          setShowDeleteModal(false);
        }}
      />
      {flightGroup?.promo?.map((promoname) => (
        <>
          <tr>
            <td>
              {promoname?.group_name} | {promoname?.GroupType}
            </td>
            <td>
              {promoname?.total_seats} | {promoname?.booked_seats} |{" "}
              {promoname?.total_seats - promoname?.booked_seats}{" "}
            </td>
            <td>{promoname?.supplier_promotion?.name}</td>
            <td>{promoname?.pnr}</td>
            <td colSpan={9}>
              <span className="d-flex justify-content-between align-items-center checkbox-rect z-2">
                <input
                  type="checkbox"
                  id="Airsial"
                  checked={promoname?.groupStatus === 1}
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "8px",
                  }}
                />
                <label for="Airsial">Group Status</label>
              </span>
            </td>
            <td>
              <div className="">
                <button
                  className="btn-success rounded edit-delete-icon-button me-1"
                  onClick={() => {
                    window.scroll({ top: 0 });
                    dispatch(asyncEditFlightGroupData({ id: promoname?.id }));
                  }}
                >
                  <i className="fa fa-thin fa-pencil"></i>
                </button>
                <button
                  className="btn-danger rounded edit-delete-icon-button"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setModalData(promoname?.id);
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </td>
          </tr>
          {promoname?.group_promotions_customer?.map((customer) => (
            <tr>
              <td colSpan={4}></td>
              <td>{customer?.passenger_type}</td>
              <td>
                {customer?.price} | {customer?.supplier_pay_bill}
              </td>
              <td colSpan={8}></td>
            </tr>
          ))}
          {promoname?.group_promotions?.map((flight) => (
            <tr>
              <td colSpan={6}></td>
              <td>
                {" "}
                {flight?.flight} | {flight?.flight_number}
              </td>
              <td>
                {flight?.origin} | {flight?.destination}
              </td>
              <td>{flight?.departure_date}</td>
              <td>{flight?.departure_time}</td>
              <td>{flight?.arrival_date}</td>
              <td>{flight?.arrival_time}</td>
              <td colSpan={2}>{flight?.Baggage_Info}</td>
            </tr>
          ))}
          <tr className="bg-secondary">
            <td colSpan={14} style={{ height: "2px" }}></td>
          </tr>
        </>
      ))}
    </>
  );
};

export default FlightsGroup;
