## 환경 변수 설명

<br>

해당 프로젝트는 3가지 환경을 구성할 수 있습니다.

`local`: 로컬에서 실행하는 환경<br>
`development`: docker-compose를 이용해 로컬에서 실행하는 환경<br>
`production`: docker-compose를 이용해 실제 서비스 환경으로 실행<br>

<br>

따라서 environments 파일도 3가지로 나뉘어져 있어 환경에 맞게 세팅하시면 좋을 것 같습니다.<br>
다음은 envrionments 파일의 내부 요소 설명입니다.<br>

<br>

## Band Config

### BAND_URL

- 사용할 밴드 open api 주소입니다.
- 사용 목적에 맞게 url을 변경하면 좋을 것 같습니다.

### BAND_KEY

- 1784 밴드 key입니다.
- Band API 호출 시 필요한 정보입니다.

### BAND_ID

- 1784 Band https://band.us/band/47113445 에서 'band/' 뒤 숫자로 된 밴드 식별자입니다.

### BAND_TOKEN

- 밴드 open api 토큰입니다.

### BAND_FIRST_POST_ID

- Band 게시글 주소 https://band.us/band/47113445/post/926901386 에서 'post/' 뒤 숫자로 된 게시글 식별자입니다.
- Sequential하게 올라가는 특성이 있어 DB에 데이터가 없을 시 필요한 정보입니다.
- [Band 글 목록 조회 API](https://developers.band.us/develop/guide/api/get_posts)와 [1784 Band](https://band.us/band/47113445)를 확인하여 직접 조정해주시길 바랍니다.
  - (참고1) Band API는 식별자를 제공하지 않아 직접 식별자를 찾아 적용해야합니다.
  - (참고2) 글쓴이는 API로 요청한 게시글 내용을 [1784 Band](https://band.us/band/47113445)에 검색하여 게시글 주소를 구했습니다.

<br>

## Database Config

### MYSQL_HOST

- MySQL 호스트 정보입니다.
- Container 환경 시 docker network에 등록된 hostname을 입력해주세요.

### MYSQL_PORT

- 기본값 3306입니다.

### MYSQL_USER

- MySQL에서 사용할 사용자명을 입력해주세요.

### MYSQL_PASSWORD

- MySQL에서 사용할 비밀번호를 입력해주세요.

### MYSQL_DATABASE

- MySQL에서 사용할 데이터베이스를 입력해주세요.

### MYSQL_ROOT_PASSWORD

- MySQL Container 초기화에 필요한 정보입니다.
- local 환경에선 필요하지 않습니다.

<br>

## Slack Config

<br>

슬랙 설정에 대해 자세한 정보는 [여기](./slack-bot.md)를 참고해주세요.

<br>

### SLACK_TOKEN

- 슬랙 봇 생성/설치 후 확인 가능하며, `xoxb-` 순으로 시작되는 토큰 값입니다.

### SLACK_CHANNEL_ID

- 전송하고자 하는 슬랙 채널 ID입니다.
- 슬랙 채널 우클릭 -> 복사 -> 링크 복사
- https://your-workspace.slack.com/archives/C0123123 에서 'archives/' 뒤 C로 시작하는 부분이 Channel ID입니다.
