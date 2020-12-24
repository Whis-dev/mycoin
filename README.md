## project 시작

프로젝트를 clone 받으신 후 진행합니다.

```shall
yarn install

yarn start
```

## Project 구성

- CRA로 프로젝트를 구성하였습니다.
- 기본적으로 설치되는 testing tool은 삭제했습니다.
- Folder 구성은 아래와 같습니다.

    ```none
        src
            - component
              - common
                    Loader.js
              - list
                    Bookmark.js
                    List.js
                    MarketCondition.js
                App.js
                Routes.js
            - config
                api.js
                menus.js
            - hooks
                useLocalStorage.js
            - utils
                format.js
            index.js
    ```

- component에는 common/list가 있습니다.
  - common에는 Loader component가 있습니다. 추후 MarketCondition에 있는 Select 메뉴들을 공통 컴포넌트로 빼는 작업을 하려고 했으나 하지 못했습니다.
  - list에는 Bookmark, List, MarketCondition Component가 있습니다. List Component만 대략적으로 완료된 상태이며, MarketCondition은 진행중, Bookmark는 진행하지 못했습니다.
  - config에는 api, menus가 있습니다. api는 api에 관련한 string 데이터를 모아두기 위함이고, menus는 컴포넌트에 들어갈 각종 메뉴 데이터를 관리하기 위하여 만들었습니다. 현재 MarketCondition에 사용한는 메뉴 정보만 넣어놓은 상태입니다.
  - hooks는 custom hook을 관리하기 위한 곳으로, localStorage에 관한 커스텀 훅을 만들어 놓았습니다. 추후 북마크 작업을 하기위해 만들었습니다.
  - utils는 컴포넌트에서 util로 사용할 것들을 모아놓은 곳입니다. format util은 테이블에 보여주는 데이터를 가공해주는 기능만 구현해 놓은 상황입니다.
- 추가적으로 설치한 dependancy는 react-router-dom외에 `1. @material-ui/core 2. @material-ui/icon 3. axios` 입니다.

### 추가 package 설치 사유

1. axios : 비동기 통신을 하기위하여 평소 patch보다는 axios를 주로 사용하여 해당 라이브러리를 설치했습니다.
2. @material-ui/core, @material-ui/icon : css로 전반적인 디자인을 구성하기에는 무리가 있다고 판단이 되어 material-ui를 사용하였습니다. 시간이 남으면, material-ui를 걷어내고 순수 css를 적용하려고 했으나 그러지 못했습니다.

#### 이후 작업해야할 것들

1. MarketCondition component 완료
2. Bookmark 작업
3. 상세페이지 작업
