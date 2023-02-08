import React, {useState, forwardRef, useRef, useImperativeHandle} from "react";
import { IoIosArrowForward } from 'react-icons/io';

const ArrowToggle = forwardRef((props, ref) => {

  const [rotateChevron, setRotateChevron] = useState(false);
  const rotate = rotateChevron ? "rotate(90deg)" : "rotate(0)"
  const handleRotate = () => setRotateChevron(!rotateChevron);

  return(
    <IoIosArrowForward 
      size="30px" style={{ transform: rotate, transition: "all 0.1s linear" }}
      onClick={handleRotate}
      />
  )
})

export default ArrowToggle