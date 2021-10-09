// start the Row with #1
var rowNum = 1;

// start cost with 0
var cost = 0;
var checks = 0;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

$(document).on('change', function() {
    $('.nsCheck, .caCheck, .gmCheck, .gsCheck').click(
        function checkFunction() {
            var checks = 0;
          
            for (var i = 0; i < rowNum; i++) {
              if ($(document.getElementsByClassName('nsCheck')[i]).is(':checked')) {
                checks = checks + 1;
              }

              if ($(document.getElementsByClassName('caCheck')[i]).is(':checked')) {
                checks = checks + 1;
              }

              if ($(document.getElementsByClassName('gmCheck')[i]).is(':checked')) {
                checks = checks + 1;
              }

              if ($(document.getElementsByClassName('gsCheck')[i]).is(':checked')) {
                checks = checks + 1;
              }
            }

            cost = (checks*5);
            cost = cost.toFixed(2);
            cost = cost.toString();
            cost = "$" + cost;

            console.log(checks);
            console.log(cost);

            document.getElementById('totalCost').innerHTML = cost;
        });
}); 
    

$(document).ready(function() {
  (document.getElementsByClassName('nsCheck')[0]).click();
  (document.getElementsByClassName('nsCheck')[0]).click();

	 // appending to the table
    $('#addRow').click(function() {
    	rowNum = rowNum + 1;
    	$('#registrationTable tbody').append('<tr> <td> <p class="numLabel">' + rowNum + '</p></td><td><input class="rTableFname wsite-form-input wsite-input" type="text"></td><td><input class="rTableLname wsite-form-input wsite-input" type="text"></td><td><select class="rGrade form-select" id="testing"><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></td><td><input class="nsCheck form-radio-container" type="checkbox" value="x"></td><td><input class="caCheck form-radio-container" type="checkbox" value="x"></td><td><input class="gmCheck form-radio-container" type="checkbox" value="x"></td><td><input class="gsCheck form-radio-container" type="checkbox" value="x"></td></tr>');
      (document.getElementsByClassName('nsCheck')[0]).click();
      (document.getElementsByClassName('nsCheck')[0]).click();
    });

    // deleting last row
    $('#deleteRow').click(function() {
    	if(rowNum >= 2){
    		rowNum = rowNum - 1;
    		$('#registrationTable tr:last').remove();
    	}
    	else
    	{
    		alert("You cannot delete the first row.");
    	}
        var checks = 0;
            
        for (var i = 0; i < rowNum; i++) {
          if ($(document.getElementsByClassName('nsCheck')[i]).is(':checked')) {
            checks = checks + 1;
          }

          if ($(document.getElementsByClassName('caCheck')[i]).is(':checked')) {
            checks = checks + 1;
          }

          if ($(document.getElementsByClassName('gmCheck')[i]).is(':checked')) {
            checks = checks + 1;
          }

          if ($(document.getElementsByClassName('gsCheck')[i]).is(':checked')) {
            checks = checks + 1;
          }
        }

        cost = (checks*5);
        cost = cost.toFixed(2);
        cost = cost.toString();
        cost = "$" + cost;

        console.log(checks);
        console.log(cost);

        document.getElementById('totalCost').innerHTML = cost;
    });

   
   //generate table in plugin
   $('#generation').click(function() {

      // query for registration person's first and last name
      var rFname = document.getElementById('rFname').value;
      var rLname = document.getElementById('rLname').value;
      rFname = rFname.trim();
      rFname = toTitleCase(rFname);
      rLname = rLname.trim();
      rLname = toTitleCase(rLname);
      console.log(rFname + " " + rLname);

      // query for school name and category
      var schoolName = document.getElementById('schoolRoot').value;
      var schoolCat = document.getElementById('schoolCat').value;
      var schoolFull = schoolName.trim() + " " + schoolCat;
      schoolFull = toTitleCase(schoolFull);
      console.log(schoolFull);

      //query for school Initials
      var schoolIni = document.getElementById('schoolIni').value;
      schoolIni = schoolIni.toUpperCase();
      schoolIni = schoolIni.trim();
      schoolIni = schoolIni.replace(/\s/g, '')
      console.log(schoolIni);

      // query for registration type
      if(document.getElementById('regSchool').checked) {
        var regType = "School";
      }
      else if(document.getElementById('regInd').checked) {
        var regType = "Individual";
      }
      console.log(regType);

   		// query for the first names
      var Fnames = [];
      for (i=0; i<rowNum; i++)
      {
        Fnames.push(toTitleCase(document.getElementsByClassName('rTableFname')[i].value));
      }
      console.log(Fnames);

      //query for the last names
      var Lnames = [];
      for (i=0; i<rowNum; i++)
      {
        Lnames.push(toTitleCase(document.getElementsByClassName('rTableLname')[i].value));
      }
      console.log(Lnames);

      //query for the grade
      var grades = [];
      $(".rGrade").each(function () {
          grades.push($(this).val());
      })
      console.log(grades);
      
      // number sense
      var nsArray = [];
      for (i=0; i<rowNum; i++)
      {
        if ($(document.getElementsByClassName('nsCheck')[i]).is(':checked')) {
          nsArray.push("x");
        }
        else
        {
          nsArray.push(" ");
        }
      }
      console.log(nsArray);

      // calc
      var caArray = [];
      for (i=0; i<rowNum; i++)
      {
        if ($(document.getElementsByClassName('caCheck')[i]).is(':checked')) {
          caArray.push("x");
        }
        else
        {
          caArray.push(" ");
        }
      }
      console.log(caArray);

      // general math
      var gmArray = [];
      for (i=0; i<rowNum; i++)
      {
        if ($(document.getElementsByClassName('gmCheck')[i]).is(':checked')) {
          gmArray.push("x");
        }
        else
        {
          gmArray.push(" ");
        }
      }
      console.log(gmArray);

      // general science
      var gsArray = [];
      for (i=0; i<rowNum; i++)
      {
        if ($(document.getElementsByClassName('gsCheck')[i]).is(':checked')) {
          gsArray.push("x");
        }
        else
        {
          gsArray.push(" ");
        }
      }
      console.log(gsArray);

      // generate the PDF!
      var columns = ["First Name", "Last Name", "School", "Grade", "NS", "CA", "GM", "GS"];
      var rows = [];
      for(i=0; i<rowNum; i++)
      {
        rows.push([Fnames[i], Lnames[i], toTitleCase(schoolName.trim()), grades[i], nsArray[i], caArray[i], gmArray[i], gsArray[i]]);
      }
      rows.push(["","","","","","","",""]);
      rows.push(["","","","","","","Total:",cost]);

      console.log(rows);

      // Only pt supported (not mm or in)
      var doc = new jsPDF('p', 'pt');
      doc.setFontType("bold");
      doc.text(40, 40, "Elkins TMSCA 18-19 Registration");

      doc.setFontType("normal");
      doc.text(40, 80, schoolFull);
      doc.text(40, 100, "Registered by " + rFname + " " + rLname);
      doc.text(40, 120, "Registration Type: " + regType);      
      doc.addPage();
      doc.autoTable(columns, rows);
      doc.save(schoolFull.replace(/\s/g, '') + " - " + regType + " Registration" + '.pdf');


      //excel worksheet stuffs
      var wb = XLSX.utils.book_new();
      var ws_name = schoolFull;
      /* make worksheet */
      rows.splice(0,0,columns);
      var ws_data = rows;
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      /* Add the worksheet to the workbook */
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      //saves excel
      XLSX.writeFile(wb, schoolFull.replace(/\s/g, '') + " - " + regType + " Registration" + '.xlsx');
   });
});