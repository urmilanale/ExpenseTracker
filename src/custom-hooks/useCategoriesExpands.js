import { useState } from "react";

const useCategoriesExpands = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dataToShow, setDataToShow] = useState([]);

  const getDataList = (isExpand, allCategories = []) => {
    setIsExpanded(isExpand);
    if (allCategories.length < 5 || isExpand)
      return setDataToShow(allCategories);
    return setDataToShow(allCategories.slice(0, 5));
  };
  return [isExpanded, dataToShow, getDataList];
};

export default useCategoriesExpands;
