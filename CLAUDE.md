# baropay

## Secrets & API Key Policy

- API Key, Token, Password 등 모든 비밀 정보는 코드에 절대 하드코딩하지 않는다.
- 모든 비밀 정보는 `.env` 파일 또는 환경 변수(Environment Variables)에 저장한다.
- API Key, Token 값을 코드, 로그, 출력, 예시 코드에 포함하지 않는다.
- `.env` 파일은 Git에 커밋하지 않는다 (`.gitignore`에 포함됨).
- 실제 값 없이 `.env.example` 파일만 저장소에 제공한다.
- 새로운 외부 API를 추가할 때도 동일한 규칙을 적용한다: 필요한 키 이름을 `.env.example`에 추가하고, 코드에서는 `process.env.<KEY_NAME>` (또는 해당 언어의 환경 변수 접근 방식)으로만 참조한다.
