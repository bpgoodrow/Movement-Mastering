import React, {useState, useEffect} from "react";
import { IoIosArrowForward } from 'react-icons/io';

const ArrowToggle = () => {

  const [rotateChevron, setRotateChevron] = useState(false);
  const rotate = rotateChevron ? "rotate(90deg)" : "rotate(0)";
  const handleRotate = () => setRotateChevron(!rotateChevron);

  const log = () => {
    console.log("call from parent");
  };

  useEffect(() => {
    if(handleRotate){
      log();
    }
  }, [handleRotate])

  return(
    <IoIosArrowForward 
      size="30px" style={{ transform: rotate, transition: "all .1s linear" }}
      onClick={handleRotate}
      />
  )
}

export default ArrowToggle