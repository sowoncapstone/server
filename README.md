# face_blindness server

Server for android application running on ec2 instance

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Install

What things you need to install the software and how to install them

```
cd myserver
npm install
```

Mac OS or Linux

```
set DEBUG=myserver:* & npm start
```


## Built With

* [Express](https://expressjs.com) 
* [Node.JS](https://nodejs.org/)

## Authors

* **Soyoung Kim** 
* **Dongwon Jeon** 

## Acknowledgments

### myserver 의 디렉토리 구조

.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── login.js
│   └── post.js
│   └── register.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

### 각 디렉토리의 역할

*  app.js: express 설정파일

*  package.json: 프로그램 이름, 버전, 필요한 모듈 등 노드 프로그램의 정보를 기술 (NPM은 이 정보를 참고하여 필요한 모듈을 관리)

*  public: 정적 파일을 위한 폴더로서 자바스크립트 파일, 이미지 파일, CSS 등을 포함. 웹URL의 루트폴더. 

*  routes: 라우팅을 위한 폴더. 라우팅 리소스 별로 모듈을 만들어 라우팅 로직을 구현. 클라이언트에서 요청 별로 어떤 로직을 수행할지 정해놓은 파일.

*  views: request 요청에 대한 로직을 처리한 후 클라이언트에 응답을 보낼 때 html 코드로 변환 후 반환하는 파일을 정의한 폴더. 이 프로젝트는 웹 애플리케이션이 아니기 때문에 딱히 필요 없음.

## 응답을 위한 함수

*  res.send(): 문자열로 응답
*  res.json(): 제이슨(Json) 객체로 응답
*  res.render():  html 변환 템플릿을 렌더링(ejs)
*  res.sendfile(): 파일 다운로드

## 경로 접근 예시

`app.use('/static', express.static(__dirname + '/public'));`