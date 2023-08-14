// 1 - createEmployeeRecord
const createEmployeeRecord = array => ({
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
});

// 2 - createEmployeeRecords
const createEmployeeRecords = arrayOfArrays => arrayOfArrays.map(createEmployeeRecord);

// 3 - createTimeInEvent
const createTimeInEvent = (employeeRecord, dateStamp) => {
    const [date, hour] = dateStamp.split(" ");
    // Add timeIn event to the employee record's timeInEvents array
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
    return employeeRecord;
};

// 4 - createTimeOutEvent
const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const [date, hour] = dateStamp.split(" ");
    // Add timeOut event to the employee record's timeOutEvents array
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
    return employeeRecord;
};

// 5 - hoursWorkedOnDate
function hoursWorkedOnDate(empRecord, date) {
    // Find the timeIn event for the given date
    const timeIn = empRecord.timeInEvents.find(event => event.date === date);
    // Find the timeOut event for the given date
    const timeOut = empRecord.timeOutEvents.find(event => event.date === date);
    // Calculate hours worked by subtracting timeIn from timeOut and converting to hours
    return (timeOut.hour - timeIn.hour) / 100; // Convert hour difference to hours (e.g., 1200 => 12)
}

// 6 - wagesEarnedOnDate
const wagesEarnedOnDate = (employeeRecord, date) => {
    // Calculate wages by multiplying hours worked with pay rate
    const wages = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return wages;
};

// 7 - allWagesFor
const allWagesFor = employeeRecord => {
    // Calculate total wages for all dates by mapping over timeInEvents and reducing the wagesEarnedOnDate
    const totalWages = employeeRecord.timeInEvents
        .map(event => event.date)
        .reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
};

// 8 - calculatePayroll
const calculatePayroll = employeeRecords => {
    // Calculate the total payroll for all employee records by reducing the allWagesFor
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
    return totalPayroll;
};
