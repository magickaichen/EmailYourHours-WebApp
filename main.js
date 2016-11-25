var timeListApp = new Vue({
  el: '#timeListApp',
  data: {
    timeSlots: [],
    day: '',
    startTime: '',
    endTime: '',
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

  computed:{
    // Check the validation of attributes in each time entry
    validation: function() {
      return {
        startTime: !!this.startTime.trim(),
        endTime: !!this.endTime.trim(),
        day: !!this.day,
        validTime: (this.calcTimeDiff() > 0),
        validDay: !(this.checkDuplicate(this.day)),
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
    addTimeSlot: function() {
      var time = {
        day: this.day,
        start: this.startTime,
        end: this.endTime,
      };
      if (this.isValid) {
        this.timeSlots.push(time);
      }
      this.calcTimeDiff();
    },
    calcTimeDiff: function() {
      var startTimeStamp = this.startTime.split(':');
      var endTimeStamp = this.endTime.split(':')
      var startTimeInMins = parseInt(startTimeStamp[1]) + startTimeStamp[0] * 60;
      var endTimeinMins = parseInt(endTimeStamp[1]) + endTimeStamp[0] * 60;
      var totalHours = +((endTimeinMins - startTimeInMins) / 60).toFixed(1);

      console.log(totalHours);
      return (totalHours);
    },
    checkDuplicate: function(day) {
      for (var i = 0; i < this.timeSlots.length; i++) {
        if (day === this.timeSlots[i].day) {
          return true;
        }
      }
      return false;
    }
  },
})
