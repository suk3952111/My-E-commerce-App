import { useState } from "react";
import { supabase } from "@/main";
import styles from "@/pages/ProductDetail.module.css";

const AddComment = ({ productDetail, user, setComments }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          product_id: productDetail.id,
          content: newComment,
          email: user.email,
        },
      ])
      .select();

    if (error) {
      console.error("댓글을 추가하는 중 오류가 발생했습니다:", error);
    } else {
      setComments((prevComments) => [...prevComments, ...data]);
      setNewComment("");
    }
  };

  return (
    <div className={styles.addComment}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 작성하세요"
      ></textarea>
      <button onClick={handleAddComment}>댓글 추가</button>
    </div>
  );
};

export default AddComment;
