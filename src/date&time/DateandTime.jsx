import React from 'react'

const DateandTime = () => {
    const date = new Date(); // create a new Date object
    const stringDate = date.toString();
    const actualDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // const formattedDate = date.toLocaleDateString(); // format the date

    return (
        <div>
            {/* <p>{formattedDate?.split(" ")?.join("/")}</p> */}
            {/* {date.toLocaleString()} */}
            {/* {date.toLocaleTimeString()} */}
            {actualDate.split("/")?.join("-")}
        </div>
    )
}

export default DateandTime
