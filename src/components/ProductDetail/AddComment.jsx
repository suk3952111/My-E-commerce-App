import { useRef, useState } from "react";
import { supabase } from "@/main"; // supabase 클라이언트 생성 코드 포함
import styles from "@/pages/ProductDetail.module.css";
import { useNavigate } from "react-router-dom";

const AddComment = ({ productDetail, user, setComments }) => {
  const navigate = useNavigate();
  const newCommentRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleAddComment = async () => {
    const newComment = newCommentRef.current.value;
    if (!newComment.trim()) return;

    let imageUrl = null;
    if (image) {
      const fileName = `${Date.now()}_${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        alert(
          "이미지를 업로드하는 중 오류가 발생했습니다: " + uploadError.message
        );
        return;
      }

      const { data: publicData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (urlError) {
        alert(
          "이미지 URL을 가져오는 중 오류가 발생했습니다: " + urlError.message
        );
        return;
      }

      imageUrl = publicData.publicUrl;
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          product_id: productDetail.id,
          content: newComment,
          email: user.email,
          image_url: imageUrl,
        },
      ])
      .select();

    if (error) {
      alert("댓글을 추가하는 중 오류가 발생했습니다: " + error.message);
    } else {
      setComments((prevComments) => [...prevComments, ...data]);
      newCommentRef.current.value = "";
      setImage(null);
    }
  };

  const handleAuthChecker = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.addComment}>
      <textarea
        ref={newCommentRef}
        placeholder="댓글을 작성하세요"
        onClick={handleAuthChecker}
      ></textarea>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleAddComment}>댓글 추가</button>
    </div>
  );
};

export default AddComment;
