var message='';
var selfName = '';
var recipient = '';
var cc = '';

function previewLog() {
  clearMsg();
  document.getElementById("emailBody").innerHTML = document.getElementById("timeTable").innerHTML;
}

function generateMsg() {
  selfName = (
    document.getElementById('self-name').value != '' ?
    document.getElementById('self-name').value : '{{ self-name }}'
  );
  recipient = {
    addr: (
      document.getElementById('recipient-addr').value != ''?
      document.getElementById('recipient-addr').value : "recipient@address.com"
    ),
    name: (
      document.getElementById('recipient-name').value != ''?
      document.getElementById('recipient-name').value : '{{ recipient-name }}'
    ),
  }
  cc = {
    addr: (
      document.getElementById('cc-addr').value != ''?
      document.getElementById('cc-addr').value : "cc@address.com"
    ),
    name: (
      document.getElementById('cc-name').value != ''?
      ' and ' + document.getElementById('cc-name').value : ''
    ),
  }
  console.log(cc.addr, cc.name);
  var grandTotal = timeListApp.$data.grandTotal;
  timeRef.on('value', function(snapshot){
    message += "Hi " + recipient.name + cc.name + ", %0D%0A%0D%0A";
    message += "This is my work hours this week, please help me log them into the system, thanks a lot!%0D%0A%0D%0A"
    snapshot.forEach(function(timeSnapShot){
      message += (timeSnapShot.val().day + '%20'.repeat(15 - timeSnapShot.val().day.length)
      + timeSnapShot.val().startTime + "%20--%20" + timeSnapShot.val().endTime + '%20'.repeat(15 - timeSnapShot.val().endTime.length)
      + timeSnapShot.val().totalHours + " Hours%0D%0A");
    });
    message += '-'.repeat(60) + '%0D%0A' + "Total Work Time: " + grandTotal + " Hours%0D%0A%0D%0A";
    message += "Best,%0D%0A" + selfName;
  });
};

function sendEmail() {
  generateMsg();
  var link = "mailto:" + recipient.addr
             + "?cc=" + cc.addr
             + "&subject=" + escape("Work hours this week")
             + "&body=" + message;
    window.location.href = link;
  document.getElementById("emailBody").innerHTML = "Opening Email Client...";
  clearMsg();
};

function clearMsg() {
  message='';
  selfName = '';
  recipient = '';
  cc = '';
}
