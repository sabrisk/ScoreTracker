# ScoreTracker

A score tracking spreadsheet app using Google Sheets and Google Forms to record your score with image proof from the arcade!

## Table of Contents

- [Setup](#Setup)
	- [Copy Spreadsheet](#Copy%20Spreadsheet)
	- [Create Form](#Create%20Form)
- [Usage](#usage)
## Prerequisites

- Google account
## Setup

#### Copy Spreadsheet

1. Login to the Google account you wish to use.
2. Make a copy of the Google Sheets Spreadsheet: [ScoreTracker Spreadsheet](https://docs.google.com/spreadsheets/d/1z6fChDwsy2vfuOqQu2Jls9vTPYpGyx3AvhEi9Dn5cfg/copy).
3. Click the "Extensions" Menu Item.
4. Click "Apps Script" within the Extensions Menu.
5. Ensure the Code.gs file is selected and click "Run."
6. Within the "Authorization required" popup, click "Review permissions."
7. Within the "Choose an account" page, select the account you copied the spreadsheet to.
8. On the "Google hasn't verified this app" page, click "Advanced."
9. Click the "Go to ScoreTracker Apps Script (unsafe)" link.
10. On the "ScoreTracker Apps Script wants to access your Google Account" page, click "Allow" to give the app the permissions it needs to operate.

#### Create Form

1. Go to [Google Forms](https://docs.google.com/forms), a new form called "ScoreTracker" should have been created.
2. Click to open the form.
3. Return to the spreadsheet and copy the URL of the spreadsheet.
4. Back on the form, click the "Form description" text and select the option in the menu that appears below to insert a link (it resembles a chain link icon).
5. On the "Add Link" popup, change the "Text to display" to "VIEW HIGHSCORES HERE."
6. Again on the "Add Link" popup, change "Link to" to the URL of the spreadsheet by pasting the URL you copied.
7. Create a question using the plus icon on the right and change the dropdown menu to "File upload."
8. Click "Continue" to allow images submitted to this form to be uploaded to your Google Drive.
9. Change the question to "Image proof."
10. At the bottom right of this question, toggle it to be "Required."
11. Using the 6 small dots at the top center of the "Image proof" question you just created, click and drag so that it is below the existing "Score" question (you may need to drag the other questions up instead).
12. Click the Responses tab at the top and then click "Link to Sheets."
13. On the "Select destination for responses" popup, select "Select existing spreadsheet."
14. Click "Select"
15. Click the ScoreTracker spreadsheet and click "Select" at the bottom.

## Usage

1. Select preview at the top of the Google Form indicated by the eyeball icon at the top
2. Type in a Name, Score, and then upload the image file proving the score you achieved in whatever game you're playing.
3. Click "Submit"