import React from "react";

export const handleLetterKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const charCode = e.which || e.keyCode;

  if (
    !(
      (charCode >= 97 && charCode <= 122) ||
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 224 && charCode <= 246) ||
      (charCode >= 249 && charCode <= 252)
    )
  ) {
    e.preventDefault();
  }
};

export const handleNumberKeyPress = async (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const charCode = e.which || e.keyCode;

  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }
};

export const handleFloatKeyPress = async (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const charCode = e.which || e.keyCode;

  if ((charCode < 48 || charCode > 57) && charCode != 46 && charCode > 31) {
    e.preventDefault();
  }
};
