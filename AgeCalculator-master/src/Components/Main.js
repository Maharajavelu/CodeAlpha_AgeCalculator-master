import React, { useState, useEffect } from "react";
import './Home.css'

function Main({ dateOfBirth }) {
  // Function to calculate and format the age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      // Return default values when dateOfBirth is empty
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const birthDate = new Date(dateOfBirth);

    // Check if the birthDate is a valid date
    if (isNaN(birthDate.getTime())) {
      // Return default values when dateOfBirth is not a valid date
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const currentDate = new Date();

    // Calculate the time difference
    const timeDifference = currentDate - birthDate;

    // Calculate years, months, days, hours, minutes, seconds, and milliseconds
    const age = new Date(timeDifference);

    return {
      years: age.getUTCFullYear() - 1970,
      months: age.getUTCMonth(),
      days: age.getUTCDate() - 1, // Subtract 1 day as UTC date is 0-based
      hours: age.getUTCHours(),
      minutes: age.getUTCMinutes(),
      seconds: age.getUTCSeconds(),
    };
  };

  // Initialize age with default values
  const initialAge = calculateAge(dateOfBirth);

  const [age, setAge] = useState(initialAge);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedAge = calculateAge(dateOfBirth);
      setAge(updatedAge);
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, [dateOfBirth]);

  const isBirthday = dateOfBirth !== ""
    && age.days === 0
    && age.months === 0
    && new Date().getMonth() === new Date(dateOfBirth).getMonth()
    && new Date().getDate() === new Date(dateOfBirth).getDate();

  return (
    <>
      <p className="results">
        Age: {age.years} years, {age.months} months, {age.days} days,{" "}
        {age.hours} hours, {age.minutes} minutes, {age.seconds} seconds{" "}
      </p>
      {isBirthday && <p className="birthday-message">Happy Birthday!🎂🎉🎁</p>}
    </>
  );
}

export default Main;
