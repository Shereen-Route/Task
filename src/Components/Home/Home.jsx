import axios from "axios";
import "./Home.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerContext } from "../../Context/CustomerContext";

function Home() {
  const { setTranactions, setAmount } = useContext(customerContext);
  const [customers, setCustomers] = useState(null);
  const [tran, setTran] = useState(null);
  const [search, setSearch] = useState(null);

  async function getCustomers() {
    const { data } = await axios.get("http://localhost:3030/customers");
    setCustomers(data);
  }
  async function getTransaction() {
    const { data } = await axios.get("http://localhost:3030/transactions");
    setTran(data);
    localStorage.setItem("tran", JSON.stringify(data));
    setTranactions(data);
    setSearch(data);
  }
  function test1(id) {
    let newTran = tran?.filter((e) => e.userID === id);
    let data = [];
    newTran?.map((e) => data.push(e.amount));
    setAmount(data);
    localStorage.setItem("Amount", JSON.stringify(data));
  }

  function SearchByName(value) {
    let newCustomers = customers.filter((e) =>
      e.name.toLowerCase().includes(value.toLowerCase())
    );
    let newTran = newCustomers.map((e) =>
      tran.filter((transaction) => transaction.userID === e.id)
    );
    let data = [];
    newTran.map((e) => e.map((ele) => data.push(ele)));
    setSearch(data);
  }
  function SearchByAmount(value) {
    if (value == "") {
      setSearch(tran);
    } else {
      let data = tran.filter((e) => e.amount == value);
      setSearch(data);
    }
  }

  useEffect(() => {
    getCustomers();
    getTransaction();
  }, []);

  return (
    <>
      <div className="container ">
        <div className="row flex-column mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Name"
            onChange={(e) => SearchByName(e.target.value)}
          />
          <input
            type="number"
            className="form-control my-3 w-100"
            placeholder="Search By Amount"
            onChange={(e) => SearchByAmount(e.target.value)}
          />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Customer ID</th>
                <th scope="col">Name</th>
                <th scope="col">Transactions ID</th>
                <th scope="col">Items </th>
                <th scope="col"> Amounts</th>
                <th scope="col">Payments Method</th>
                <th scope="col">Dates</th>
                <th scope="col">Graph</th>
              </tr>
            </thead>
            <tbody>
              {search?.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <th scope="row">{transaction.userID}</th>
                    {customers
                      ?.filter((customer) => customer.id === transaction.userID)
                      ?.map((e) => (
                        <td key={e.id}>{e.name}</td>
                      ))}

                    <td>{transaction.id}</td>
                    <td>{transaction.product}</td>
                    <td>{transaction.amount} $</td>
                    <td>{transaction.paymentMethod}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        onClick={() => test1(transaction.userID)}
                        to={`/TrancationGraph/${transaction.userID}`}
                      >
                        Graph
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
