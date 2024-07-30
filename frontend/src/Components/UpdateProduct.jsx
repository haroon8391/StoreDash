import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [cateogry, setcateogry] = useState("");
  const [price, setPrice] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [params]);

  const getData = async () => {
    const response = await fetch(
      `http://localhost:2000/updateProduct/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const result = await response.json();
    setName(result.name);
    setCompany(result.company);
    setcateogry(result.cateogry);
    setPrice(result.price);
  };

  const handleUpdateProduct = async () => {
    const response = await fetch(
      `http://localhost:2000/updateProductData/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ name, company, cateogry, price }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);

    setName("");
    setCompany("");
    setcateogry("");
    setPrice("");
    navigate("/");
  };

  return (
    <div>
      <div>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div>
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Update Product
                        </p>

                        <form className="mb-5">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                value={name}
                                placeholder="Product Name"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill">
                              <input
                                type="text"
                                id="form3Example3c"
                                className="form-control"
                                onChange={(e) => {
                                  setCompany(e.target.value);
                                }}
                                value={company}
                                required
                                placeholder="Product Company"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill">
                              <input
                                type="text"
                                id="form3Example4c"
                                className="form-control"
                                onChange={(e) => {
                                  setcateogry(e.target.value);
                                }}
                                value={cateogry}
                                placeholder="Product cateogry"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-5">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill">
                              <input
                                type="text"
                                id="form3Example4cd"
                                className="form-control"
                                onChange={(e) => {
                                  setPrice(e.target.value);
                                }}
                                value={price}
                                placeholder="Product Price"
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center ">
                            <button
                              type="button"
                              className="btn btn-success btn-lg"
                              onClick={handleUpdateProduct}
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateProduct;
