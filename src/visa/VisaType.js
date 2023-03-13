import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteModal from "../../DeleteModal";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncDeleteVisaType,
  asyncEditVisatype,
  asyncGetVisaType,
  asyncPostVisaType,
  asyncUpdatevisaType,
  asyncVisaTypeStatus,
  editNull
} from "../../../redux/features/visa/VisaTypeSlice";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { FaMinus, FaPlus } from "react-icons/fa";
import BtnLoader from "../../AppForm/BtnLoader";
import * as yup from "yup";
import { HTTP } from "../../../Utils/API";

const passanger = [
  { id: 1, name: "Adult", value: "ADT" },
  { id: 2, name: "Infant", value: "INF" },
  { id: 3, name: "Child", value: "CHD" },
];
const Type = () => {
  const dispatch = useDispatch();
  const [currName, setCurrName] = useState("");

  const { visaType, loading, editvisaType } = useSelector(
    (state) => state.visaType
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalData, setModalData] = useState();
  // console.log(modalData);
  useEffect(() => {
    dispatch(asyncGetVisaType());
  }, [editvisaType, dispatch]);

  console.log(visaType);
  console.log(editvisaType);

  const visaTypeStatus = async (status, id) => {
    if (!status) {
      var statusrow = 0;
    } else if (status) {
      var statusrow = 1;
    } else if (status === 0) {
      var statusrow = 0;
    } else if (status === 1) {
      var statusrow = 1;
    }
    const formdata = {
      id: id,
      status: statusrow,
    };
    console.log(id);
    HTTP.post(`/api/v1/b2b/visa_service_status`, formdata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const validationSchem = yup.object().shape({
    visa_country_id: yup.string().required("Required"),
    supplier_id: yup.string().required("Required"),

    visaTypeValues: yup.array().of(
      yup.object().shape({
        recievable_price: yup.number().positive().required("price is required"),

        visa_price: yup.number().positive().required("price is required"),
        currency_value_payable: yup
          .number()
          .positive()
          .required("price is required"),
        currency_value_receivable: yup
          .number()
          .positive()
          .required("price is required value"),
        type_name: yup
          .string()
          .max(100, "only 100 characters allowed")
          .required("type Name is required "),
        currency: yup.string().required("currency Name is required "),
      })
    ),
  });

  // console.log(visaType?.country_supplier);
  // console.log(editvisaType);
  // console.log(editvisaType?.type.map((it) => it.currency));

  const columns = [
    {
      label: "id",
      name: "c_s_id",
      options: {
        display: false,
      },
    },
    {
      label: "status",
      name: "c_s_status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              value={value ? 1 : 0}
              control={<Checkbox color="primary" checked={value} />}
              onChange={(event) => {
                updateValue(!value);
                // asyncVisaTypeStatus(!value, tableMeta.rowData[0]);
                visaTypeStatus(!value, tableMeta.rowData[0]);
              }}
            />
          );
        },
      },
    },
    {
      name: "country_name",
      label: "country",
    },

    {
      name: "supplier_name",
      label: "supplier",
    },
    {
      name: "visa_type",
      label: "visa/Passenger_type",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ol>
              {value.map((it) => (
                <it>{`${it.type_name} / ${it.passenger_type}`}</it>
              ))}
            </ol>
          );
        },
      },
    },
    {
      name: "visa_type",
      label: "visa price",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ol>
              {value.map((it) => (
                <it>{`Payable ${it.visa_price} / Receivable ${it.recievable_price}`}</it>
              ))}
            </ol>
          );
        },
      },
    },
    {
      name: "Action",
      label: "action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="">
              <button
                className="btn-success rounded edit-delete-icon-button me-1"
                onClick={() => {
                  window.scroll({ top: 0 });
                  dispatch(asyncEditVisatype(tableMeta.rowData[0]));
                }}
              >
                <i className="fa fa-thin fa-pencil"></i>
              </button>
              <button
                className="btn-danger rounded edit-delete-icon-button"
                onClick={() => {
                  console.log(tableMeta.rowData[0]);
                  setShowDeleteModal(true);
                  setModalData(tableMeta.rowData[0]);
                }}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          );
        },
      },
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
    enableNestedDataAccess: ".",
  };
  // console.log(editvisaType);
  return (
    <div
      style={{ width: "90%" }}
      className="col-sm-8 mx-auto rounded-2 shadow mt-5 pb-5 flash-news"
    >
      <p className="h4 otawix-heading">Visa Type</p>
      <Formik
        // validationSchema={validationSchem}
        enableReinitialize={true}
        initialValues={{
          // visaType?.country_supplier?.filter(it=>it.c_s_id===editvisaType?.country_sup?.c_s_id)
          visa_country_id: editvisaType?.country_sup?.c_s_id || "1",
          supplier_id: editvisaType?.country_sup?.c_s_id || "2",
          // visaTypeValues: {
          //   visaTypeVal:[""]
          // },

          type_id: editvisaType?.type.map((it) => it.v_type_id) || [""],

          // visaTypeValues: editvisaType?.type || [""],
          // way1

          // visaTypeValues: [{}]
          // visaTypeValues:[{
          //   recievable_price: editvisaType?.type.map(
          //     (it) => it.recievable_price
          //   ) || "",
          //   visa_price: editvisaType?.type.map(
          //     (it) => it.visa_price
          //   ) || "",
          //   currency: editvisaType?.type.map(
          //     (it) => it.currency
          //   ) || "select-currency",
          //   Passenger_type: editvisaType?.type.map(
          //     (it) => it.Passenger_type
          //   ) || "Adult",
          //   currency_value_receivable: editvisaType?.type.map(
          //     (it) => it.currency_value_receivable
          //   ) || "",
          //   type_name: editvisaType?.type.map(
          //     (it) => it.type_name
          //   ) || "",
          //   currency_value_payable: editvisaType?.type.map(
          //     (it) => it.currency_value_payable
          //   ) || "",
          // }],

          // way 2

          visaTypeValues: editvisaType?.type?.length
            ? editvisaType?.type?.map((it) => {
                return {
                  recievable_price: it.recievable_price,
                  visa_price: it.visa_price,
                  currency: it.currency,
                  Passenger_type: it.passenger_type,
                  currency_value_receivable: it.currency_value_receivable,
                  type_name: it.type_name,
                  currency_value_payable: it.currency_value_payable,
                };
              })
            : [
                {
                  recievable_price: "",
                  visa_price: "",
                  currency: "",
                  Passenger_type: "ADT",
                  currency_value_receivable: "",
                  type_name: "",
                  currency_value_payable: "",
                },
              ],
        }}
        onSubmit={(values, action) => {
          console.log(values);
          let visa_country_id = values.visa_country_id;
          let supplier_id = values.supplier_id;
          let currency = values.visaTypeValues.map((it) => it.currency);
          let visa_price = values.visaTypeValues.map((it) => it.visa_price);
          let Passenger_type = values.visaTypeValues.map(
            (it) => it.Passenger_type
          );
          let recievable_price = values.visaTypeValues.map(
            (it) => it.recievable_price
          );
          let currency_value_receivable = values.visaTypeValues.map(
            (it) => it.currency_value_receivable
          );
          let currency_value_payable = values.visaTypeValues.map(
            (it) => it.currency_value_payable
          );
          let type_name = values.visaTypeValues.map((it) => it.type_name);

          let vTypeEdit = {
            count_sup_id: editvisaType?.country_sup?.c_s_id,
            currency,
            visa_price,
            Passenger_type,
            recievable_price,
            currency_value_receivable,
            currency_value_payable,
            type_name,
            type_id: values.type_id,
          };

          let vTypePost = {
            visa_country_id,
            supplier_id,
            currency,
            visa_price,
            Passenger_type,
            recievable_price,
            currency_value_receivable,
            currency_value_payable,
            type_name,
          };

          if (editvisaType) {
            dispatch(asyncUpdatevisaType(vTypeEdit));
            dispatch(editNull())
          } else {
            dispatch(asyncPostVisaType(vTypePost));
            action.resetForm({ values: "" });
          }
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
        }) => {
          // console.log(errors);
          // console.log("country", visaType?.country)
          return (
            <Form
              className="col-12 mt-5 d-flex flex-column justify-content-center"
              onSubmit={handleSubmit}
            >
              <div className="col-12 d-flex px-5 ">
                <div className="col-6 px-3">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel id="demo-simple-select-standard-label">
                      Select Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={values.visa_country_id}
                      defaultValue="my country"
                      onChange={handleChange}
                      label="Select Country"
                      name="visa_country_id"
                      error={errors.visa_country_id ? 1 : 0}
                      onBlur={handleBlur}
                      helperText={
                        errors.visa_country_id ? errors.visa_country_id : ""
                      }
                    >
                      {visaType?.country?.map((cntry) => (
                        <MenuItem value={cntry.id} key={cntry.id}>
                          {cntry.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <select >

                  <option value={values.supplier_id}>name</option>
                  <option value={values.visa_country_id}>email</option>
                 </select> */}
                </div>
                <div className="col-6 px-3 ">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel id="demo-simple-select-standard-label">
                      Visa Supplier
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="supplier_id"
                      value={values.supplier_id}
                      onChange={handleChange}
                      label="Visa Supplier"
                      // error={errors.supplier_id ? 1 : 0}
                      onBlur={handleBlur}
                      // helperText={errors.supplier_id ? errors.supplier_id : ""}
                    >
                      {/* editvisaType?.country_sup?.country_name */}
                      {
                        // editvisaType ? visaType?.country_supplier?.filter(it=>it.c_s_id===editvisaType?.country_sup?.c_s_id).map((cntrySupp) => (
                        //   <MenuItem
                        //     value={cntrySupp.c_s_id}
                        //     key={cntrySupp.c_s_id}
                        //   >
                        //     {cntrySupp.supplier_name}
                        //   </MenuItem>
                        // )) :

                        visaType?.country_supplier?.map((cntrySupp) => (
                          <MenuItem
                            value={cntrySupp.c_s_id}
                            key={cntrySupp.c_s_id}
                          >
                            {cntrySupp.supplier_name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </div>
              </div>

              <FieldArray
                name="visaTypeValues"
                render={(arrayHelpers) => (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {values.visaTypeValues.map((friend, index) => (
                      <>
                        <div key={index} className=" mt-5 p-3 w-100">
                          <div className="d-flex w-100 my-5 flex-wrap gap-3 justify-content-between">
                            {/* <Field
                              component="select"
                              value={
                                values. visaTypeValues[index]?.Passenger_type ||
                                ""
                              }
                              name={`visaTypeValues.${index}.Passenger_type`}
                              style={{ width: "100px" }}
                              className="bg-white border-0 border-bottom rounded border-0 text-secondary"
                            >
                              <option value="select-value">select-type</option>
                              <option value="CHD">Child</option>
                              <option value="ADT">Adult</option>
                              <option value="INF">Infant</option>
                             
                            </Field> */}
                            <FormControl
                              variant="standard"
                              style={{ width: 120 }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Pass Type
                              </InputLabel>
                              <Select
                                name={`visaTypeValues.${index}.Passenger_type`}
                                value={
                                  values?.visaTypeValues[index]?.Passenger_type
                                }
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      width: 120,
                                    },
                                  },
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}
                                // onChange={e=>setFieldValue(`visaTypeValues.${index}.Passenger_type`)}
                              >
                                {passanger?.map((psg) => (
                                  <MenuItem value={psg.value} key={psg.id}>
                                    {psg.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            <TextField
                              variant="standard"
                              name={`visaTypeValues.${index}.type_name`}
                              value={values?.visaTypeValues[index]?.type_name}
                              onChange={(e) =>
                                setFieldValue(
                                  `visaTypeValues.${index}.type_name`,
                                  e.target.value
                                )
                              }
                              // className="form-control shadow-none border-0  border-bottom"
                              label="Visa Type ( - Sign Is Not Allowed To Type)"
                              // error={
                              //   touched.visaTypeValues?.map(it=>it?.type_name) && errors.visaTypeValues?.map(it=>it?.type_name) ? 1 : 0
                              // }
                            />
                            {}
                            {/* <p>{for(let i=0;i<errors.visaTypeValues.length;i++) errors.visaTypeValues?[i]}</p> */}
                            {/* <Field
                              component="select"
                              name={`visaTypeValues.${index}.currency`}
                              value={
                                values.visaTypeValues[index]?.currency || ""
                              }
                              style={{ outline: "none", width: "100px" }}
                              className="bg-white border-0 border-bottom rounded border-0 text-secondary"
                            >
                              {visaType?.currencies?.map((currncy) => (
                                <option value={currncy.roe} key={currncy.id}>
                                  {currncy.name}
                                </option>
                              ))}
                            </Field> */}

                            <FormControl
                              variant="standard"
                              className=""
                              style={{ width: 140 }}
                            >
                              <InputLabel id="demo-simple-select-standard-label">
                                currency
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      width: 120,
                                    },
                                  },
                                }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name={`visaTypeValues.${index}.currency`}
                                value={values?.visaTypeValues[index]?.currency}
                                // name={values.visaTypeValues[index].currency}
                                // value={values.visaTypeValues[index].currency}
                                label="Currency"
                                // error={}
                                onChange={handleChange}
                                // onChange={e=>setFieldValue(`visaTypeValues.${index}.currency`)}
                              >
                                {visaType?.currencies?.map((currncy) => (
                                  <MenuItem
                                    value={currncy.roe}
                                    onClick={(e) => setCurrName(currncy?.name)}
                                    key={currncy.id}
                                  >
                                    {currncy.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            <TextField
                              variant="standard"
                              value={
                                values.visaTypeValues[index]
                                  ?.currency_value_payable || ""
                              }
                              name={`visaTypeValues.${index}.currency_value_payable`}
                              label={"Payable in " + ` ${currName && currName}`}
                              // label={`'Payable value' visaTypeValues.${index}.currency`}
                              sx={{ width: 120 }}
                              // error={errors.visaTypeValues?.[index]?.currency_value_payable}
                              onChange={(e) => {
                                setFieldValue(
                                  `visaTypeValues.${index}.currency_value_payable`,
                                  e.target.value
                                );
                                for (
                                  let valLim = 0;
                                  valLim < values.visaTypeValues?.length;
                                  valLim++
                                ) {
                                  setFieldValue(
                                    `visaTypeValues.${index}.visa_price`,
                                    Number(e.target.value) *
                                      values.visaTypeValues[valLim].currency +
                                      ""
                                  );
                                }
                              }}
                            />
                            {/* <ErrorMessage name={errors?.visaTypeValues?.map(it=>it.currency_value_payable)} />
                            <ErrorMessage name={errors?.visaTypeValues?.map(it=>it?.recievable_price)} /> */}

                            <TextField
                              name={`visaTypeValues.${index}.visa_price`}
                              label="Payable (PKR)*"
                              value={
                                values.visaTypeValues[index]?.visa_price || ""
                              }
                              variant="standard"
                              style={{ width: "150px" }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            {/* <ErrorMessage
                              name={`visaTypeValues.${index}.visa_price`}
                            /> */}

                            <TextField
                              name={`visaTypeValues.${index}.currency_value_receivable`}
                              // label={`Recievable value ${values.visaTypeValues[index].currency}*`}
                              label={`Receiable ${currName}`}
                              sx={{ width: 120 }}
                              variant="standard"
                              value={
                                values?.visaTypeValues[index]
                                  ?.currency_value_receivable
                              }
                              onChange={(e) => {
                                setFieldValue(
                                  `visaTypeValues.${index}.currency_value_receivable`,
                                  e.target.value
                                );
                                for (
                                  let valLim = 0;
                                  valLim < values.visaTypeValues.length;
                                  valLim++
                                ) {
                                  setFieldValue(
                                    `visaTypeValues.${index}.recievable_price`,
                                    Number(e.target.value) *
                                      values.visaTypeValues[valLim].currency +
                                      ""
                                  );
                                }
                              }}
                            />
                            {/* <ErrorMessage
                              name={`visaTypeValues.${index}.currency_value_receivable.${index}`}
                            /> */}
                            <TextField
                              InputProps={{
                                readOnly: true,
                              }}
                              variant="standard"
                              name={`visaTypeValues.${index}.recievable_price`}
                              label="Recievable (PKR)"
                              value={
                                values.visaTypeValues[index]
                                  ?.recievable_price || ""
                              }
                            />
                            <ErrorMessage
                              name={`visaTypeValues.${index}.recievable_price.${index}`}
                            />
                            <div>
                              {values.visaTypeValues.length > 1 && (
                                <button
                                  className="btn bg-danger m-3 text-white"
                                  bg={"rgb(0, 154, 214)"}
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  - Pax
                                </button>
                              )}
                              {values.visaTypeValues.length <= 2 && (
                                <button
                                  className="btn bg-primary text-white"
                                  type="button"
                                  onClick={() => arrayHelpers.push()}
                                >
                                  + Pax
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                )}
              />

              {/* <div className="col-sm-12 d-flex buttons mt-3 py-2 px-5">
                <button className="btn btn-danger me-2">Rem Visa Type</button>
                <button className="btn btn-primary">Add Visa Type</button>
              </div> */}
              <button className="btn setup-btn mx-auto" type="submit">
                {loading ? <BtnLoader /> : editvisaType ? "update" : "save"}
              </button>
             {editvisaType && <button className="btn btn-white mt-4 mx-auto" onClick={e=>dispatch(editNull())}>Reset Form</button>}
            </Form>
          );
        }}
      </Formik>
      <div className="col-12 mt-5 px-4">
        <DeleteModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          // rowId={modalData && modalData[0]}
          onClick={() => {
            dispatch(asyncDeleteVisaType(modalData));
            setShowDeleteModal(false);
          }}
        />
        <MUIDataTable
          className="muidatatable"
          title={"Visa Type Details"}
          data={visaType && visaType?.country_supplier}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default Type;
