export default class MeanStatistics {
  static types = {
    LOUDNESS: "loudness",
    ENERGY: "energy",
    DANCEABILITY: "danceability",
    VALENCE: "valence",
    ACOUSTICNESS: "acousticness"
  };
  getMean(obj, valuesToMean) {
    let results = {};
    for (let timeRange in obj) {
      results[timeRange] = {};
      let currentTimeRange = obj[timeRange];
      for (let key in valuesToMean) {
        let currentKey = valuesToMean[key];
        this.accumulation = 0;
        this.timesCalled = 0;
        for (let childObj in currentTimeRange) {
          let currentValue = currentTimeRange[childObj][currentKey];
          this.accumulate(currentValue);
        }
        let mean = this.calculateMean();
        let formattedMean = this.formatMean(mean, currentKey);
        results[timeRange][currentKey] = formattedMean;
      }
    }
    return results;
  }
  accumulate(value) {
    this.accumulation += Math.abs(value);
    this.timesCalled++;
  }
  formatMean(mean, type) {
    switch (type) {
      case MeanStatistics.types.LOUDNESS:
        return (-mean).toString() + "dB";
      default:
        return mean.toString();
    }
  }
  calculateMean() {
    let mean = this.accumulation / this.timesCalled;
    let fixed = mean.toFixed(2);
    return fixed;
  }
}
