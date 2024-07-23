import { useState, useRef } from "react";
import { supabase } from "@/main";
import styles from "./CommentList.module.css";

const CommentList = ({ comments, user, setComments }) => {
  const editingCommentRef = useRef(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingImage, setEditingImage] = useState(null);

  const handleEditComment = async (commentId) => {
    const editingCommentContent = editingCommentRef.current.value;
    let imageUrl = null;

    if (editingImage) {
      const fileName = `${Date.now()}_${editingImage.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, editingImage, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        alert(
          "이미지를 업로드하는 중 오류가 발생했습니다:" + uploadError.message
        );
        return;
      }

      const { data: publicData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (urlError) {
        alert(
          "이미지 URL을 가져오는 중 오류가 발생했습니다:" + urlError.message
        );
        return;
      }

      imageUrl = publicData.publicUrl;
    }

    const updateData = {
      content: editingCommentContent,
      ...(imageUrl && { image_url: imageUrl }),
    };

    const { data, error } = await supabase
      .from("comments")
      .update(updateData)
      .eq("id", commentId)
      .select();

    if (error) {
      alert("댓글을 수정하는 중 오류가 발생했습니다:" + error.message);
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? data[0] : comment
        )
      );
      setEditingCommentId(null);
      editingCommentRef.current.value = "";
      setEditingImage(null);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      alert("댓글을 삭제하는 중 오류가 발생했습니다:" + error.message);
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const handleImageChange = (e) => {
    setEditingImage(e.target.files[0]);
  };

  return (
    <div className={styles.comments}>
      <h3>댓글</h3>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          {editingCommentId === comment.id ? (
            <div>
              <textarea
                ref={editingCommentRef}
                defaultValue={comment.content}
              ></textarea>
              <input type="file" onChange={handleImageChange} />
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
              {comment.image_url && (
                <img
                  className={styles.commetImage}
                  src={comment.image_url}
                  alt="comment image"
                  className={styles.commentImage}
                />
              )}
              {comment.email === user?.email && (
                <div>
                  <button
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      editingCommentRef.current.value = comment.content;
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
