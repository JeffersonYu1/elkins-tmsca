var url = "StudentImportScoringSheetSample.xlsx";
var openTime = 1547935200;
// add a zero back later

var userTime = Math.round((new Date()).getTime() / 1000);

$(function(){
    if(openTime > userTime)
    {
        document.getElementById('yeet').innerHTML = "The results will be posted here at 4PM on January 19! Be sure to attend the award ceremony to see the results early!";
        document.getElementById("stuffs").style.display = "none";
        console.log("openTime was greater than userTime.");
    }

    else if(userTime >= openTime)
    {
        document.getElementById("stuffs").style.display = "inline";
        document.getElementById("yeetus").style.display = "none";
        document.getElementById("adminL").style.display = "none";
        console.log("userTime was greater than openTime.");
    }
});

$(function(){
    $(".accordionR").removeClass("active");

    var acc = document.getElementsByClassName("accordionR");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
                panel.style.overflow = "hidden";
            }
            else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.overflow = "auto";
            }
        });
    }
});

$("#openA").click(function() {
    $(".accordionR").addClass("active");
    var acc = document.getElementsByClassName("accordionR");
    for (var i = 0; i < acc.length; i++) {
        var panel = acc[i].nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
});

$('#closeA').click(function() {
    $(".accordionR").removeClass("active");
    var acc = document.getElementsByClassName("accordionR");
    for (var i = 0; i < acc.length; i++) {
        var panel = acc[i].nextElementSibling;
        panel.style.maxHeight = null;
    }
});

$('#genPP').click(function() {
    var r = confirm('To generate a PDF, choose the "Microsoft Print to PDF" option as your printer when the next dialogue box pops up. Otherwise, print as you normally would.');
    if (r == true) {
        document.getElementById("openA").click();
        window.print();
    }
    else {
    } 
});

var objPeople = [
    {
        username: "elkinsadmin",
        password: "crosbington"
    }
];

$('#adminL').click(function() {
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
                    document.getElementById("yeetus").style.display = "none";
                    document.getElementById("adminL").style.display = "none";
                    loggy = 1;
                    return;
                }
                if(i == objPeople.length - 1 && usErname !== objPeople[i].username && pasSword !== objPeople[i].password)
                {
                    if(confirm("Incorrect username or password. Click ok to retry."))
                    {
                        document.getElementById("adminL").click();
                    }    
                }
            }
        }
    }

    
});

var bigSci = [];

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

//set up function for sorting
var scoreSort = function(index){
    return function(a, b){
        /*
        if(a[index] == undefined && b[index] !== undefined) {
            return 1;
        }
        else if(a[index] !== undefined && b[index] == undefined) {
            return -1;
        }
        else if(a[index] == undefined && b[index] == undefined) {
            return 0;
        }
        */
        if(!a[index] && b[index]) {
            return 1;
        }
        else if(a[index] && !b[index]) {
            return -1;
        }
        else if(!a[index] && !b[index]) {
            return 0;
        }
        return (parseFloat(a[index]) == parseFloat(b[index]) ? 0 : (parseFloat(a[index]) < parseFloat(b[index]) ? 1 : -1));
    };
};

//set up table gen function
var tableGen = function(a, b, c, d, e)
{
    if(c == "NS")
    {
        a.sort(scoreSort(3));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(4,3);
        }
    }
    else if(c == "CA")
    {
        a.sort(scoreSort(4));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(5,2);
            a[i].splice(3,1);
        } 
    }
    else if(c == "GM")
    {
        a.sort(scoreSort(5));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(6,1);
            a[i].splice(3,2);
        } 
    }
    else if(c == "GS")
    {
        a.sort(scoreSort(6));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(3,3);
        } 
    }

    else if(c == "HSNS")
    {
        a.sort(scoreSort(3));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(4,5);
        }
    }
    else if(c == "HSCA")
    {
        a.sort(scoreSort(4));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(5,4);
            a[i].splice(3,1);
        } 
    }
    else if(c == "HSGM")
    {
        a.sort(scoreSort(5));
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(6,3);
            a[i].splice(3,2);
        } 
    }
    else if(c == "HSGS")
    {
        for(var i=0; i < a.length; i++)
        {
            a[i].splice(3,3);
            var x = parseInt(a[i][3]) + parseInt(a[i][4]) + parseInt(a[i][5]);
            a[i] = [a[i][0], a[i][1], a[i][2], x, a[i][3], a[i][4], a[i][5]];
            bigSci.push(a[i]);
        } 
        a.sort(scoreSort(3));
    }
    
    var b = document.getElementById(b);
    
    for(var i = 1; i < (e+1); i++)
        {
            // create a new row
            var newRow = b.insertRow(b.length);
            for(var j = 0; j < (a[i].length+1); j++)
            {
                // create a new cell
                var cell = newRow.insertCell(j);
                
                if(j == 0) {
                    if(i <= d)
                    {
                        cell.innerHTML = i + "  &#127942;";
                    }
                    else if(i >= d && i <= e)
                    {
                        cell.innerHTML = i + "  &#127941;";
                    }
                }

                else{
                    // add value to the cell
                    cell.innerHTML = a[i-1][j-1];
                }                
            }
        }
};

//title case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

// set up hsi sci gen function
var hsSciGen = function(a, b, c, d, e, f, g) {
	if(c == "bio")
    {
        bigSci.sort(scoreSort(4));
        var z = 4;
    }
    else if(c == "chem")
    {
        bigSci.sort(scoreSort(5));
        var z = 5;
    }
    else if(c == "phys")
    {
        bigSci.sort(scoreSort(6));
        var z = 6;
    }

    var highScore = parseInt(bigSci[0][z]);

    var numWin = 0;
    for (var i = 0; i < bigSci.length; i++) {
    	if (parseInt(highScore) == parseInt(bigSci[i][z]))
    	{
    		numWin++;
    	}
    }
    
    var b = document.getElementById(b);
    
    for(var i = 0; i < numWin; i++)
        {
            // create a new row
            var newRow = b.insertRow(b.length);
            for(var j = 0; j < (bigSci[i].length+1); j++)
            {
                // create a new cell
                var cell = newRow.insertCell(j);
                
                if(j == 0) {
                    cell.innerHTML = "1 " + toTitleCase(c) + "  &#127942;";
                }

                else{
                    // add value to the cell
                    cell.innerHTML = bigSci[i][j-1];
                }                
            }
        }
};

// set up sweep gen function
var sweepGen = function(a, b, c, d, e, f, g, h, k, l) {
    if(e == "NS")
    {
        a.sort(scoreSort(3));
        var z = 3;
    }
    else if(e == "CA")
    {
        a.sort(scoreSort(4));
        var z = 4;
    }
    else if(e == "GM")
    {
        a.sort(scoreSort(5));
        var z = 5;
    }
    else if(e == "GS")
    {
        a.sort(scoreSort(6));
        var z = 6;
    }
    else if(e == "HSGS")
    {
        a.sort(scoreSort(6));
        for (var i = 0; i < g.length; i++) {
            a.push(g[i]);
        }
        for (var i = 0; i < h.length; i++) {
            a.push(h[i]);
        }
        for (var i = 0; i < k.length; i++) {
            a.push(k[i]);
        }
        for (var i = 0; i < l.length; i++) {
            a.push(l[i]);
        }
        var z = 6;
    }

    // change undefined values to 0
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[i].length; j++) {
            a[i][j] = a[i][j] || 0;
        }       
    }
    // group the scores by school
    var b = _.groupBy(a, 2);
    // initiate esNSs for sum of scores for each school
    // get the keys (school names)
    var keys = Object.keys(b);

    for (var i = 0; i < keys.length; i++) {
        var x = "";
        var y = "";
            switch(b[keys[i]].length) {
            case 1:
                var x = parseFloat(b[keys[i]][0][z]);
                var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0);                
                break;
            case 2:
                var x = parseFloat(b[keys[i]][0][z]) + parseFloat(b[keys[i]][1][z]);
                var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0) + ", " + b[keys[i]][1][0].charAt(0) + b[keys[i]][1][1].charAt(0);
                break;
            case 3:
                var x = parseFloat(b[keys[i]][0][z]) + parseFloat(b[keys[i]][1][z]) + parseFloat(b[keys[i]][2][z]);
                var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0) + ", " + b[keys[i]][1][0].charAt(0) + b[keys[i]][1][1].charAt(0) + ", " + b[keys[i]][2][0].charAt(0) + b[keys[i]][2][1].charAt(0);
                break;            
        }
        if(b[keys[i]].length >= 4 && parseFloat(b[keys[i]][0][z]) && parseFloat(b[keys[i]][1][z]) && parseFloat(b[keys[i]][2][z]) && parseFloat(b[keys[i]][3][z]))
        {
            var x = parseFloat(b[keys[i]][0][z]) + parseFloat(b[keys[i]][1][z]) + parseFloat(b[keys[i]][2][z]) + parseFloat(b[keys[i]][3][z]);
            var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0) + ", " + b[keys[i]][1][0].charAt(0) + b[keys[i]][1][1].charAt(0) + ", " + b[keys[i]][2][0].charAt(0) + b[keys[i]][2][1].charAt(0) + ", " + b[keys[i]][3][0].charAt(0) + b[keys[i]][3][1].charAt(0);
        }
        if(x == "")
        {
            x = 0;
        }        
        c.push([keys[i],x,y]);
    }

    for (var i = 0; i<c.length; i++)
    {
    	if(d == "esGMTable" || d == "msGMTable" || d == "esGSTable" || d == "msGSTable")
    	{
    		c[i][1] = (c[i][1]*(8/5)).toFixed(2);
    		console.log("Passed thru EM GMS multiplier.")
    	}
    	else if(d == "hsCATable")
    	{
    		c[i][1] = (c[i][1]*(8/7)).toFixed(2);
    		console.log("Passed thru HSCA multiplier.")
    	}
    	else if(d == "hsGMTable" || d == "hsGSTable")
    	{
    		c[i][1] = (c[i][1]*(10/9)).toFixed(2);
    		console.log("Passed thru HSGMGS multiplier.")
    	}
    }

    c.sort(scoreSort(1));
    var d = document.getElementById(d);
    
    for(var i = 1; i < (f+1); i++)
        {
            // create a new row
            var newRow = d.insertRow(d.length);
            for(var j = 0; j < (c[i].length+1); j++)
            {
                // create a new cell
                var k = ["Bio", "Chem", "Physics"];
                var cell = newRow.insertCell(j);
                
                if(j == 0) {
                    if(i <= f)
                    {
                        cell.innerHTML = i +  "  &#127942;";
                    }
                }

                else{
                    // add value to the cell
                    cell.innerHTML = c[i-1][j-1];
                }                
            }
        }
};

var oSweepGen = function(a, b, c, d, e, f, g, h, k, l) {
    for (var i = 0; i < g.length; i++) {
        a.push(g[i]);
    }
    for (var i = 0; i < h.length; i++) {
        a.push(h[i]);
    }
    for (var i = 0; i < k.length; i++) {
        a.push(k[i]);
    }
    for (var i = 0; i < l.length; i++) {
        a.push(l[i]);
    }
    // change undefined values to 0
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[i].length; j++) {
            a[i][j] = a[i][j] || 0
        }       
    }
    // group the scores by school
    var b = _.groupBy(a, 0);
    // initiate esNSs for sum of scores for each school
    // get the keys (school names)
    var keys = Object.keys(b);
    z = 1;

    for (var i = 0; i < keys.length; i++) {
        var x = "";
        var y = "";
        /*
            switch(b[keys[i]].length) {
            case 1:
                var x = parseFloat(b[keys[i]][0][z]);
                var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0);                
                break;
            case 2:
                var x = parseFloat(b[keys[i]][0][z]) + parseFloat(b[keys[i]][1][z]);
                var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0) + ", " + b[keys[i]][1][0].charAt(0) + b[keys[i]][1][1].charAt(0);
                break;
            case 3:
                var x = parseFloat(b[keys[i]][0][z]) + parseFloat(b[keys[i]][1][z]) + parseFloat(b[keys[i]][2][z]);
                var y = b[keys[i]][0][0].charAt(0) + b[keys[i]][0][1].charAt(0) + ", " + b[keys[i]][1][0].charAt(0) + b[keys[i]][1][1].charAt(0) + ", " + b[keys[i]][2][0].charAt(0) + b[keys[i]][2][1].charAt(0);
                break;            
        }
        */
        if(b[keys[i]].length >= 4 && parseFloat(b[keys[i]][0][z]) && parseFloat(b[keys[i]][1][z]) && parseFloat(b[keys[i]][2][z]) && parseFloat(b[keys[i]][3][z]))
        {
            var x = parseFloat(b[keys[i]][0][z]) + parseFloat(b[keys[i]][1][z]) + parseFloat(b[keys[i]][2][z]) + parseFloat(b[keys[i]][3][z]);
            var x = x.toFixed(3);
            var y = "Number Sense: " + b[keys[i]][0][2] + "<br>Calculator: " + b[keys[i]][1][2] + "<br>General Math: " + b[keys[i]][2][2] + "<br>General Science: " + b[keys[i]][3][2];
        }
        if(x == "")
        {
            x = 0;
        }        
        c.push([keys[i],x,y]);
    }

    c.sort(scoreSort(1));
    var d = document.getElementById(d);
    
    for(var i = 1; i < (f+1); i++)
        {
            // create a new row
            var newRow = d.insertRow(d.length);
            for(var j = 0; j < (c[i].length+1); j++)
            {
                // create a new cell
                var cell = newRow.insertCell(j);
                
                if(j == 0) {
                    if(i <= f)
                    {
                        cell.innerHTML = i + "  &#127942;";
                    }
                }

                else{
                    // add value to the cell
                    cell.innerHTML = c[i-1][j-1];
                }                
            }
        }
};


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

    // ELEMENTARY SCHOOL
    var esPlaces = 10;
    var esTro = 5;
    var esMed = 10;
    var esSweep = 3;

    // initiate SW arrays
    var esNS = [];
    var esNSg = [];
    var esNSs = [];
    var esCA = [];
    var esCAg = [];
    var esCAs = [];
    var esGM = [];
    var esGMg = [];
    var esGMs = [];
    var esGS = [];
    var esGSg = [];
    var esGSs = [];
    var esOS = [];
    var esOSg = [];
    var esOSs = [];

    // read 3rd grade
    var third = sheet2arr(workbook.Sheets["Third"]);
    var thirdNS = [];
    var thirdCA = [];
    var thirdGM = [];
    var thirdGS = [];
    for (var i = 1; i < third.length; i++)
    {
        thirdNS.push(third[i].slice());
        thirdCA.push(third[i].slice());
        thirdGM.push(third[i].slice());
        thirdGS.push(third[i].slice());
        esNS.push(third[i]);
        esCA.push(third[i]);
        esGM.push(third[i]);
        esGS.push(third[i]);
    }

    // read 4th grade
    var fourth = sheet2arr(workbook.Sheets["Fourth"]);
    var fourthNS = [];
    var fourthCA = [];
    var fourthGM = [];
    var fourthGS = [];
    for (var i = 1; i < fourth.length; i++)
    {
        fourthNS.push(fourth[i].slice());
        fourthCA.push(fourth[i].slice());
        fourthGM.push(fourth[i].slice());
        fourthGS.push(fourth[i].slice());
        esNS.push(fourth[i]);
        esCA.push(fourth[i]);
        esGM.push(fourth[i]);
        esGS.push(fourth[i]);
    }

    // read 5th grade
    var fifth = sheet2arr(workbook.Sheets["Fifth"]);
    var fifthNS = [];
    var fifthCA = [];
    var fifthGM = [];
    var fifthGS = [];
    for (var i = 1; i < fifth.length; i++)
    {
        fifthNS.push(fifth[i].slice());
        fifthCA.push(fifth[i].slice());
        fifthGM.push(fifth[i].slice());
        fifthGS.push(fifth[i].slice());
        esNS.push(fifth[i]);
        esCA.push(fifth[i]);
        esGM.push(fifth[i]);
        esGS.push(fifth[i]);
    }

    sweepGen(esNS, esNSg, esNSs, "esNSTable", "NS", esSweep);
    sweepGen(esCA, esCAg, esCAs, "esCATable", "CA", esSweep);
    sweepGen(esGM, esGMg, esGMs, "esGMTable", "GM", esSweep);
    sweepGen(esGS, esGSg, esGSs, "esGSTable", "GS", esSweep);

    oSweepGen(esOS, esOSg, esOSs, "esSWTable", "OS", esSweep, esNSs, esCAs, esGMs, esGSs);

    tableGen(thirdNS, "thirdNSTable", "NS", esTro, esMed);
    tableGen(thirdCA, "thirdCATable", "CA", esTro, esMed); 
    tableGen(thirdGM, "thirdGMTable", "GM", esTro, esMed);
    tableGen(thirdGS, "thirdGSTable", "GS", esTro, esMed);

    tableGen(fourthNS, "fourthNSTable", "NS", esTro, esMed);
    tableGen(fourthCA, "fourthCATable", "CA", esTro, esMed); 
    tableGen(fourthGM, "fourthGMTable", "GM", esTro, esMed);
    tableGen(fourthGS, "fourthGSTable", "GS", esTro, esMed);

    tableGen(fifthNS, "fifthNSTable", "NS", esTro, esMed);
    tableGen(fifthCA, "fifthCATable", "CA", esTro, esMed); 
    tableGen(fifthGM, "fifthGMTable", "GM", esTro, esMed);
    tableGen(fifthGS, "fifthGSTable", "GS", esTro, esMed);


    // MIDDLE SCHOOL
    var msPlaces = 10;
    var msTro = 5;
    var msMed = 10;
    var msSweep = 3;

    // initiate SW arrays
    var msNS = [];
    var msNSg = [];
    var msNSs = [];
    var msCA = [];
    var msCAg = [];
    var msCAs = [];
    var msGM = [];
    var msGMg = [];
    var msGMs = [];
    var msGS = [];
    var msGSg = [];
    var msGSs = [];
    var msOS = [];
    var msOSg = [];
    var msOSs = [];

    // read 6th grade
    var sixth = sheet2arr(workbook.Sheets["Sixth"]);
    var sixthNS = [];
    var sixthCA = [];
    var sixthGM = [];
    var sixthGS = [];
    for (var i = 1; i < sixth.length; i++)
    {
        sixthNS.push(sixth[i].slice());
        sixthCA.push(sixth[i].slice());
        sixthGM.push(sixth[i].slice());
        sixthGS.push(sixth[i].slice());
        msNS.push(sixth[i]);
        msCA.push(sixth[i]);
        msGM.push(sixth[i]);
        msGS.push(sixth[i]);
    }

    // read 7th grade
    var seventh = sheet2arr(workbook.Sheets["Seventh"]);
    var seventhNS = [];
    var seventhCA = [];
    var seventhGM = [];
    var seventhGS = [];
    for (var i = 1; i < seventh.length; i++)
    {
        seventhNS.push(seventh[i].slice());
        seventhCA.push(seventh[i].slice());
        seventhGM.push(seventh[i].slice());
        seventhGS.push(seventh[i].slice());
        msNS.push(seventh[i]);
        msCA.push(seventh[i]);
        msGM.push(seventh[i]);
        msGS.push(seventh[i]);
    }

    // read 8th grade
    var eighth = sheet2arr(workbook.Sheets["Eighth"]);
    var eighthNS = [];
    var eighthCA = [];
    var eighthGM = [];
    var eighthGS = [];
    for (var i = 1; i < eighth.length; i++)
    {
        eighthNS.push(eighth[i].slice());
        eighthCA.push(eighth[i].slice());
        eighthGM.push(eighth[i].slice());
        eighthGS.push(eighth[i].slice());
        msNS.push(eighth[i]);
        msCA.push(eighth[i]);
        msGM.push(eighth[i]);
        msGS.push(eighth[i]);
    }

    sweepGen(msNS, msNSg, msNSs, "msNSTable", "NS", msSweep);
    sweepGen(msCA, msCAg, msCAs, "msCATable", "CA", msSweep);
    sweepGen(msGM, msGMg, msGMs, "msGMTable", "GM", msSweep);
    sweepGen(msGS, msGSg, msGSs, "msGSTable", "GS", msSweep);

    oSweepGen(msOS, msOSg, msOSs, "msSWTable", "OS", msSweep, msNSs, msCAs, msGMs, msGSs);

    tableGen(sixthNS, "sixthNSTable", "NS", msTro, msMed);
    tableGen(sixthCA, "sixthCATable", "CA", msTro, msMed); 
    tableGen(sixthGM, "sixthGMTable", "GM", msTro, msMed);
    tableGen(sixthGS, "sixthGSTable", "GS", msTro, msMed);

    tableGen(seventhNS, "seventhNSTable", "NS", msTro, msMed);
    tableGen(seventhCA, "seventhCATable", "CA", msTro, msMed); 
    tableGen(seventhGM, "seventhGMTable", "GM", msTro, msMed);
    tableGen(seventhGS, "seventhGSTable", "GS", msTro, msMed);

    tableGen(eighthNS, "eighthNSTable", "NS", msTro, msMed);
    tableGen(eighthCA, "eighthCATable", "CA", msTro, msMed); 
    tableGen(eighthGM, "eighthGMTable", "GM", msTro, msMed);
    tableGen(eighthGS, "eighthGSTable", "GS", msTro, msMed);


    // HIGH SCHOOL
    var hsPlaces = 6;
    var hsTro = 3;
    var hsMed = 6;
    var hsSweep = 3;

    // initiate SW arrays
    var hsNS = [];
    var hsNSg = [];
    var hsNSs = [];
    var hsCA = [];
    var hsCAg = [];
    var hsCAs = [];
    var hsGM = [];
    var hsGMg = [];
    var hsGMs = [];
    var hsGS = [];
    var hsGSg = [];
    var hsGSs = [];
    var hsOS = [];
    var hsOSg = [];
    var hsOSs = [];
    var hsGSA = [];
    var bio = [];
    var chem = [];
    var phys = [];

    // read 9th grade
    var ninth = sheet2arr(workbook.Sheets["Ninth"]);
    var ninthNS = [];
    var ninthCA = [];
    var ninthGM = [];
    var ninthGS = [];
    for (var i = 1; i < ninth.length; i++)
    {
        ninthNS.push(ninth[i].slice());
        ninthCA.push(ninth[i].slice());
        ninthGM.push(ninth[i].slice());
        ninthGS.push(ninth[i].slice());
        hsNS.push(ninth[i]);
        hsCA.push(ninth[i]);
        hsGM.push(ninth[i]);
        hsGS.push(ninth[i]);
    }

    // read 10th grade
    var tenth = sheet2arr(workbook.Sheets["Tenth"]);
    var tenthNS = [];
    var tenthCA = [];
    var tenthGM = [];
    var tenthGS = [];
    for (var i = 1; i < tenth.length; i++)
    {
        tenthNS.push(tenth[i].slice());
        tenthCA.push(tenth[i].slice());
        tenthGM.push(tenth[i].slice());
        tenthGS.push(tenth[i].slice());
        hsNS.push(tenth[i]);
        hsCA.push(tenth[i]);
        hsGM.push(tenth[i]);
        hsGS.push(tenth[i]);
    }

    // read 11th grade
    var eleventh = sheet2arr(workbook.Sheets["Eleventh"]);
    var eleventhNS = [];
    var eleventhCA = [];
    var eleventhGM = [];
    var eleventhGS = [];
    for (var i = 1; i < eleventh.length; i++)
    {
        eleventhNS.push(eleventh[i].slice());
        eleventhCA.push(eleventh[i].slice());
        eleventhGM.push(eleventh[i].slice());
        eleventhGS.push(eleventh[i].slice());
        hsNS.push(eleventh[i]);
        hsCA.push(eleventh[i]);
        hsGM.push(eleventh[i]);
        hsGS.push(eleventh[i]);
    }

    // read 12th grade
    var twelfth = sheet2arr(workbook.Sheets["Twelfth"]);
    var twelfthNS = [];
    var twelfthCA = [];
    var twelfthGM = [];
    var twelfthGS = [];
    for (var i = 1; i < twelfth.length; i++)
    {
        twelfthNS.push(twelfth[i].slice());
        twelfthCA.push(twelfth[i].slice());
        twelfthGM.push(twelfth[i].slice());
        twelfthGS.push(twelfth[i].slice());
        hsNS.push(twelfth[i]);
        hsCA.push(twelfth[i]);
        hsGM.push(twelfth[i]);
    }

    tableGen(ninthNS, "ninthNSTable", "HSNS", hsTro, hsMed);
    tableGen(ninthCA, "ninthCATable", "HSCA", hsTro, hsMed); 
    tableGen(ninthGM, "ninthGMTable", "HSGM", hsTro, hsMed);
    tableGen(ninthGS, "ninthGSTable", "HSGS", hsTro, hsMed);

    tableGen(tenthNS, "tenthNSTable", "HSNS", hsTro, hsMed);
    tableGen(tenthCA, "tenthCATable", "HSCA", hsTro, hsMed); 
    tableGen(tenthGM, "tenthGMTable", "HSGM", hsTro, hsMed);
    tableGen(tenthGS, "tenthGSTable", "HSGS", hsTro, hsMed);

    tableGen(eleventhNS, "eleventhNSTable", "HSNS", hsTro, hsMed);
    tableGen(eleventhCA, "eleventhCATable", "HSCA", hsTro, hsMed); 
    tableGen(eleventhGM, "eleventhGMTable", "HSGM", hsTro, hsMed);
    tableGen(eleventhGS, "eleventhGSTable", "HSGS", hsTro, hsMed);

    tableGen(twelfthNS, "twelfthNSTable", "HSNS", hsTro, hsMed);
    tableGen(twelfthCA, "twelfthCATable", "HSCA", hsTro, hsMed); 
    tableGen(twelfthGM, "twelfthGMTable", "HSGM", hsTro, hsMed);
    tableGen(twelfthGS, "twelfthGSTable", "HSGS", hsTro, hsMed);

    sweepGen(hsNS, hsNSg, hsNSs, "hsNSTable", "NS", hsSweep);
    sweepGen(hsCA, hsCAg, hsCAs, "hsCATable", "CA", hsSweep);
    sweepGen(hsGM, hsGMg, hsGMs, "hsGMTable", "GM", hsSweep);
    sweepGen(hsGS, hsGSg, hsGSs, "hsGSTable", "GS", hsSweep);

    hsSciGen(hsGSA, "hsbio", "bio", bio, ninthGS, tenthGS, eleventhGS, twelfthGS);
    hsSciGen(hsGSA, "hschem", "chem", chem, ninthGS, tenthGS, eleventhGS, twelfthGS);
    hsSciGen(hsGSA, "hsphys", "phys", phys, ninthGS, tenthGS, eleventhGS, twelfthGS);

    oSweepGen(hsOS, hsOSg, hsOSs, "hsSWTable", "OS", hsSweep, hsNSs, hsCAs, hsGMs, hsGSs);

};    

oReq.send();