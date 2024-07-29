document.addEventListener('DOMContentLoaded', (event) => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');

    function addMessage(content, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // 줄바꿈을 <p> 태그로 변환
        const formattedContent = content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
        
        messageElement.innerHTML = formattedContent;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getRecommendation(userInput) {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: userInput }),
        });
        const data = await response.json();
        return data.recommendation;
    }

    submitBtn.addEventListener('click', async () => {
        const input = userInput.value.trim();
        if (input) {
            addMessage(input, true);
            userInput.value = '';
            
            addMessage('잠시만 기다려주세요...');
            const recommendation = await getRecommendation(input);
            addMessage(recommendation);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    // 초기 메시지
    addMessage('안녕하세요! 어떤 영화를 추천해드릴까요? 장르, 분위기, 배우, 감독 등 원하시는 정보를 입력해주세요.');
});