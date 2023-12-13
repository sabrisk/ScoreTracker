let sheet = null;

// 
let colDict = {
  'Prize':{
            'data': -1,
            'display': 6,
          },
  'Rank': {
            'data': -1,
            'display': 7,
          },
  'Name': {
            'data': 2,
            'display': 8,
          },
  'Date': {
            'data': 1, //Timestamp
            'display': 9,
          },
  'Score':{
            'data': 3,
            'display': 10,
          },
  'Proof':{
            'data': 4,
            'display': 11,
          }
}

function onOpen() {
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  // Hide columns from Google Forms submit
  hideDataColumns();
}

function onFormsubmit(e) {
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  clearRankColumn();
  
  if (checkIfCellIsEmpty('F1')) {
    createDisplayHeaders(colDict);
  }
  
  convertImageURLtoThumbnail();
  copyDataToDisplay(colDict);
  sortData();

  createStaticRankingColumn();
}

// Hide the data columns created from Google Forms submit
function hideDataColumns() {
  // Hide the first 5 columns (A to E)
  sheet.hideColumns(1, 5);

  Logger.log('Data columns hidden.');
}

function clearRankColumn() {
  var targetColumnLetter = 'G';
  sheet.getRange(targetColumnLetter + '2:' + targetColumnLetter).clear();

  Logger.log('Rank column cleared.');
}

// Check if cell is empty
function checkIfCellIsEmpty(cellReference) {
  // Check if the cell is empty using isBlank()
  return sheet.getRange(cellReference).isBlank();
}

// Create display headers
function createDisplayHeaders(myDictionary) {
 for (var key in myDictionary) {
    if (myDictionary.hasOwnProperty(key)) {
      setCellByRowAndColumn(key, 1, myDictionary[key]['display']);
    }
  }
  Logger.log('Display headers created.');
}

//Reconstructs image link for Google Sheets to properly display thumbnail
function convertImageURLtoThumbnail() {
  let imageDataCell = getCellOfLastDataEntry(colDict['Proof']['data']);
  let oldImageURL = imageDataCell.getValue();
  let imageID = extractImageID(oldImageURL);
 
  setFileViewableWithLink(imageID);

  let formula = '=IMAGE("https://drive.google.com/uc?export=view&id=' + imageID + '")';
  imageDataCell.setFormula(formula);

  Logger.log('Image url converted.');
}

// Copy data columns to display columns
function copyDataToDisplay(myDictionary) {
   for (var key in myDictionary) {
    if (myDictionary.hasOwnProperty(key)) {
      let dataCellColNum = myDictionary[key]['data'];
      if (dataCellColNum > -1){
        let dataCellRef = getCellOfLastDataEntry(dataCellColNum);
        let displayCellColNum =  myDictionary[key]['display'];
        let rowIndex = dataCellRef.getRowIndex();
        let displayCellRef = sheet.getRange(rowIndex, displayCellColNum);
        dataCellRef.copyTo(displayCellRef);
      }
    }
  }
  Logger.log('Data copied to display data columns.');
}

// Sort sheet data on score (descending)
function sortData() {
  var columnToSort = 3;

  // Get the range of the data in the sheet
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());

  // Sort the data based on the specified column
  range.sort({ column: columnToSort, ascending: false });

  Logger.log('Data sorted.');
}

// Create the ranking column
function createStaticRankingColumn() {
  // Replace 'A' with the column letter where you want to insert the static ranking column
  var targetColumnLetter = 'G';

  // Number of rows to rank (change this based on your requirements)
  var numRowsToRank = 5;

  // Set the ranking values in the target column for the first numRowsToRank rows
  for (var i = 2; i <= numRowsToRank + 1; i++) {
    sheet.getRange(targetColumnLetter + i).setValue(i - 1);
  }

  Logger.log('Static ranking column inserted successfully.');
}

// Sets a cell at the given row and column to the given value
function setCellByRowAndColumn(value, rowNum, columnNum) {
  // Get the range of the specific cell using row and column numbers
  var cellRange = sheet.getRange(rowNum,columnNum);
  cellRange.setValue(value);
}

// Find the last cell within the supplied column that contains data
function getCellOfLastDataEntry(columnNum) {
  let lastrow = sheet.getLastRow();

  return sheet.getRange(lastrow, columnNum);
}

// Extract image id from url
function extractImageID(url) {
  var regexPattern = /.*=(.*)/;
  let matches = url.match(regexPattern);
  return matches[1];
}

// Set Google Drive image as viewable with link so Sheets can display thumbnail
function setFileViewableWithLink(fileId) {

  var imageFile = DriveApp.getFileById(fileId);
  imageFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  var sharingSettings = imageFile.getSharingAccess();
  Logger.log('Image sharing settings set to: ' + sharingSettings);
}