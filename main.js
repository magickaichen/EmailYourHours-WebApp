var timeListApp = new Vue({
  el: '#timeListApp',
  data: {
    timeSlots: [],
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
  methods: {
    addTimeSlot: function() {
      var time = {
        day: this.$refs.weekdaySel.value,
        start: '10AM',
        end: '5PM'
      };
      this.timeSlots.push(time);
    },
  },
})
