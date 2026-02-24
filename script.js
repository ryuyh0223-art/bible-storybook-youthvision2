// ===== 전역 변수 =====
let currentPage = 0;
const totalPages = 10;
let isMusicPlaying = false;

// YouTube 동영상 ID (사용자 요청 찬양)
const YOUTUBE_VIDEO_ID = "aTqAUU6s6O0";


// DOM 요소
const imageSlides = document.querySelectorAll('.image-slide');
const textPages = document.querySelectorAll('.text-page');
const textContainer = document.getElementById('textContainer');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const musicToggle = document.getElementById('musicToggle');

// ===== 초기화 =====
function init() {
    // 이벤트 리스너 등록
    prevBtn.addEventListener('click', () => changePage(-1));
    nextBtn.addEventListener('click', () => changePage(1));
    musicToggle.addEventListener('click', toggleMusic);

    // 페이지 인디케이터 클릭
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToPage(index));
    });

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changePage(-1);
        if (e.key === 'ArrowRight') changePage(1);
    });

    // 터치 스와이프 지원
    let touchStartX = 0;
    let touchEndX = 0;

    const imageContainer = document.querySelector('.image-container');
    imageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    imageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            changePage(1); // 왼쪽으로 스와이프 = 다음 페이지
        }
        if (touchEndX - touchStartX > swipeThreshold) {
            changePage(-1); // 오른쪽으로 스와이프 = 이전 페이지
        }
    }

    updateNavigationButtons();
}

// ===== 페이지 전환 함수 =====
function changePage(direction) {
    const newPage = currentPage + direction;

    // 범위 체크
    if (newPage < 0 || newPage >= totalPages) return;

    // 현재 페이지 숨기기
    imageSlides[currentPage].classList.remove('active');
    textPages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');

    // 새 페이지 표시
    currentPage = newPage;

    imageSlides[currentPage].classList.add('active');
    textPages[currentPage].classList.add('active');
    dots[currentPage].classList.add('active');

    updateNavigationButtons();

    // 페이지가 변경되면 맨 위로 스크롤
    textContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 특정 페이지로 이동 =====
function goToPage(pageIndex) {
    if (pageIndex === currentPage) return;

    // 현재 페이지 숨기기
    imageSlides[currentPage].classList.remove('active');
    textPages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');

    // 새 페이지 표시
    currentPage = pageIndex;

    imageSlides[currentPage].classList.add('active');
    textPages[currentPage].classList.add('active');
    dots[currentPage].classList.add('active');

    updateNavigationButtons();
    textContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 네비게이션 버튼 업데이트 =====
function updateNavigationButtons() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
}

// ===== 찬양 재생/정지 =====
function toggleMusic() {
    const playerContainer = document.getElementById('youtube-player');

    if (isMusicPlaying) {
        // 찬양 정지
        playerContainer.innerHTML = '';
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
    } else {
        // 찬양 재생: 유튜브 iframe을 동적으로 생성하여 삽입 (브라우저 정책 우회를 위해 최소 크기 지정)
        playerContainer.innerHTML = `<iframe width="200" height="200" src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        isMusicPlaying = true;
        musicToggle.classList.add('playing');
    }
}


// ===== 초기화 실행 =====
document.addEventListener('DOMContentLoaded', init);
