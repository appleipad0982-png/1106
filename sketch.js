// 課程狀態管理
let courseState = {
    currentChapter: 1,
    completedChapters: [],
    scores: {
        chapter1: null,
        chapter2: null,
        chapter3: null,
        chapter4: null
    }
};

// 測驗答案
const answers = {
    chapter1: { q1: 'b', q2: 'b', q3: 'c' },
    chapter2: { q4: 'b', q5: 'b' },
    chapter3: { q6: 'b', q7: 'b' },
    chapter4: { q8: 'a', q9: 'b' }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeChapterNavigation();
    updateProgress();
});

// 章節導覽初始化
function initializeChapterNavigation() {
    const chapterItems = document.querySelectorAll('.chapter-item');
    
    chapterItems.forEach(item => {
        item.addEventListener('click', function() {
            const chapterNum = parseInt(this.dataset.chapter);
            switchChapter(chapterNum);
        });
    });
}

// 切換章節
function switchChapter(chapterNum) {
    // 移除所有 active 狀態
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.chapter-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 添加新的 active 狀態
    document.querySelector(`[data-chapter="${chapterNum}"]`).classList.add('active');
    document.getElementById(`chapter${chapterNum}`).classList.add('active');
    
    courseState.currentChapter = chapterNum;
    
    // 平滑滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 檢查第一章答案
function checkChapter1() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    
    if (!q1 || !q2 || !q3) {
        alert('請回答所有問題！');
        return;
    }
    
    let correct = 0;
    const total = 3;
    
    if (q1.value === answers.chapter1.q1) correct++;
    if (q2.value === answers.chapter1.q2) correct++;
    if (q3.value === answers.chapter1.q3) correct++;
    
    const score = Math.round((correct / total) * 100);
    courseState.scores.chapter1 = score;
    
    showResult('result1', correct, total, score);
    markChapterCompleted(1);
    updateProgress();
    
    // 自動解鎖下一章
    setTimeout(() => {
        if (score >= 60) {
            alert('恭喜通過！已解鎖下一章節 🎉');
        }
    }, 1000);
}

// 檢查第二章答案
function checkChapter2() {
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    
    if (!q4 || !q5) {
        alert('請回答所有問題！');
        return;
    }
    
    let correct = 0;
    const total = 2;
    
    if (q4.value === answers.chapter2.q4) correct++;
    if (q5.value === answers.chapter2.q5) correct++;
    
    const score = Math.round((correct / total) * 100);
    courseState.scores.chapter2 = score;
    
    showResult('result2', correct, total, score);
    markChapterCompleted(2);
    updateProgress();
}

// 檢查第三章答案
function checkChapter3() {
    const q6 = document.querySelector('input[name="q6"]:checked');
    const q7 = document.querySelector('input[name="q7"]:checked');
    
    if (!q6 || !q7) {
        alert('請回答所有問題！');
        return;
    }
    
    let correct = 0;
    const total = 2;
    
    if (q6.value === answers.chapter3.q6) correct++;
    if (q7.value === answers.chapter3.q7) correct++;
    
    const score = Math.round((correct / total) * 100);
    courseState.scores.chapter3 = score;
    
    showResult('result3', correct, total, score);
    markChapterCompleted(3);
    updateProgress();
}

// 檢查第四章答案
function checkChapter4() {
    const q8 = document.querySelector('input[name="q8"]:checked');
    const q9 = document.querySelector('input[name="q9"]:checked');
    
    if (!q8 || !q9) {
        alert('請回答所有問題！');
        return;
    }
    
    let correct = 0;
    const total = 2;
    
    if (q8.value === answers.chapter4.q8) correct++;
    if (q9.value === answers.chapter4.q9) correct++;
    
    const score = Math.round((correct / total) * 100);
    courseState.scores.chapter4 = score;
    
    showResult('result4', correct, total, score);
    markChapterCompleted(4);
    updateProgress();
    
    // 檢查是否完成所有章節
    if (courseState.completedChapters.length === 4) {
        setTimeout(() => {
            showCompletionScreen();
        }, 1500);
    }
}

// 顯示測驗結果
function showResult(resultId, correct, total, score) {
    const resultDiv = document.getElementById(resultId);
    resultDiv.classList.add('show');
    
    if (score >= 60) {
        resultDiv.className = 'result show correct';
        resultDiv.innerHTML = `
            ✅ 答對 ${correct} / ${total} 題<br>
            成績：${score}分 - 通過！
        `;
    } else {
        resultDiv.className = 'result show incorrect';
        resultDiv.innerHTML = `
            ❌ 答對 ${correct} / ${total} 題<br>
            成績：${score}分 - 請再複習後重試
        `;
    }
}

// 標記章節為已完成
function markChapterCompleted(chapterNum) {
    if (!courseState.completedChapters.includes(chapterNum)) {
        courseState.completedChapters.push(chapterNum);
        document.querySelector(`[data-chapter="${chapterNum}"]`).classList.add('completed');
    }
}

// 更新進度條
function updateProgress() {
    const totalChapters = 4;
    const completedCount = courseState.completedChapters.length;
    const progress = Math.round((completedCount / totalChapters) * 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = progress + '%';
    progressText.textContent = `課程進度: ${progress}%`;
}

// 顯示完成畫面
function showCompletionScreen() {
    const overlay = document.getElementById('completionOverlay');
    overlay.classList.add('show');
    
    // 計算總成績
    let totalScore = 0;
    let count = 0;
    
    Object.values(courseState.scores).forEach(score => {
        if (score !== null) {
            totalScore += score;
            count++;
        }
    });
    
    const averageScore = count > 0 ? Math.round(totalScore / count) : 0;
    document.getElementById('finalScore').textContent = averageScore + '分';
    
    // 添加慶祝動畫
    confetti();
}

// 簡單的慶祝效果
function confetti() {
    const colors = ['#667eea', '#764ba2', '#4CAF50', '#FF9800', '#2196F3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// 重新開始課程
function restartCourse() {
    // 重置狀態
    courseState = {
        currentChapter: 1,
        completedChapters: [],
        scores: {
            chapter1: null,
            chapter2: null,
            chapter3: null,
            chapter4: null
        }
    };
    
    // 清除所有測驗選擇
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    
    // 隱藏所有結果
    document.querySelectorAll('.result').forEach(result => {
        result.classList.remove('show');
    });
    
    // 移除完成標記
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('completed');
    });
    
    // 關閉完成畫面
    document.getElementById('completionOverlay').classList.remove('show');
    
    // 回到第一章
    switchChapter(1);
    updateProgress();
}

// SCORM API 模擬 (用於 SCORM 課程包)
const SCORM_API = {
    initialized: false,
    
    Initialize: function() {
        this.initialized = true;
        console.log('SCORM 初始化成功');
        return 'true';
    },
    
    Terminate: function() {
        this.initialized = false;
        console.log('SCORM 終止');
        return 'true';
    },
    
    GetValue: function(key) {
        console.log('取得 SCORM 值:', key);
        return '';
    },
    
    SetValue: function(key, value) {
        console.log('設定 SCORM 值:', key, value);
        
        // 記錄進度
        if (key === 'cmi.core.lesson_status') {
            console.log('課程狀態:', value);
        }
        if (key === 'cmi.core.score.raw') {
            console.log('分數:', value);
        }
        
        return 'true';
    },
    
    Commit: function() {
        console.log('SCORM 資料提交');
        return 'true';
    }
};

// 將 SCORM API 掛載到 window
window.API = SCORM_API;

// 頁面載入時初始化 SCORM
window.addEventListener('load', function() {
    if (window.API) {
        window.API.Initialize();
    }
});

// 頁面卸載時終止 SCORM
window.addEventListener('beforeunload', function() {
    if (window.API && window.API.initialized) {
        // 保存最終成績
        let totalScore = 0;
        let count = 0;
        
        Object.values(courseState.scores).forEach(score => {
            if (score !== null) {
                totalScore += score;
                count++;
            }
        });
        
        const averageScore = count > 0 ? Math.round(totalScore / count) : 0;
        
        window.API.SetValue('cmi.core.score.raw', averageScore);
        window.API.SetValue('cmi.core.lesson_status', 
            courseState.completedChapters.length === 4 ? 'completed' : 'incomplete'
        );
        window.API.Commit();
        window.API.Terminate();
    }
});