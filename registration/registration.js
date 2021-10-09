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

function rootGen(str) {
  str = str.toLowerCase();
  var detectionArray = ["high", "middle", "elementary", "junior", "senior", "school", "academy", "intermediate", "jr.", " jr "];
  for(i=0; i<detectionArray.length; i++)
  {
      str = str.replace(detectionArray[i], '');
  }
  while(str.includes('  ') == true)
  {
    str = str.replace('  ', ' ');
  }  
  return toTitleCase(str.trim());
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
      // alert user the instructions
      alert("A PDF file and Excel file will download to your computer after you click 'OK.' Please review the two documents to verify that the information is correct, then upload them to the corresponding places in the 'Part 2' section of registration.");

      // query for registration person's first and last name
      var rFname = document.getElementById('rFname').value;
      var rLname = document.getElementById('rLname').value;
      rFname = rFname.trim();
      rFname = toTitleCase(rFname);
      rLname = rLname.trim();
      rLname = toTitleCase(rLname);
      console.log(rFname + " " + rLname);

      // query for email and phone
      var rEmail = document.getElementById('rEmail').value;
      var rPhone = document.getElementById('rPhone').value;
      console.log(rEmail);
      console.log(rPhone);

      // query for school name
      var schoolName = document.getElementById('schoolName').value;
      var schoolFull = schoolName.trim();
      while(schoolFull.includes('  ') == true)
      {
        schoolFull = schoolFull.replace('  ', ' ');
      }  
      schoolFull = toTitleCase(schoolFull);
      console.log(schoolFull);

      //query for school Initials
      var schoolIni = document.getElementById('schoolIni').value;
      schoolIni = schoolIni.toUpperCase();
      schoolIni = schoolIni.trim();
      schoolIni = schoolIni.replace(/\s/g, '')
      console.log(schoolIni);

      // smart detection for school root
      var schoolRoot = rootGen(schoolFull);

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
      var PDFcolumns = ["First Name", "Last Name", "School", "Grade", "NS", "CA", "GM", "GS"];
      var PDFrows = [];
      for(i=0; i<rowNum; i++)
      {
        PDFrows.push([Fnames[i], Lnames[i], toTitleCase(schoolRoot.trim()), grades[i], nsArray[i], caArray[i], gmArray[i], gsArray[i]]);
      }
      PDFrows.push(["","","","","","","",""]);
      PDFrows.push(["","","","","","","Total:",cost]);
      console.log(PDFrows);

      // generate the XLSX!
      var XLcolumns = ["Grade", "First Name", "Last Name", "School", "NS", "CA", "GM", "GS"];
      var XLrows = [];
      for(i=0; i<rowNum; i++)
      {
        XLrows.push([grades[i], Fnames[i], Lnames[i], toTitleCase(schoolRoot.trim()), nsArray[i], caArray[i], gmArray[i], gsArray[i]]);
      }
      XLrows.push(["","","","","","","",""]);
      XLrows.push(["","","","","","","Total:",cost]);

      //excel worksheet stuffs
      var wb = XLSX.utils.book_new();
      var ws_name = schoolIni;
      /* make worksheet */
      XLrows.splice(0,0,XLcolumns);
      var ws_data = XLrows;
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      /* Add the worksheet to the workbook */
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      //saves excel
      XLSX.writeFile(wb, schoolRoot.replace(/\s/g, '') + " - " + regType + '.xlsx');

      // Only pt supported (not mm or in)
      var doc = new jsPDF('p', 'pt');
      doc.setFontType("bold");
      doc.text(40, 40, "Elkins TMSCA 19-20 Registration");

      doc.setFontType("normal");
      doc.text(40, 80, schoolFull);
      doc.text(40, 100, "Registration Type: " + regType);
      doc.text(40, 120, "Total Amount Due: " + cost);
      doc.setFontSize(8);
      var agreement = doc.splitTextToSize("By registering, you agree to paying the full amount listed above. Any substitutions or changes to registration will need to be done at Check-In on the day of the tournament. Checks will be accepted, but not personal checks, as per FBISD policy. School and/or district checks made out to Elkins Activity Fund will be accepted for payment. Cash payment will also be accepted. Please bring your payment to Check-In on the day of the contest. If your school is unable to provide a check or cash at registration, a printed copy of a check request from your school's bookkeeper will also be acceptable. If you have any questions about payment, or would like to request an alternate payment method, please head to the contact page on our website for more information.", 500);
      doc.text(40, 140, agreement);
      doc.setFontSize(16);
      doc.text(40, 210, "Registered by " + rFname + " " + rLname);
      doc.setFontSize(12);
      doc.text(40, 225, "Email: " + rEmail);
      doc.text(40, 240, "Phone Number: " + rPhone);
          
      doc.addPage();
      doc.autoTable(PDFcolumns, PDFrows);
      doc.output('save', schoolRoot.replace(/\s/g, '') + " - " + regType + '.pdf');
      // doc.output('dataurlnewwindow');
      // doc.save(schoolRoot.replace(/\s/g, '') + " - " + regType + '.pdf');      
   });
});