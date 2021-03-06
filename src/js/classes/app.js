import Dashboard from './dashboard';

class App {

  constructor (elems, results) {
    this.elems = elems;
    this.quest = results;
    this.dash = new Dashboard();
    this.loader = document.querySelector('#initial'); 
    this.appScreen = document.querySelector('.app');
    this.calendarEl = document.querySelector('#calendar');
  }

  init () {
    this.loadProgress();
    this.loadStats();
    this.loadCalendar();
    // Loaded, Hide Spinner
    this.hide(this.loader);
    this.fadeIn(this.appScreen);
    this.loadCharts();
  }

  loadProgress () {
    this.dash.displayProgress(this.elems.stats.progress, this.quest.quest);
  }

  loadStats () {
    this.dash.displayStat(this.elems.stats.quest, `${this.quest.quest}lbs`);
    this.dash.displayStat(this.elems.stats.bench, `${this.quest.bench.max}lbs`);
    this.dash.displayStat(this.elems.stats.squat, `${this.quest.squat.max}lbs`);
    this.dash.displayStat(this.elems.stats.dead, `${this.quest.dead.max}lbs`);
    this.dash.displayStat(this.elems.stats.statLifted, `${this.quest.totalWeight}lbs`);
    this.dash.displayStat(this.elems.stats.statWorkouts, this.quest.totalWorkouts);
    this.dash.displayUpdateAt(this.elems.updatedAt, this.quest.lastUpdated);
    this.dash.displayWeightGoal(this.elems.stats.statWeight, this.quest.weightGoal);
  }

  loadCalendar () {
    this.dash.displayCalendar(this.calendarEl, this.quest.workoutDays);
  }

  loadCharts () {
    this.dash.displayChart('quest', this.elems.charts.chartQuest, this.quest);
  }

  fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = 'block';
    let last = +new Date();
    const tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
      last = +new Date();
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
    tick();
    this.loadModal();
  }

  loadModal() {
    const show = document.querySelectorAll('.modal-open');
    const hide = document.querySelectorAll('.modal-close');

    Array.from(show).forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const klass = link.dataset.modal;
        const modal = document.querySelector(`#${klass}`);
        modal.classList.add('is-active');
      });
    });    

    Array.from(hide).forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const klass = link.dataset.modal;
        const modal = document.querySelector(`#${klass}`);
        modal.classList.remove('is-active');
      });
    });

  }

  hide(el) { el.style.display = 'none'; }

}
export default App;