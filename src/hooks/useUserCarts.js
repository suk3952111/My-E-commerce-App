import { useState, useEffect } from "react";
import { supabase } from "@/main"; // Supabase 클라이언트 임포트
import useAuth from "./useAuth";

const useUserCarts = () => {
  const [userCart, setUserCart] = useState([]);
  const { user } = useAuth();

  const fetchUserCart = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.email);

      if (error) {
        console.error(
          "장바구니 데이터를 가져오는 중 오류가 발생했습니다:",
          error
        );
      } else {
        setUserCart(data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCart();
    }
  }, [user]);

  const updateUserCart = async (item) => {
    if (!user) {
      console.error(
        "사용자가 로그인되어 있지 않습니다. 장바구니를 업데이트할 수 없습니다."
      );
      return;
    }

    const itemWithUserId = { ...item, user_id: user.email };

    const { data: existingItems, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.email)
      .eq("item_id", item.item_id);

    if (fetchError) {
      console.error(
        "기존 장바구니 항목을 확인하는 중 오류가 발생했습니다:",
        fetchError
      );
      return;
    }

    if (existingItems.length > 0) {
      const { error: updateError } = await supabase
        .from("cart")
        .update(itemWithUserId)
        .eq("user_id", user.email)
        .eq("item_id", item.item_id);

      if (updateError) {
        console.error(
          "장바구니 항목을 업데이트하는 중 오류가 발생했습니다:",
          updateError
        );
      } else {
        fetchUserCart();
      }
    } else {
      const { error: insertError } = await supabase
        .from("cart")
        .insert(itemWithUserId);

      if (insertError) {
        console.error(
          "장바구니 항목을 삽입하는 중 오류가 발생했습니다:",
          insertError
        );
      } else {
        fetchUserCart();
      }
    }
  };

  return { userCart, updateUserCart, fetchUserCart };
};

export default useUserCarts;
