import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeViewer = ({ code, language }: { code: string; language: string }) => {

    return (
        <div className='px-5 leading-[26px] py-[15px] overflow-x-clip border rounded-xl border-white/10 code-viewer'>
            <SyntaxHighlighter language={language} style={a11yDark}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeViewer