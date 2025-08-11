import { Routes, Route } from "react-router-dom";
import { CreatePage } from "../pages/createPage";
import { ListPage } from "../pages/listPage";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
};

export { Router };
