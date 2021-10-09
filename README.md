# Elkins High School TMSCA Competition
Tools to enhance the execution of the annual Math Contest hosted by [EHS](https://www.fortbendisd.com/ehs). Written by Jefferson Yu.

## About the Project
### Background
Prior to 2018, Elkins High School hosted an annual TMSCA Math Competition for middle school contestants in the local community. This competition was expanded to encompass elementary, middle, and high school competitors in the 2018-2019 school year. With such an expansion, a logistic challenge arose in managing the increased number of participants and volunteers. In 2018, v1.0.0 of the programs were released, which allowed for ease of registration, grading, and score tabulation throughout the contest.

In 2020, v2.0.0 was released, which fixed issues in the previous version, improved the results PDF appearance and the site layout, and added a new page for volunteer sign-in. 

### Pages
#### Registration
The Registration page allows for coaches to register teams directly through the contest website. Data from each registration are stored into PDF and XLSX files.

Sample Registration PDF Output: 
![sample registration pdf](https://user-images.githubusercontent.com/43518772/136645027-97046958-b7b0-43d3-88c1-32db875cdd7b.png)

#### Results
The Results page gives contest administrators the ability to look at contest scoring in real-time based on data inputted in a Google Sheets. The page outputs a PDF with names of students and schools ranking in the top n places, where n can be customized at the administrator's disposal for every contest category.

Sample Google Sheets input: 
![sample scoresheet](https://user-images.githubusercontent.com/43518772/136645341-673889dc-733d-4a9a-bbc0-2eaeebca571c.png)

Sample Results PDF output. Includes results for every category and grade level, as well as sweepstakes for schools: 
![sample results pdf](https://user-images.githubusercontent.com/43518772/136645406-c9542600-d2a2-4639-82df-2e56792a1a89.png)

#### Volunteer Sign-in
The Volunteer Sign-In page prompts volunteers to input their 6-digit student ID assigned by the school. After querying the appropriate data, the page displays instructions for the volunteer, such as a room number, time, etc., and clocks them in.

### Live Demo
https://elkinstmsca1920.weebly.com

## Installation & Usage
1. These code snippets can be used on any website or website hoster, such as Weebly or Wordpress.
2. Once a website is set up, copy the code snippets into the corresponding pages (registration.html into the Registration Page, results2.html into the Results Page, etc.)
3. Import the .js and .css files as assets into your website. You may need to edit the links to the assets at the top of each corresponding .html file.
4. For the Results and Sign-In pages, you must change the Google Sheets URL at the top of the .js files. 
    1. [Instructions can be found here](https://sites.google.com/a/ccpsnet.net/googletraining/faq/FAQ-Drive/how-do-i-publish-a-sheet-to-the-web-and-what-does-that-mean) regarding the "Publish To The Web" function of Google Sheets. Workbooks should be published with all sheets, and as an Excel (XLSX) format.
    2. [Copy a template here for the Results page](https://docs.google.com/spreadsheets/d/1QWfdL1PTMwvLUxc9Rhd-SO924D1JkRuUMqtMaqG8Fdc/edit?usp=sharing). Sheets are divided by grade level. Names of contestants go in each row. Scores for each test (Number Sense, Calculator, General Math, and General Science) should go in the cell associated with the correct test type (column) and contestant (row). Input an "x" for contestants who registered for a certain test but failed to attend.
    3. [Copy a template here for the Volunteer Sign-In page](https://docs.google.com/spreadsheets/d/1QuSMbv_N-P6LOjn3ms9NcP7FbeVOWpNxRPLzY7l-kHE/copy?usp=sharing). Names of volunteers, along with the associated data, go in each row.
5. You may change the administrator login for the Results Page in the .js file if you would like. Note that this is only a bit of simple JavaScript to prevent contestants from looking at the results before the awards ceremony. Although it does the job, it is not by any means a comprehensive security measure - please do not include any personal or important login information. 

## Contact
* Jefferson Yu - [fu.yao.yu at hotmail dot com](mailto:fu.yao.yu@hotmail.com)
* Project link: https://github.com/JeffersonYu1/elkins-tmsca

## Acknowledgments
* [jsPDF](https://github.com/parallax/jsPDF)
* [jsPDF Autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)
* [SheetJS](https://github.com/SheetJS/sheetjs)
* [Lodash](https://lodash.com/)
* [Google Fonts](https://fonts.google.com/)
