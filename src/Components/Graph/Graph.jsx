import React, { useContext, useEffect, useState } from "react";
import { customerContext } from "../../Context/CustomerContext";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Graph() {
  const { Amount, setAmount } = useContext(customerContext);
  const labels = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  console.log(Amount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Transaction Amount per day",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: Amount,
      },
    ],
  };

  return (
    <>
      <div className="container">
        <div>
          <Link className="btn btn-info my-3" to={"/"}>
            <i className="fa-solid fa-arrow-left"></i> BacK To Home{" "}
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>
        <h1 className="text-center ">Graph </h1>
        <div className="row gx-5 mt-5 justify-content-center align-items-center">
          <div className="col-md-8">
            <Bar data={data} />
          </div>
          <div className="col-md-4 ">
            <div className="row border border-1">
              <div className="col-md-6">
                <h4 className="text-decoration-underline">Date</h4>
                {labels.map((e, i) => (
                  <div key={i}>
                    <h5>{e}</h5>
                  </div>
                ))}
              </div>
              <div className="col-md-6 ">
                <h4 className="text-decoration-underline">Amount</h4>
                {Amount?.map((e, i) => (
                  <div key={i}>
                    <h5>{e}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Graph;
