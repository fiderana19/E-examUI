import { useTest } from "@/context/TestContext";
import { formatTestTotalSecondTime } from "@/utils/TestRoomUtils";
import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

type ClockTestProps = {
  afterTimeOver: () => void;
};

const ClokcTest: React.FC<ClockTestProps> = ({ afterTimeOver }) => {
  const { secondsLeft, updateSecondsLeft } = useTest();
  const [timeLeft, setTimeLeft] = useState<number>(Number(secondsLeft));

  useEffect(() => {
    if (timeLeft <= 0) {
      afterTimeOver();
      return;
    }

    const intervalID = setInterval(() => {
      updateSecondsLeft(timeLeft - 1);
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [timeLeft]);

  return (
    <div
      className={`${timeLeft < 11 ? "bg-red-500 animate-pulse" : "bg-gray-400"} border rounded-full py-1 px-3 bg-gray-400 text-white font-bold w-max`}
    >
      <ClockCircleOutlined /> {formatTestTotalSecondTime(timeLeft)}
    </div>
  );
};

export default ClokcTest;
