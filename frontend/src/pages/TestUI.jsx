import { motion } from "framer-motion";

const TestUI = () => {
  return (
    <div className="container fade-in">

      <h1 className="page-title">SafeRoute UI Test</h1>

      <motion.div
        className="card"
        whileHover={{ scale: 1.03 }}
      >
        <h3>Safety Feature Card</h3>
        <p>This is final UI theme preview</p>

        <button className="btn-primary">Check Route</button>
      </motion.div>

    </div>
  );
};

export default TestUI;
