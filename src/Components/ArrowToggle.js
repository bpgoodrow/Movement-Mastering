import React, {useState} from "react";
import { IoIosArrowForward } from 'react-icons/io';

const ArrowToggle = () => {

  const [rotateChevron, setRotateChevron] = useState(false);

    const handleRotate = () => setRotateChevron(!rotateChevron);

    const rotate = rotateChevron ? "rotate(90deg)" : "rotate(0)"
  return(
    <IoIosArrowForward size="30px" style={{ transform: rotate, transition: "all 0.1s linear" }} onClick={handleRotate} />
  )
}

export default ArrowToggle