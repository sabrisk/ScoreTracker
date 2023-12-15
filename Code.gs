let sheet = null;

let colDict = {
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
  hideDataColumns();
}

function onFormsubmit(e) {
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  clearRankColumn();
  
  if (checkIfCellIsEmpty('F1')) {
    createDataDisplayHeaders(colDict);
  }
  
  convertImageURLtoThumbnail(colDict);
  copyDataToDisplay(colDict);
  sortData(colDict);

  createStaticRankingColumn("G");
}

// Hide the data columns created from Google Forms submit
function hideDataColumns() {
  // Hide the first 5 columns (A to F)
  sheet.hideColumns(1, 6);

  Logger.log('Data columns hidden.');
}

// Clear rank column prior to copying data to avoid miscalculating last valid row containing data
function clearRankColumn() {
  let targetColumnLetter = 'G';
  sheet.getRange(targetColumnLetter + '1:' + targetColumnLetter).clear();

  Logger.log('Rank column cleared.');
}

// Check if cell is empty
function checkIfCellIsEmpty(cellReference) {
  // Check if the cell is empty using isBlank()
  return sheet.getRange(cellReference).isBlank();
}

// Create display headers
function createDataDisplayHeaders(colDict) {
 for (let key in colDict) {
    if (colDict.hasOwnProperty(key)) {
      setCellByRowAndColumn(key, 1, colDict[key]['display']);
    }
  }
  Logger.log('Display headers created.');
}

//Reconstructs image link for Google Sheets to properly display thumbnail
function convertImageURLtoThumbnail(colDict) {
  let imageDataCell = getCellOfLastDataEntry(colDict['Proof']['data']);
  let oldImageURL = imageDataCell.getValue();
  let imageID = extractImageID(oldImageURL);
 
  setFileViewableWithLink(imageID);

  let formula = '=IMAGE("https://drive.google.com/uc?export=view&id=' + imageID + '")';
  imageDataCell.setFormula(formula);

  Logger.log('Image url converted.');
}

// Copy data columns to display columns
function copyDataToDisplay(colDict) {
   for (let key in colDict) {
    if (colDict.hasOwnProperty(key)) {
      let dataCellColNum = colDict[key]['data'];
      let dataCellRef = getCellOfLastDataEntry(dataCellColNum);
      let displayCellColNum =  colDict[key]['display'];
      let rowIndex = dataCellRef.getRowIndex();
      let displayCellRef = sheet.getRange(rowIndex, displayCellColNum);
      dataCellRef.copyTo(displayCellRef);
    }
  }
  Logger.log('Data copied to display data columns.');
}

// Sort sheet data on score (descending)
function sortData(colDict) {
  let columnToSort = colDict['Score']['data'];

  // Get all data to sort
  let range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  range.sort({ column: columnToSort, ascending: false });

  Logger.log('Data sorted.');
}

// Create the ranking column
function createStaticRankingColumn(targetColumnLetter) {

  sheet.getRange(targetColumnLetter + 1).setValue("Rank");

  let numRowsToRank = 5;

  for (let i = 2; i <= numRowsToRank + 1; i++) {
    sheet.getRange(targetColumnLetter + i).setValue(i - 1);
  }
  Logger.log('Static ranking column inserted successfully.');
}

// Sets a cell at the given row and column to the given value
function setCellByRowAndColumn(value, rowNum, columnNum) {
  // Get the range of the specific cell using row and column numbers
  let cellRange = sheet.getRange(rowNum,columnNum);
  cellRange.setValue(value);
}

// Find the last cell within the supplied column that contains data
function getCellOfLastDataEntry(columnNum) {
  let lastrow = sheet.getLastRow();

  return sheet.getRange(lastrow, columnNum);
}

// Extract image id from url
function extractImageID(url) {
  let regexPattern = /.*=(.*)/;
  let matches = url.match(regexPattern);
  return matches[1];
}

// Set Google Drive image as viewable with link so Sheets can display thumbnail
function setFileViewableWithLink(fileId) {

  let imageFile = DriveApp.getFileById(fileId);
  imageFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  let sharingSettings = imageFile.getSharingAccess();
  Logger.log('Image sharing settings set to: ' + sharingSettings);
}