// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // Fist, clear out any existing data
    tbody.html("");

    // Loop through each objest in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field inb the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

// Add date function
//function handleClick() {
    // Grab datetime value from the filter
    //let date = d3.select("#datetime").property("value");
    //let filteredData = tableData;

    // Check to see if a date was entered and filter the 
    //data using that date.
        //if (date) {
           // filteredData = filteredData.filter(row => row.datetime === date);
       // };

    // Rebuild the table using the filtered data
    // @NOTE: If no data was entered then filteredData will
    // just be the original tableData.
    //buildTable(filteredData);
//}

// 1. Create an empty filters variable to kee track of all elements that change when a serch is entered
var filters = [];

// 3. Inside this function, you’ll write code in Steps 4-5 to update the filters based on user input.
function updateFilters() {

    // 4a. Create a variable that saves the "changed element" using d3.select(this).
    let changedElement = d3.select(this);

    // 4b. Save the value that was changed as a variable. Create a variable that saves the "value of the changed element’s property".
    let elementValue = changedElement.property("value");
    console.log(elementValue);

    // 4c. Create a variable that saves the "attribute of the changed element’s id".
    let filterId = changedElement.attr("id");
    console.log(filterId);

    // 5. Write an if-else statement that checks if a value was changed by the user. 
    // If a value was changed, add the element’s id as the property and the value that was changed to the filter variables in step 1. 
    // If a value was not entered, then clear the element id from the filters variable.
    if (elementValue) {
      filters[filterId]=elementValue;
    }
    else {
      delete filters[filterId];
    } 

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  }
  
  // 7. Write code to filter the table based on the user input that is stored in the filters variable.
  function filterTable() {
  
    // 8. Create a variable for the filtered data that is equal to the data that builds the table.
    let filteredData = tableData;
 
    // 9. Loop through the filters object and store the data that matches the filter values in the variable created in Step 8.
    Object.entries(filters).forEach(([key,value])=> {
      filteredData =  filteredData.filter(row => row[key]=== value);
    });  
  
    // 10. Rebuild the table with the filtered data by passing the variable created in Step 8.
    buildTable(filteredData);    
  }
  
  // 2. Modify the event listener to "change" on each "input" element and calls the "updateFilters() function".
  d3.selectAll("input").on("change",updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
