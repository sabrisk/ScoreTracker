# ScoreTracker

A score tracking spreadsheet app using Google Sheets and Google Forms to record your score with image proof from the arcade!

## Table of Contents

- [Setup](#Setup)
- [Usage](#usage)
## Prerequisites

- Google account
## Setup

#### Copy Spreadsheet

1. Login to the Google account you wish to use if necessary
2. Make a copy of the Google Sheets Spreadsheet: [ScoreTracker Spreadsheet](https://docs.google.com/spreadsheets/d/1z6fChDwsy2vfuOqQu2Jls9vTPYpGyx3AvhEi9Dn5cfg/copy) 
3. Optionally rename the spreadsheet from "Copy of ScoreTracker" to "ScoreTracker" or whatever you please
4. Click "Share" at the top right of the screen and change the "General access" to "Anyone with the link" and ensure the permissions are set to "Viewer"
5. Click "Done"
6. Click the "Extensions" Menu Item
7. Click "Apps Script" within the Extensions Menu
8. Optionally rename the apps script to whatever you please
9. On the left sidebar, click to select the Editor, indicated by the <> angle brackets
10. Select the Code.gs file on the left
11. At the top of the page, click "Run"
12. Within the "Authorization required" popup, click "Review permissions"
13. Select the account you copied the spreadsheet to
14. On the "Google hasn't verified this app" page, click "Advanced"
15. Click the "Go to ScoreTracker Apps Script (unsafe)" link
16. On the "ScoreTracker Apps Script wants to access your Google Account" page, click "Allow" to give the app the permissions it needs to operate.
17. On the left sidebar, click to select the "Triggers", indicated by the alarm clock icon
18. At the bottom right, click "Add Trigger"
19. Under "Choose which function to run", select "onFormsubmit"
20. Under "Select event type", select "On form submit"
21. Click "Save" 
    - Note: Your browser may prevent a popup window. Click to allow the popup then save again
22. On the "Choose and account" popup, select the account where you saved the spreadsheet
23. On the "Google hasn't verified this app" page, click "Advanced"
24. Click the "Go to ScoreTracker Apps Script (unsafe)" link
25. On the "ScoreTracker Apps Script wants to access your Google Account" page, click "Allow" to give the app the permissions it needs to operate.
26. Click "Save"

#### Create Form

1. Login to the Google account you wish to use if necessary
2. Go to [Google Forms](https://docs.google.com/forms)
3. At the top left, create a blank form
4. On the questions tab, rename the form to ScoreTracker
5. Return to the spreadsheet, and copy the url of the spreadsheet
6. Back on the form, for the "Form description", click it and select the option in the menu that appears below to insert a link (it resembles a chain link icon)
7. On the "Add Link" popup, change the "Text to display" to "VIEW HIGHSCORES HERE"
8. Again on the "Add Link" popup, change "Link to" to the url of the spreadsheet by pasting the url you copied
9. Click the pre-existing untitled question and change type from "Multiple Choice" to "Short answer"
10. Change the question to "Name"
11. At the bottom right of this question, toggle it to be "Required"
12. Create another question using the plus sign on the right and change the answer type to "Short answer"
13. Change the question to "Score"
14. At the bottom right of this question, toggle it to be "Required"
15.  Create another question and change the answer type to "File upload"
16. Click "Continue" to allow images submitted to this form to be uploaded to your Google Drive
17. Change the question to "Image proof"
18. At the bottom right of this question, toggle it to be "Required"
19. Click the Responses tab at the top and then click "Link to Sheets"
20. On the "Select destination for responses" popup, select "select existing spreadsheet"
21. Click "Select"
22. Click the ScoreTracker spreadsheet and click "Select" at the bottom.

## Usage

1. Select preview at the top of the Google Form indicated by the eyeball icon at the top
2. Type in a Name, Score, and then upload the image file proving the score you achieved in whatever game you're playing.
3. Click "Submit"