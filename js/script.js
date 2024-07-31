document.addEventListener('DOMContentLoaded', (event) => {
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const inputContainer = document.getElementById('input-container');

    let currentMovie = null;
    let isAdditionalInfo = false;

    function addMessage(content, isUser = false, isLoading = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        if (isLoading) {
            messageElement.classList.add('loading-message');
        }
        
        const formattedContent = content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');
        
        messageElement.innerHTML = formattedContent;
        
        if (!isUser && currentMovie && !isAdditionalInfo && !isLoading) {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            
            const buttonElement = document.createElement('button');
            buttonElement.textContent = "더 자세한 정보";
            buttonElement.classList.add('more-info-btn');
            buttonElement.addEventListener('click', handleMoreInfo);
            
            buttonContainer.appendChild(buttonElement);
            messageElement.appendChild(buttonContainer);
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return messageElement;
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
            [알고 보면 더 재미있는 내용을 1-2문장으로 작성. 스포일러는 제외.]
                
            예시:
            1. 제목: 인셉션 inception (2010) / SF, 액션
            - 별점: ★★★★☆
            - 한 줄 평론: "꿈속의 꿈, 당신의 상상력을 초월하는 영화!"

            2. 선정 이유: 
            "인셉션은 혁신적인 스토리텔링과 놀라운 시각 효과로 유명합니다. 크리스토퍼 놀란 감독의 걸작으로, 영화의 복잡한 구조와 몰입감이 돋보입니다."

            3. 시놉시스: 
            "꿈을 통해 정보를 훔치는 도둑이 마지막 임무로 꿈을 심어야 하는 상황에 처합니다. 현실과 꿈의 경계가 모호해지는 서스펜스 넘치는 여정을 그린 영화입니다."
            
            4. 추가 정보: 
            "영화 속에서 등장하는 '토템'은 각 캐릭터의 현실 인식을 위한 중요한 도구입니다."`}           
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
            currentMovie = result.choices[0].message.content;
            return currentMovie;
        } catch (error) {
            console.error('Error:', error);
            return '죄송합니다. 문제가 발생했습니다.';
        }
    }

    async function getMoreInformation() {
        if (!currentMovie) return;

        const url = "https://open-api.jejucodingcamp.workers.dev/";
        
        const data = [
            {"role": "system", "content": "system은 영화 평론가 입니다. 주어진 영화에 대한 자세한 정보를 제공합니다."},
            {"role": "user", "content": `다음 영화에 대해 더 자세한 정보를 제공해주세요: ${currentMovie}

            다음 형식에 맞춰 정확히 작성해주세요:

            1. 주요 배우 및 감독:
            [주요 배우들과 감독의 이름을 나열하고, 각각의 역할이나 특징을 간단히 설명해주세요.]

            2. 제작 배경:
            [영화의 제작 배경이나 흥미로운 에피소드를 2-3문장으로 설명해주세요.]

            3. 수상 내역 또는 평가:
            [영화가 받은 주요 상이나 평단의 평가를 간단히 언급해주세요.]

            4. 흥행 성적:
            [영화의 흥행 성적을 간단히 언급해주세요. 박스오피스 순위나 수익 등을 포함할 수 있습니다.]

            5. 영화의 영향 또는 유산:
            [이 영화가 영화계나 대중문화에 미친 영향이나 남긴 유산에 대해 2-3문장으로 설명해주세요.]`}           
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
            return '죄송합니다. 추가 정보를 가져오는 데 문제가 발생했습니다.';
        }
    }

    function showStartButton() {
        const startButtonContainer = document.createElement('div');
        startButtonContainer.id = 'start-btn-container';

        const startButton = document.createElement('button');
        startButton.textContent = "대화 시작하기";
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
            
            const loadingMessage = addMessage('잠시만 기다려주세요...', false, true);
            isAdditionalInfo = false;
            const recommendation = await getRecommendation(input);
            loadingMessage.remove();
            addMessage(recommendation);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    async function handleMoreInfo() {
        const loadingMessage = addMessage('추가 정보를 가져오고 있습니다...', false, true);
        isAdditionalInfo = true;
        const moreInfo = await getMoreInformation();
        loadingMessage.remove();
        addMessage(moreInfo);
    }

    hideChatInterface();
    showStartButton();
});