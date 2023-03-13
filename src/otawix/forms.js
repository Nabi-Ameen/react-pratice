import React from 'react'

const forms = () => {
  return (
    <div>
       {/* <Field
                                  style={{ outline: "none" }}
                                  className="bg-white form-select border-0 border-bottom px-lg-5 border-0 text-secondary"
                                  as={"select"}
                                  name={`addSegments${index}.origin`}
                                  placeholder="origin"
                                  onChange={(e) => setQuery(e.target.value)}
                                >
                                   {origanList &&
                                      origanList
                                        ?.slice(0, 5)
                                        ?.map((origin, index) => {
                                          return (
                                            handleMenu && (
                                              <option
                                                onClick={(e) => {
                                                  setHandleMenu(!handleMenu);
                                                  setCompIndex(index);
                                                }}
                                              >
                                                {isLoading ? (
                                                  <BtnLoader />
                                                ) : (
                                                  <Field as={"text"} value={origin?.airport_name}>{origin?.airport_name}</Field>
                                                )}
                                              </option>
                                            )
                                          );
                                        })}
                                  
                                </Field>  */}
                                {/* <Field
                                    id="standard-basic"
                                    label="Origin"
                                    variant="standard"
                                    // className="col-sm-12"
                                    // autoComplete="off"
                                    // helperText={
                                    //   touched.orign && errors.orign
                                    //     ? errors.orign
                                    //     : ""
                                    // }
                                    // error={touched.orign && errors.orign ? 1 : 0}
                                    // onBlur={handleBlur}
                                    // onKeyPress={() => setHandleMenu(true)}
                                    // value={
                                    //   origanList?.[compIndex]?.airport_name 
                                    // }
                                    name={`addSegments${index}.origin`}
                                    // onClick={(e) => setHandleMenu(!handleMenu)}
                                    // onChange={(e) => setQuery(e.target.value)}
                               >
                                    <option value="">
                                    Select Passanger Type
                                  </option>
                                  <option value="Adult">Adult</option>
                                  <option value="Child">Child</option>
                                  <option value="Infant">Infant</option>
                               </Field> */}

                                {/*<div className="z-10 position-absolute bg-white border border-1">
                                   {origanList &&
                                      origanList
                                        ?.slice(0, 5)
                                        ?.map((origin, index) => {
                                          return (
                                            handleMenu && (
                                              <MenuItem
                                                onClick={(e) => {
                                                  setHandleMenu(!handleMenu);
                                                  setCompIndex(index);
                                                }}
                                              >
                                                {isLoading ? (
                                                  <BtnLoader />
                                                ) : (
                                                  <TextField
                                                    sx={{
                                                      "& fieldset": {
                                                        border: "none",
                                                      },
                                                    }}
                                                    id="standard-basic"
                                                    style={{
                                                      border: "none !important",
                                                    }}
                                                    className="w-100"
                                                    autoComplete="off"
                                                    value={origin?.airport_name}
                                                    onChange={handleChange}
                                                    name="orign"
                                                  />
                                                )}
                                              </MenuItem>
                                            )
                                          );
                                        })} 
                                </div>*/}
                                {/* <TextField
                                  id="standard-basic"
                                  label="Destination"
                                  variant="standard"
                                  className="col-sm-12"
                                  autoComplete="off"
                                  onKeyPress={() => setHandleDestination(true)}
                                  value={
                                    destinationList?.[destinationIndex]
                                      ?.airport_name || ""
                                  }
                                  onClick={(e) =>
                                    setHandleDestination(!handleDestination)
                                  }
                                  onChange={(e) => setQuery2(e.target.value)}
                                />
                                <div className="z-10 position-absolute bg-white border border-1">
                                  {destinationList &&
                                    destinationList
                                      ?.slice(0, 5)
                                      ?.map((destination, i) => {
                                        return (
                                          handleDestination && (
                                            <MenuItem
                                              onClick={(e) => {
                                                setHandleDestination(
                                                  !handleDestination
                                                );
                                                setDestinationIndex(i);
                                              }}
                                            >
                                              {isLoading ? (
                                                <BtnLoader />
                                              ) : (
                                                <TextField
                                                  sx={{
                                                    "& fieldset": {
                                                      border: "none",
                                                    },
                                                  }}
                                                  id="standard-basic"
                                                  style={{
                                                    border: "none !important",
                                                  }}
                                                  className="w-100"
                                                  autoComplete="off"
                                                  value={
                                                    destination?.airport_name
                                                  }
                                                  name="destination"
                                                />
                                              )}
                                            </MenuItem>
                                          )
                                        );
                                      })}
                                </div> */}
    </div>
  )
}

export default forms
