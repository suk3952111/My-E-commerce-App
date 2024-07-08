import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { fetchProduct } from "@/api/api";
import { FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "./ProductDetail.module.css";
import Modal from "@/components/common/Modal";
import useToggle from "@/hooks/useToggle";
import useCart from "../hooks/useCart";
import { useAuthContext } from "../App";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const { user, updateUser } = useAuthContext();

  const {
    data: productDetail,
    loading,
    error,
  } = useAsync(() => fetchProduct(productSlug));

  const [isModalOpen, toggleModal] = useToggle(false);

  const { cartItem, addCartItemNumber, removeCartItemNumber, handleAddToCart } =
    useCart(productDetail, user, updateUser, toggleModal);

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
          <div>
            <h2>{productDetail.title}</h2>
            <p>가격: ${productDetail.price}</p>
            <p>상품 설명: {productDetail.description}</p>
            <img
              className={styles.image}
              src={productDetail.image}
              alt="상품 사진"
            />
            <p>
              <FaStar /> {productDetail.rating.rate} (리뷰 수:
              {productDetail.rating.count} 명)
            </p>
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
            {user ? (
              <button onClick={toggleModal}>장바구니에 추가하기</button>
            ) : (
              <p>로그인 후 장바구니에 추가할 수 있습니다.</p>
            )}
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
              <h2>상품을 장바구니에 추가하시겠습니까?</h2>
              <button onClick={handleAddToCart}>예</button>
              <button onClick={toggleModal}>아니요</button>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
