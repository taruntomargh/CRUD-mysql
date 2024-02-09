import { useEffect, useState } from "react";
import Add from "./components/Add";
import Update from "./components/Update";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/");
        // console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const showUpdate = (id) => {
    setUpdate(true);
    setId(id);
    console.log(id);
  }

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ textAlign: "center" }}>E-Commerce CRUD Operations</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
        <div
          style={{
            backgroundColor: "#363434",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Add />
          {(update==true) ? <Update id={id} /> : null}
        </div>
        <div
          style={{
            backgroundColor: "#363434",
            padding: "10px",
            borderRadius: "10px",
            width: "500px",
          }}
        >
          <h3>All Books</h3>
          <div>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <span>{product.name}</span>
                  <p>{product.category}</p>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                  <button onClick={() => showUpdate(product.id)}>
                    Update
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
