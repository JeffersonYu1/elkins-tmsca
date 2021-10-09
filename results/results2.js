// *** REPLACE SHEETURL WITH NEW GOOGLE SHEETS URL FOR EVERY USE
var url = "https://docs.google.com/spreadsheets/d/e/YOUR-SHEET-ID-HERE";
var userTime = Math.round((new Date()).getTime() / 1000);

var esPlaces = 10;
var esSweep = 2;

var msPlaces = 10;
var msSweep = 2;

var hsPlaces = 6;
var hsSweep = 2;

// *** SET USERNAME AND PASSWORD FOR ADMIN LOGIN
var objPeople = [
    {
        username: "",
        password: ""
    }
];

// create doc
var doc = new jsPDF('p', 'pt', 'letter');
doc.setFontType("bold");
doc.setFontSize(20);
doc.text(40, 50, "Elkins TMSCA: January 18th, 2020 Results");
doc.setFontType("normal");
doc.setFontSize(16);

function login(){
    var usErname = "";
    var pasSword = "";

    usErname = prompt("Username:");
    
    if (usErname === null || usErname === "")
    {
        if (confirm("You did not enter a username. Click ok to retry."))
        {
            document.getElementById("adminL").click();                        
        }
    }
    else
    {
        var usErnameDisp = usErname.trim();
        usErname = usErname.replace(/\s/g,'');
        pasSword = prompt("Username: " + usErnameDisp + "\nPassword:");
        if (pasSword === null || pasSword === "")
        {
            if (confirm("You did not enter a password. Click ok to retry."))
            {
                document.getElementById("adminL").click();                
            }
        }
        else
        {
            pasSword = pasSword.replace(/\s/g,'');
            for(var i = 0; i < objPeople.length; i++) {
                if(usErname == objPeople[i].username && pasSword == objPeople[i].password)
                {
                    alert("You are logged in as " + usErname + ".");
                    document.getElementById("stuffs").style.display = "inline";
                    document.getElementById("adminPl").style.display = "none";
                    loggy = 1;
                    return;
                }
                if(i == objPeople.length - 1 && (usErname !== objPeople[i].username || pasSword !== objPeople[i].password))
                {
                    if(confirm("Incorrect username or password. Click ok to retry."))
                    {
                        document.getElementById("adminL").click();
                    }    
                }
            }
        }
    }
}

// onclick function to redefine ranking count if genCR is called

function colName(n) {
    var ordA = 'a'.charCodeAt(0);
    var ordZ = 'z'.charCodeAt(0);
    var len = ordZ - ordA + 1;
  
    var s = "";
    while(n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s;
}

// set up function for reading rows
var sheet2arr = function(sheet){
   var result = [];
   var row;
   var rowNum;
   var colNum;
   var range = XLSX.utils.decode_range(sheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = [];
       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = sheet[
             XLSX.utils.encode_cell({r: rowNum, c: colNum})
          ];
          if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell.w);
       }
       result.push(row);
   }
   return result;
};

//set up function for sorting - NEEDS REVIEW
var scoreSort = function(index){
    return function(a, b){
        if(!a[index] && b[index]) {
            return 1;
        }
        else if(a[index] && !b[index]) {
            return -1;
        }
        else if(!a[index] && !b[index]) {
            return 0;
        }
        else if(a[index] == "na" || a[index] == "n/a" || a[index] == "x")
        {
            return 1;
        }
        else{
            return (parseFloat(a[index]) == parseFloat(b[index]) ? 0 : (parseFloat(a[index]) < parseFloat(b[index]) ? 1 : -1));
        }        
    };
};

//to title case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function indResults(grArr, d, grOrd, grOrdWords) // d = division: 0 for ES, 1 for MS, 2 for HS
{
    doc.addPage();
    doc.setFontType("bold");
    doc.text(40, 50, grOrdWords + " Grade");
    doc.setFontType("normal");

    for(var i=0; i<4; i++)
    {
        grArr.sort(scoreSort(i+3));
        // console.log(grArr);

        var grArrRowLength = grArr[1].length;
        var topHeader;        
        
        var lessPlaces;

        switch(d)
        {
            case 0:
                lessPlaces = esPlaces;
                break;
            case 1:
                lessPlaces = msPlaces;
                break;
            case 2:
                lessPlaces = hsPlaces;    
                break;
            default: 
                lessPlaces = 10;
        }

        switch(i)
        {
            case 0:
                topHeader = grOrd + " Grade Number Sense";
                break;
            case 1:
                topHeader = grOrd + " Grade Calculator";
                break;
            case 2: 
                topHeader = grOrd + " Grade General Math";
                break;
            case 3:
                topHeader = grOrd + " Grade General Science";
                break;
        }

        var pdfColumns = [
            [
                {content: topHeader, colSpan: 5, styles: {halign: 'center', fillColor: [33, 103, 150]}}
            ],
            ["Rank", "First Name", "Last Name", "School", "Score"],
        ];
        
        if(grArr.length < lessPlaces)
        {
            lessPlaces = grArr.length;
        }

        for(var q = 0; q < lessPlaces; q++)
        {
            if(grArr[q][i+3] == null)
            {            
                lessPlaces = q;
                q = lessPlaces;
            }
        }

        var displArr = [];
        if(d !== 2 || i !== 3)
        {
            for(var j = 0; j < lessPlaces; j++)
            {
                displArr.push([(j+1).toString(), grArr[j][0], grArr[j][1], grArr[j][2], grArr[j][i+3]])
            }
        }
        else if(d == 2 && i == 3)
        {
            pdfColumns = [
                [
                    {content: topHeader, colSpan: 8, styles: {halign: 'center', fillColor: [33, 103, 150]}}
                ],
                ["Rank", "First Name", "Last Name", "School", "Score", "Biology", "Chemistry", "Physics"],
            ];
            for(var j = 0; j < lessPlaces; j++)
            {
                displArr.push([(j+1).toString(), grArr[j][0], grArr[j][1], grArr[j][2], grArr[j][i+3], grArr[j][i+4], grArr[j][i+5], grArr[j][i+6]])
            }
        }
        
        // console.log(displArr);
        if(i==0)
        {
            doc.autoTable({
                startY: 65,
                head: pdfColumns,
                body: displArr
            });
        }
        else
        {
            doc.autoTable({
                head: pdfColumns,
                body: displArr
            });
        }    
    }   
}

function hsSciGen(dArr)
{
    doc.addPage();
    doc.setFontType("bold");
    doc.text(40, 50, "High School Science");
    doc.setFontType("normal");

    for(var i=0; i<3; i++)
    {
        dArr.sort(scoreSort(i+7));

        var z = i+7;
        var highScore = parseFloat(dArr[0][z]);
        var numWin = 0;
        for (var j = 0; j < dArr.length; j++) {
            if (parseFloat(highScore) == parseFloat(dArr[j][z]))
            {
                numWin++;
            }
        }

        var topHeader;
        var lastColStr;    
        
        switch(i)
        {
            case 0:
                topHeader = "High School Biology";
                lastColStr = "Biology";
                break;
            case 1:
                topHeader = "High School Chemistry";
                lastColStr = "Chemistry";
                break;
            case 2: 
                topHeader = "High School Physics";
                lastColStr = "Physics";
                break;
        }

        var pdfColumns = [
            [
                {content: topHeader, colSpan: 6, styles: {halign: 'center', fillColor: [33, 103, 150]}}
            ],
            ["Rank", "First Name", "Last Name", "School", "Science Score", lastColStr + " Score"],
        ];
        
        var displArr = [];

        for(var j = 0; j < numWin; j++)
        {
            displArr.push(["1", dArr[j][0], dArr[j][1], dArr[j][2], dArr[j][6], dArr[j][i+7]])
        }
        
        // console.log(displArr);
        if(i==0)
        {
            doc.autoTable({
                startY: 65,
                head: pdfColumns,
                body: displArr
            });
        }
        else
        {
            doc.autoTable({
                head: pdfColumns,
                body: displArr
            });
        }    
    }   
}

function catSweepGen(dArr, d, ovArr) // categorical sweepstakes generator; dArr - division array; d = division: 0 for ES, 1 for MS, 2 for HS; ovArr - overall sweepstakes array
{
    var scoreStr = "Score";
    doc.addPage();
    doc.setFontType("bold");
    switch(d)
    {
        case 0:
            doc.text(40, 50,"Elementary Sweepstakes by Test");
            break;
        case 1:
            doc.text(40, 50,"Middle School Sweepstakes by Test");
            break;
        case 2:
            doc.text(40, 50,"High School Sweepstakes by Test");
            break;
    }    
    doc.setFontType("normal");

    // push all dArr into tempArr (temp/editable array, bc dArr should be kept OG)
    var tempArr = [];

    for(var i=0; i<dArr.length; i++)
    {
        tempArr.push(dArr[i]);
    }

    // change weird, negative, undefined values to 0
    for (var i = 0; i < tempArr.length; i++) {
        for (var j = 3; j < tempArr[i].length; j++) {
            if(parseInt(tempArr[i][j]) < 0 || !tempArr[i][j] || tempArr[i][j] == "n/a" || tempArr[i][j] == "x" || tempArr[i][j] == "na")
            {                
                tempArr[i][j] = "0";
            }
        }       
    }

    for(var i=0; i<4; i++)
    {
        // sort
        tempArr.sort(scoreSort(i+3));

        // group students by school
        var keyedArr = _.groupBy(tempArr, 2);

        // get school names (keys)
        var keys = Object.keys(keyedArr);

        // school scores array
        var schoolArr = [];

        // console.log(keyedArr);
        // console.log(keys);

        for (var j = 0; j < keys.length; j++) {
            if(keyedArr[keys[j]][0][2])
            {
                var x = 0;
                var y = "";
                var z = i+3;

                var k=0;
                while(k<keyedArr[keys[j]].length && k<4)
                {
                    if(keyedArr[keys[j]].length < 3)
                    {
                    	x = 0;
                    	y = y + keyedArr[keys[j]][k][0].charAt(0) + keyedArr[keys[j]][k][1].charAt(0) + ", ";
                    }
                    else if(keyedArr[keys[j]][k][z] && parseFloat(keyedArr[keys[j]][k][z]) !== NaN && keyedArr[keys[j]][k][0] && keyedArr[keys[j]][k][1])
                    {
                        x += parseFloat(keyedArr[keys[j]][k][z]);
                        // console.log(keyedArr[keys[j]][k][0]);
                        y = y + keyedArr[keys[j]][k][0].charAt(0) + keyedArr[keys[j]][k][1].charAt(0) + ", ";
                    }
                    k++;
                }

                if(y.indexOf(",") >= 0)
                {
                    y = y.substring(0, y.length - 2);
                }            

                /* switch(keyedArr[keys[j]].length) {
                    case 1:
                        x = parseFloat(keyedArr[keys[j]][0][z]);
                        y = keyedArr[keys[j]][0][0].charAt(0) + keyedArr[keys[j]][0][1].charAt(0);                
                        break;
                    case 2:
                        x = parseFloat(keyedArr[keys[j]][0][z]) + parseFloat(keyedArr[keys[j]][1][z]);
                        y = keyedArr[keys[j]][0][0].charAt(0) + keyedArr[keys[j]][0][1].charAt(0) + ", " + keyedArr[keys[j]][1][0].charAt(0) + keyedArr[keys[j]][1][1].charAt(0);
                        break;
                    case 3:
                        x = parseFloat(keyedArr[keys[j]][0][z]) + parseFloat(keyedArr[keys[j]][1][z]) + parseFloat(keyedArr[keys[j]][2][z]);
                        y = keyedArr[keys[j]][0][0].charAt(0) + keyedArr[keys[j]][0][1].charAt(0) + ", " + keyedArr[keys[j]][1][0].charAt(0) + keyedArr[keys[j]][1][1].charAt(0) + ", " + keyedArr[keys[j]][2][0].charAt(0) + keyedArr[keys[j]][2][1].charAt(0);
                        break;            
                }
                if(keyedArr[keys[j]].length >= 4 && parseFloat(keyedArr[keys[j]][0][z])>=0 && parseFloat(keyedArr[keys[j]][1][z])>=0 && parseFloat(keyedArr[keys[j]][2][z])>=0 && parseFloat(keyedArr[keys[j]][3][z])>=0)
                {
                    x = parseFloat(keyedArr[keys[j]][0][z]) + parseFloat(keyedArr[keys[j]][1][z]) + parseFloat(keyedArr[keys[j]][2][z]) + parseFloat(keyedArr[keys[j]][3][z]);
                    y = keyedArr[keys[j]][0][0].charAt(0) + keyedArr[keys[j]][0][1].charAt(0) + ", " + keyedArr[keys[j]][1][0].charAt(0) + keyedArr[keys[j]][1][1].charAt(0) + ", " + keyedArr[keys[j]][2][0].charAt(0) + keyedArr[keys[j]][2][1].charAt(0) + ", " + keyedArr[keys[j]][3][0].charAt(0) + keyedArr[keys[j]][3][1].charAt(0);
                }
                if(x == "")
                {
                    x = "0";
                }
                */
                schoolArr.push([keys[j],x,y]);
            }            
        }

        // console.log(schoolArr);

        for (var j=0; j<schoolArr.length; j++)
        {
            if(d == 0 || d == 1)
            {
                if(i == 2 || i == 3)
                {
                    schoolArr[j][1] = (schoolArr[j][1]*(8/5)).toFixed(2);
                    scoreStr = "Weighted Score";
                    // console.log("Passed through ES/MS GM/GS Multiplier.");
                }           
            }
            else if(d == 2)
            {
                switch(i)
                {
                    case 1:
                        schoolArr[j][1] = (schoolArr[j][1]*(8/7)).toFixed(2);
                        scoreStr = "Weighted Score";
                        // console.log("Passed through HS CA Multipler.");
                        break;
                    case 2:
                        schoolArr[j][1] = (schoolArr[j][1]*(10/9)).toFixed(2);
                        scoreStr = "Weighted Score";
                        // console.log("Passed through HS GM GS Multipler.")
                        break;
                    default:
                        break;
                }
            }
            ovArr.push(schoolArr[j]);
        }

        schoolArr.sort(scoreSort(1));

        var topHeader;        
        
        var lessPlaces;
        var divisionStr;

        switch(d)
        {
            case 0:
                lessPlaces = esSweep;
                divisionStr = "Elementary";
                break;
            case 1:
                lessPlaces = msSweep;
                divisionStr = "Middle School";
                break;
            case 2:
                lessPlaces = msSweep;
                divisionStr = "High School";
                break;
            default: 
                lessPlaces = 3;
        }

        switch(i)
        {
            case 0:
                topHeader = divisionStr + " Number Sense Sweepstakes";
                break;
            case 1:
                topHeader = divisionStr + " Calculator Sweepstakes";
                break;
            case 2: 
                topHeader = divisionStr + " General Math Sweepstakes";
                break;
            case 3:
                topHeader = divisionStr + " General Science Sweepstakes";
                break;
        }

        var pdfColumns = [
            [
                {content: topHeader, colSpan: 4, styles: {halign: 'center', fillColor: [33, 103, 150]}}
            ],
            ["Rank", "School", scoreStr, "Members"],
        ];
        
        if(schoolArr.length < lessPlaces)
        {
            lessPlaces = schoolArr.length;
        }

        for(var q = 0; q < lessPlaces; q++)
        {
            if(schoolArr[q][1] == null)
            {            
                lessPlaces = q;
                q = lessPlaces;
            }
        }

        var displArr = [];
        for(var j = 0; j < lessPlaces; j++)
        {
            displArr.push([(j+1).toString(), schoolArr[j][0], schoolArr[j][1], schoolArr[j][2]])
        }
        
        // console.log(displArr);
        if(i==0)
        {
            doc.autoTable({
                startY: 65,
                head: pdfColumns,
                body: displArr
            });
        }
        else
        {
            doc.autoTable({
                head: pdfColumns,
                body: displArr
            });
        }    
    }
}

function ovSweepGen(ovArr, d)
{
    doc.addPage();
    doc.setFontType("bold");
    switch(d)
    {
        case 0:
            doc.text(40, 50,"Elementary Sweepstakes");
            break;
        case 1:
            doc.text(40, 50,"Middle School Sweepstakes");
            break;
        case 2:
            doc.text(40, 50,"High School Sweepstakes");
            break;
    }    
    doc.setFontType("normal");

    // push all ovArr into tempArr (temp/editable array, bc ovArr should be kept OG)
    var tempArr = [];

    for(var i=0; i<ovArr.length; i++)
    {
        tempArr.push(ovArr[i]);
    }

    // group students by school
    var keyedArr = _.groupBy(tempArr, 0);

    // get school names (keys)
    var keys = Object.keys(keyedArr);

    // school scores array
    var schoolArr = [];

    // console.log(keyedArr);
    // console.log(keys);

    for (var j = 0; j < keys.length; j++) {
        var x = "";
        var y = "";
        var z = 1;

        var k=0;
        x = parseFloat(keyedArr[keys[j]][0][z]) + parseFloat(keyedArr[keys[j]][1][z]) + parseFloat(keyedArr[keys[j]][2][z]) + parseFloat(keyedArr[keys[j]][3][z]);
        x = x.toFixed(3);
        y = "Number Sense: " + keyedArr[keys[j]][0][2] + "\nCalculator: " + keyedArr[keys[j]][1][2] + "\nGeneral Math: " + keyedArr[keys[j]][2][2] + "\nGeneral Science: " + keyedArr[keys[j]][3][2];

        /*        
        if(keyedArr[keys[j]].length >= 4 && parseFloat(keyedArr[keys[j]][0][z]) && parseFloat(keyedArr[keys[j]][1][z]) && parseFloat(keyedArr[keys[j]][2][z]) && parseFloat(keyedArr[keys[j]][3][z]))
        {
            var x = parseFloat(keyedArr[keys[j]][0][z]) + parseFloat(keyedArr[keys[j]][1][z]) + parseFloat(keyedArr[keys[j]][2][z]) + parseFloat(keyedArr[keys[j]][3][z]);
            var x = x.toFixed(3);
            var y = "Number Sense: " + keyedArr[keys[j]][0][2] + "\nCalculator: " + keyedArr[keys[j]][1][2] + "\nGeneral Math: " + keyedArr[keys[j]][2][2] + "\nGeneral Science: " + keyedArr[keys[j]][3][2];
        }
        if(x == "")
        {
            x = 0;
        }
        */

        schoolArr.push([keys[j],x,y]);
    }

    // console.log(schoolArr);

    schoolArr.sort(scoreSort(1));

    var topHeader;        
    
    var lessPlaces;
    var divisionStr;

    switch(d)
    {
        case 0:
            lessPlaces = esSweep;
            divisionStr = "Elementary";
            break;
        case 1:
            lessPlaces = msSweep;
            divisionStr = "Middle School";
            break;
        case 2:
            lessPlaces = msSweep;
            divisionStr = "High School";
            break;
        default: 
            lessPlaces = 3;
    }

    topHeader = divisionStr + " Overall Sweepstakes";

    var pdfColumns = [
        [
            {content: topHeader, colSpan: 4, styles: {halign: 'center', fillColor: [33, 103, 150]}}
        ],
        ["Rank", "School", "Score", "Members"],
    ];
    
    if(schoolArr.length < lessPlaces)
    {
        lessPlaces = schoolArr.length;
    }

    for(var q = 0; q < lessPlaces; q++)
    {
        if(schoolArr[q][1] == null)
        {            
            lessPlaces = q;
            q = lessPlaces;
        }
    }

    var displArr = [];
    for(var j = 0; j < lessPlaces; j++)
    {
        displArr.push([(j+1).toString(), schoolArr[j][0], schoolArr[j][1], schoolArr[j][2]])
    }
    
    // console.log(displArr);

    doc.autoTable({
        startY: 65,
        head: pdfColumns,
        body: displArr,
        columnStyles: {
            3: {cellWidth: 100}
          }
    });
}

function changeMsg()
{
    document.getElementById("genMsg").innerHTML = "PDF Generating... Please wait.";

    // reset document
    var pageCount = doc.internal.getNumberOfPages();
    for(var j=pageCount; j>1; j--)
    {
        doc.deletePage(j);
    }

    esPlaces = 10;
    esSweep = 2;

    msPlaces = 10;
    msSweep = 2;

    hsPlaces = 6;
    hsSweep = 2;
}

function genDR()
{
    /* set up XMLHttpRequest */
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
        //loading the workbook
        var arraybuffer = oReq.response;
        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        for (var i = 0; i < workbook.length; i++) {
            for (var j = 0; j < workbook[i].length; j++) {
                workbook[i][j] = workbook[i][j].trim();
            }       
        }

        // elementary
        var thirdArr = [];
        var fourthArr = [];
        var fifthArr = [];
        var elemArr = [];
        var elemOvArr = [];

        // read 3rd grade
        var third = sheet2arr(workbook.Sheets["Third"]);
        for (var i = 1; i < third.length; i++)
        {
            thirdArr.push(third[i]);
            elemArr.push(third[i]);
        }
        indResults(thirdArr, 0, "3rd", "Third");

        // read 4th grade
        var fourth = sheet2arr(workbook.Sheets["Fourth"]);
        for (var i = 1; i < fourth.length; i++)
        {
            fourthArr.push(fourth[i]);
            elemArr.push(fourth[i]);
        }
        indResults(fourthArr, 0, "4th", "Fourth");

        // read 5th grade
        var fifth = sheet2arr(workbook.Sheets["Fifth"]);
        for (var i = 1; i < fifth.length; i++)
        {
            fifthArr.push(fifth[i]);
            elemArr.push(fifth[i]);
        }
        indResults(fifthArr, 0, "5th", "Fifth");

        catSweepGen(elemArr, 0, elemOvArr);
        ovSweepGen(elemOvArr, 0);

        

        // middle school
        var sixthArr = [];
        var seventhArr = [];
        var eighthArr = [];
        var msArr = [];
        var msOvArr = [];

        // read 6th grade
        var sixth = sheet2arr(workbook.Sheets["Sixth"]);
        for (var i = 1; i < sixth.length; i++)
        {
            sixthArr.push(sixth[i]);
            msArr.push(sixth[i]);
        }
        indResults(sixthArr, 1, "6th", "Sixth");

        // read 7th grade
        var seventh = sheet2arr(workbook.Sheets["Seventh"]);
        for (var i = 1; i < seventh.length; i++)
        {
            seventhArr.push(seventh[i]);
            msArr.push(seventh[i]);
        }
        indResults(seventhArr, 1, "7th", "Seventh");

        // read 8th grade
        var eighth = sheet2arr(workbook.Sheets["Eighth"]);
        for (var i = 1; i < eighth.length; i++)
        {
            eighthArr.push(eighth[i]);
            msArr.push(eighth[i]);
        }
        indResults(eighthArr, 1, "8th", "Eighth");

        catSweepGen(msArr, 1, msOvArr);
        ovSweepGen(msOvArr, 1);



        // high school
        var ninthArr = [];
        var tenthArr = [];
        var eleventhArr = [];
        var twelfthArr = [];
        var hsArr = [];
        var hsOvArr = [];

        // read 9th grade
        var ninth = sheet2arr(workbook.Sheets["Ninth"]);
        for (var i = 1; i < ninth.length; i++)
        {
            ninthArr.push(ninth[i]);
            hsArr.push(ninth[i]);
        }
        indResults(ninthArr, 2, "9th", "Ninth");

        // read 10th grade
        var tenth = sheet2arr(workbook.Sheets["Tenth"]);
        for (var i = 1; i < tenth.length; i++)
        {
            tenthArr.push(tenth[i]);
            hsArr.push(tenth[i]);
        }
        indResults(tenthArr, 2, "10th", "Tenth");

        // read 11th grade
        var eleventh = sheet2arr(workbook.Sheets["Eleventh"]);
        for (var i = 1; i < eleventh.length; i++)
        {
            eleventhArr.push(eleventh[i]);
            hsArr.push(eleventh[i]);
        }
        indResults(eleventhArr, 2, "11th", "Eleventh");

        // read 12th grade
        var twelfth = sheet2arr(workbook.Sheets["Twelfth"]);
        for (var i = 1; i < twelfth.length; i++)
        {
            twelfthArr.push(twelfth[i]);
            hsArr.push(twelfth[i]);
        }
        indResults(twelfthArr, 2, "12th", "Twelfth");

        hsSciGen(hsArr);

        catSweepGen(hsArr, 2, hsOvArr);
        ovSweepGen(hsOvArr, 2);

        

        // output results PDF
        doc.output('save', 'results.pdf');
        document.getElementById("genMsg").innerHTML = "Done!";
    };    

    oReq.send();
}

function genSR()
{
	var schoolName = prompt("School Name").trim();

	/* set up XMLHttpRequest */
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
        //loading the workbook
        var arraybuffer = oReq.response;
        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        for (var i = 0; i < workbook.length; i++) {
            for (var j = 0; j < workbook[i].length; j++) {
                workbook[i][j] = workbook[i][j].trim();
            }       
        }

        var bigArr = [];
        var sheetNames = ["Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"]

        for(var i=0; i<sheetNames.length;i++)
        {
        	var currentSheet = sheet2arr(workbook.Sheets[sheetNames[i]]);
        	for(var j=1; j<currentSheet.length; j++)
        	{
        		var pushArr = [];
        		pushArr.push((i+3).toString());
        		for(var k=0; k<currentSheet[j].length; k++)
        		{
        			pushArr.push(currentSheet[j][k]);     			
        		}
        		bigArr.push(pushArr);
        	}
        }        

        console.log(bigArr);

        var schoolArr = [];
        for(var i=0; i<bigArr.length; i++)
        {
        	if(bigArr[i][3] == schoolName)
        	{
        		var pushArr = [];
        		for(var j=0; j<bigArr[i].length; j++)
        		{
        			if(j != 3)
        			{
        				pushArr.push(bigArr[i][j]);
        			}        			
        		}
        		schoolArr.push(pushArr);
        	}
        }

        console.log(schoolArr);

        var topHeader = schoolName + " Results";

        var pdfColumns = [
                [
                    {content: topHeader, colSpan: 10, styles: {halign: 'center', fillColor: [33, 103, 150]}}
                ],
                ["Grade", "First Name", "Last Name", "NS", "CA", "GM", "GS", "Bio", "Chem", "Phys"],
            ];
        
        doc.addPage();
        doc.setFontType("normal");
        doc.setFontSize(11);
		doc.text(40, 50, "Bio, Chem, and Phys are only used for High School General Science.");
		doc.setFontType("normal");
		doc.setFontSize(16);

	    doc.autoTable({
	    	startY: 70,
	        head: pdfColumns,
	        body: schoolArr
	    });

        // output results PDF
        doc.output('save', 'results - ' + schoolName + '.pdf');
        document.getElementById("genMsg").innerHTML = "Done!";
    };    

    oReq.send();
}

function genCR()
{
    esPlaces = prompt("Elementary Places:", "10");
    esSweep = prompt("Elementary Sweepstakes:", "2");

    msPlaces = prompt("Middle School Places:", "10");
    msSweep = prompt("Middle School Sweepstakes:", "2");

    hsPlaces = prompt("High School Places:", "6");
    hsSweep = prompt("High School Sweepstakes:", "2");

    genDR();
}
