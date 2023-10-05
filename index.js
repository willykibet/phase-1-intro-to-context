// Your code here
// Your code here
// Define a function to calculate the total hours worked by an employee
function calculateTotalHours(startTimestamp, endTimestamp) {
    const startHour = parseInt(startTimestamp.slice(-4, -2));
    const endHour = parseInt(endTimestamp.slice(-4, -2));
    return endHour - startHour;
  }
  
  // Define a function to calculate the pay for a given number of hours
  function calculatePay(hours) {
    const HOURLY_WAGE = 10; // example hourly wage
    return hours * HOURLY_WAGE;
  }
  
  // Define a function to process an employee's time card
  function processTimeCard(timeCard) {
    const [checkInTimestamp, checkOutTimestamp] = timeCard.split(" ");
    const totalHours = calculateTotalHours(checkInTimestamp, checkOutTimestamp);
    const totalPay = calculatePay(totalHours);
    return { checkInTimestamp, checkOutTimestamp, totalHours, totalPay };
  }


  function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date
    });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(
      event => event.date === date
    );
    const timeOut = employeeRecord.timeOutEvents.find(
      event => event.date === date
    );
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  }
  
  