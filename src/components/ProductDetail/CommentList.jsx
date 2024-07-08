import { useState } from "react";
import { supabase } from "@/main";
import styles from "@/pages/ProductDetail.module.css";

const CommentList = ({ comments, user, setComments }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  const handleEditComment = async (commentId) => {
    const { data, error } = await supabase
      .from("comments")
      .update({ content: editingCommentContent })
      .eq("id", commentId)
      .select();

    if (error) {
      console.error("댓글을 수정하는 중 오류가 발생했습니다:", error);
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? data[0] : comment
        )
      );
      setEditingCommentId(null);
      setEditingCommentContent("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("댓글을 삭제하는 중 오류가 발생했습니다:", error);
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <div className={styles.comments}>
      <h3>댓글</h3>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          {editingCommentId === comment.id ? (
            <div>
              <textarea
                value={editingCommentContent}
                onChange={(e) => setEditingCommentContent(e.target.value)}
              ></textarea>
              <button onClick={() => handleEditComment(comment.id)}>
                저장
              </button>
              <button onClick={() => setEditingCommentId(null)}>취소</button>
            </div>
          ) : (
            <div>
              <p>
                <strong>{comment.email}</strong>: {comment.content}
              </p>
              {comment.email === user.email && (
                <div>
                  <button
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingCommentContent(comment.content);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
