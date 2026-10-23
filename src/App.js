import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Header(props) {
  console.log('props', props)
  return <header>
        <h1><a href="/" onClick={function(event) {
            event.preventDefault();
            props.onChangeMode();
        }}>{props.title}</a></h1>
      </header>
}

function Article(props) {
  return  <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
}

function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event => {
          event.preventDefault();
          props.onChangeMode(Number(event.target.id)); // event.target은 이벤트 유발시킨 대상. 여기서는 <a>
      }}>{t.title}</a></li>);
  }
  return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}

function App() {
  // const _mode = useState('WELCOME'); // 0: 상태값 읽을때 쓰는 데이터, 1: 상태값 변경할때 사용하는 함수
    const [mode, setMode] = useState('Read');
    const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
     {id:2, title:'css', body:'css is ...'},
      {id:3, title:'js', body:'js is ...'}
  ];

  let content = null;
  if(mode === 'WELCOME') {
      content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else {
      let title, body = null;
      for(let i=0; i<topics.length; i++) {
          if(topics[i].id === id) { // 태그 속성의 데이터는 문자열로 인식
            title = topics[i].title;
            body = topics[i].body;
          }
      }
      content = <Article title={title} body={body}></Article>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=> {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
          setMode('READ');
          setId(_id);
      }}></Nav>
      {content}
    </div>

  );
}

export default App;
