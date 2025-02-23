# KSHS_ToDoPage

## 개요
**글로벌널리지**의 프론트엔드 개발자 실무 과제 요구사항을 충족하기 위해 개발된 칸반 스타일의 To-Do List 웹 애플리케이션입니다. 사용자는 보드를 생성, 수정, 삭제하고, 각 보드 내에서 할 일을 추가, 수정, 삭제하며, 보드 간 및 보드 내에서 할 일의 순서를 자유롭게 변경할 수 있습니다.
## 데모

### 보드 생성
![보드생성](https://github.com/user-attachments/assets/b4fc8e23-8e6b-4d61-9caf-caf1d75a446f)

## 보드 수정
![보드수정](https://github.com/user-attachments/assets/1a6ebc0b-5d53-4631-a60c-7896c7c4bc65)

## 보드 이동하여 상태 변경
![보드이동](https://github.com/user-attachments/assets/0496daa0-9db0-4619-a426-6d244dc1c8e5)

## 보드 삭제
![보드삭제](https://github.com/user-attachments/assets/6594255f-444a-4dfb-9e33-417771d48106)

## 보드 내에서 할일 추가
![할일추가](https://github.com/user-attachments/assets/8965ef1f-627a-432e-bd53-f17184423990)

## 할일 삭제
![할일삭제](https://github.com/user-attachments/assets/5b2673a1-60a3-4b1d-8a43-3a2f137fac6c)

## 할일 이동
![할일이동](https://github.com/user-attachments/assets/51bf9479-8791-433d-bfc0-5f183a632283)

## 할일 이동 시 동일 카드 내에서만 이동할 수 있도록 예외처리
![동일 카드 내부 이동 에외처리](https://github.com/user-attachments/assets/aa9bdaa8-552f-4a79-9ba6-4a7a05ca6636)

아래는 "할 일 위치 변경"을 "동일한 카드(보드) 내에서만 가능하도록" 수정한 `README.md`의 "주요 기능" 섹션입니다. 요구사항에 맞게 자연스럽게 반영했습니다.

---

## 주요 기능
### To-Do 보드
- **보드 생성**: 새로운 보드를 추가할 수 있습니다.
- **보드 수정**: 기존 보드의 제목을 편집할 수 있습니다.
- **보드 삭제**: 필요 없는 보드를 제거할 수 있습니다.
- **보드 순서 변경**: 드래그 앤 드롭으로 보드의 순서를 재배열할 수 있습니다.

### To-Do 할 일
- **텍스트 박스**: 각 할 일은 하나의 텍스트 입력 필드를 가집니다.
- **할 일 생성**: 보드 내에서 새로운 할 일을 추가할 수 있습니다.
- **할 일 삭제**: 보드 내에서 할 일을 삭제할 수 있습니다.
- **할 일 수정**: 할 일의 내용을 편집할 수 있습니다.
- **위치 변경**: 드래그 앤 드롭으로 동일한 보드 내에서 할 일의 순서를 변경할 수 있습니다.

---

## 기술 스택
- **Framework**: Next.js (버전 15.1.7)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS (버전 3.4.1)
- **데이터 저장**: Local Storage
- **라이브러리**: 
  - `react-dnd` (드래그 앤 드롭 기능 구현)
  - `react-dnd-html5-backend` (드래그 앤 드롭 백엔드)
  - `jotai` (상태 관리)
  - `react-hook-form` (폼 관리)
  - `zod` (스키마 검증)
  - `tailwind-merge` (Tailwind 클래스 병합)
  - `tailwindcss-animate` (Tailwind 애니메이션)
  - `class-variance-authority` (스타일 변형 관리)
  - `lucide-react` (아이콘)
  - `next-themes` (테마 관리)
  - `sonner` (토스트 알림)
  - `shadcn/ui` (UI 컴포넌트 라이브러리)
  - `@radix-ui/*` (다양한 UI 컴포넌트)
  - `dayjs` (날짜 처리)
  - `uuidv4` (고유 ID 생성)

## 구현 세부사항
- **데이터 저장**: `jotai`의 `atomWithStorage`를 활용하여 보드와 할 일 데이터를 `Local Storage`에 영구적으로 저장합니다. `atomWithStorage`를 사용한 이유는 상태 관리와 로컬 스토리지를 간단하게 동기화하고 선언적으로 처리할 수 있어, 코드의 가독성과 유지보수성을 높일 수 있기 때문입니다.
- **드래그 앤 드롭**: `react-dnd`를 사용하여 보드와 할 일의 순서를 직관적으로 변경할 수 있습니다.
- **스타일링**: Tailwind CSS를 활용하여 빠르게 스타일링하였으며, 디자인 시스템의 통일성을 유지하기 위해 `shadcn/ui`를 적용하였습니다.
- **타입 안정성**: TypeScript를 통해 코드의 안정성과 유지보수성을 높였습니다.
