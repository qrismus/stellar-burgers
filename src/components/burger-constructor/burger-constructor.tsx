import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  orderBurger,
  closeOrderNumberModal
} from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const user = useSelector((store) => store.user.user);
  const orderRequest = useSelector((store) => store.order.orderRequest);

  const orderModalData = useSelector((store) => store.order.orderModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (constructorItems.bun && constructorItems.ingredients) {
      const ingredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(ingredients));
    }
  };
  const closeOrderModal = () => {
    dispatch(closeOrderNumberModal());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
