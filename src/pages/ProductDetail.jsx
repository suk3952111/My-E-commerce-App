import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { fetchProduct } from "@/api/api";
import { FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "./ProductDetail.module.css";
import Modal from "@/components/common/Modal";
import useToggle from "@/hooks/useToggle";
import useCart from "../hooks/useCart";
import { useAuthContext } from "../App";
import { supabase } from "@/main";
import CommentList from "@/components/ProductDetail/CommentList";
import AddComment from "@/components/ProductDetail/AddComment";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isModalOpen, toggleModal] = useToggle(false);
  const [comments, setComments] = useState([]);

  const {
    data: productDetail,
    loading,
    error,
  } = useAsync(() => fetchProduct(productSlug));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      if (productDetail) {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("product_id", productDetail.id);

        if (error) {
          alert("댓글을 가져오는 중 오류가 발생했습니다:", error);
        } else {
          setComments(data);
        }
      }
    };

    fetchComments();
  }, [productDetail]);

  const { cartItem, addCartItemNumber, removeCartItemNumber, handleAddToCart } =
    useCart(productDetail, toggleModal);

  if (loading) {
    return <div>상품 상세내용을 불러오고 있습니다...</div>;
  }

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  return (
    <div className={styles.body}>
      {productDetail && (
        <div className={styles.detail}>
          <div className={styles.description}>
            <img
              className={styles.image}
              src={productDetail.image}
              alt="상품 사진"
            />
            <div className={styles.descriptionMore}>
              <h2>{productDetail.title}</h2>
              <p>가격: ${productDetail.price}</p>
              <p className={styles.descriptionMoreWord}>
                {productDetail.description}
              </p>
              <p>
                <FaStar /> {productDetail.rating.rate} (리뷰 수:
                {productDetail.rating.count} 명)
              </p>
            </div>
          </div>
          <div className={styles.cart}>
            <div className={styles.cartList}>
              <p>구매수량</p>
              <div className={styles.buttons}>
                <button onClick={removeCartItemNumber}>
                  <FaArrowLeft />
                </button>
                <p>{cartItem.number}</p>
                <button onClick={addCartItemNumber}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div className={styles.cartList}>
              <p>총 상품 금액</p>
              <div>
                <p>${cartItem.price * cartItem.number}</p>
              </div>
            </div>
            <button onClick={toggleModal}>장바구니에 추가하기</button>
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
              <h2>상품을 장바구니에 추가하시겠습니까?</h2>
              <button onClick={handleAddToCart}>예</button>
              <button onClick={toggleModal}>아니요</button>
            </Modal>
          </div>
          <CommentList
            comments={comments}
            user={user}
            setComments={setComments}
          />
          <AddComment
            productDetail={productDetail}
            user={user}
            setComments={setComments}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
