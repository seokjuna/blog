import Quill from "quill";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import 'quill/dist/quill.bubble.css';

const EditorBlock = styled(Responsive)`
    /* 페이지 위아래 여백 지정 */
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;

const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거 */
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;

const Editor = ({ title, body, onChangeField }) => {
    const quillElement = useRef(null); // Quill을 적용할 DivElement 설정
    const QuillInstance = useRef(null); // Quill 인스턴스 설정

    useEffect(() => {
        QuillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                // 더 많은 옵션
                // https://quilljs.com/docs/modules/toolbar/ 참고
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        // quill에 text-change 이벤트 핸들러 등록
        // 참고: https://quilljs.com/docs/api/#events
        const quill = QuillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({ key: 'body', value: quill.root.innerHTML });
            }
        });        
    }, [onChangeField]);

    // body 값은 Quill 에디터에서 내용을 입력할 때마다 변경
    // body가 변경될 때마다 useEffect에 등록한 함수가 호출
    // 하지만 컴포넌트가 화면에 마운트되고 나서 단 한 번만 useEffect에 등록한 작업이 실행되도록 설정해 주어야 함
    // -> useRef를 사용하여 mount 상태에 따라 작업을 처리하도록 설정
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        QuillInstance.current.root.innerHTML = body;
    }, [body]);

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    };

    return (
        <EditorBlock>
            <TitleInput 
                placeholder="제목을 입력하세요"
                onChange={onChangeTitle}
                value={title}
            />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;