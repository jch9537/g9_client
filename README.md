# g9_client

### 테스트 과제 클라이언트

CLIENT URI : http://localhost:5500/g9_client/<br/>
주민번호 유효성 확인 후 네이버 실시간 검색어 추출<br/>
사용 언어 : javascript<br/>

1. input 창 작성 글자수 제한
2. input 창 숫자 이외의 문자입력 제한
3. 실시간 검색어 렌더

- Server URI : http://localhost:8000
- Endpoint : /naver/realtime
- Resource : IdNumber
- Method : POST
- Success Response : { data: data, message: "가져오기 완료" }
- Error Response : <br/>유효하지 않은 주민번호 일 때 {error: { status: 400, message: "유효한 주민번호가 아닙니다." }},
  <br/>서버오류 { error: { status: 500, message: "서버오류" } }
