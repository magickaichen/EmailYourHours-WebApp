var message='';
function generateMsg() {
  var grandTotal = timeListApp.$data.grandTotal;
  timeRef.on('value', function(snapshot){
    message += "Hi {{to_name}} and {{cc_name}},%0D%0A%0D%0A";
    message += "This is my work hours this week, please help me log them into the system, thanks a lot!%0D%0A%0D%0A"
    snapshot.forEach(function(timeSnapShot){
      message += (timeSnapShot.val().day + '%20'.repeat(15 - timeSnapShot.val().day.length)
      + timeSnapShot.val().startTime + "%20--%20" + timeSnapShot.val().endTime + '%20'.repeat(15 - timeSnapShot.val().endTime.length)
      + timeSnapShot.val().totalHours + " Hours%0D%0A");
    });
    message += '-'.repeat(60) + '%0D%0A' + "Total Work Time: " + grandTotal + " Hours%0D%0A%0D%0A";
    message += "Best,%0D%0A{{Your Name}}";
  });
  document.getElementById("emailBody").innerHTML = document.getElementById("timeTable").innerHTML;
};

function sendEmail() {
  var link = "mailto:recipient@address.com"
             + "?cc=ccexample@address.com"
             + "&subject=" + escape("Work hours this week")
             + "&body=" + message;
    window.location.href = link;
  message = '';
  document.getElementById("emailBody").innerHTML = "Opening Email Client...";
};

function clearMsg() {
  message = '';
}
