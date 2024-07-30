document.addEventListener('DOMContentLoaded', (event) => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    let lastRecommendation = null;

    function addMessage(content, isUser = false, isTemporary = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const formattedContent = content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
        
        messageElement.innerHTML = formattedContent;
        if (isTemporary) {
            messageElement.id = 'temporary-message';
        }
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (!isUser && !isTemporary) {
            const moreInfoBtn = document.createElement('button');
            moreInfoBtn.textContent = '더 자세한 정보';
            moreInfoBtn.classList.add('more-info-btn');
            moreInfoBtn.addEventListener('click', () => provideAdditionalInfo());
            messageElement.appendChild(moreInfoBtn);
        }
    }

    function removeTemporaryMessage() {
        const tempMessage = document.getElementById('temporary-message');
        if (tempMessage) {
            tempMessage.remove();
        }
    }

    async function getRecommendation(userInput) {
        const url = "https://open-api.jejucodingcamp.workers.dev/";
        
        const data = [
            {"role": "system", "content": "system은 영화 평론가 입니다. user가 입력한 정보를 바탕으로 영화를 추천해줍니다."},
            {"role": "user", "content": `다음과 같은 정보를 바탕으로 영화를 추천해주세요: ${userInput}
            주의: 반드시 실제 존재하는 영화여야 합니다. 하나만 추천해주세요.
            주의: 예시와 같이 정확하게 줄바꿈을 하여 가독성을 높여주세요.

            다음 형식에 맞춰 정확히 작성해주세요:

            1. 제목: [한글제목 영어제목 (개봉 년도)] / [장르]
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
            lastRecommendation = result.choices[0].message.content;
            return lastRecommendation;
        } catch (error) {
            console.error('Error:', error);
            return '죄송합니다. 문제가 발생했습니다.';
        }
    }

    async function provideAdditionalInfo() {
        if (!lastRecommendation) {
            addMessage('죄송합니다. 추가 정보를 제공할 영화 추천이 없습니다.');
            return;
        }

        const url = "https://open-api.jejucodingcamp.workers.dev/";
        
        const data = [
            {"role": "system", "content": "system은 영화 평론가 입니다. 이전에 추천한 영화에 대해 더 자세한 정보를 제공합니다."},
            {"role": "user", "content": `다음 영화에 대해 더 자세한 정보를 제공해주세요: ${lastRecommendation}

            다음 형식에 맞춰 추가 정보를 작성해주세요:

            1. 감독 및 주요 출연진:
            [감독과 주요 배우들의 이름과 간단한 설명]

            2. 제작 배경:
            [영화가 만들어진 배경이나 특이사항 (2-3문장)]

            3. 수상 내역 또는 평가:
            [주요 수상 내역이나 비평가들의 평가 (있는 경우)]

            4. 흥미로운 사실:
            [영화와 관련된 재미있는 뒷이야기나 트리비아 (1-2개)]

            주의: 스포일러는 포함하지 말아주세요.`}
        ];

        try {
            addMessage('추가 정보를 가져오고 있습니다...', false, true);
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
            removeTemporaryMessage();
            addMessage(result.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
            removeTemporaryMessage();
            addMessage('죄송합니다. 추가 정보를 가져오는 데 문제가 발생했습니다.');
        }
    }

    submitBtn.addEventListener('click', async () => {
        const input = userInput.value.trim();
        if (input) {
            addMessage(input, true);
            userInput.value = '';
            
            addMessage('잠시만 기다려주세요...', false, true);
            const recommendation = await getRecommendation(input);
            removeTemporaryMessage();
            addMessage(recommendation);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    addMessage('안녕하세요! 어떤 영화를 추천해드릴까요? 장르, 분위기, 배우, 감독 등 원하시는 정보를 입력해주세요.');
});