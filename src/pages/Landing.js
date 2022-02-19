import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero"

export default function Landing() {
  const context = useContext(StoreContext);
  const variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    products: {
      opacity: 1,
      y: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const item = {
    products: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
    initial: {
      opacity: 0,
    },
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <>
      {context.isLoading && "Loading..."}
      <div className="container">
        <h1 className="display-1">React Framer Store</h1>
        <Hero/>
        <Form className="my-5">
          <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={context.handleSearch}
            className="form-control me-2 mr-sm-2"
          />
        </Form>
        <div className="row align-items-end">
          <AnimatePresence>
            {context.data.map((product, i) => (
              <motion.div
                variants={variants}
                initial="initial"
                animate="products"
                className="col-md-3 col-sm-6 p-3"
                layout
                transition={spring}
                exit="initial"
                key={i}
              >
                <motion.img
                  variants={item}
                  custom={i}
                  alt=""
                  style={{ maxHeight: "150px" }}
                  className="img-fluid"
                  src={product.image}
                />
                <p>{product.title}</p>
                <p>${product.price.toFixed(2)}</p>
                <p>
                  <Link to={`/product/${product.id}`}>More</Link>
                </p>
                <AddToCart product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Outlet />
    </>
  );
}
