// Initialize Firebase
var config = {
  apiKey: "AIzaSyBl8Q9h72mpFpXSquNgq9jZeazJCHymIAM",
  authDomain: "timelogdb.firebaseapp.com",
  databaseURL: "https://timelogdb.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "936502477061"
}
firebase.initializeApp(config)

var timeRef = firebase.database().ref('timeSlots')

var timeListApp = new Vue({
  el: '#timeListApp',
  data: {
    time: {
      day: '',
      startTime: '',
      endTime: '',
      totalHours: '',
    },
    weekdays:[
      { text: 'Monday' },
      { text: 'Tuesday' },
      { text: 'Wednesday' },
      { text: 'Thursday' },
      { text: 'Friday' },
      { text: 'Saturday' },
      { text: 'Sunday' },
    ],
  },

  firebase: {
    timeSlots: timeRef,
  },

  computed:{
    // Check the validation of attributes in each time entry
    validation: function() {
      return {
        startTime: !!this.time.startTime.trim(),
        endTime: !!this.time.endTime.trim(),
        day: !!this.time.day,
        validTime: (this.calcTimeDiff() > 0),
        validDay: !(this.checkDuplicate(this.time.day)),
      }
    },
    // Iterate though all checkpoints and returns a boolean (valid or invalid)
    isValid: function() {
      var validation = this.validation;
      return Object.keys(validation).every(
        function(key) {
          return validation[key]
        }
      );
    },
  },

  methods: {
    // Append time entry to array
    addTimeSlot: function() {
      console.log(this.timeSlots.length);
      if (this.isValid) {
        this.calcTimeDiff();
        timeRef.push(this.time);
      }
    },
    // Calculate total work time
    calcTimeDiff: function() {
      var startTimeStamp = this.time.startTime.split(':');
      var endTimeStamp = this.time.endTime.split(':')
      var startTimeInMins = parseInt(startTimeStamp[1]) + startTimeStamp[0] * 60;
      var endTimeinMins = parseInt(endTimeStamp[1]) + endTimeStamp[0] * 60;
      var totalHours = +((endTimeinMins - startTimeInMins) / 60).toFixed(1);
      this.time.totalHours = totalHours;

      return (totalHours);
    },
    // Search through timeSlots to see if the day already has an entry
    checkDuplicate: function(day) {
      for (var i = 0; i < this.timeSlots.length; i++) {
        if (day === this.timeSlots[i].day) {
          return true;
        }
      }
      return false;
    },
    // Delete time entry from database
    deleteTimeSlot: function(timeSlot) {
      timeRef.child(timeSlot['.key']).remove();
    },
  },
})