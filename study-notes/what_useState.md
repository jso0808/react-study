# useState가 필요한 이유

`useState`는 리액트가 값을 기억하게 하고, 값이 바뀌면 화면도 다시 그리도록 요청할 수 있게 해주는 기능이다.
화면을 보여주는 데 필요한 이런 기억을 **상태(state)**라고 부른다.

아래 설명은 `App.js`에서 `mode`의 초기값을 `'WELCOME'`으로 둔 첫 실습을 기준으로 한다.
이후 실습에서 초기값이나 화면 구성을 바꿨다면 처음 보이는 내용도 달라질 수 있다.

## 일반 변수로는 왜 부족할까?

일반 변수를 사용한다고 가정해 보자.

```jsx
function App() {
  let mode = 'WELCOME';

  function handleClick() {
    mode = 'READ';
  }

  return <button onClick={handleClick}>{mode}</button>;
}
```

버튼을 클릭하면 변수 값 자체는 `'READ'`로 바뀐다. 하지만 화면에는 계속 `WELCOME`이 보인다.

- 일반 변수에 값을 넣는 것만으로는 리액트가 화면을 다시 그리지 않는다.
- 다른 이유로 `App`이 다시 실행되더라도 `let mode = 'WELCOME'`이 다시 실행되어 초기값으로 돌아간다.

그래서 렌더링 사이에 값을 기억하고, 변경에 맞춰 다시 렌더링을 요청하는 기능이 필요하다.
이 두 가지를 제공하는 것이 `useState`다.
([React 공식 문서: 컴포넌트의 기억](https://react.dev/learn/state-a-components-memory))

## 첫 실습의 useState 코드 읽기

```jsx
import { useState } from 'react';

// App 함수 안에서 사용한다.
const [mode, setMode] = useState('WELCOME');
```

| 코드 | 의미 |
| --- | --- |
| `mode` | 이번 렌더링에서 사용할 현재 상태값 |
| `setMode` | 다음 상태값을 지정하고 다시 렌더링하도록 요청하는 함수 |
| `'WELCOME'` | 상태를 처음 만들 때 사용할 값 |

`useState`는 현재 상태값과 변경 함수를 담은 배열을 반환한다.
`[mode, setMode]`는 배열의 두 값을 각각 꺼내 이름을 붙이는 문법이다. 이를 **배열 구조 분해 할당**이라고 한다.

## 메뉴를 누르면 화면이 바뀌는 흐름

첫 실습에서는 `mode`에 따라 보여줄 내용을 정한다.

```jsx
let content = null;

if (mode === 'WELCOME') {
  content = <Article title="Welcome" body="Hello, WEB" />;
} else {
  content = <Article title="Read" body="Hello, Read" />;
}
```

1. 처음에는 `mode`가 `'WELCOME'`이므로 `Welcome` 내용이 보인다.
2. `html`, `css`, `js` 중 하나를 누르면 `Nav`가 전달받은 `onChangeMode` 함수를 호출한다.
3. 그 함수 안에서 `setMode('READ')`가 실행된다.
4. 리액트가 다음 상태를 `'READ'`로 정하고 `App` 함수를 다시 실행한다.
5. 이번에는 `mode`가 `'READ'`이므로 `else`의 내용을 화면에 반영한다.
6. 위쪽 `WEB`을 누르면 `setMode('WELCOME')`가 실행되어 처음 내용으로 돌아간다.

리액트가 컴포넌트 함수를 다시 실행하여 화면에 보여줄 내용을 계산하는 것을 **리렌더링**이라고 한다.
이 예제에서는 세 메뉴가 모두 같은 `Read` 내용을 보여준다.

## 헷갈리기 쉬운 부분

### App이 다시 실행되면 WELCOME으로 초기화되지 않을까?

`useState('WELCOME')`의 `'WELCOME'`은 초기값이다.
같은 컴포넌트가 유지되는 동안에는 리액트가 이전 상태를 기억해서 돌려준다.
따라서 `setMode('READ')` 다음 렌더링의 `mode`는 `'READ'`다.
브라우저를 새로고침하여 앱을 새로 시작하면 다시 초기값부터 시작한다.

### const인데 어떻게 값이 바뀔까?

`mode = 'READ'`처럼 현재 변수에 재대입하는 것이 아니다.
`setMode('READ')`로 리액트에 다음 값을 전달하면, 다음번 `App` 실행에서 새로 선언되는 `mode`가 그 값을 받는다.

### setMode를 호출하면 그 자리에서 mode가 바뀔까?

실행 중인 함수 안의 `mode`가 즉시 바뀌지는 않는다. 새 값은 다음 렌더링에 사용된다.
또한 현재 값과 같은 값으로 설정하면 리액트가 불필요한 리렌더링을 생략할 수 있다.
([React 공식 문서: useState](https://react.dev/reference/react/useState))

## 지금 기억할 것

화면이 기억해야 하는 값은 `useState`로 만들고, 바꿀 때는 `setMode` 같은 변경 함수를 사용한다.
`useState`는 지금처럼 컴포넌트 함수의 맨 위쪽에서 호출하고, 조건문·반복문·클릭 함수 안에서 호출하지 않는다.
