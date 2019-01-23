class ScoreCalculator {
  constructor() {
    this.startClock();
  }

  startClock() {
    this.time = Date.now();
  }

  endClock() {
    this.time = Date.now() - this.time;
  }

  calculatedChange(correct) {
    this.endClock();

    const sign = correct ? 1 : -1;
    const changeVar = this.time;

    let factor = 0;
    if (changeVar < 6000) {
      factor = Math.random() * 3 + 7;
    } else if (changeVar < 15000) {
      factor = Math.random() * 3 + 5;
    } else if (changeVar < 30000) {
      factor = Math.random() * 3 + 3;
    } else {
      factor = Math.random() * 4;
    }

    return sign * parseInt(factor * 50);
  }
}

export default ScoreCalculator;
