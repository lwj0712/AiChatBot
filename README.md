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
* 카카오톡 대화 방 형식의 레이아웃(추후 변경 가능성 있음)
* 사용자가 익숙한 환경에서 ai와 편하게 대화하는 경험을 줄 수 있음
  
## WBS

## Wire Frame
![WBS](https://github.com/user-attachments/assets/ebc40b89-2f51-48cc-acd0-a9a6df7b9831)
[Figma URL](https://www.figma.com/design/2GujRH7iKVgktsKskor9S8/Mini-project?node-id=0-1&t=Pdyuo6l4BqYelV7E-0)

## 시연 영상
![Animation](https://github.com/user-attachments/assets/b10e4c99-064e-480c-b411-0f8811d8d32a)<br>
[웹 페이지 URL](https://lwj0712.github.io/mini_project/)

## 추가 할 기능
* ~~대문 페이지 추가~~
* ~~대문 페이지에서 버튼을 누르면 채팅방으로 연결~~
* ~~.gitignore 파일 추가~~
* ~~system이 추천해준 영화에 대해 user가 더 자세한 정보를 원한다면 추가적인 정보를 제공하는 기능 추가. ex) 감독, 배우, 관객 수 etc..~~
* ~~응답이 출력 되면 전에 있던 (잠시만 기다려주세요...) 를 삭제하는 기능 추가~~

## 문제점
* ~~vscode에서 flask를 사용하여 구동하던 코드라 github에서 정상적으로 동작하지 않음 -> 파일 경로 재설정 필요~~
* 할루시네이션이 잦은 빈도로 발생

## 확장 가능성
* 영화진흥위원회 OPEN API를 통해 답변의 정확도를 향상 시킬 수 있음
* 실제 채팅 앱에서 대화 상대를 선택해서 채팅 방으로 입장하는 것처럼 각각 다른 role을 가진 ai와 대화를 하는 서비스로 확장 할 수 있음
* ex)영화를 추천해주는 ai, 책을 추천해주는 ai, 고민 상담해주는 ai, 식사 메뉴 추천해주는 ai
