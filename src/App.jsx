import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './App.css';

function App() {
  const [text, setText] = useState('');
  return (
    <main className="">
      <div>
        <h2 align="center">Markdown</h2>

        <textarea
          id="editor"
          placeholder="type syntax markdown here and for code highlight use ~~~language type code ~~~"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div id="preview">
        {/* <ReactMarkdown >{text}</ReactMarkdown> */}
        <h2 align="center">Preview</h2>

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          children={text}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </main>
  );
}

export default App;
