import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

// PostActionButtons 컴포넌트를 직접 렌더링하면, 나중에 PostActionButtons에 props를 전달할 때 
// 무조건 PostViewer를 거쳐 전달해야 함. 이를 방지하기 위해 props를 JSX 형태로 받아서 렌더링
const PostViewer = ({ post, error, loading, actionButtons }) => {
    // 에러 발생 시
    if (error) {
        if (error.response && error.response.status === 404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>
    }

    // 로딩 중이거나 아직 포스트 데이터가 없을 때
    if (loading || !post) {
        return null;
    } 

    const { title, body, user, publishedDate, tags } = post;

    return (
        <PostViewerBlock>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={user.username}
                    publishedDate={publishedDate}
                    hasMarginTop
                />
                <Tags tags={tags} />
            </PostHead>
            {actionButtons}
            <PostContent
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </PostViewerBlock>
    );
};

export default PostViewer;