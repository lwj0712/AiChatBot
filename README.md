# 프로젝트 목표
* ~~사용자가 원하는 장르를 입력하면 그에 맞는 영화를 추천해주는 서비스~~
* 사용자가 입력한 내용을 바탕으로 그에 맞는 영화를 추천해주는 서비스
* ChatGPT API 연동하여 AI 대화 모델 개발
* HTML, CSS, JS 활용하여 웹 페이지 구현
* GitHub를 통해 문서화 및 배포

## 기획
* 사용자가 입력한 내용과 관련 된 영화를 추천
* 추천 영화의 평점 및 한줄평 제공
* 선정한 이유 설명
* 간단한 시놉시스 제공
* 사용자가 원하면 추가적인 정보 제공

## 디자인
* 채팅 앱 대화 방 형식의 레이아웃(추후 변경 가능성 있음)
* 사용자가 익숙한 환경에서 ai와 편하게 대화하는 경험을 제공
  
## WBS
![WBS](https://github.com/user-attachments/assets/9b1d9743-3d5b-4c5f-a0d6-0c0330d9b6c1)

## Wire Frame
![wireframe](https://github.com/user-attachments/assets/84350fb9-cc4f-4fff-a4c7-9c61b5086127)
[Figma URL](https://www.figma.com/design/2GujRH7iKVgktsKskor9S8/Mini-project?node-id=0-1&t=Pdyuo6l4BqYelV7E-0)

## 시연 영상
![Animation](https://github.com/user-attachments/assets/2313a02e-0215-454a-a142-44452bc1cd79)<br>
[웹 페이지 URL](https://lwj0712.github.io/mini_project/)

## 문제점
* ~~flask가 github에서 정상적으로 동작하지 않음 -> 파일 경로 재설정 및 전체적인 구조 수정 필요~~
* 할루시네이션이 잦은 빈도로 발생

## 확장 가능성
* 영화진흥위원회 OPEN API를 통해 답변의 정확도를 향상 시킬 수 있음
* 실제 채팅 앱에서 대화 상대를 선택해서 채팅 방으로 입장하는 것처럼 각각 다른 role을 가진 ai와 대화를 하는 서비스로 확장 할 수 있음
* ex)영화를 추천해주는 ai, 책을 추천해주는 ai, 고민 상담해주는 ai, 식사 메뉴 추천해주는 ai
