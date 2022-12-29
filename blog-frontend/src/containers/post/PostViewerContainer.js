import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import PostActionButtons from "../../components/post/PostActionButtons";
import PostViewer from "../../components/post/PostViewer";
import { readPost, unloadPost } from "../../modules/post";
import { setOriginalPost } from "../../modules/write";

const PostViewerContainer = ({ match }) => {
    // 처음 마운트될 때 포스트 읽기 API 요청
    const { postId } = useParams();
    const dispatch = useDispatch();
    // 글쓰기 페이지 이동
    const navigate = useNavigate();
    const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user,
    }));

;
    useEffect(() => {
        dispatch(readPost(postId));
        // 언마운트될 때 리덕스에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        navigate('/write');
    };

    const ownPost = (user && user._id) === (post && post.user._id);

    return (
        <PostViewer 
            post={post} 
            loading={loading} 
            error={error} 
            actionButtons={ownPost && <PostActionButtons onEdit={onEdit} />}
        />
    );
};

export default PostViewerContainer;