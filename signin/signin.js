var url = "https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vS53wvXTegGTTpO_KFOIcMiLc8yeaH_baF8n6w1sgNN7_jU2ICdyZum4quErESsIXtRXGEUKDaFhHAO/pub?output=xlsx"; // URL of Google Spreadsheet
// must be reset for every new user
var studentID;
var thisSheet;
var pullArray = [];
var indicies = [];
var selInd = 0;
var timeBool = false;
var inButtonBool = false;
var outButtonBool = false;
var itemNum = 0;

// window load. also acts as event listener.
$(window).on("load", function() {
	$('#reviewInfoPart, #signInPart, #pleaseWaitPart').hide();
	$("#studentIDFirst").focus();

	$('#studentIDPart').click(function () {
		// console.log("Clicked!");
		var studentIDField = (document.getElementById('studentIDFirst').value).trim();
		if(!studentIDField)
		{
			alert('You did not enter a valid student ID. Please try again.');
		}
		else if(parseInt(studentIDField) >= 100000 && parseInt(studentIDField) < 999999 && studentIDField)
		{
			studentID = studentIDField;

			openSpreadsheet(thisSheet);
			$('#enterStudentIDPart').fadeOut("slow");
      $('#pleaseWaitPart').delay(500).fadeIn();
		}
		else
		{
			resetAll();
      alert('You did not enter a valid student ID. Please try again.');
		}
	});

  $('.exitButton').click(function () {
    resetAll();
  });

  $('#reviewInfoPartButton').click(function(){
    timeBool = true;
    loadSignInfo();
    $('#reviewInfoPart').fadeOut();
    $('#signInPart').delay(500).fadeIn();
    startTime();
  });

  $('#signInButton').click(function(){
    if(pullArray[3] || inButtonBool)
    {
      alert("It seems you have already signed in for this shift.");
    }
    else
    {
      if(confirm("Sign in to this shift?"))
      {
        document.getElementById('studentID').value = studentID;
        $("#radio-signin").prop("checked", true);
        $('#submitButton').click();
        document.getElementById('itemNum').value = itemNum;
        document.getElementById("signInTime").innerHTML = "Your Sign-In Time: " + (new Date()).format("mm/dd/yyyy hh:MM TT");
        inButtonBool = true;
      }
    }
  });

  $('#signOutButton').click(function(){
    if(pullArray[4] || outButtonBool)
    {
      alert("It seems you have already signed out of this shift.");
    }
    else
    {
      if(confirm("Sign out of this shift?"))
      {
        document.getElementById('studentID').value = studentID;
        $("#radio-signout").prop("checked", true);
        document.getElementById('itemNum').value = itemNum;
        $('#submitButton').click();
        document.getElementById("signOutTime").innerHTML = "Your Sign-Out Time: " + (new Date()).format("mm/dd/yyyy hh:MM TT");
        outButtonBool = true;
      }
    }
  });
});

function doit_onkeypress(event){
    if (event.keyCode == 13 || event.which == 13)
    {
        if(document.getElementById("enterStudentIDPart").style.display != "none") {
          $('#studentIDPart').click();
        }
    }
}


function loadInformation(){
	pullArray = [];

  for(var i=0; i<thisSheet[selInd].length; i++)
	{
		if(thisSheet[selInd][i]) {
			pullArray.push(thisSheet[selInd][i]);
		}
		else
		{
			pullArray.push("");
		}
	}

	document.getElementById("sIDDBtext").innerHTML = "" + studentID + ": " + pullArray[1].trim() + " " + pullArray[2].trim();
	document.getElementById("jobNTime").innerHTML = "Your Job > " + pullArray[8].trim() + ": " + pullArray[6] + " - " + pullArray[7];

	switch(toTitleCase(pullArray[8].trim()))
	{
		// case "Proctor":
		  // break;
		default: 
			for (var i = 1; i < 6; i++) {
				var pName = "infoL" + i;
				document.getElementById(pName).innerHTML = pullArray[i+8];
			}			
			break;
	}	

}

function openSpreadsheet(){
	// open Google Spreadsheet
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

        thisSheet = sheet2arr(workbook.Sheets["Volunteers"]);
        for(var i=thisSheet.length - 1; i>-1; i--){
        	if(!thisSheet[i][0])
        	{
        		thisSheet.splice(i,1);
        	}
        }

        findIndices();

        // console.log(a);
	};

	oReq.send();
}

function findIndices(){
  for(var i=0; i<thisSheet.length; i++)
  {
    if(studentID == thisSheet[i][0])
    {
      indicies.push(i);
    }
  }

  if(indicies.length == 0)
  {
    resetAll();
    setTimeout(function(){
      alert("Your student ID is not in our volunteer sign-up list. Please contact an officer at the the administrative table in the library.");
    },2000);
  }

  else if(indicies.length == 1)
  {
    selInd = indicies[0];
    itemNum = 0;
    loadInformation();
    $('#pleaseWaitPart').delay(500).fadeOut();
    $('#reviewInfoPart').delay(1500).fadeIn();
  }

  else if(indicies.length > 1)
  {
    var msgs = "";
    var bool1 = false;
    for(i=0;i<indicies.length;i++)
    {
      msgs = msgs + ((i+1) + ") " + thisSheet[indicies[i]][8].trim() + ": " + thisSheet[indicies[i]][6].trim() + " - " + thisSheet[indicies[i]][7]) + "\n";
    }    
    do{
      var preSelInd = prompt("We found multiple slots under your student ID. Please type the number of the slot you wish to view (\"1\", \"2\", etc.).\n" + msgs);
      if(parseInt(preSelInd) == preSelInd && parseInt(preSelInd) <= indicies.length && parseInt(preSelInd) > 0)
      {
        selInd = indicies[parseInt(preSelInd)-1];
        itemNum = parseInt(preSelInd) - 1;
        bool1 = true;
      }
      else
      {
        alert("You did not enter a valid selection. Please try again.");
      }
    } while(bool1 == false);
    loadInformation();
    $('#pleaseWaitPart').delay(500).fadeOut();
    $('#reviewInfoPart').delay(1500).fadeIn();       
  }
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

//to title case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function resetAll(){
  $('#pleaseWaitPart, #reviewInfoPart, #signInPart').fadeOut("fast");
  $('#enterStudentIDPart').delay(500).fadeIn("slow");
  /*
  window.setTimeout(function ()
  {
      $('#enterStudentIDPart').attr("style", "display:inline-block");
  }, 1000);
  */
  studentID = "";
  thisSheet = [];
  indicies = [];
  pullArray = [];
  selInd = 0;
  timeBool = false;
  inButtonBool = false;
  outButtonBool = false;
  itemNum = 0;
  // $("#studentIDFirst").delay(2000).focus();
  console.log(document.getElementById("studentIDFirst").style);
  document.getElementById("studentIDFirst").value = "";
  window.setTimeout(function ()
  {
      document.getElementById('studentIDFirst').focus();
  }, 1000);
}

function loadSignInfo(){
  document.getElementById("sIDDBtext2").innerHTML = "" + studentID + ": " + pullArray[1].trim() + " " + pullArray[2].trim();
  document.getElementById("jobNTime2").innerHTML = "Your Job > " + pullArray[8].trim() + ": " + pullArray[6] + " - " + pullArray[7];
  document.getElementById("signInTime").innerHTML = "Your Sign-In Time: " + (pullArray[3] ? pullArray[3].trim() : "n/a");
  document.getElementById("signOutTime").innerHTML = "Your Sign-Out Time: " + (pullArray[4] ? pullArray[4].trim() : "n/a");
}

function startTime() {
  if(timeBool == true)
  {
    var d = new Date();
    var n = d.toLocaleTimeString();
    document.getElementById('currentTime').innerHTML = "Current Time: " + n;
    t = setTimeout(function() {
      startTime()
    }, 500);
  }  
}