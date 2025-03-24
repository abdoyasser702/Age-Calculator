const selectElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};
const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};
const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isDateValid = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false];
  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  }
  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    monthElement.classList.remove("card__input--error");
  }
  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  }
  return isValid.every((item) => item === true);
};
const calculatedAge = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthdate.getFullYear();
  const months = today.getMonth() - birthdate.getMonth();
  if (months < 0 || (month === 0 && today.getDate() < today.getDate())) {
    age--;
  }
  return age;
};

const oncClickHandler = () => {
  const dayElement = document.querySelector('.card__input[name="day"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const yearElement = document.querySelector('.card__input[name="year"]');
  const resultElement = document.querySelector(".card__resultValue");

  if (!isDateValid(dayElement, monthElement, yearElement)) {
    resultElement.textContent = "--";
    return;
  }

  resultElement.textContent = calculatedAge(
    yearElement.value,
    monthElement.value,
    dayElement.value
  );
};

selectElements.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    event.key === "Enter" && oncClickHandler();
  });
});
submitButton.addEventListener("click", oncClickHandler);
