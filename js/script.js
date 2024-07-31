document.addEventListener('DOMContentLoaded', (event) => {
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const inputContainer = document.getElementById('input-container');

    function addMessage(content, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const formattedContent = content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');
        
        messageElement.innerHTML = formattedContent;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getRecommendation(userInput) {
        const url = "https://open-api.jejucodingcamp.workers.dev/";
        
        const data = [
            {"role": "system", "content": "system은 영화 평론가 입니다. user가 입력한 정보를 바탕으로 영화를 추천해줍니다."},
            {"role": "user", "content": `다음과 같은 정보를 바탕으로 영화를 추천해주세요: ${userInput}
            주의: 반드시 실제 존재하는 영화여야 합니다. 하나만 추천해주세요.
            주의: 예시와 같이 정확하게 줄바꿈을 하여 가독성을 높여주세요.

            다음 형식에 맞춰 정확히 작성해주세요:

            1. 제목: [한글제목 engish title (개봉 년도)] / [장르]
            - 별점: [별 이모티콘(★☆)을 사용하여 5점 만점으로 평가.]
            - 한 줄 평론: [감각적인 한 줄 평론.]

            2. 선정 이유:
            [이 영화를 추천하는 이유를 2-3문장으로 작성.]

            3. 시놉시스:
            [스포일러 없이 사용자의 흥미를 유발할 수 있는 영화의 대략적인 줄거리를 2-3문장으로 작성.]

            4. 추가 정보:
            [알고 보면 더 재미있는 내용을 1-2문장으로 작성. 스포일러는 제외.]`}           
        ];

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('API 요청에 실패했습니다.');
            }

            const result = await response.json();
            return result.choices[0].message.content;
        } catch (error) {
            console.error('Error:', error);
            return '죄송합니다. 문제가 발생했습니다.';
        }
    }

    function showStartButton() {
        const startButtonContainer = document.createElement('div');
        startButtonContainer.id = 'start-btn-container';

        const startButton = document.createElement('button');
        startButton.textContent = "Let's start";
        startButton.id = 'start-btn';

        startButtonContainer.appendChild(startButton);
        chatContainer.appendChild(startButtonContainer);

        startButton.addEventListener('click', () => {
            startButtonContainer.remove();
            showChatInterface();
            addMessage('안녕하세요! 어떤 영화를 추천해드릴까요? 장르, 분위기, 배우, 감독 등 원하시는 정보를 입력해주세요.');
        });
    }

    function showChatInterface() {
        chatMessages.style.display = 'block';
        inputContainer.style.display = 'flex';
    }

    function hideChatInterface() {
        chatMessages.style.display = 'none';
        inputContainer.style.display = 'none';
    }

    submitBtn.addEventListener('click', async () => {
        const input = userInput.value.trim();
        if (input) {
            addMessage(input, true);
            userInput.value = '';
            
            inputContainer.style.display = 'none';
            addMessage('영화를 추천하는 중입니다. 잠시만 기다려주세요...');
            const recommendation = await getRecommendation(input);
            addMessage(recommendation);
            inputContainer.style.display = 'flex';
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    hideChatInterface();
    showStartButton();
});