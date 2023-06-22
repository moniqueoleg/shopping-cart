import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import Button from 'components/common/Button';
import ImageContainer from 'components/common/ImageContainer';

import { formatNumber, formatDiscount } from 'helpers/format';

import styles from './index.module.scss';

const ProductCard = ({
  productId,
  variantId,
  model,
  color,
  currentPrice,
  actualPrice,
  type,
  slug,
  image,
  numberOfVariants,
  handleDeleteStart,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.split('/')[1] === 'admin';

  const [showDetailsPlaceholder, setDetailsShowPlaceholder] = useState(true);

  console.log(currentPrice, actualPrice);

  return (
    <>
      <div className={styles.container}>
        {!showDetailsPlaceholder && currentPrice < actualPrice && (
          <span className={styles.discount}>
            {formatDiscount({ currentPrice, actualPrice })}
          </span>
        )}
        <ImageContainer
          src={image.src}
          to={`/products/${slug}`}
          alt=""
          clearPlaceholders={() => setDetailsShowPlaceholder(false)}
          containerClassName={styles.image_container}
          fillClassName={styles.image_fill}
        />
        <ul className={styles.info_wrapper}>
          {showDetailsPlaceholder && (
            <>
              <li className={styles.title_placeholder} />
              <li className={styles.color_placeholder} />
              <li className={styles.price_placeholder} />
            </>
          )}
          {!showDetailsPlaceholder && (
            <>
              <li className={styles.title}>
                {type} {model}
              </li>
              <li className={styles.color}>
                <span className={styles.text}>{color}</span>
                {numberOfVariants > 1 && (
                  <span
                    className={styles.tag}
                  >{`${numberOfVariants} colors`}</span>
                )}
              </li>
              <li className={styles.price}>
                {currentPrice < actualPrice ? (
                  <>
                    <span className={styles.discounted_price}>
                      ${formatNumber(currentPrice)}
                    </span>
                    <span className={styles.crossed_price}>
                      ${formatNumber(actualPrice)}
                    </span>
                  </>
                ) : (
                  formatNumber(currentPrice)
                )}
              </li>
            </>
          )}
        </ul>
        {isAdmin && (
          <div className={styles.admin_buttons_wrapper}>
            <Button className={styles.edit} to={`/admin/products/${productId}`}>
              Edit
            </Button>
            <Button
              onClick={() =>
                handleDeleteStart({
                  productId,
                  variantId,
                })
              }
              className={styles.delete}
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;