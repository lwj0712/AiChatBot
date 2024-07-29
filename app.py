from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

def chat_gpt_api(user_input):
    url = "https://open-api.jejucodingcamp.workers.dev/"
    
    data = [
        {"role": "system", "content": "system은 영화 평론가 입니다. user가 입력한 정보를 바탕으로 영화를 추천해줍니다."},
        {"role": "user", "content": user_input}
    ]
    
    headers = {
        "Content-Type" : "application/json"
    }
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        return "API 요청에 실패했습니다."

def get_movie_recommendation(user_input):
    prompt = f"""
    다음과 같은 정보를 바탕으로 영화를 추천해주세요: {user_input}
    주의: 반드시 실제 존재하는 영화여야 합니다. 하나만 추천해주세요.
    주의: 예시와 같이 정확하게 줄바꿈을 하여 가독성을 높여주세요.

    다음 형식에 맞춰 정확히 작성해주세요:

    1. 제목: [영화 제목 (영어 제목)(개봉 년도)] / [장르]
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
    "영화 속에서 등장하는 '토템'은 각 캐릭터의 현실 인식을 위한 중요한 도구입니다."

    """
    
    response = chat_gpt_api(prompt)
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def recommend():
    user_input = request.json['userInput']
    recommendation = get_movie_recommendation(user_input)
    return jsonify({'recommendation': recommendation})

if __name__ == "__main__":
    app.run(debug=True)