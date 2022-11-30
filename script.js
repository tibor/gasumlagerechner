const { createApp } = Vue;

createApp({
  data() {
    return {
      kwhCount: 12000,
      pricePerKwh: 20,
      pricePerKwhNextYear: 20,
      costThisYear: 0,
      costNextYear: 0,
      costDiff: 0
    };
  },
  methods: {
    importRangeValue(val) {
      this[val.target.dataset.target] = val.target.value;
      parent.postMessage("event", "*");
    },

    calcCosts(e) {
      if (e) {
        e.preventDefault();
        parent.postMessage("event", "https://codepen.io");
      }
      this.costThisYear = Math.round((this.kwhCount * this.pricePerKwh) / 100);

      this.costNextYear = Math.round(
        (((this.kwhCount * this.pricePerKwhNextYear) / 1.19 +
          3.086 * this.kwhCount) *
          1.07) /
          100
      );

      this.costDiff = this.costNextYear - this.costThisYear;
    }
  },
  mounted() {
    this.calcCosts();
  }
}).mount("#app");
