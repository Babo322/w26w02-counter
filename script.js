// DOM 요소 가져오기
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// 상태 변수
let timerInterval = null;
let timeLeft = 1500; // 기본값 25분 (초 단위)
let currentModeTime = 1500; // 현재 선택된 모드의 시작 시간 저장

// 초(sec)를 mm:ss 형식의 문자열로 변환하는 함수
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 화면 및 웹브라우저 탭 타이틀 업데이트
function updateDisplay() {
  const formatted = formatTime(timeLeft);
  timerDisplay.textContent = formatted;
  document.title = `(${formatted}) 뽀모도로 타이머`;
}

// 타이머 시작
function startTimer() {
  if (timerInterval !== null) return; // 이미 실행 중이면 중복 실행 방지

  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert('시간이 완료되었습니다!');
      resetTimer();
    }
  }, 1000);
}

// 타이머 일시정지
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// 타이머 리셋
function resetTimer() {
  pauseTimer();
  timeLeft = currentModeTime;
  updateDisplay();
}

// 모드 변경 (작업 / 휴식 / 긴 휴식)
function changeMode(e) {
  // 클릭된 버튼 찾기 (이벤트 위임 고려)
  const target = e.target;
  if (!target.classList.contains('mode-btn')) return;

  // 모든 모드 버튼에서 active 클래스 제거 후 클릭된 버튼에만 추가
  modeButtons.forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');

  // 모드에 맞는 시간 설정
  currentModeTime = parseInt(target.getAttribute('data-time'), 10);
  resetTimer();
}

// 이벤트 리스너 등록
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
  btn.addEventListener('click', changeMode);
});

// 초기 화면 표시 설정
updateDisplay();