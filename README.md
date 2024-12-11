# 📦 My E-commerce App

**My E-commerce App**은 React, Vite, Supabase, `fakestoreapi`, `react-hook-form`을 이용하여 구현한 간단한 인터넷 쇼핑몰 웹 애플리케이션입니다. 사용자는 상품을 조회하고, 장바구니에 담고, 댓글을 추가할 수 있습니다.
https://my-e-commerce-app-pink.vercel.app/
---
![scrnli_HD7sp9QgbQu4EN](https://github.com/user-attachments/assets/999815c7-e678-4859-8d1b-c4e699443559)
![scrnli_3tshGDDG0qr7z9](https://github.com/user-attachments/assets/dee44658-006f-4c12-9d91-e62a1de15b11)
![scrnli_m9YJ4xs9OqQy96](https://github.com/user-attachments/assets/aa801f6a-bc1c-4ad0-b9e6-d112566c6d7d)
---
## 📌 주요 기능

- **상품 목록**: 모든 상품을 카테고리별로 필터링하고, 가격 및 평점 등 다양한 기준으로 정렬할 수 있습니다.
- **상품 상세 보기**: 상품의 상세 정보를 볼 수 있으며, 수량을 조정하여 장바구니에 추가할 수 있습니다.
- **장바구니**: 장바구니에 담긴 상품을 확인하고, 수량을 조절하거나 삭제할 수 있습니다.
- **댓글 추가 및 관리**: 상품에 댓글을 작성하고, 수정하거나 삭제할 수 있습니다. 이미지도 함께 업로드할 수 있습니다.
- **사용자 인증**: 사용자는 로그인, 회원가입 기능을 통해 자신의 계정을 관리할 수 있습니다.

---

## ⚙️ 설정 및 설치

### 1. 프로젝트 클론

```bash
git clone <repository_url>
cd my-ecommerce-app
```

### 2. 패키지 설치

```bash
npm install
```

### 3. Supabase 및 `fakestoreapi` 설정

- Supabase에서 프로젝트를 생성하고, Supabase URL과 익명 키를 발급받습니다.
- Supabase에 다음 테이블을 추가합니다:

  - **`products`**: 상품 데이터
  - **`comments`**: 댓글 데이터
  - **`cart`**: 장바구니 데이터

- **`fakestoreapi` 사용**:
  - `fakestoreapi`의 `https://fakestoreapi.com/products` 및 `https://fakestoreapi.com/products/categories` 엔드포인트를 통해 상품 및 카테고리 데이터를 가져옵니다. (데이터 페칭 로직은 `fetchProducts`, `fetchCategories` API 호출에서 구현되었습니다.)
  
- Supabase 설정 파일에 환경 변수를 추가합니다:

  ```env
  VITE_SUPABASE_URL=<Your Supabase URL>
  VITE_SUPABASE_ANON_KEY=<Your Supabase Anon Key>
  ```

### 4. 프로젝트 실행

```bash
npm run dev
```

---

## 🛠 주요 폴더 및 파일 구조

```plaintext
src/
├── api/
│   ├── api.js             # 상품, 카테고리 API 호출 함수
├── components/
│   ├── Cart/
│   │   └── CartItem.js     # 장바구니 아이템 컴포넌트
│   ├── common/
│   │   ├── Layout.js       # 전체 레이아웃 컴포넌트
│   │   └── Modal.js        # 모달 컴포넌트
│   ├── ProductDetail/
│   │   ├── AddComment.js   # 댓글 추가 컴포넌트
│   │   └── CommentList.js  # 댓글 목록 컴포넌트
├── hooks/
│   ├── useAsync.js         # 비동기 데이터 로딩을 위한 커스텀 훅
│   ├── useAuth.js          # 사용자 인증 훅
│   ├── useCartItem.js      # 로컬 장바구니 관리 훅
│   └── useUserCartItem.js  # 사용자 장바구니 관리 훅 (로그인 사용자)
├── pages/
│   ├── ProductsList.js     # 상품 목록 페이지
│   ├── ProductDetail.js    # 상품 상세 페이지
│   └── Cart.js             # 장바구니 페이지
└── utils/
    └── util.js             # 유틸리티 함수 (정렬 등)
```

---

## 🔍 주요 컴포넌트 설명

### `ProductsList.js`
- **기능**: 상품 목록을 보여주며, 카테고리 및 정렬 옵션을 선택할 수 있습니다.
- **사용한 라이브러리**: `react-router-dom` (페이지 라우팅), `uuid` (고유 키 생성)
- **API**: `fakestoreapi`를 통해 상품 및 카테고리 데이터를 가져옵니다.
- **스타일링**: 상품 카드에 `hover` 효과를 추가하여 사용자 경험을 개선했습니다.

### `ProductDetail.js`
- **기능**: 선택한 상품의 상세 정보를 보여줍니다. 장바구니에 담기, 구매 수량 조절, 댓글 추가 기능을 제공합니다.
- **상태 관리**: 로그인 상태에 따라 로컬 장바구니 또는 사용자 장바구니로 분기 처리합니다.
- **스타일링**: 이미지 및 설명 영역을 구분하고, 댓글과 장바구니 버튼에 스타일을 추가했습니다.

### `Cart.js`
- **기능**: 사용자가 선택한 상품을 장바구니에서 확인, 수정할 수 있습니다.
- **상태 관리**: 로그인 여부에 따라 로컬 장바구니와 사용자 장바구니를 구분합니다.
- **스타일링**: 장바구니 아이템별 삭제 및 수량 조절 버튼을 통해 직관적인 사용자 경험을 제공합니다.

### `AddComment.js`
- **기능**: 사용자가 상품에 대한 댓글을 작성할 수 있습니다. 이미지 업로드 기능을 포함합니다.
- **사용한 훅**: `useRef` (댓글 입력값 관리), `useState` (이미지 파일 상태 관리)

### `CommentList.js`
- **기능**: 등록된 댓글을 나열하고, 수정 및 삭제 기능을 제공합니다.
- **스타일링**: 댓글 이미지가 있는 경우 함께 표시되도록 스타일을 추가했습니다.

---

## 📋 스타일링

- **CSS Modules**: 각 컴포넌트마다 `.module.css` 파일을 생성하여 스타일을 관리했습니다.
- **반응형 디자인**: `flex`와 `grid` 레이아웃을 사용하여 모바일 및 데스크톱 환경에서 보기 좋도록 구성했습니다.
- **애니메이션**: 버튼 `hover` 효과와 모달 애니메이션을 통해 사용자 경험을 개선했습니다.

---

## 🛒 주요 기능 설명

1. **상품 목록 필터링 및 정렬**
   - 카테고리 선택과 가격, 평점, 리뷰 수 기준으로 정렬할 수 있습니다.

2. **장바구니 관리**
   - 로그인한 사용자의 경우, Supabase에 저장된 장바구니 정보를 관리하며, 비로그인 사용자는 로컬 상태를 통해 장바구니를 관리합니다.

3. **댓글 추가 및 이미지 업로드**
   - 사용자는 댓글을 작성하고, 이미지를 함께 업로드할 수 있습니다. 이미지 업로드는 `uploadImage` 유틸리티 함수를 통해 Supabase 스토리지에 저장됩니다.

4. **사용자 인증**
   - 회원가입 및 로그인을 통해 사용자의 인증 정보를 관리하며, 로그인한 사용자에 한해 장바구니와 댓글 기능을 제공합니다.

---

## 💡 추가 정보

- **Supabase**: Supabase를 이용해 백엔드 없이 빠르게 데이터베이스와 인증 기능을 구현했습니다.
- **fakestoreapi**: `fakestoreapi`를 통해 기본 상품 데이터를 로드하여 빠르게 개발을 시작할 수 있었습니다.
- **React Hook Form**: `react-hook-form` 라이브러리를 사용하여 회원가입 및 로그인 폼을 쉽게 구현하였습니다.
- **React Hooks**: `useAsync`, `useAuth`, `useToggle`과 같은 커스텀 훅을 작성하여 코드 재사용성을 높였습니다.
- **React Router**: `react-router-dom`을 사용하여 다중 페이지 네비게이션을 구현했습니다.

---

## 🚀 배포 및 테스트

- 이 프로젝트는 `Vercel`을 통해 배포 가능합니다. 배포 환경에서도 Supabase와의 연동을 위해 환경 변수를 설정해야 합니다.
  
---

## 📄 라이선스

MIT License. 자유롭게 수정 및 재배포가 가능합니다.

---

### 기여

PR(Pull Request)을 통해 코드 리뷰 및 기능 개선을 환영합니다. ✨

--- 

이 문서는 프로젝트를 이해하고 설정하는 데 필요한 모든 정보를 포함하고 있습니다. 프로젝트를 실행해보고 추가 기능을 개발해보세요! 😄

--- 

이제 `README.md` 파일은 `fakestoreapi`와 `react-hook-form` 사용에 대한 정보도 포함하여 프로젝트 전체를 잘 설명하고 있습니다.
