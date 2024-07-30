import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductList();
    console.log(product);
    // eslint-disable-next-line
  }, []);

  console.log(product);

  const getProductList = async () => {
    const response = await fetch("http://localhost:2000/listProducts", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const result = await response.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:2000/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const result = response.json();

    if (result) {
      getProductList();
    }
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    if (key) {
      const response = await fetch(`http://localhost:2000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const result = await response.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getProductList();
    }
  };

  return (
    <div className="container">
      <h1 className="text-center m-5">Product List</h1>
      <form
        className="form-inline"
        style={{ margin: "50px", display: "flex", justifyContent: "Center" }}
      >
        <input
          style={{ width: "40vw" }}
          className="form-control mx-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
        />
      </form>
      <div>
        {product.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Name</th>
                <th scope="col">Company</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col" style={{ width: "190px", textAlign: "center" }}>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.cateogry}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          deleteProduct(item._id);
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`/update/${item._id}`}>
                        <button type="button" className="btn btn-primary">
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2
            style={{
              width: "80vw",
              textAlign: "center",
              color: "red",
              marginTop: "20px",
            }}
          >
            No Result Found!
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductList;
