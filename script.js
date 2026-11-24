const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const paperWrapper = document.querySelector('.paper-wrapper');
const page2 = document.getElementById('page-2');
const glitchOverlay = document.getElementById('glitch-overlay');
const vscodeBg = document.getElementById('vscode-bg');
const passwordInput = document.getElementById('password-input');
const errorMsg = document.getElementById('error-msg');

let yesScale = 1;
let moveTimeout = null;

function moveButton() {
    if (moveTimeout) return;

    const paperRect = paperWrapper.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const minX = Math.max(15, paperRect.left + 20);
    const maxX = Math.max(minX, Math.min(window.innerWidth - btnWidth - 15, paperRect.right - btnWidth - 20));
    const minY = Math.max(15, paperRect.top + 20);
    const maxY = Math.max(minY, Math.min(window.innerHeight - btnHeight - 15, paperRect.bottom - btnHeight - 40));

    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '9999';

    yesScale = Math.min(2.8, yesScale + 0.3);
    yesBtn.style.transform = `scale(${yesScale})`;

    moveTimeout = setTimeout(() => {
        moveTimeout = null;
    }, 200);
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

const codeSnippet = `
    <div class="code-block">
        <p><span class="kw">const</span> <span class="var">celebration</span> <span class="op">=</span> <span class="str">"It's time for the best birthday of the year!"</span><span class="punct">;</span></p>
        <p><span class="kw">function</span> <span class="fn">initBirthday</span><span class="punct">(</span><span class="var">age</span><span class="punct">) {</span></p>
        <p class="ind-1"><span class="kw">if</span> <span class="punct">(</span><span class="var">age</span> <span class="op">===</span> <span class="num">20</span><span class="punct">) {</span></p>
        <p class="ind-2"><span class="kw">return</span> <span class="str">"Here add a short birthday wish for their new age!"</span><span class="punct">;</span></p>
        <p class="ind-1"><span class="punct">}</span></p>
        <p><span class="punct">}</span></p>
        <p><br></p>
        <p><span class="kw">const</span> <span class="fn">sendWishes</span> <span class="op">=</span> <span class="punct">()</span> <span class="kw">=&gt;</span> <span class="punct">{</span></p>
        <p class="ind-1"><span class="var">console</span><span class="punct">.</span><span class="fn">log</span><span class="punct">(</span><span class="str">"Wishing you a year full of joy, growth, and dreams coming true!"</span><span class="punct">);</span></p>
        <p><span class="punct">};</span></p>
    </div>
`;

window.addEventListener('load', () => {
    vscodeBg.innerHTML = codeSnippet.repeat(8);
});

yesBtn.addEventListener('click', () => {
    glitchOverlay.style.display = 'block';
    glitchOverlay.classList.add('glitch-active');

    setTimeout(() => {
        document.querySelector('.magic-background').style.display = 'none';
        document.body.classList.add('hacker-mode');

        paperWrapper.style.display = 'none';
        glitchOverlay.style.display = 'none';
        glitchOverlay.classList.remove('glitch-active');

        vscodeBg.style.display = 'flex';
        page2.style.display = 'block';
        passwordInput.focus();
    }, 4000);
});

function checkPassword() {
    const pwd = passwordInput.value.replace(/[^0-9]/g, '');

    if (pwd === '01012000') {
        errorMsg.style.display = 'none';
        document.body.classList.remove('hacker-mode');
        document.querySelector('.magic-background').style.display = 'block';
        document.getElementById('page-2').style.display = 'none';
        document.getElementById('vscode-bg').style.display = 'none';
        document.getElementById('page-3').style.display = 'block';
    } else {
        errorMsg.style.display = 'block';
        passwordInput.value = '';
    }
}

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

document.addEventListener('click', (e) => {
    if (!e.target) return;

    if (e.target.id === 'next-surprise-btn') {
        document.getElementById('page-3').style.display = 'none';
        document.getElementById('page-4').style.display = 'flex';
    }

    if (e.target.id === 'btn-memory-1') {
        document.getElementById('page-4').style.display = 'none';
        document.getElementById('page-memory-1').style.display = 'flex';
    }

    if (e.target.id === 'back-memory-1-btn') {
        document.getElementById('page-memory-1').style.display = 'none';
        document.getElementById('page-4').style.display = 'flex';
    }

    if (e.target.id === 'btn-memory-2') {
        document.getElementById('page-4').style.display = 'none';
        document.getElementById('page-memory-2').style.display = 'flex';
    }

    if (e.target.id === 'back-memory-2-btn') {
        document.getElementById('page-memory-2').style.display = 'none';
        document.getElementById('page-4').style.display = 'flex';
    }

    if (e.target.id === 'btn-to-page7') {
        document.getElementById('page-4').style.display = 'none';
        document.getElementById('page-7').style.display = 'flex';
        initMatchingGame();
    }
});

const EMOJIS = ['🎂', '🎂', '🎈', '🎈', '🎁', '🎁', '💖', '💖', '✨'];
const grid = document.getElementById('game-grid');
const winScreen = document.getElementById('win-screen');

let flippedCards = [];
let matchedPairs = 0;
let isProcessing = false;

function initMatchingGame() {
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    isProcessing = false;
    winScreen.style.display = 'none';

    const shuffled = [...EMOJIS].sort(() => Math.random() - 0.5);

    shuffled.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${emoji}</div>
            </div>
        `;
        card.addEventListener('click', () => handleCardClick(card));
        grid.appendChild(card);
    });
}

function handleCardClick(card) {
    if (isProcessing || card.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    isProcessing = true;
    const [c1, c2] = flippedCards;

    if (c1.dataset.emoji === c2.dataset.emoji && c1.dataset.emoji !== '✨') {
        matchedPairs++;
        flippedCards = [];
        isProcessing = false;

        if (matchedPairs === 4) {
            gameWon();
        }
    } else {
        setTimeout(() => {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
            flippedCards = [];
            isProcessing = false;
        }, 1000);
    }
}

function gameWon() {
    setTimeout(() => {
        winScreen.style.display = 'flex';
        document.querySelectorAll('.card').forEach((card) => {
            if (card.dataset.emoji === '✨') {
                card.classList.add('flipped');
            }
        });
    }, 600);
}

const page8 = document.getElementById('page-8');

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'next-btn-final') {
        document.getElementById('page-7').style.display = 'none';
        page8.style.display = 'flex';
        initScratchCard();

        const btnPage9 = document.getElementById('btn-to-page9');
        if (btnPage9) {
            btnPage9.style.opacity = '0';
            btnPage9.style.pointerEvents = 'none';

            setTimeout(() => {
                btnPage9.style.opacity = '1';
                btnPage9.style.pointerEvents = 'auto';
            }, 5000);
        }
    }
});

function initScratchCard() {
    const canvas = document.getElementById('scratch-pad');
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#505050';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH HERE!', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    function getMousePos(e) {
        const bounds = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - bounds.left,
            y: clientY - bounds.top
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();

        const pos = getMousePos(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        scratch(e);
    });
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        scratch(e);
    }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', () => {
        isDrawing = false;
    });
}

const page9 = document.getElementById('page-9');

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-to-page9') {
        document.getElementById('page-8').style.display = 'none';
        page9.style.display = 'flex';
        initFallingGame();
    }
});

let fallingScore = 0;
let fallingGameActive = false;
let fallingItems = [];
let basketX = 50;
let spawnTimeout;

const fallingArea = document.getElementById('falling-area');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('current-score');
const fallingWinScreen = document.getElementById('falling-win-screen');

function initFallingGame() {
    fallingScore = 0;
    scoreDisplay.innerText = fallingScore;
    fallingGameActive = true;

    fallingItems.forEach((item) => item.el.remove());
    fallingItems = [];
    clearTimeout(spawnTimeout);

    fallingWinScreen.style.display = 'none';
    fallingArea.style.display = 'block';

    spawnItem();
    requestAnimationFrame(updateFallingGame);
}

if (fallingArea) {
    const handleMove = (clientX) => {
        if (!fallingGameActive) return;

        const rect = fallingArea.getBoundingClientRect();
        basketX = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
        basket.style.left = basketX + '%';
    };

    fallingArea.addEventListener('mousemove', (e) => handleMove(e.clientX));
    fallingArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
    }, { passive: false });
}

function spawnItem() {
    if (!fallingGameActive) return;

    const types = [
        { emoji: '🎁', points: 1 },
        { emoji: '🎁', points: 1 },
        { emoji: '🎂', points: 2 },
        { emoji: '💣', points: -1 }
    ];

    const type = types[Math.floor(Math.random() * types.length)];
    const el = document.createElement('div');
    el.classList.add('falling-item');
    el.innerText = type.emoji;
    el.style.left = (Math.random() * 80 + 10) + '%';
    fallingArea.appendChild(el);

    fallingItems.push({
        el: el,
        y: -50,
        points: type.points,
        speed: Math.random() * 1 + 1.5
    });

    spawnTimeout = setTimeout(spawnItem, Math.random() * 500 + 1500);
}

function updateFallingGame() {
    if (!fallingGameActive) return;

    const basketRect = basket.getBoundingClientRect();
    const areaRect = fallingArea.getBoundingClientRect();

    for (let i = fallingItems.length - 1; i >= 0; i--) {
        const item = fallingItems[i];
        item.y += item.speed;
        item.el.style.top = item.y + 'px';

        const itemRect = item.el.getBoundingClientRect();
        const hitBasket = (
            itemRect.bottom > basketRect.top + 10 &&
            itemRect.top < basketRect.bottom &&
            itemRect.right > basketRect.left &&
            itemRect.left < basketRect.right
        );

        if (hitBasket) {
            fallingScore = Math.max(0, fallingScore + item.points);
            scoreDisplay.innerText = fallingScore;

            item.el.style.transform = 'scale(0)';
            item.el.style.transition = 'transform 0.1s';
            setTimeout(() => item.el.remove(), 100);
            fallingItems.splice(i, 1);

            if (fallingScore >= 10) {
                fallingGameActive = false;
                clearTimeout(spawnTimeout);
                fallingWinScreen.style.display = 'flex';
            }
        } else if (item.y > areaRect.height) {
            item.el.remove();
            fallingItems.splice(i, 1);
        }
    }

    if (fallingGameActive) {
        requestAnimationFrame(updateFallingGame);
    }
}

const page10 = document.getElementById('page-10');
const typedTextEl = document.getElementById('typed-text');
const nextParagBtn = document.getElementById('next-paragraph-btn');

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-to-page10') {
        document.getElementById('page-9').style.display = 'none';
        page10.style.display = 'flex';
        startTypingLetter();
    }
});

const letterChunks = [
    "Dear [Name],\n\nHappy Birthday! Write a heartfelt letter for them here.",
    "\n\nAdd as many paragraphs as wished here — each new string unlocks after clicking [Read more...]."
];

let currentChunkIndex = 0;
let isTyping = false;

function startTypingLetter() {
    typedTextEl.innerHTML = '';
    currentChunkIndex = 0;
    typeNextChunk();
}

function typeNextChunk() {
    if (currentChunkIndex >= letterChunks.length) return;

    isTyping = true;
    nextParagBtn.style.display = 'none';

    const textToType = letterChunks[currentChunkIndex];
    let charIndex = 0;

    function typeChar() {
        if (charIndex < textToType.length) {
            typedTextEl.innerHTML += textToType.charAt(charIndex);
            charIndex++;

            const contentBox = document.querySelector('.letter-content');
            contentBox.scrollTop = contentBox.scrollHeight;

            setTimeout(typeChar, Math.random() * 30 + 35);
        } else {
            isTyping = false;
            currentChunkIndex++;

            if (currentChunkIndex < letterChunks.length) {
                nextParagBtn.innerText = '[Read more...]';
                nextParagBtn.style.display = 'inline-block';
            } else {
                nextParagBtn.style.display = 'none';
            }
        }
    }

    typeChar();
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'next-paragraph-btn' && !isTyping) {
        typeNextChunk();
    }
});