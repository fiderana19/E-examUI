import { createContext, ReactNode, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

type TestContextProps = {
  secondsLeft?: number | null;
  isInTest?: boolean;
  isFinished?: boolean;
  updateSecondsLeft: (sec: number) => void;
  updateIsInTest: (value: boolean) => void;
  updateIsFinished: (value: boolean) => void;
};

const TestContext = createContext<TestContextProps | undefined>(undefined);

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    Number(localStorage.getItem("secondsLeft")),
  );
  const [isInTest, setIsInTest] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const updateSecondsLeft = async (sec: number) => {
    setSecondsLeft(sec);
    await localStorage.setItem("secondsLeft", String(sec));
  };

  const updateIsInTest = async (value: boolean) => {
    setIsInTest(value);
    await localStorage.setItem("isInTest", String(value));
  };

  const updateIsFinished = async (value: boolean) => {
    setIsFinished(value);
    await localStorage.setItem("isFinished", String(value));
  };

  return (
    <TestContext.Provider
      value={{
        isInTest,
        secondsLeft,
        isFinished,
        updateIsInTest,
        updateSecondsLeft,
        updateIsFinished,
      }}
    >
      {children}
      <ToastContainer />
    </TestContext.Provider>
  );
};

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error("useTest must be inside of a TestProvider");
  }
  return context;
}
