import { createContext, ReactNode, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

type TestContextProps = {
  secondsLeft?: number | null;
  isFinished?: boolean;
  updateSecondsLeft: (sec: number) => void;
  updateIsFinished: (value: boolean) => void;
};

const TestContext = createContext<TestContextProps | undefined>(undefined);

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    Number(localStorage.getItem("secondsLeft")),
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const updateSecondsLeft = async (sec: number) => {
    setSecondsLeft(sec);
    await localStorage.setItem("secondsLeft", String(sec));
  };

  const updateIsFinished = async (value: boolean) => {
    setIsFinished(value);
  };

  return (
    <TestContext.Provider
      value={{
        secondsLeft,
        isFinished,
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
