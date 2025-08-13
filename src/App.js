import React, { useState } from "react";
import {
  StyledHeader,
  StyledInput,
  StyledWrapper,
  StyledH3,
  StyledLi,
  StyledUl,
} from "./StyledApp";
import "./App.css";
import scheduleData from "./scheduleData";
import Button from "@mui/material/Button";

function getSchemaWeek(startDate = "2025-07-14") {
  const today = new Date();
  const start = new Date(startDate);
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return (Math.floor(diffDays / 7) % 6) + 1;
}

function App() {
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");
  const [week, setWeek] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const week = getSchemaWeek();
    const userData = scheduleData[name];
    if (userData && userData[week]) {
      setSchedule(userData[week]);
      setWeek(week);
      setError("");
    } else {
      setSchedule([]);
      setWeek("");
      setError("Ingen data hittades för det namnet eller veckan.");
    }
  };

  const showWeekSchedule = (personName, weekNumber) => {
    const userData = scheduleData[personName];
    if (userData && userData[weekNumber]) {
      setSchedule(userData[weekNumber]);
      setWeek(weekNumber);
      setError("");
    } else {
      setSchedule([]);
      setWeek("");
      setError("Ingen data hittades för det namnet eller veckan.");
    }
  };

  const handleNextWeek = () => {
    if (!week || !name) return;
    const nextWeek = (week % 6) + 1; // Om vecka 6 -> 1
    showWeekSchedule(name, nextWeek);
  };

  return (
    <div className="App">
      <StyledHeader>Veckoschema</StyledHeader>
      <form onSubmit={handleSubmit}>
        <StyledWrapper>
          <StyledInput
            id="outlined-basic"
            label="Skriv ditt namn"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ width: "80vw", margin: "0 auto" }}
          >
            Visa veckans pass
          </Button>
        </StyledWrapper>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {schedule.length > 0 && (
        <div>
          <StyledH3>Vecka: {week}</StyledH3>
          <StyledH3>Dina pass denna vecka:</StyledH3>
          <StyledUl>
            {schedule.map((pass, i) => (
              <StyledLi key={i}>{pass}</StyledLi>
            ))}
          </StyledUl>
          <Button
            variant="outlined"
            onClick={handleNextWeek}
            style={{ marginTop: "1rem" }}
          >
            Visa nästa vecka
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
